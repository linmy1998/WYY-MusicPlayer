import {request} from './request.js'
import {formatDate} from '../static/js/tool'
export function _getBanner(){
    return request({
        url:'/banner'
    })
}

export function _getRecommendedSongList (limit){
    return request({
        url:'/personalized',
        params: {
            limit
        }
    })
}

export function _getExclusiveBroadcastList(limit){
    return request({
        url: '/personalized/privatecontent/list',
    params: {
      limit
    }
    })
}

export function _getPersonalizedNewsong(){
    return request({
        url: '/personalized/newsong'
    })
}
export function _getSongsDetail(id){
    return request({
        url:'/song/detail',
        params: {
            ids: id
          }
    })
}
export class songDetail {
    constructor(songs) {
      this.id = songs[0].id;
      this.name = songs[0].name;
      this.album = songs[0].al.name;
      this.song = songs[0].ar[0].name;
      this.pic = songs[0].al.picUrl;
      this.time = formatDate(new Date(songs[0].dt), 'mm:ss')
    }
  }

  // 热门歌单分类
export function _getHotPlaylist () {
    return request({
      url: '/playlist/hot'
    })
  }

  export function _getTopHighquality (obj) {
    return request({
      url:'/top/playlist/highquality', 
      params: {
        ...obj
      }
    })
  }

  export function _getTopListDetail(){
      return request({
          url:'/toplist/detail'
      })
  }

  // 获取歌单详情信息
export function _getMusicListDetail (id) {
    return request({
        url:'/playlist/detail',
        params:{
            id
        }
    })
  }

  export function _getArtistlist (obj) {
      return request({
          url:'/artist/list',
          params:{
              ...obj
          }
      })
  }

  /**最新歌曲 */
export function _getTopSongs (type) {
    return request({
      url: '/top/song',
      params: {
        type: type
      }
    })
  }