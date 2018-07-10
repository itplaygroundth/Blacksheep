const ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;
const Vue = require("nativescript-vue");

Vue.registerElement("RadRadialGauge", () => require("nativescript-ui-gauge").RadRadialGauge);
Vue.registerElement("RadialScale", () => require("nativescript-ui-gauge").RadialScale);
Vue.registerElement("ScaleStyle", () => require("nativescript-ui-gauge").ScaleStyle);
Vue.registerElement("RadialBarIndicator", () => require("nativescript-ui-gauge").RadialBarIndicator);
Vue.registerElement("BarIndicatorStyle", () => require("nativescript-ui-gauge").BarIndicatorStyle);
Vue.registerElement("RadialNeedle", () => require("nativescript-ui-gauge").RadialNeedle);
Vue.registerElement("TitleStyle", () => require("nativescript-ui-gauge").TitleStyle);
Vue.registerElement("SubtitleStyle", () => require("nativescript-ui-gauge").SubtitleStyle);
Vue.registerElement("NeedleStyle", () => require("nativescript-ui-gauge").NeedleStyle);

Vue.directive("tkRadialGaugeScales", {
    inserted: function (el) {
        var scale = el._nativeView;
        var gauge = el.parentNode._nativeView;

        if (gauge.scales) {
            gauge.scales.push(scale);
        } else {
            gauge.scales = new ObservableArray([scale]);
        }
    }
});


Vue.directive("tkRadialScaleIndicators", {
    inserted: function (el) {
        var barIndicator = el._nativeView;
        var scale = el.parentNode._nativeView;

        if (scale.indicators) {
            scale.indicators.push(barIndicator);
        } else {
            scale.indicators = new ObservableArray([barIndicator]);
        }
    }
});

Vue.directive("tkRadialBarIndicatorStyle", {
    inserted: function (el) {
        el.parentNode._nativeView.indicatorStyle = el._nativeView;
    }
});

Vue.directive("tkRadialGaugeTitleStyle", {
    inserted: function (el) {
        el.parentNode._nativeView.titleStyle = el._nativeView;
    }
});

Vue.directive("tkRadialGaugeSubtitleStyle", {
    inserted: function (el) {
        el.parentNode._nativeView.subtitleStyle = el._nativeView;
    }
});

Vue.directive("tkRadialNeedleStyle", {
    inserted: function (el) {
        el.parentNode._nativeView.needleStyle = el._nativeView;
    }
});

Vue.directive("tkRadialScaleStyle", {
    inserted: function (el) {
        el.parentNode._nativeView.scaleStyle = el._nativeView;
    }
});