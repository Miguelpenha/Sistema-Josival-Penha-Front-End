const withImages = require('next-images')
const nextEnv = require('next-env')
const dotenvLoad = require('dotenv-load')

dotenvLoad()

const withNextEnv = nextEnv()

module.exports = withNextEnv({
    withImages: withImages({
        esModule: true
    })
})