import storage from './storage'
import {STORAGE_KEY} from "./constants";
import ojAPI from '../views/oj/api'
function getLanguages() {
  return new Promise((resolve, reject) => {
    let languages = storage.get(STORAGE_KEY.LANGUAGES)
    if(languages) {
      resolve(languages)
    }
    ojAPI.base.getLanguages().then(res => {
      // console.log(res.data)
      let languages = res.data
      storage.set(STORAGE_KEY.LANGUAGES, languages)
      resolve(languages)
    }, err => {
      reject(err)
    })
  })
}
export default {
  getLanguages: getLanguages
}
