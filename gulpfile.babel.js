'use strict'

import gulp from 'gulp'
import gutil from 'gulp-util'
import sass from 'gulp-sass'
import babel from 'gulp-babel'
import sourcemaps from 'gulp-sourcemaps'
import uglify from 'gulp-uglify'
import rollup from 'rollup-stream'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import connect from 'gulp-connect'
import postcss from 'gulp-postcss'
import gulpStylelint from 'gulp-stylelint'
import eslint from 'gulp-eslint'


/* Set up directories */
const config = {
  paths: {
    src: {
      assets: './src/assets',
      styles: './src/styles',
      scripts: './src/scripts',
      vendors: './src/vendors'
    },
    dist: {
      assets: './dist/assets',
      styles: './dist/styles',
      scripts: './dist/scripts',
      vendors: './dist/vendors'
    }
  },
  localServer: {
    host: '0.0.0.0',
    port: 3000,
    name: 'Automate Gulp'
  }
}

gulp.task('log', () => {
  gutil.log('=== log task ===')
})

gulp.task('connect', function() {
  connect.server({
    host: config.localServer.host,
    port: config.localServer.port,
    name: config.localServer.name,
    livereload: true
  })
  connect.serverClose()
})

/**
 * compile SASS to CSS
 * @return {[type]}   [description]
 */
gulp.task('styles', () => {
  gutil.log('running styles task')
  return gulp.src(config.paths.src.styles + '/main.scss')
    .pipe(gulpStylelint())
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .on('error', gutil.log)
    .pipe(postcss())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(config.paths.dist.styles))
    .pipe(connect.reload())
})

/**
 * compile ES6 to pure Javascript
 * @return {[type]} [description]
 */
gulp.task('scripts', () => {
  gutil.log('running scripts task')

  return rollup({
    input: config.paths.src.scripts + '/main.js',
    format: 'es'
  })
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(eslint())
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(config.paths.dist.scripts))
    .pipe(connect.reload())
})

/**
 * Copy assets
 * @return {[type]} [description]
 */
gulp.task('assets', () => {
  return gulp.src(config.paths.src.assets + '/**/*')
    .pipe(gulp.dest(config.paths.dist.assets))
})

/**
 * Copy vendors
 * @return {[type]} [description]
 */
gulp.task('vendors', () => {
  return gulp.src(config.paths.src.vendors + '/**/*')
    .pipe(gulp.dest(config.paths.dist.vendors))
})

/**
 * Watch files changes
 */
gulp.task('watch', () => {
  gulp.watch(config.paths.src.styles + '/**/*', ['styles'])
  gulp.watch(config.paths.src.scripts + '/**/*', ['scripts'])
})

gulp.task('default', ['connect', 'scripts', 'styles', 'assets', 'vendors', 'watch'])
gulp.task('build', ['scripts', 'styles', 'assets', 'vendors'])