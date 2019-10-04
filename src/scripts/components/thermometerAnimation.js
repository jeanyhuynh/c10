export function thermometer() {
  $(document).ready(function() {
    var tl = new TimelineLite();
    $(window).on("orientationchange", function(e) {
      location.reload();
    });
    var windowWidth = window.screen.width;
    // < window.outerWidth
    //   ? window.screen.width
    //   : window.outerWidth;

    if (windowWidth < 768) {
      if (Math.min.apply(0, points) < 0) {
        points[0] = 8;
      }
    }
    loadIndex();
    var container = $("#drag-wrapper"),
      points = [],
      items = $("#check-list-result li");
    $(items).each(function(index) {
      var closest_point = Math.round($(this).position().top);
      if (windowWidth < 768) {
        if (closest_point <= 0) {
          closest_point = 8;
        } else {
          closest_point = closest_point + 30;
        }
        points.push(Math.round(closest_point));
      } else if (windowWidth == 768) {
        points.push(Math.round(closest_point));
      } else {
        if (closest_point <= 0) {
          points.push(10);
        } else {
          if (closest_point >= 210) {
            closest_point = closest_point;
          }
          points.push(Math.round(closest_point) + 30);
        }
        closest_point = points.reduce(function(prev, curr) {
          if (curr == 300) {
            return curr;
          } else {
            return Math.abs(curr - closest_point) <
              Math.abs(prev - closest_point)
              ? curr
              : prev;
          }
        });
      }
      items[index].addEventListener("click", function() {
        showActive(points, closest_point);
        let closest_point_cursor = closest_point;
        tl.to($("#btn-scroll"), 0.01, {
          css: {
            transform: "translate3d(0px, " + closest_point_cursor + "px, 0px)"
          }
        });
        setActiveProgressBar(closest_point);
      });
    });
    $("#drag-container").click(function(event) {
      let position_cursor = event.offsetY,
        closest_point = 0;

      if (position_cursor >= 0) {
        closest_point = points.reduce(function(prev, curr) {
          return Math.abs(curr - position_cursor) <
            Math.abs(prev - position_cursor)
            ? curr
            : prev;
        });
      }
      tl.to($("#btn-scroll"), 0.01, {
        css: {
          transform: "translate3d(0px, " + closest_point + "px, 0px)"
        }
      });
      showActive(points, closest_point);
      setActiveProgressBar(closest_point);
    });
    setActiveProgressBar();
    Draggable.create($("#btn-scroll"), {
      bounds: container,
      type: "y",
      cursor: "-webkit-grab",
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
    function setActiveProgressBar(closest_point) {
      if (closest_point == null || closest_point == NaN) {
        closest_point = $(".thermometer #btn-scroll").position().top;
      }
      var height =
        $(".thermometer").height() - closest_point - $("#btn-scroll").height();

      $(".thermometer #level").css("height", Math.round(height) + "px");
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
    function showActive(pointArray, currentPoint) {
      var tl = new TimelineLite();
      let currentIndex = pointArray.indexOf(currentPoint);
      tl.to(items, 0.01, { className: "-=active" });
      tl.to(items[currentIndex], 0.01, { className: "+=active" });
      if (currentIndex === 0) {
        $(".thermometer #level").css(
          "background-image",
          "linear-gradient(-180deg, rgb(217, 56, 56) 0%, #FBCE00 51%, rgb(115, 189, 88) 100%)"
        );
      } else {
        $(".thermometer #level").css(
          "background-image",
          "linear-gradient( -180deg, rgb(217, 56, 56) 0%, #ea821d 51%, rgb(251, 206, 0) 100%)"
        );
      }
    }
  });
}
