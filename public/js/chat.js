let inputEle=document.getElementsByClassName('chat-input')[0]

inputEle.onkeypress=function(e){
  var key=e.which
     //回车键为13
  if(key==13){
    let value=inputEle.value
    if(value){
      $.ajax({
        type:'post',
        url:'http://localhost:3000/chat/addContent',
        data:{
          content:value
        },
        success:()=>{
            
        }
      })
    }
    // sendMessage()
  }
}