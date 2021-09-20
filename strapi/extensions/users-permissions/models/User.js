module.exports = {
  lifecycles: {
    afterFind(results, params, populate) {
      results.forEach(result => {
        result.avatar && (result.avatar.url = 'http://localhost:1337' + result.avatar.url)
      })
    },
    afterFindOne(result, params, populate) {
      // protocol and domain added to avatar url to create absolute url
      result.avatar && (result.avatar.url = 'http://localhost:1337' + result.avatar.url)
    }
  }
}
