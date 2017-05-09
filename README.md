# rollup-plugin-multi-dest

Enables multiple destination within a single rollup configuration.

```
npm install rollup-plugin-multi-dest -D
```

No more `rollup.config.es.js`, `rollup.config.umd.js` and `rollup -c rollup.config.es.js && rollup -c rollup.config.umd.js`!

## Example

```javascript
// rollup.config.js
import multidest from 'rollup-plugin-multi-dest'
import nodeResolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'

export default {
    // targets "module" in package.json
    entry: 'src/app.coffee',
    dest: 'dist/app.es.js',
    format: 'es',
    plugins: [
        nodeResolve(),
        multidest([
            // targets "main" in package.json
            {
                dest: 'dist/app.cjs.js',
                format: 'cjs'
            },
            // targets browsers
            {
                dest: 'dist/app.min.js',
                format: 'iife',
                plugins: [
                    uglify()
                ]
            }
        ])
    ]
}
```

Enjoy!
