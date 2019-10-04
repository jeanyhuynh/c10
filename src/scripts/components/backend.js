export function handleBackEnd() {
  let window_height = $(window.parent).height(),
    content_height = Math.round($("body").height());
  let data_title_page = $("body").data("title"),
    data_type_page = $("body").data("type"),
    data_js_page = $("body").data("js");
  var windowWidth =
      window.screen.width < window.outerWidth
        ? window.screen.width
        : window.outerWidth,
    number_round = 20;

  if (windowWidth > 768) {
    number_round = 60;
  }
  if (Math.round(content_height - window_height) > number_round) {
    $(".scroll-down", window.parent.document).show();
  } else {
    $(".scroll-down", window.parent.document).hide();
  }
  $(".scroll-btn", window.parent.document).click(function(event) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: $(window.parent).height() }, 0.5);
    $(window.parent).scrollTop($(window.parent).height());
  });
  //begin scroll event for IOS
  $(window.parent).scroll(function() {
    let scrollTop = $(this).scrollTop(),
      scrollBOT = Math.round(scrollTop + $(window.parent).height());
    if (scrollTop > 20 && windowWidth <= 768) {
      $("#logo_mobile", window.parent.document).addClass("box-logo");
    } else {
      $("#logo_mobile", window.parent.document).removeClass("box-logo");
    }

    if (
      scrollTop > 0 &&
      (scrollBOT == content_height || content_height - scrollBOT < 40)
    ) {
      $(".scroll-down", window.parent.document).hide();
    } else if (scrollTop > 20) {
      $(".scroll-down", window.parent.document).show();
    }
  });
  //end scroll event for IOS
  $(window).scroll(function() {
    let scrollTop = $(this).scrollTop(),
      scrollBOT = Math.round(scrollTop + $(window).height());
    if (scrollTop > 20 && windowWidth <= 768) {
      $("#logo_mobile", window.parent.document).addClass("box-logo");
    } else {
      $("#logo_mobile", window.parent.document).removeClass("box-logo");
    }
    if (scrollTop > 0 && scrollBOT == content_height) {
      $(".scroll-down", window.parent.document).hide();
    } else {
      $(".scroll-down", window.parent.document).show();
    }
  });
  let session_id = JSON.parse(sessionStorage.getItem("session-id"));
  if (session_id == null) {
    session_id = 1;
  }

  console.log("session_id", session_id);

  $("#close_modal").click(function() {
    $("#myModal").css("display", "none");
  });
  $("#auto_close_modal").click(function() {
    $("#myModal").css("display", "none");
  });
  // store choice to session on screen 2.1
  $('body[data-title="screen-2-1"] .submit').click(e => {
    e.preventDefault();
    var getAns = $('input[name="answer-ques-key1"]:checked').val(),
      arrayQA = { question: 1, answer: getAns };
    // add array with question: 1 (time fess up), answer: we have 4 answers map each 1,2,3,4 see document.
    sessionStorage.setItem("question-key-1", JSON.stringify(arrayQA));
    window.location.href = $(".submit").attr("href");
  });
  //screen 3.2 - question ID = 2
  $("#btn_3_2_submit").click(function(e) {
    e.preventDefault();
    var getAns2 = $('li.active input[name="answer"]').val(),
      arrayQA2 = { question: 2, answer: getAns2, "condition-quest": true };
    // add array with question: 2 (screen 3.2-Q2), answer: we have 4 answers map each 1,2,3,4 see document.
    sessionStorage.setItem("question-key-2", JSON.stringify(arrayQA2));
    window.location.href = $(this).attr("href");
  });
  //screen 3.3 - question ID = 3
  $("#btn_3_3_submit").click(function(e) {
    e.preventDefault();
    var getAns3 = $("input[name='answer_scr_3']").val(),
      arrayQA3 = { question: 3, answer: getAns3 };
    // add array with question: 3(screen 3.3-Q2), answer: we have 5 answers map each 1,2,3,4,5 see document.
    sessionStorage.setItem("question-key-3", JSON.stringify(arrayQA3));
    window.location.href = $(this).attr("href");
  });
  //screen 3.4 - question ID = 4
  $("#btn_3_4_submit").click(function(e) {
    e.preventDefault();
    var getAns4 = $(".active input[name='answer_scr_3_4']").val(),
      arrayQA4 = { question: 4, answer: getAns4 };
    // add array with question: 4 (screen 3.4-Q2), answer: we have 5 answers map each 1,2,3,4,5 see document.
    sessionStorage.setItem("question-key-4", JSON.stringify(arrayQA4));
    window.location.href = $(this).attr("href");
  });
  //screen 3.5 - question ID = 5
  $("#btn_3_5_submit").click(function(e) {
    e.preventDefault();
    var getAns5 = $(".active input[name='answer_scr_3_5']").val(),
      arrayQA5 = { question: 5, answer: getAns5 };
    // add array with question: 5 (screen 3.5-Q2), answer: we have 5 answers map each 1,2,3,4,5 see document.
    sessionStorage.setItem("question-key-5", JSON.stringify(arrayQA5));
    window.location.href = $(this).attr("href");
  });
  //screen 3.6 - question ID = 6
  $("#btn_3_6_submit").click(function(e) {
    //e.preventDefault();
    var getAns6 = $(".active input[name='answer_scr_3_6']").val(),
      arrayQA6 = { question: 6, answer: getAns6 };
    // add array with question: 6 (screen 3.6-Q2), answer: we have 4 answers map each 1,2,3,4 see document.
    sessionStorage.setItem("question-key-6", JSON.stringify(arrayQA6));

    let quiz = "security",
      data = GetData(session_id, 6, 2, quiz),
      getConlusion = data.conclusion,
      knowledge = data.knowledge;
    sessionStorage.setItem(
      "SessiStoreTextResult",
      JSON.stringify(getConlusion)
    );
    console.log("knowledge", data);
    if (knowledge.toLowerCase() === "knowledgeable") {
      window.location.href = "screen3.7.html";
    } else if (knowledge.toLowerCase() === "ok") {
      window.location.href = "screen3.8.html";
    } else if (knowledge.toLowerCase() === "low") {
      window.location.href = "screen3.9.html";
    } else {
      window.location.href = "screen3.10.html";
    }
  });
  // submit url to http://c10.constructdigital.net/api/c10 to get answer
  //screen 2.2 input url and check sppeed
  $("#btn-submit-url").click(function(e) {
    sessionStorage.setItem("session-id", null);
    let email_add = $("#url_email").val(),
      pleaseWait = $("#loading"),
      getUrl = $("#url_site").val(),
      checkValidUrl = false,
      checkValidEmail = false,
      getArrayQA = JSON.parse(sessionStorage.getItem("question-key-1"));
    // check valid email//
    checkValidEmail = validateEmail(email_add);
    // check whether url contains http(s):// or not
    checkValidUrl = validateUrl(getUrl);
    getUrl = checkProtocol(getUrl);
    if (checkValidUrl == false || checkValidEmail == false) {
      let url = $("#url_site"),
        email = $("#url_email");
      if (checkValidEmail === false) {
        $(url).removeClass("has-error");
        if (email.hasClass("has-error")) {
          email.focus();
        } else {
          $(email).addClass("has-error");
          $(".error").hide();
          $("#form-check-url").append(
            "<span class='error error-email' style='left: 0;'>Invalid email. Please input correct email!</span>"
          );
        }
      } else {
        $(email).removeClass("has-error");
        if (url.hasClass("has-error")) {
          url.focus();
        } else {
          $(url).addClass("has-error");
          $(".error-email").hide();
          $("#form-check-url").append(
            "<span class='error'>Invalid url. Please input correct url!</span>"
          );
        }
      }
    } else {
      pleaseWait.removeClass("hide");
      $(".error").hide();
      sessionStorage.setItem("storageURL", JSON.stringify(getUrl));
      var data_object = {
        quiz: "speed",
        url: getUrl,
        email_captured: email_add,
        quests: [
          {
            question: parseInt(getArrayQA.question, 0),
            answer: parseInt(getArrayQA.answer, 0),
            "condition-quest": true
          }
        ]
      };
      console.log("data_object", data_object);
      $.ajax({
        url: "https://c10.constructdigital.net/api/c10",
        type: "POST",
        crossDomain: true,
        contentType: "application/json",
        headers: {
          "session-id": session_id
        },
        data: JSON.stringify(data_object),
        dataType: "json"
      })
        .done(function(data, textStatus, xhr) {
          console.log("data success", data);
          var speed = data.speed.toLowerCase(),
            session_id = xhr.getResponseHeader("session-id"),
            arrayData = {
              nameQuiz: data.quiz,
              titleQuiz: data.conclusion,
              speed: data.speed
            };
          console.log("arrayData", arrayData);
          console.log("sessionid", session_id);
          sessionStorage.setItem(
            "session-id",
            JSON.stringify(xhr.getResponseHeader("session-id"))
          );

          sessionStorage.setItem(
            "question-key-1-data",
            JSON.stringify(arrayData)
          );

          switch (speed) {
            case "fast":
              window.location.href = "screen2.3.html";
              break;
            case "medium":
              window.location.href = "screen2.4.html";
              break;
            case "slow":
              window.location.href = "screen2.5.html";
              break;
          }
        })
        .fail(err => {
          alert(
            "Sorry Something is broken. Please contact to customer support."
          );
          console.log("err", err);
        });
    }
  });
  //submit event on screen 4.1 Q2 - Question ID = 7 test responsive mobile //
  $("#btn_submit_4_1").click(function(e) {
    e.preventDefault();
    let pleaseWait = $("#loading");
    pleaseWait.removeClass("hide");
    var getAns4_1 = $('.active input[name="mobile-answer"]').val(),
      question_key = 7;

    let getSessionUrl = JSON.parse(sessionStorage.getItem("storageURL"));
    console.log("url", getSessionUrl);
    if (getSessionUrl != null) {
      var data_object = {
        quiz: "mobile",
        url: getSessionUrl,
        quests: [
          {
            question: parseInt(question_key, 0),
            answer: parseInt(getAns4_1, 0),
            "condition-quest": true
          }
        ]
      };
      $.ajax({
        url: "https://c10.constructdigital.net/api/c10",
        type: "POST",
        crossDomain: true,
        contentType: "application/json",
        headers: {
          "session-id": session_id
        },
        data: JSON.stringify(data_object),
        dataType: "json"
      })
        .done(function(data) {
          var speed = data.speed.toLowerCase(),
            titleQuiz = data.conclusion,
            imgName = "",
            classNameImag = "mob-inside-medi";

          switch (speed) {
            case "excellent":
              imgName = "screen-mobile41.png";
              break;
            case "average":
              imgName = "screen-mobile42.png";
              break;
            case "below average":
              imgName = "screen-mobile42.png";
              break;
            case "poor":
              imgName = "screen-mobile43.png";
              classNameImag = "mob-inside-large";
              break;
            case "non-existent optimisations":
              imgName = "screen-mobile44.png";
              classNameImag = "mob-inside-small";
              break;
          }
          var arrayStoreData = {
            titleQuiz: titleQuiz,
            imgName: imgName,
            classNameImag: classNameImag
          };
          sessionStorage.setItem(
            "sesStoreMobile",
            JSON.stringify(arrayStoreData)
          );

          window.location.href = $("#btn_submit_4_1").attr("href");
        })
        .fail(err => {
          console.log("err", err);
        });
    } else {
      $("#myModal").css("display", "block");
    }
  });
  //Q4 - screen 5.0 - question ID = 8
  $("#btn_5_0_submit_emotion").click(function(e) {
    let getEmotions = $(".active input[name='motion-icon']").val();
    sessionStoreData(8, 8, getEmotions, true, false);
    window.location.href = $(this).attr("href");
  });
  //Q4 - screen 5.1 - question ID = 9
  $("#btn_5_1_submit_visit").click(function(e) {
    let getVistor = $(".actived input[name='visit_answer']").val();
    sessionStoreData(9, 9, getVistor, true, false);
    window.location.href = $(this).attr("href");
  });
  //Q4 - screen 5.2 - question ID = 10
  $("#btn_5_2_submit_bounce").click(function(e) {
    let getPercent = $("input[name='get_percent']").val();
    sessionStoreData(10, 10, getPercent, true, false);
    window.location.href = $(this).attr("href");
  });
  //Q4 - screen 5.3 - question ID = 11
  $("#btn_5_3_submit_menu").click(function(e) {
    let getPointMenu = $(".draggable-box .actived input[name='get_menu_drag']"),
      menus = [];
    if ($("input[name='check_no_have']:checked").length == 1) {
      menus = [];
    } else {
      $(getPointMenu).each(function() {
        menus.push(parseInt($(this).val(), 0));
      });
    }

    sessionStoreData(11, 11, menus, true, false);
    window.location.href = $(this).attr("href");
  });
  //Q4 - screen 5.4 - question ID = 12
  $("#btn_5_4_submit_exper").click(function(e) {
    let getExperi = $(".actived input[name='experience-test']").val();
    sessionStoreData(12, 12, getExperi, true, false);
    window.location.href = $(this).attr("href");
  });
  //Q5 - screen 6.0 - question ID = 13
  $("#btn_6_0_submit_emotion").click(function(e) {
    let getEmotions = $(".active input[name='motion-icon']").val();
    sessionStoreData(13, 13, getEmotions, true, false);
    window.location.href = $(this).attr("href");
  });
  //Q6 - screen 7.0 - question Id = 21-23.
  $("#btn_7_0_submit_power").click(function(e) {
    for (var i = 1; i <= 3; i++) {
      let getAnse = $("input[name='option_answer_" + i + "']:checked").val();
      sessionStoreData(20 + i, 20 + i, getAnse, false, false);
      //console.log(sessionStoreData(20 + i, 20 + i, getAnse, false, true));
    }
    e.preventDefault();
    window.top.location.href = $(this).attr("href");
    $("#progress_q", window.parent.document).hide();
  });
  //button sharing facebook
  $("#share_facebook").click(function() {
    let quiz = "final statement",
      data = GetData(session_id, 23, 21, quiz),
      url_image = data["sharing-image"],
      sharing_description = data["sharing-description"],
      url = data["sharing-url"],
      //url = "http://c10.constructdigital.net/front/",
      sharing_title = data["sharing-title"];
    console.log("facebook click url", url);
    shareOverrideOGMeta(url, sharing_title, sharing_description, url_image);
  });

  if (data_title_page === "race-screen") {
    LoadDataSpeed();
  } else if (data_title_page === "mobile-responsive") {
    $(".animate-footer").hide();
    let imageMobileShow = $("#image_mobile"),
      getDataMobile = JSON.parse(sessionStorage.getItem("sesStoreMobile"));
    //console.log("getDataMobile", getDataMobile);
    $("#result_test_4_5").html(getDataMobile.titleQuiz);
    $(imageMobileShow).html(
      "<img class='" +
        getDataMobile.classNameImag +
        "' src='../dist/assets/" +
        getDataMobile.imgName +
        "'/>"
    );
    $("#" + getDataMobile.animalFeeling).show();
  } else if ($("body").data("screen") === "sreen-security") {
    LoadResultSecurity();
  } else if (data_js_page === "result_ux") {
    let quiz = "visibility",
      data = GetData(session_id, 12, 8, quiz),
      getConlusion = data.conclusion,
      point = data.points.toLowerCase(),
      star5 = $("#5_star"),
      star3_5 = $("#3_5_star"),
      star2 = $("#2_star"),
      star1 = $("#1_star"),
      title_Text = "",
      rabbit_feeling = "turtle_crying.svg",
      turtle_feeling = "rabbit_crying.svg";
    switch (point) {
      case "excellent":
        $(star5).prop("checked", true);
        rabbit_feeling = "rabbit_shield.svg";
        turtle_feeling = "turtle_smiling.svg";
        break;
      case "average":
        $(star3_5).prop("checked", true);
        rabbit_feeling = "rabbit_laughing.svg";
        turtle_feeling = "turtle_angry.svg";
        break;
      case "below average":
        $(star2).prop("checked", true);
        rabbit_feeling = "rabbit_surprise.svg";
        turtle_feeling = "turtle_surprise.svg";
        break;
      case "poor":
        $(star1).prop("checked", true);
        rabbit_feeling = "rabbit_angry.svg";
        turtle_feeling = "turtle_angry.svg";
        break;
    }
    //console.log("getConlusion", data);
    $("#load_result_title").html(getConlusion);
    $("#rabbit_feeling").attr("src", "../dist/assets/gif/" + rabbit_feeling);
    $("#turtle_feeling").attr("src", "../dist/assets/gif/" + turtle_feeling);
  } else if ($("body").data("js") === "q5-progressing") {
    //Q5 - from screen 6.1 to screen 6.7 - question ID = 14-20
    $("#btn_6_1_submit_power").click(function(e) {
      $("#loading").removeClass("hide");
      for (var i = 14; i <= 20; i++) {
        let getAnsVal = $("input[name='option_check_" + i + "']:checked").val(),
          questionId_Key = parseInt(
            $("input[name='question_Id_" + i + "']").val(),
            0
          );
        sessionStoreData(
          questionId_Key,
          questionId_Key,
          getAnsVal,
          true,
          false
        );
        if (i === 20) {
          // The end question yes no to get result
          let quiz = "usability",
            data = GetData(session_id, 20, 13, quiz);
          console.log("data 8 -", data);
          if (data != null) {
            let getConlusion = data.conclusion,
              point = data.points.toLowerCase(),
              imgShow = "",
              feeling_staus = "";
            switch (point) {
              case "good":
                imgShow = "strong-web.svg";
                feeling_staus = "good";
                break;
              case "average":
                imgShow = "pleased-web.svg";
                feeling_staus = "average";
                break;
              case "difficult":
                imgShow = "sad-web.svg";
                feeling_staus = "difficult";
                break;
            }
            let arrayStoreData = {
              titleQuiz: getConlusion,
              imgName: imgShow,
              feeling_staus: feeling_staus
            };
            sessionStorage.setItem(
              "sesStoreFeeling",
              JSON.stringify(arrayStoreData)
            );
            window.location.href = $(this).attr("href");
          }
        }
      }
    });
  } else if ($("body").data("js") === "q5-result") {
    $(".animate-footer").hide();

    let boxImageContain = $("#result_feeling_img"),
      getDataQ5 = JSON.parse(sessionStorage.getItem("sesStoreFeeling"));
    console.log("screen 6.8", getDataQ5);
    $("#result_feeling_text").html(getDataQ5.titleQuiz);
    $(boxImageContain).html(
      "<img src='../dist/assets/gif/" + getDataQ5.imgName + "'/>"
    );
    $("#" + getDataQ5.feeling_staus).show();
    $(".flash-bg").css(
      "background-image",
      "url('../dist/assets/" + getDataQ5.feeling_staus + ".png')"
    );
  } else if ($("body").data("js") === "q6-result") {
    //load logo

    $("#logo_transform", window.parent.document).html(
      "<img src='dist/assets/construct.png' alt='construct'>"
    );
    $("#logo_mobile", window.parent.document).removeClass("box-logo-white");
    $("#logo_mobile", window.parent.document).addClass("box-logo-black");

    //Page result Q6 sreen 7.1//
    let quiz = "final statement",
      data = GetData(session_id, 23, 21, quiz);
    $("#content_results").hide();
    if (data != null) {
      console.log("data", data);
      $("#content_results").show();
      $("#result_empty").hide();
      let character_self = data["character-self"].toLowerCase(),
        character_actual = data["character-actual"].toLowerCase(),
        url_image = data["sharing-image"],
        sharing_description = data["sharing-description"],
        url = data["sharing-url"],
        sharing_title = data["sharing-title"],
        img_Name_actual = character_actual,
        img_Name_self = character_self;
      console.log("data", data, "getSessionId");
      $('meta[property="og:image"]', window.parent.document).attr(
        "content",
        url_image
      );
      $("#share_mail").attr(
        "href",
        "mailto:someone@gmail.com?subject=Here are my results for 'how much I hate my website'!&body=Please click to link to view result " +
          url_image +
          ""
      );
      $("#saveSessionId").val(session_id);
      $("#photo_share_mail").html("<img src='" + url_image + "' />");
      $("#mask_name").html(character_self);
      $("#mask_name_actual").html(character_actual);
      $("#img_result_actual").html(
        "<img src='../dist/assets/gif/" + img_Name_actual + ".svg' />"
      );
      $("#img_result_self").html(
        "<img src='../dist/assets/gif/" + img_Name_self + ".svg' />"
      );
      $("#foot-line").html(data.conclusion);
    } else {
      $("#result_empty").show();
      alert(
        "Oops! Seems like you didn't do the quiz yet. Please click the button on the page to do the quiz."
      );
    }
  }
}

function LoadDataSpeed() {
  var getData = JSON.parse(sessionStorage.getItem("question-key-1-data"));
  console.log("data with email", getData);
  $("#title_quiz").html(getData.titleQuiz);
}

function LoadResultSecurity() {
  var getRes = JSON.parse(sessionStorage.getItem("SessiStoreTextResult"));
  $("#text_result_security").html(getRes);
}
function GetData(session_id, indexSession, startIndex, quiz) {
  debugger;
  let arrayData = [],
    dataRes = null;
  for (var i = startIndex; i <= indexSession; i++) {
    arrayData.push(JSON.parse(sessionStorage.getItem("question-key-" + i)));
  }
  console.log(arrayData);
  $.ajax({
    url: "https://c10.constructdigital.net/api/c10",
    type: "POST",
    crossDomain: true,
    async: false,
    contentType: "application/json",
    headers: {
      "session-id": session_id
    },
    data: JSON.stringify({
      quiz: quiz,
      quests: arrayData
    }),
    dataType: "json"
  })
    .done(function(data) {
      dataRes = data;
    })
    .fail(function(err) {
      console.log("fail", err);
    });
  return dataRes;
}
function sessionStoreData(
  questKey,
  questId,
  answer,
  condition_quest,
  isGetData
) {
  if (isGetData != true) {
    //condition_quest = true;
    let arrayQA = {
      question: questId,
      answer: answer,
      "condition-quest": condition_quest
    };
    //console.log(arrayQA);
    sessionStorage.setItem("question-key-" + questKey, JSON.stringify(arrayQA));
  } else {
    let getArrayQA = JSON.parse(
      sessionStorage.getItem("question-key-" + questKey)
    );
    return getArrayQA;
  }
}
function validateUrl(url) {
  // var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  var pattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  if (pattern.test(url)) {
    return true;
  }
  return false;
}
function validateEmail(email) {
  console.log("mail", email);
  var regex = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  if (regex.test(email)) {
    return true;
  }
  return false;
}

/**
 * Check protocol whether or not
 * @param str
 * @returns {string}
 */
function checkProtocol(str = "") {
  if (
    str.substr(0, 8).localeCompare("https://") === 0 ||
    str.substr(0, 7).localeCompare("http://") === 0
  ) {
    return str;
  } else {
    str = "http://" + str;
  }

  return str;
}

function shareOverrideOGMeta(
  overrideLink,
  overrideTitle,
  overrideDescription,
  overrideImage
) {
  FB.ui(
    {
      method: "share_open_graph",
      action_type: "og.likes",
      action_properties: JSON.stringify({
        object: {
          "og:url": overrideLink,
          "og:title": overrideTitle,
          "og:description": overrideDescription,
          "og:image": overrideImage
        }
      })
    },
    function(response) {
      // Action after response
    }
  );
}
//begin show tooltip character talk//.
$(".tooltip-home").hide();
reveal_board();
setInterval(function() {
  reveal_board();
}, 10000);

function reveal_board() {
  clearInterval(10000);
  $(".tooltip-home").each(function(index) {
    (function(that, i) {
      var t = setTimeout(function() {
        $(".tooltip-home").hide();
        $(that).show();
      }, 3000 * (i / 2));
    })(this, index);
  });
}
//end show tooltip character talk//.
