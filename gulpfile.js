const gulp = require('gulp');
const eslint = require('gulp-eslint');
const del = require('del');
const PolymerProject = require('polymer-build').PolymerProject;

// 检查组件代码
gulp.task('lint-components', function() {
  return gulp.src([
    './src/**/*.html',
    '!./src/**/*.test.html'
  ])
    .pipe(eslint({
      extends: 'google',
      plugins: ['html'],
      rules: {
        'new-cap': 0
      },
      envs: [
        'browser'
      ],
      parserOptions: {
        ecmaVersion: 6
      }
    }))
    .pipe(eslint.format());
});

// 检查组件的测试代码
gulp.task('lint-tests', function() {
  return gulp.src([
    './src/**/*.test.html'
  ])
    .pipe(eslint({
      extends: 'google',
      plugins: ['html'],
      rules: {
        'new-cap': 0
      },
      env: {
        browser: true,
        mocha: true
      },
      globals: [
        'Polymer',
        'assert',
        'fixture'
      ],
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
      }
    }))
    .pipe(eslint.format());
});

// 检查全部代码
gulp.task('lint', ['lint-components', 'lint-tests'], function() {});

// 清除文件
gulp.task('clean', function() {
  return del.sync(['build'], {
    force: true
  });
});

const project = new PolymerProject(require('./polymer.json'));
const mergeStream = require('merge-stream');
gulp.task('build', ['clean'], function() {
  let polymerStuff = mergeStream(project.sources(), project.dependencies())
    .pipe(project.analyzer)
    .pipe(project.bundler);

  let aceFiles = [
    './bower_components/ace-builds/src-min/mode-html.js',
    './bower_components/ace-builds/src-min/worker-html.js'
  ];

  return mergeStream(polymerStuff, gulp.src(aceFiles))
    .pipe(gulp.dest('build/'));
});
