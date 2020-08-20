
const {getRandomAvatar}=require('../common/utils')
const services=require('../services/chat')

/*
* login页面
*/
async function login(ctx,next) {
  await ctx.render('login') 
}

/*
 *login检测
 */
async function chatLogin(ctx,next){

  const { nickName }=ctx.request.body

  const avatar=getRandomAvatar() 
  /*设置cookie时间为一天 */
  ctx.cookies.set('user',
  JSON.stringify({nickName,avatar}),{maxAge:2*60*60*1000})

  if(nickName){
    // await ctx.redirect('/chat')
    ctx.response.body={status:'success'}
  }
}
/*
* chat页面
*/

async function chat(ctx,next){
  let user= ctx.cookies.get('user')
  // 如果不存在user，则跳转到login页面
  // 存在就渲染chat页面
  if(user){

    user=JSON.parse(user)
    if(user.nickName){
// 获取以往聊天信息
      const contents=await services.getContent()

      ctx.state={
        nickName:user.nickName,
        contents
      }

      // 模板引擎渲染
      await ctx.render('chat',ctx.state)
      //把nickName传上去
    }else{
      ctx.redirect('/')
    }
  }else{
    ctx.redirect('/')
  }
}
/*
*聊天输入
*/
async function addContent(ctx,next){

  const {content}=ctx.request.body

  // 从cookie获取user信息
  let user=ctx.cookies.get('user')

  if(user){
    const { nickName,avatar }=JSON.parse(user)

    // 从cookies获取登录时保存的用户名和头像
    await services.addContent({nickName,avatar,content})

    // 获取最新聊天记录
    const contents=await services.getContent()

    data={ status:'success',contents}

  }
  ctx.response.body=data
}

async function getContent(ctx,next){
  const contents=await services.getContent()

  ctx.response.body={
    contents
  }
}


module.exports={
  login,
  chatLogin,
  chat,
  addContent,
  getContent
}