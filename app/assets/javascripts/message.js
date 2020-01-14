$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="main_chat__box__content">
      <div class="main_chat__box__content__message1">
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
      `<div class="main_chat__box__content">
      <div class="main_chat__box__content__message1">
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
    $('.main_chat__box__footer__send').prop('disabled', false)
  })
  .fail(function() {
    alert("メッセージ送信に失敗しました");
});
})
});