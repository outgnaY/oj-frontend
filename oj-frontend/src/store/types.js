function keyMapping(obj) {
  if(obj instanceof Object) {
    let _obj = Object.assign({}, obj)
    let _keyArray = Object.keys(obj)
    _keyArray.forEach(key => {
      _obj[key] = key
    })
    return _obj
  }
}

export default keyMapping({
  'UPDATE_WEBSITE_CONF': null
})
