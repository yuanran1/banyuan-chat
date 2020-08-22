// 随即头像

const _ = require('lodash')
const moment=require('moment')


function getRandomAvatar(){
  const avatar=[
    'https://wx1.sbimg.cn/2020/08/19/3vh7Y.jpg',
    'https://wx2.sbimg.cn/2020/08/19/3vgA4.jpg',
    'https://wx2.sbimg.cn/2020/08/19/3vcfd.jpg',
    'https://wx2.sbimg.cn/2020/08/19/3WP2I.jpg',
    'https://wx1.sbimg.cn/2020/08/19/3WClR.jpg',
    'https://wx1.sbimg.cn/2020/08/19/3W2ta.jpg',
    'https://wx1.sbimg.cn/2020/08/19/3W09M.jpg',
    'https://wx1.sbimg.cn/2020/08/19/3WpVh.jpg',
    'https://wx1.sbimg.cn/2020/08/19/3WmWn.jpg'
  ]
  let index=_.random(0,4)
  return avatar[index]
}
/**
 * 格式化时间
 */
function formatTime(time){
  // return moment(time).format('YYYY-MM-Do aH:mm:ss')
  return moment(time).locale('zh_cn').format('YYYY-MM-Do aHH:mm:ss')
}

module.exports={
  getRandomAvatar,
  formatTime
}