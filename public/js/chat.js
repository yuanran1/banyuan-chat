let inputEle = document.getElementsByClassName('chat-input')[0]
let timer
let originDate

stopTimer()
longPolling()
scrollToBottom()

/* 当input按回车，发送信息 */
inputEle.onkeydown = function (e) {
  var key = e.which
  // console.log(key)
  if (key == 13) {
    let value = inputEle.value
    if (value) {
      $.ajax({
        type: 'post',
        url: 'http://localhost:3000/chat/addContent',
        data: {
          content: value
        },
        success: (result) => {
          if (result.status === 'success') {

            renderChat(result.contents)
            inputEle.value = ''
            scrollToBottom()
          }
        },
      })
    }
  }
}

/* 重新渲染  */
function renderChat(contents) {
  let html = ''
  contents.forEach((item) => {
    html += '<div class=\'chat-content-container\'>' +
      '<div class=\'chat-detail clearFix\'>' +
      '<div class=\'chat-detail-left\'>' +
      `<img src='${item.avatar}' class=\'chat-avatar\'/>` +
      `<div class='chat-name'>${item.nickName}</div>` +
      ' </div>' +
      `<div class='chat-detail-right'>${item.content}` +
      '</div></div>' +
      `<div class='chat-time'>${moment(item.createdAt).locale('zh_cn').format('YYYY-MM-Do aHH:mm:ss')}</div>` +
      '</div>'
  })
  //清空
  $('.chat-content').html('')
  //重新渲染
  $('.chat-content').html(html)
  let originDate=contents
}


function scrollToBottom() {
  let ele = document.getElementsByClassName('chat-content')[0]
  ele.scrollTop = ele.scrollHeight

}


/* 长轮询 */
function longPolling() {
  timer=setInterval(() => {
    $.ajax({
      type: 'get',
      url: 'http://localhost:3000/chat/getContent',
      data: {},
      success: (result ) => {
        renderChat(result.contents)

      }
    })
  }, 2000)
}

function stopTimer(){
  if(timer){
    clearInterval(timer )
  }
}