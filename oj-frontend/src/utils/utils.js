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
      let languages = res.data.data
      storage.set(STORAGE_KEY.LANGUAGES, languages)
      resolve(languages)
    }, err => {
      reject(err)
    })
  })
}
// 去掉值为空的项，返回object
function filterEmptyValue (object) {
  let query = {}
  Object.keys(object).forEach(key => {
    if (object[key] || object[key] === 0 || object[key] === false) {
      query[key] = object[key]
    }
  })
  return query
}
export default {
  getLanguages: getLanguages,
  filterEmptyValue: filterEmptyValue
}
