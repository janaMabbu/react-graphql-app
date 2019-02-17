export const getOauthToken = (id,secret,code) => {

  // i know this is unsafe using proxyurl, but this is  the easy way to fix the cors error.
  const proxyurl = "https://cors-anywhere.herokuapp.com/"

  const gitURL = `https://github.com/login/oauth/access_token?client_id=${id}&client_secret=${secret}&code=${code}`

  return fetch(proxyurl + gitURL, {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json'
    }
  })
}

// export const logOut = () => {
// const proxyurl = "https://cors-anywhere.herokuapp.com/"
//   fetch(proxyurl + 'https://github.com/logout', {
//     method: 'POST',
//     headers: {'Access-Control-Allow-Headers': 'X-Requested-With'
//     },
//     xhrFields: {
//              withCredentials: true
//     }
//   })
// }