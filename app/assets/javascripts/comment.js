$(function(){

  function buildHTML(message){
    var image_url = (message.image)? `<image class="lower-message_image" src="${message.image}">`:"";
    var html = `<div class="message" data-id=${message.id}>
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.updated_at_date}
                    </div>
                  </div>
                  <div class="lower-meesage">
                    <div class="lower-message__content">
                      ${message.content}
                    </div>
                    ${image_url}
                  </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    var href = window.location.href
    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
      // success: function(res){
      //   console.debug(res[0]);
      // },
      // error:function(){console.log('Miss..');}
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $("#new_message")[0].reset();
      $('.form__submit').prop('disabled', false);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight},'fast');
    })
    .fail(function () {
      // console.log("XMLHttpRequest : " + XMLHttpRequest.status);
      // console.log("textStatus     : " + textStatus);
      // console.log("errorThrown    : " + errorThrown.message);
    });
  })
    var reloadMessages = setInterval(function() {
        if (window.location.href.match(/\/groups\/\d+\/messages/)){
        var last_message_id = $('.message').last().data('id')
        var href =  'api/messages'
        // debugger
        $.ajax({
          url: href,
          type: 'GET',
          dataType: 'json',
          data: {id: last_message_id}
        })
        .done(function (messages) {
          messages.forEach(function (message) {
            var insertHTML = buildHTML(message);
            $('.messages').append(insertHTML);
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
          })          
        })
        .fail(function () {
          alert('自動更新に失敗しました');
        })
      } else {
        clearInterval(reloadMessages);
      }
    } , 5000);
});

        // var last_message = $(".messages .message:last-child");
        // var last_message_id = (typeof $(".messages .message:last-child").get(0) == "undefined" ) ? 0 : last_message.data("id");
        // last_message_id = $(".messages .message:last-child").data('id')
        // .always(function(){
        //   $(".form__submit").removeAttr("disabled");
        // setInterval(reloadMessages, 5000);
