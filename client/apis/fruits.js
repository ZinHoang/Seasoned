import request from 'superagent'

const rootUrl = '/api/v1'

export function getFruits() {
  return request.get(rootUrl + '/recipes').then((res) => {
    return res.body.fruits
  })
}
