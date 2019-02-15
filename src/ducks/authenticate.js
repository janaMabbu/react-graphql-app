

export const getOauthToken = (code) => {
    const proxyurl = "https://cors-anywhere.herokuapp.com/"
      const gitURL = 'https://github.com/login/oauth/access_token?client_id=13f8dbc254ebd4fc3311&client_secret=ffaab5c8962c44dc142be4ea6de99b26bd1ff819&code='
      + code
    // i know this is unsafe using proxyurl, but thsas the easy way to fix the cors error.
    return fetch(proxyurl + gitURL, {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin':'*',
      'Accept': 'application/json'
    }
  })
}
