var windowWidth =
    window.screen.width < window.outerWidth
      ? window.screen.width
      : window.outerWidth,
  widthcircle = 178;
export function handleQ4() {
  loadIndex();
  $(window).on("orientationchange", function(e) {
    location.reload();
  });

  if (windowWidth <= 414) {
    widthcircle = 125;
  }
  var motionbList = $("ul#list_emotion_icon li");
  motionbList.on("click", function(e) {
    var indexListitems = $(motionbList).index(this);
    motionbList.removeClass("active");
    $(this).addClass("active");

    var getValIndex = $(
      "ul#list_emotion_icon li.active input[name=motion-icon]"
    ).val();
    $(".load-emotion").addClass("hide");
    var textActive = $("#emot_" + indexListitems);
    $(textActive).removeClass("hide");
  });
  if ($("body").data("js") === "q4-slider") {
    roundSliderCicle();

    $("#checkbox_return").change(function() {
      if (this.checked) {
        $("#slider_circle").roundSlider({ disabled: true, value: 0 });
      } else {
        $("#slider_circle").roundSlider({ disabled: false, value: 25 });
      }
    });
  } else if ($("body").data("js") === "q4-draggable") {
    if ($("#container div").hasClass("actived") === false) {
      $("#btn_5_3_submit_menu").addClass("disabled");
    }

    draggableMenu(false);
    TweenLite.set(".box", { x: 0, y: 0 });
    getPointsMenu();
    $("#check_no_have").change(function() {
      if (this.checked) {
        $("#btn_5_3_submit_menu").removeClass("disabled");
        draggableMenu(true);
        $(".drag-area").addClass("disabled-box");
      } else {
        let getPointMenu = $(
          ".draggable-box .actived input[name='get_menu_drag']"
        );
        if (getPointMenu.length == 0) {
          $("#btn_5_3_submit_menu").addClass("disabled");
        }
        $(".drag-area").removeClass("disabled-box");
        draggableMenu(false);
      }
    });
  } else if ($("body").data("js") === "q4-experience-test") {
    markActivetoList($("ul#experience_list li"), "actived");
  } else if ($("body").data("js") === "q4-visitor") {
    markActivetoList($("ul#visitor-list li"), "actived");
  }
}
function roundSliderCicle() {
  $("#slider_circle").roundSlider({
    min: 0,
    max: 100,
    step: 1,
    value: 25,
    width: 30,
    radius: widthcircle,
    sliderType: "min-range",
    // showTooltip: true,
    editableTooltip: false,
    startAngle: 270,
    tooltipFormat: function(e) {
      let valu = 1,
        percent = e.value;

      if (percent <= 30) {
        valu = 1;
      } else if (percent >= 31 && percent <= 50) {
        valu = 2;
      } else if (percent >= 51 && percent <= 70) {
        valu = 3;
      } else {
        valu = 4;
      }
      $("input[name='get_percent']").val(valu);
      return e.value + "%";
    }
  });
}
function draggableMenu(isDisable) {
  var droppables = $(".box");
  var dropArea = $("#dropArea");
  var overlapThreshold = "99%";
  let draggables = Draggable.create(droppables, {
    bounds: $(".body-content"),
    onDrag: function(e) {
      if (this.hitTest(dropArea, overlapThreshold)) {
        $(this.target).addClass("actived");
        $("#btn_5_3_submit_menu").removeClass("disabled");
      } else {
        $(this.target).removeClass("actived");
        if ($("#container div").hasClass("actived") === false) {
          $("#btn_5_3_submit_menu").addClass("disabled");
        }
      }
    },
    onDragEnd: function(e) {
      if (!$(this.target).hasClass("actived")) {
        TweenLite.to(this.target, 0.2, {
          x: 0,
          y: 0
        });
      }
      getPointsMenu();
    }
  });
  for (var i = 0; i <= 4; i++) {
    var myDraggable = draggables[i];
    if (isDisable) {
      myDraggable.disable();
    } else {
      myDraggable.enable();
    }
  }
}
function getPointsMenu() {
  let point = 5,
    countChildActive = $(".draggable-box .actived ").length,
    calPoints = point * countChildActive;
  $("input[name='get_menu']").val(calPoints);
}
function markActivetoList(id, classActive) {
  var listClick = $(id);
  listClick.on("click", function(e) {
    var indexListitems = $(listClick).index(this);
    listClick.removeClass(classActive);
    $(this).addClass(classActive);
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
