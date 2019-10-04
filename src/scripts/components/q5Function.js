export function handleQ5() {
  loadIndex();
  var motionbList = $("ul#list_emotion_icon li");
  motionbList.on("click", function(e) {
    var indexListitems = $(motionbList).index(this);
    motionbList.removeClass("active");
    $(this).addClass("active");

    $(".load-emotion").addClass("hide");
    var textActive = $("#emot_" + indexListitems);
    $(textActive).removeClass("hide");
  });
  for (var i = 14; i <= 20; i++) {
    $("input[name='option_check_" + i + "']").click(function() {
      let imageName_byOpt = $(this).attr("name");
      $("#feeling_img").html(
        "<img class='animate fadeIn' src='../dist/assets/gif/questions/" +
          imageName_byOpt +
          ".svg' />"
      );
      $("#" + imageName_byOpt).css("opacity", "1");
    });
  }
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
