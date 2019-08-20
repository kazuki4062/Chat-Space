$(function(){

  function buildHTML(message){
    // var image_url = (comment.image)? `<image class="lower-message_image" src="${comment.image}">`:"";
    var html = `<div class="upper-message">
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
                </li>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    console.log(e)
    e.preventDefault()
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
      success: function(res){
        console.debug(res[0]);
      },
      error:function(){console.log('Miss..');}
    })
    .done(function(data){
      console.log(data)
      var html = buildHTML(data);
      $('.messages').append(html);
      $("#new_message")[0].reset();
      $('.form__submit').prop('disabled', false);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function () {
      // console.log("XMLHttpRequest : " + XMLHttpRequest.status);
      // console.log("textStatus     : " + textStatus);
      // console.log("errorThrown    : " + errorThrown.message);
    });
  })
})