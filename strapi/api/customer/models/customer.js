'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

const url = strapi.config.get('server.url', 'http://localhost:1337')

module.exports = {
  lifecycles: {
    afterFind(results, params, populate) {
      results.forEach(result => {
        // protocol and domain added to avatar url to create absolute url
        result.avatar && (result.avatar.url = url + result.avatar.url)
      })
    },
    afterSearch(results, params, populate) {
      results.forEach(result => {
        // protocol and domain added to avatar url to create absolute url
        result.avatar && (result.avatar.url = url + result.avatar.url)
      })
    },
    afterFindOne(result, params, populate) {
      // protocol and domain added to avatar url to create absolute url
      result.avatar && (result.avatar.url = url + result.avatar.url)
    }
  }
};
