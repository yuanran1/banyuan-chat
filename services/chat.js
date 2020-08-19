// 插入聊天内容
const {insertOne,find}=require('../models/chat')

const moment=require('moment')


async function addContent(data){

  await insertOne(data)
}
/*
*获取聊天信息
*/
async function getContent(){
  return await find({
    createdAt:{
      $gt:moment().subtract(1,'day').toDate(),
      $lt:moment().toDate()
    }
  })
}

module.exports={
  addContent,
  getContent
}