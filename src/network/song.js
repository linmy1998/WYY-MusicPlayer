import { request } from './request'

export function _getSongUrl(id){
    return request({
        url: '/song/url',
        params: {
          id
        }
      })
}

// 获取歌词信息
export function _getLyric (id) {
  return request({
    url: '/lyric',
    params: {
      id
    }
  })
}

// 获取歌曲评论
export function _getSongComment (obj) {
  return request({
    url: '/comment/music',
    params: {
      ...obj
    }
  })
}

// 发送评论
export function _SendComments (obj) {
  return request({
    url: '/comment',
    params: {
      ...obj
    }
  })
}