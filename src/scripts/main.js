import { init } from "./components/functions";
import { thermometer } from "./components/thermometerAnimation";
import { handleBackEnd } from "./components/backend";
import { handleQ3 } from "./components/q3Function";
import { handleQ4 } from "./components/q4Function";
import { handleQ5 } from "./components/q5Function";
import { handleQ6 } from "./components/q6Function";

$(document).ready(function() {
  $(window).on("orientationchange", function(e) {
    $(".main-foot").removeClass("position-absolute");
    $(window).resize(function(e) {
      if ($(window).width() > 500 && $(window).width() < 768) {
        $(".main-foot").addClass("position-absolute");
      }
    });
  });
  if ($("body").data("title") === "3.6-screen") {
    thermometer();
  } else if ($("body").data("type") === "q3") {
    handleQ3();
  } else if ($("body").data("type") === "q4") {
    handleQ4();
    $("#logo_transform", window.parent.document).html(
      "<img src='dist/assets/construct-black.png' alt='construct'>"
    );
    $("#logo_mobile", window.parent.document).removeClass("box-logo-black");
    $("#logo_mobile", window.parent.document).addClass("box-logo-white");
  } else if ($("body").data("type") === "q5") {
    handleQ5();
    $("#logo_transform", window.parent.document).html(
      "<img src='dist/assets/construct.png' alt='construct'>"
    );
    $("#logo_mobile", window.parent.document).removeClass("box-logo-white");
    $("#logo_mobile", window.parent.document).addClass("box-logo-black");
  } else if ($("body").data("type") === "q6") {
    handleQ6();
    $("#logo_transform", window.parent.document).html(
      "<img src='dist/assets/construct-black.png' alt='construct'>"
    );
    $("#logo_mobile", window.parent.document).removeClass("box-logo-black");
    $("#logo_mobile", window.parent.document).addClass("box-logo-white");
  } else {
    init();
  }
  handleBackEnd();
  if ($("body").data("js") === "q2") {
    $("#logo_transform", window.parent.document).html(
      "<img src='dist/assets/construct.png' alt='construct'>"
    );
    $("#logo_mobile", window.parent.document).removeClass("box-logo-white");
    $("#logo_mobile", window.parent.document).addClass("box-logo-black");
  }
});
