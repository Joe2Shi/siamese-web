function toLine (name) {
  name = name.replace(/Format/g, '')
  return name.replace(/([A-Z])/g, '_$1').toLowerCase()
}

function toHump (name) {
  return name.replace(/_(\w)/g, function (all, letter) {
    return letter.toUpperCase()
  })
}

function handlerParam (array, key) {
  const params = []
  array.forEach(item => {
    params.push(item[key])
  })
  return params.join(',')
}

function objectToFormData (object) {
  const formData = new FormData()
  Object.keys(object).forEach(key => {
    formData.append(key, object[key])
  })
  return formData
}

export default {
  toLine,
  toHump,
  handlerParam,
  objectToFormData
}
