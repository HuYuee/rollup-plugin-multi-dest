
var deepmerge = require('deepmerge')
var rollup = require('rollup')

function multidest (extensions) {
    if (!Array.isArray(extensions)) {
        extensions = [extensions]
    }
    var parent
    var halt
    return {
        name: 'multidest',
        options: function (options) {
            if (halt) {
                return
            }
            parent = options
        },
        ongenerate: function () {
            if (halt) {
                return
            }
            halt = true
            extensions.forEach(function (extension) {
                var child = deepmerge(parent, extension)
                rollup.rollup(child)
                    .then(function (bundle) {
                        return bundle.write(child)
                    })
                    .catch(function (error) {
                        console.error(error.message)
                    })
            })
        }
    }
}

module.exports = multidest
