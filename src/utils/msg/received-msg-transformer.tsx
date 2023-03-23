const xssMap = {
  '&': '&amp;',
  '"': '&quot;',
  '<': '&lt;',
  '>': '&gt;',
  ' ': '&nbsp;',
  '\t': '&emsp;',
}

type XSSString = keyof typeof xssMap

function filterXss(str: string) {
  str = str.replace(/[&"<>\t ]/g, (s) => {
    return xssMap[s as XSSString]
  })
  str = str.replace(/\r\n/g, '<br>').replace(/\r/g, '<br>').replace(/\n/g, '<br>')
  return str
}

function transformImg(msg: string) {
  return msg.replaceAll(/\[CQ:image,file=([^\]]+?),url=([^\]]+?)\]/g, (_match, _$1, $2) => {
    return `<img src=${$2} referrerPolicy="no-referrer" alt='图片' width='200px' />`
  })
}

function transformAt(msg: string) {
  return msg.replaceAll(/\[CQ:at,qq=([^\]]+)\]/g, (_m, $1) => {
    return ` @${$1} `
  })
}

function transformReply(msg: string) {
  return msg.replace(/\[CQ:reply,id=([^\]]+)\]/g, (_m, _$1) => {
    return '[回复]'
  })
}

function transformReceived(msg: string) {
  return [
    filterXss,
    transformReply,
    transformAt,
    transformImg,
  ].reduce((acc, fn) => fn(acc), msg)
}

export {
  transformImg,
  transformAt,
  transformReceived,
}
