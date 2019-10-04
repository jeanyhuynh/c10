var windowWidth =
    window.screen.width < window.outerWidth
      ? window.screen.width
      : window.outerWidth,
  widthcircle = 178;

$(document).ready(function() {
  $(window).on("orientationchange", function(e) {
    location.reload();
  });
  loadIndex();
  if (windowWidth <= 414) {
    widthcircle = 135;
  }
  if ($("body").data("title") === "ssl-screen") {
    sslLoadFunction();
  } else {
    roundSlider();
  }
  var jQliList = $("ul.steps li");
  jQliList.on("click", function(e) {
    var indexListitems = $(jQliList).index(this);
    jQliList.removeClass("active");
    $(this).addClass("active");
    $(".load-status").addClass("hide");
    var textActive = $("#point-" + indexListitems);
    $(textActive).removeClass("hide");
  });
});
function sslLoadFunction() {
  var dragBar = $(".drag-bar"),
    dragElem = $(".drag-elem"),
    dragContainer = $("#drag-container"),
    dragLimit = dragContainer.width() - dragElem.width(),
    tnProgress,
    tl = new TimelineLite({});
  tl.set(dragBar, { width: this.x + 10 });
}
function roundSlider() {
  $.fn.roundSlider.prototype.defaults.create = function() {
    var o = this.options,
      tickInterval = o.step;
    for (var i = o.min; i <= o.max + 1; i += tickInterval) {
      var angle = this._valueToAngle(i);
      var numberTag = this._addSeperator(angle, "rs-custom");

      var number = numberTag.children();
      var size = o.width + this._border();
      number.css({
        width: size + 20,
        height: size - 20,
        "margin-top": -10
      });
      number.attr("id", "rs_custom_" + i);
      number.addClass("rs-custom-bg");
    }
  };

  $("#slider").roundSlider({
    min: 0,
    max: 25,
    step: 5,
    value: 1,
    width: 30,
    radius: widthcircle,
    handleShape: "round",
    circleShape: "pie",
    sliderType: "min-range",
    // showTooltip: true,
    editableTooltip: false,
    startAngle: 315,
    tooltipFormat: function(e) {
      $("#btn_3_3_submit").removeClass("disabled");
      $(".rs-custom-bg").css("background-color", "#ffffff");
      return showTooltip(e);
    }
  });
}
function loadIndex() {
  var items_result = $(".load-index");
  var selectedWork = new TimelineLite({ repeat: 0, repeatDelay: 1 });
  selectedWork.staggerFromTo(
    items_result,
    1,
    { y: -20, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, ease: Bounce.easeOut },
    0.1
  );
}
function showTooltip(e) {
  var valueSlid = 0,
    valueNumber = "<span class='rs-tooltip-text'>" + valueSlid + "</span>",
    text = "Slide the circle to answer",
    valueText = "<span class='text-tooltip'>" + text + "</span>",
    resultGroup = "";
  if (e.value == 0) {
    text = "Slide the circle to answer";
    valueText =
      "<span class='text-tooltip small-size-toltip'>" + text + "</span>";
    $("#btn_3_3_submit").addClass("disabled");
    return (resultGroup = valueText);
  } else if (e.value <= 6) {
    text = "I set up automatic updates. Gotta make sure we run a tight ship.";
    valueText =
      "<span class='text-tooltip small-size-toltip'>" + text + "</span>";
    $("input[name='answer_scr_3']").val(1);

    $("#rs_custom_0").css("background-color", "#fbce00");
    $("#rs_custom_5").css("background-color", "#fbce00");
    return (resultGroup = valueText);
  } else if (6 < e.value && e.value <= 11) {
    valueSlid = "1 - 6";
    text = "months ago";
    valueNumber = "<span class='rs-tooltip-text'>" + valueSlid + "</span>";
    valueText = "<span class='text-tooltip'>" + text + "</span>";
    $("input[name='answer_scr_3']").val(2);
    $("#rs_custom_0").css("background-color", "#fbce00");
    for (var i = 0; i <= 10; i += 5) {
      $("#rs_custom_" + i).css("background-color", "#fbce00");
    }
    return (resultGroup = valueNumber + valueText);
  } else if (12 < e.value && e.value <= 17) {
    valueSlid = "6 - 24";
    text = "months";
    valueNumber = "<span class='rs-tooltip-text'>" + valueSlid + "</span>";
    valueText = "<span class='text-tooltip'>" + text + "</span>";
    $("input[name='answer_scr_3']").val(3);
    $("#rs_custom_0").css("background-color", "#fbce00");
    for (var i = 0; i <= 15; i += 5) {
      $("#rs_custom_" + i).css("background-color", "#fbce00");
    }
    return (resultGroup = valueNumber + valueText);
  } else if (18 < e.value && e.value <= 21) {
    text = "years";
    valueSlid = "> 2";
    valueNumber = "<span class='rs-tooltip-text'>" + valueSlid + "</span>";
    valueText = "<span class='text-tooltip'>" + text + "</span>";
    $("input[name='answer_scr_3']").val(4);
    $("#rs_custom_0").css("background-color", "#fbce00");
    for (var i = 0; i <= 20; i += 5) {
      $("#rs_custom_" + i).css("background-color", "#fbce00");
    }
    return (resultGroup = valueNumber + valueText);
  } else {
    text = "what is CMS?";
    valueSlid = "Uhh";
    valueNumber = "<span class='rs-tooltip-text'>" + valueSlid + "</span>";
    valueText =
      "<span class='text-tooltip small-size-toltip'>" + text + "</span>";
    $("input[name='answer_scr_3']").val(5);
    $("#rs_custom_0").css("background-color", "#fbce00");
    for (var i = 0; i <= 25; i += 5) {
      $("#rs_custom_" + i).css("background-color", "#fbce00");
    }

    return (resultGroup = valueNumber + valueText);
  }
}
