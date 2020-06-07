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
  'CHANGE_USER':null,
  'CHANGE_MODAL_STATUS':null,
  'UPDATE_WEBSITE_CONF': null
})
