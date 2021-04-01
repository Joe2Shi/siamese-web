function toLine (name) {
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

export default {
  toLine,
  toHump,
  handlerParam
}
