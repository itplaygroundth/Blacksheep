const ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;
const Vue = require("nativescript-vue");

Vue.registerElement("RadCartesianChart", () => require("nativescript-ui-chart").RadCartesianChart);
Vue.registerElement("RadPieChart", () => require("nativescript-ui-chart").RadPieChart);
Vue.registerElement("RadLegendView", () => require("nativescript-ui-chart").RadLegendView);
Vue.registerElement("LineSeries", () => require("nativescript-ui-chart").LineSeries);
Vue.registerElement("PieSeries", () => require("nativescript-ui-chart").PieSeries);
Vue.registerElement("DonutSeries", () => require("nativescript-ui-chart").DonutSeries);
Vue.registerElement("AreaSeries", () => require("nativescript-ui-chart").AreaSeries);
Vue.registerElement("CategoricalAxis", () => require("nativescript-ui-chart").CategoricalAxis);
Vue.registerElement("LinearAxis", () => require("nativescript-ui-chart").LinearAxis);
Vue.registerElement("DateTimeCategoricalAxis", () => require("nativescript-ui-chart").DateTimeCategoricalAxis);
Vue.registerElement("SplineSeries", () => require("nativescript-ui-chart").SplineSeries);
Vue.registerElement("BarSeries", () => require("nativescript-ui-chart").BarSeries);
Vue.registerElement("RangeBarSeries", () => require("nativescript-ui-chart").RangeBarSeries);
Vue.registerElement("BubbleSeries", () => require("nativescript-ui-chart").BubbleSeries);
Vue.registerElement("ScatterBubbleSeries", () => require("nativescript-ui-chart").ScatterBubbleSeries);
Vue.registerElement("ScatterSeries", () => require("nativescript-ui-chart").ScatterSeries);
Vue.registerElement("OhlcSeries", () => require("nativescript-ui-chart").OhlcSeries);
Vue.registerElement("CandlestickSeries", () => require("nativescript-ui-chart").CandlestickSeries);
Vue.registerElement("RadCartesianChartGrid", () => require("nativescript-ui-chart").RadCartesianChartGrid);
Vue.registerElement("Palette", () => require("nativescript-ui-chart").Palette);
Vue.registerElement("PaletteEntry", () => require("nativescript-ui-chart").PaletteEntry);
Vue.registerElement("ChartGridLineAnnotation", () => require("nativescript-ui-chart").ChartGridLineAnnotation);
Vue.registerElement("ChartPlotBandAnnotation", () => require("nativescript-ui-chart").ChartPlotBandAnnotation);
Vue.registerElement("Trackball", () => require("nativescript-ui-chart").Trackball);
Vue.registerElement("PointLabelStyle", () => require("nativescript-ui-chart").PointLabelStyle);
Vue.registerElement("DateTimeContinuousAxis", () => require("nativescript-ui-chart").DateTimeContinuousAxis);
Vue.registerElement("LogarithmicAxis", () => require("nativescript-ui-chart").LogarithmicAxis);
Vue.registerElement("SplineAreaSeries", () => require("nativescript-ui-chart").SplineAreaSeries);

var setHorizontalAxis = {
  inserted: function (el) {
    el.parentNode._nativeView.horizontalAxis = el._nativeView;
  }
}

Vue.directive("tkCartesianHorizontalAxis", setHorizontalAxis);
Vue.directive("tkLineHorizontalAxis", setHorizontalAxis);
Vue.directive("tkBarHorizontalAxis", setHorizontalAxis);
Vue.directive("tkRangeBarHorizontalAxis", setHorizontalAxis);
Vue.directive("tkAreaHorizontalAxis", setHorizontalAxis);
Vue.directive("tkSplineHorizontalAxis", setHorizontalAxis);
Vue.directive("tkSplineAreaHorizontalAxis", setHorizontalAxis);
Vue.directive("tkBubbleHorizontalAxis", setHorizontalAxis);
Vue.directive("tkScatterBubbleHorizontalAxis", setHorizontalAxis);
Vue.directive("tkCandlestickHorizontalAxis", setHorizontalAxis);
Vue.directive("tkOhlcHorizontalAxis", setHorizontalAxis);
Vue.directive("tkScatterHorizontalAxis", setHorizontalAxis);

var setVerticalAxis = {
  inserted: function (el) {
    el.parentNode._nativeView.verticalAxis = el._nativeView;
  }
}

Vue.directive("tkCartesianVerticalAxis", setVerticalAxis);
Vue.directive("tkLineVerticalAxis", setVerticalAxis);
Vue.directive("tkBarVerticalAxis", setVerticalAxis);
Vue.directive("tkRangeBarVerticalAxis", setVerticalAxis);
Vue.directive("tkAreaVerticalAxis", setVerticalAxis);
Vue.directive("tkSplineVerticalAxis", setVerticalAxis);
Vue.directive("tkSplineAreaVerticalAxis", setVerticalAxis);
Vue.directive("tkBubbleVerticalAxis", setVerticalAxis);
Vue.directive("tkScatterBubbleVerticalAxis", setVerticalAxis);
Vue.directive("tkCandlestickVerticalAxis", setVerticalAxis);
Vue.directive("tkOhlcVerticalAxis", setVerticalAxis);
Vue.directive("tkScatterVerticalAxis", setVerticalAxis);

var setSeries = {
  inserted: function (el) {
    var series = el._nativeView;
    var chart = el.parentNode._nativeView;

    if (chart.series) {
      chart.series.push(series);
    } else {
      chart.series = new ObservableArray([series]);
    }
  }
};

Vue.directive("tkCartesianSeries", setSeries);
Vue.directive("tkPieSeries", setSeries);

Vue.directive("tkCartesianGrid", {
  inserted: function (el) {
    el.parentNode._nativeView.grid = el._nativeView;
  }
});

var setPalette = {
  inserted: function (el) {
    var palette = el._nativeView;
    var chart = el.parentNode._nativeView;

    if (chart.palettes) {
      chart.palettes.push(palette);
    } else {
      chart.palettes = new ObservableArray([palette]);
    }

    el.childNodes.forEach(entry => {
      if (entry._nativeView.typeName === "PaletteEntry") {
        if (palette.entries) {
          palette.entries.push(entry._nativeView);
          palette.updateOwner();
        } else {
          palette.entries = new ObservableArray([entry._nativeView]);
        }
      }
    });
  }
};

Vue.directive("tkCartesianPalette", setPalette);
Vue.directive("tkPiePalette", setPalette);

var setEntry = {
  inserted: function (el) {
    var entry = el._nativeView;
    var palette = el.parentNode._nativeView;

    if (palette.entries) {
      palette.entries.push(entry);
    } else {
      palette.entries = new ObservableArray([entry]);
    }
  }
}

Vue.directive("tkCartesianPaletteEntry", setEntry);
Vue.directive("tkPiePaletteEntry", setEntry);

Vue.directive("tkCartesianAnnotations", {
  inserted: function (el) {
    var annotation = el._nativeView;
    var chart = el.parentNode._nativeView;

    if (palette.annotations) {
      chart.annotations.push(annotation);
    } else {
      chart.annotations = new ObservableArray([annotation]);
    }
  }
});

var setLabelStyle = {
  inserted: function (el) {
    el.parentNode._nativeView.labelStyle = el._nativeView;
  }
};

Vue.directive("tkPieLabelStyle", setLabelStyle);
Vue.directive("tkDonutLabelStyle", setLabelStyle);
Vue.directive("tkLineLabelStyle", setLabelStyle);
Vue.directive("tkBarLabelStyle", setLabelStyle);
Vue.directive("tkSplineAreaLabelStyle", setLabelStyle);
Vue.directive("tkBubbleLabelStyle", setLabelStyle);
Vue.directive("tkScatterBubbleLabelStyle", setLabelStyle);
Vue.directive("tkCandlestickLabelStyle", setLabelStyle);
Vue.directive("tkOhlcLabelStyle", setLabelStyle);
Vue.directive("tkScatterLabelStyle", setLabelStyle);

var setLegend = {
  inserted: function (el) {
    el.parentNode._nativeView.legend = el._nativeView;
  }
};

Vue.directive("tkPieLegend", setLegend);
Vue.directive("tkCartesianLegend", setLegend);

Vue.directive("tkCartesianTrackball", {
  inserted: function (el) {
    el.parentNode._nativeView.trackball = el._nativeView;
  }
});