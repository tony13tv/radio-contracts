const path = require('path');

module.exports = {
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    webpack: function (config, options) {
        config.experiments = {
            topLevelAwait: true
        }
        return config
    }
}
