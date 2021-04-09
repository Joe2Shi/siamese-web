import http from './http'

// get
export function getListAPI (url, params) {
  return http.get(url, params)
}

// post
export function postAPI (url, params, headers) {
  return http.post(url, params, headers)
}

// put
export function putAPI (url, params, headers) {
  return http.put(url, params, headers)
}

// delete
export function deleteListAPI (url, params) {
  return http.delete(url, params)
}
