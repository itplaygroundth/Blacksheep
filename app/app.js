const Vue = require("nativescript-vue");
Vue.config.silent = false;

const userService = {
  register(user) {
    return Promise.resolve(user)
  },
  login(user) { 
    return Promise.resolve(user)
  },
  resetPassword(email) {
    return Promise.resolve(email)
  }
}

const LoginPage = {
  data() {
    return {
      isLoggingIn: true,
      user: {
        email: 'foo@foo.com',
        password: 'foo',
        confirmPassword: 'foo'
      }
    }
  },
  template: `
    <Page>
      <FlexboxLayout class="page">
        <StackLayout class="form">
          <Image class="logo" src="~/images/logo.png" />
          <Label class="header" text="BlackSheep System" />

          <StackLayout class="input-field" marginBottom="25">
            <TextField class="input" hint="Email" keyboardType="email" autocorrect="false" autocapitalizationType="none" v-model="user.email" returnKeyType="next" @returnPress="focusPassword" fontSize="18" />
            <StackLayout class="hr-light" />
          </StackLayout>

          <StackLayout class="input-field" marginBottom="25">
            <TextField ref="password" class="input" hint="Password" secure="true" v-model="user.password" :returnKeyType="isLoggingIn ? 'done' : 'next'" @returnPress="focusConfirmPassword" fontSize="18" />
            <StackLayout class="hr-light" />
          </StackLayout>

          <StackLayout v-show="!isLoggingIn" class="input-field">
            <TextField ref="confirmPassword" class="input" hint="Confirm password" secure="true" v-model="user.confirmPassword" returnKeyType="done" fontSize="18" />
            <StackLayout class="hr-light" />
          </StackLayout>

          <Button :text="isLoggingIn ? 'Log In' : 'Sign Up'" @tap="submit" class="btn btn-primary m-t-20" />
          <Label v-show="isLoggingIn" text="Forgot your password?" class="login-label" @tap="forgotPassword" />
        </StackLayout>

        <Label class="login-label sign-up-label" @tap="toggleForm">
          <FormattedString>
            <Span :text="isLoggingIn ? 'Don’t have an account? ' : 'Back to Login'" />
            <Span :text="isLoggingIn ? 'Sign up' : ''" class="bold" />
          </FormattedString>
        </Label>
      </FlexboxLayout>
    </Page>
  `,
  methods: {
    toggleForm() {
      this.isLoggingIn = !this.isLoggingIn;
    },
    submit() {
      if (!this.user.email || !this.user.password) {
        this.alert("Please provide both an email address and password.");
        return;
      }

      if (this.isLoggingIn) {
        this.login();
      } else {
        this.register();
      }
    },
    login() {
      userService.login(this.user)
        .then(() => {
          this.$navigateTo(HomePage);
        })
        .catch(() => {
          this.alert("Unfortunately we could not find your account.");
        });
    },
    register() {
      if (this.user.password != this.user.confirmPassword) {
        this.alert("Your passwords do not match.");
        return;
      }
      userService.register(this.user)
        .then(() => {
          this.alert("Your account was successfully created.");
          this.isLoggingIn = true;
        })
        .catch(() => {
          this.alert("Unfortunately we were unable to create your account.");
        });
    },
    forgotPassword() {
      prompt({
        title: "Forgot Password",
        message: "Enter the email address you used to register for APP NAME to reset your password.",
        inputType: "email",
        defaultText: "",
        okButtonText: "Ok",
        cancelButtonText: "Cancel"
      }).then((data) => {
        if (data.result) {
          userService.resetPassword(data.text.trim())
            .then(() => {
              this.alert("Your password was successfully reset. Please check your email for instructions on choosing a new password.");
            }).catch(() => {
              this.alert("Unfortunately, an error occurred resetting your password.");
            });
        }
      });
    },
    focusPassword() {
      this.$refs.password.nativeView.focus();
    },
    focusConfirmPassword() {
      if (!this.isLoggingIn) {
        this.$refs.confirmPassword.nativeView.focus();
      }
    },
    alert(message) {
      return alert({
        title: "APP NAME",
        okButtonText: "OK",
        message: message
      });
    }

  }
};

const HomePage = {
  template: `
    <Page>
      <Label class="m-20" textWrap="true" text="You have successfully authenticated. This is where you build your core application functionality."></Label>
    </Page>
  `
};

new Vue({
  render: h => h(LoginPage)
}).$start();
