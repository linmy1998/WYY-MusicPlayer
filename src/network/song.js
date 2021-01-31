import { request } from './request'

export function _getSongUrl(id){
    return request({
        url: '/song/url',
        params: {
          id
        }
      })
}