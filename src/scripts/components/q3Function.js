export function handleQ3() {
  loadIndex();
  var mbList = $("ul#mobile-list li");
  mbList.on("click", function(e) {
    var indexListitems = $(mbList).index(this);
    mbList.removeClass("active");
    $(this).addClass("active");
    var getValIndex = $(
      "ul#mobile-list li.active input[name=mobile-answer]"
    ).val();
    var allOption = $(".screen-mobile"),
      optionActive = $("#photo-opt" + getValIndex);
    var tl = new TimelineLite();
    tl.to(allOption, 0.5, {
      rotationX: 180,
      scale: 0
    }).to(optionActive, 0.5, {
      rotationX: 0,
      scale: 1,
      opacity: 1,
      ease: Elastic.easeOut
    });
  });
  var screen_result_mobile = $("#screen_result_mobile");
  var tli = new TimelineLite();
  tli.to(screen_result_mobile, 1, {
    rotationX: 0,
    scale: 1,
    opacity: 1,
    ease: Elastic.easeOut
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
