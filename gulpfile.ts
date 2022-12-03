const { src, dest, task, parallel, series, watch } = require('gulp')
const path = require('path')

const jeditor = require('gulp-json-editor')
const ts = require('gulp-typescript')
const del = require('delete')

const tsProject = ts.createProject('tsconfig.json', {
  declaration: true,
})

const destPath = 'miniprogram/node_modules/wechat-validate'

function copy() {
  return src(['src/**/*.d.ts', 'README.md']).pipe(dest(destPath))
}

function json() {
  return src('package.json')
    .pipe(
      jeditor((json: any) => {
        // json.name = 'wechat-validate'
        json.scripts.prepare = undefined
        json.config = undefined
        json.devDependencies = {
          '@types/wechat-miniprogram': '^3.4.1',
        }
        json.peerDependencies = undefined
        return json
      })
    )
    .pipe(dest(destPath))
}

function compile() {
  return src(['src/**/*.ts']).pipe(tsProject()).pipe(dest(destPath))
}

function clean(cb: any) {
  del([destPath], cb)
}

task('dev', () => {
  watch(
    'src/**/*.ts',
    { events: 'all' },
    series(clean, parallel(compile, copy, json))
  )
})

task('build', () => {
  return src(path.join(destPath, '**/*')).pipe(dest('package'))
})
