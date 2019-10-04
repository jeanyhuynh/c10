export function init() {
  var getTitlePage = $("body").data("title");
  loadIndex();
  loadListResult();

  if (getTitlePage === "site-secured-screen") {
    loadSiteSecure();
  } else if (getTitlePage === "3.0-screen") {
    screen30Load();
  } else if (getTitlePage === "3.4-screen") {
    loadScreen34();
    loadIndex();
  } else if (getTitlePage === "race-screen" || getTitlePage === "race") {
    loadIndex();
    loadsScreenRacing();
    $("#logo_transform", window.parent.document).html(
      "<img src='dist/assets/construct-black.png' alt='construct'>"
    );
    $("#logo_mobile", window.parent.document).removeClass("box-logo-black");
    $("#logo_mobile", window.parent.document).addClass("box-logo-white");
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
  function screen30Load() {
    // screen locker effect//
    var locker = $("#locker"),
      src_30_text = $("#src-30-text"),
      src_31_text = $("#src-31-text"),
      note_30 = $("#note-30"),
      note_31 = $("#note-31"),
      lock_head = $("#lock-head"),
      btn_next_locker = $("#btn-next-locker");

    $(locker).click(function() {
      var timeline = new TimelineLite({ paused: true });
      timeline.insert(
        TweenLite.set(locker, {
          css: { className: "+=anima-shake-locker" },
          immediateRender: false
        }),
        0.01
      );
      timeline.insert(
        TweenLite.set(src_30_text, {
          css: { className: "+=hide" },
          immediateRender: false
        }),
        0.2
      );
      timeline.insert(
        TweenLite.set(src_31_text, {
          css: { className: "-=hide" },
          immediateRender: false
        }),
        0.4
      );
      timeline.insert(
        TweenLite.set(src_31_text, {
          css: { className: "+=show animate fadeIn" },
          immediateRender: false
        }),
        0.6
      );
      timeline.insert(
        TweenLite.set(lock_head, {
          css: { className: "+=anima-unlocker" },
          immediateRender: false
        }),
        0.9
      );
      timeline.insert(
        TweenLite.set(lock_head, {
          css: { top: "-4rem" },
          immediateRender: false
        }),
        1.4
      );
      setTimeout(function() {
        $(locker).append(
          "<span class='clink animate'><img src='dist/assets/clink-clink.svg'/></span>"
        );
      }, 1100);
      timeline.insert(
        TweenLite.set(note_30, {
          css: { className: "+=hide" },
          immediateRender: false
        }),
        1.6
      );
      timeline.insert(
        TweenLite.set(note_31, {
          css: { className: "-=hide" },
          immediateRender: false
        }),
        1.8
      );
      timeline.insert(
        TweenLite.set(note_31, {
          css: { className: "+=show animate fadeIn" },
          immediateRender: false
        }),
        2
      );
      timeline.insert(
        TweenLite.set(btn_next_locker, {
          css: { className: "-=hide" },
          immediateRender: false
        }),
        2.1
      );

      timeline.play();
      //set progress bar //
      let percent_line = 22,
        percent_line_head = percent_line,
        text = "Click the button to continue.";
      $("#progress_q", window.parent.document).show();
      $("#progress_bar_line", window.parent.document).css(
        "width",
        percent_line + "%"
      );
      $("#progress_bar_line_head", window.parent.document).css(
        "width",
        percent_line_head + "%"
      );
      $("#content_tooltip", window.parent.document).html(text);
    });
  }

  function loadScreen34() {
    $(".list-partners li").click(function(e) {
      e.preventDefault();
      $(".list-partners li").removeAttr("data-act");
      $(".list-partners")
        .find("li")
        .removeClass("active");
      $(this).addClass("active");
      $(this).attr("data-act", "active");
    });
    $(".list-partners li")
      .bind("mouseenter", function(e) {
        $(".list-partners")
          .find("li")
          .removeClass("active");
      })
      .bind("mouseleave", function(e) {
        $(".list-partners")
          .find("[data-act=active]")
          .addClass("active");
      });
  }
  function loadsScreenRacing() {
    var racer = $(".racer"),
      road = $(".the-road"),
      sun = $(".the-sun"),
      shadow = $(".shadow-animal"),
      lef_brand = $("#left-band"),
      righ_brand = $("#right-band"),
      tl = new TimelineLite();
    setTimeout(function() {
      tl.to(sun, 0.5, { opacity: 1, ease: sun.easeOut });
      $(sun).addClass("sun-grow-effect");
    }, 1000);
    TweenLite.delayedCall(1.5, racerDrop);
    TweenLite.delayedCall(2, shadowRacer);
    TweenLite.delayedCall(4, changeAnimationRacer);
    TweenLite.delayedCall(2.5, brandFly);
    function racerDrop() {
      tl.to(racer, 0.5, { opacity: 1, ease: racer.easeOut });
      $(racer).addClass("animation-drop");
    }
    function shadowRacer() {
      tl.to(shadow, 0.5, { opacity: 1, ease: shadow.easeOut });
      $(shadow).addClass("shadow-effect");
    }
    function brandFly() {
      tl.to(lef_brand, 0.5, { opacity: 1, ease: lef_brand.easeOut });
      $(lef_brand, righ_brand).addClass("left-band-effect");
      tl.to(righ_brand, 0.5, { opacity: 1, ease: righ_brand.easeOut });
      $(righ_brand).addClass("right-band-effect");
    }
    function changeAnimationRacer() {
      $(racer).removeClass("animation-drop");
      //$(racer).addClass("jump");
    }
  }
  function loadListResult() {
    var items_result = $("#check-list-result li");
    var selectedWork = new TimelineMax({ repeat: 0, repeatDelay: 5 });
    selectedWork.staggerFromTo(
      items_result,
      1,
      { y: 0, autoAlpha: 0 },
      { y: 20, autoAlpha: 1, ease: Elastic.easeOut.config(2, 0.75) },
      0.1
    );
  }
  $("#CMSActive").click(function() {
    var listItems = $("#list-cms-partners li");
    listItems.removeClass("active");
    $("#except_case_active").addClass("active");
  });
}
