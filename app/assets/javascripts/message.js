$(function(){ 

  function buildHTML(message){
   if ( message.image ) {
     var html =
      `
      <div class="main_chat__box__content__message1" data-message-id=${message.id}>
      <div class="main_chat__box__content__message1__name1">
      ${message.user_name}
      </div>
      <div class="main_chat__box__content__message1__date1">
      ${message.created_at}
      </div>
      </div>
      <div class="main_chat__box__content__comment1">
      ${message.content}
      </div>
         <img src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
      `
      <div class="main_chat__box__content__message1" data-message-id=${message.id}>
      <div class="main_chat__box__content__message1__name1">
      ${message.user_name}
      </div>
      <div class="main_chat__box__content__message1__date1">
      ${message.created_at}
      </div>
      </div>
      <div class="main_chat__box__content__comment1">
      ${message.content}
      </div>
      </div>`
     return html;
   };
 }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main_chat__box__content').append(html);  
      $('.main_chat__box__content').animate({ scrollTop: $('.main_chat__box__content')[0].scrollHeight});
      $('form')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
    .always(function(){
      $('.main_chat__box__footer__send').prop('disabled', false)
    });
  })

  var reloadMessages = function() {
    last_message_id = $('.main_chat__box__content__message1:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
       //追加するHTMLの入れ物を作る
       var insertHTML = '';
       //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
       $.each(messages, function(i, message) {
         insertHTML += buildHTML(message)
       });
       //メッセージが入ったHTMLに、入れ物ごと追加
       $('.main_chat__box__content').append(insertHTML);
       $('.main_chat__box__content').animate({ scrollTop: $('.main_chat__box__content')[0].scrollHeight});
              

     }
    })
    .fail(function() {
      alert('自動更新に失敗しました')
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
  setInterval(reloadMessages, 7000);
  }
});