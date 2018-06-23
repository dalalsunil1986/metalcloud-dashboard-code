// @flow
import apisauce from 'apisauce'

import {keywords} from '../Config/MetalKeyWords'

const tracks = (baseURL: string = `http://api.soundcloud.com/tracks?linked_partitioning=1&client_id=${process.env.APP_DATA}&`) => {
  const api = apisauce.create({
    baseURL
  })

  return {
    getTrackList (genre: string, band: string, offset: number, limit: number) {
      return api.get(`limit=${limit}&offset=${offset}&q=${band}&tags=${keywords[genre]}`)
    }
  }
}

export default {
  tracks
}
