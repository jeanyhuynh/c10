export function handleQ6() {
  loadIndex();

  $("#submit_email").on("click", function(e) {
    console.log(32424);
    let isAgree = $("#agree_sendmail").is(":checked"),
      emailAddress = $("#email_val").val(),
      getSessionId = $("#saveSessionId").val();
    console.log("ds", emailAddress);
    if (emailAddress != null && emailAddress != "") {
      if (isAgree && getSessionId != null) {
        $.ajax({
          url: "https://c10.constructdigital.net/api/user",
          type: "POST",
          crossDomain: true,
          contentType: "application/json",
          headers: {
            "session-id": getSessionId
          },
          data: JSON.stringify({
            email: emailAddress
          }),
          dataType: "json"
        })
          .done(function(data, textStatus, xhr) {
            console.log(xhr.getResponseHeader("session-id"));
            console.log("done", data);
            alert(
              "Please check your inbox for your detailed results breakdown."
            );
          })
          .fail(function(err) {
            console.log("fail", err);
            alert("Fail", err);
          });
      } else if (isAgree == false) {
        $(".form-submit .list-box").append(
          "<span class='error' style='left: 0;'>We need your consent to contact you in order to send you your results. Please tick the box above.</span>"
        );
      } else {
        alert(
          "Oops! Seems like you didn't do the quiz yet. Please click the button on the page to do the quiz."
        );
      }
    } else {
      alert("Please input your email address.");
    }
  });
  $("#agree_sendmail").on("click", function(e) {
    let isAgree = $("#agree_sendmail").is(":checked");
    if (isAgree) {
      $(".error").hide();
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
jQuery(function($) {
  var countdownTimer = {
    init: function() {
      this.cacheDom();
      this.render();
    },
    cacheDom: function() {
      this.$el = $(".countdown");
      this.$time = this.$el.find(".countdown__time");
    },
    render: function() {
      var totalTime = 5,
        display = this.$time;
      this.startTimer(totalTime, display);
    },
    startTimer: function(duration, display, icon) {
      var timer = duration,
        minutes,
        seconds;
      var interval = setInterval(function() {
        seconds = parseInt(timer % 60, 10);
        seconds = seconds < 10 ? seconds : seconds;
        display.text("(" + seconds + ")");
        if (--timer < 0) {
          clearInterval(interval);
          $("#myModal").hide();
        }
      }, 1000);
    }
  };
  countdownTimer.init();
});
