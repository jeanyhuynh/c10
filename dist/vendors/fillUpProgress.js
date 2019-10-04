var tl = new TimelineLite();
$(document).ready(function() {
  var windowWidth = window.screen.width;
  $(window).on("orientationchange", function(e) {
    location.reload();
  });
  loadIndex();
  var container = $("#drag-wrapper"),
    points = [],
    closest_point = [],
    items = $(".items li");

  if (windowWidth < 676) {
    let pointMobil = Math.round(container.height() / 4);
    points = [0, pointMobil, pointMobil * 2.5, pointMobil * 3.5];
    console.log(points);

    $(".mob").addClass("hide");
    showActive(points, 0);
    setActiveProgressBar();
  } else {
    // function set point array and event click list item on version desktop.
    $(items).each(function(index) {
      let closest_point = $(this).position().top - container.position().top;
      if (index == 0) {
        points.push(0);
      } else if (index == 3) {
        points.push(Math.round(closest_point));
      } else {
        points.push(Math.round(closest_point + 16));
      }
      closest_point = points.reduce(function(prev, curr) {
        return Math.abs(curr - closest_point) < Math.abs(prev - closest_point)
          ? curr
          : prev;
      });
      items[index].addEventListener("click", function() {
        showActive(points, closest_point);
        setActiveProgressBar(closest_point);
        tl.to($("#dragable"), 0.01, {
          css: { transform: "translate3d(0px, " + closest_point + "px, 0px)" }
        });
      });
    });
    draggable(points);
    setActiveProgressBar();
  }
  //function set position dot on progress bar//
  $(points).each(function(index, value) {
    $("#point_" + index).css("top", value + 20);
  });
  // event click dot on progress bar
  $(".point").each(function(index) {
    var currPoint = $(this).position().top;
    $(".point")[index].addEventListener("click", function() {
      let closest_point = points.reduce(function(prev, curr) {
        return Math.abs(curr - currPoint) < Math.abs(prev - currPoint)
          ? curr
          : prev;
      });
      showActive(points, closest_point);
      setActiveProgressBar(closest_point);
      tl.to($("#dragable"), 0.01, {
        css: { transform: "translate3d(0px, " + closest_point + "px, 0px)" }
      });
    });
  });
  function setActiveProgressBar(currentPosition) {
    if (currentPosition == null || currentPosition == NaN) {
      currentPosition = $("#dragable").position().top;
    }
    var setHeightProgress = 0,
      height_contain = $("#drag-wrapper").innerHeight(),
      drag_icon_bar = $("#drag-bar-progress"),
      fill_up_img = $("#full-shield");
    setHeightProgress = currentPosition + 40;
    $(drag_icon_bar).css("height", setHeightProgress);
    var height_drag_icon_bar = drag_icon_bar.innerHeight(),
      set_height_fill_up = height_contain - height_drag_icon_bar + 10;
    if (set_height_fill_up <= 80) {
      set_height_fill_up = 0;
    }
    $(fill_up_img).css("height", set_height_fill_up);
  }

  function showActive(pointArray, currentPoint) {
    var tl = new TimelineLite();
    currentIndex = pointArray.indexOf(currentPoint);
    tl.to(items, 0.01, { className: "-=active" });
    console.log("windowWidth", windowWidth);
    if (windowWidth < 676) {
      items.addClass("hide");
      $(items[currentIndex]).removeClass("hide");
    }
    tl.to(items[currentIndex], 0.01, { className: "+=active" });
  }
  function draggable(points) {
    Draggable.create($("#dragable"), {
      bounds: $(container),
      type: "y",
      cursor: "-webkit-grab",
      minDuration: 0.5,
      dragClickables: true,
      snap: {
        y: points
      },
      throwProps: true,
      onDrag: function(e) {
        setActiveProgressBar(this.y);
      },
      onThrowUpdate: function(e) {
        setActiveProgressBar(this.y);
      },
      onThrowComplete: function(e) {
        showActive(points, this.y);
      }
    });
  }
  function loadIndex() {
    var items_result = $(".load-index");
    var selectedWork = new TimelineLite({ repeat: 0, repeatDelay: 1 });
    selectedWork.staggerFromTo(
      items_result,
      1,
      { y: 0, autoAlpha: 0 },
      { y: 20, autoAlpha: 1, ease: Elastic.easeOut.config(2, 0.75) },
      0.1
    );
  }
});
