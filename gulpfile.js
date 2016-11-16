const gulp = require('gulp');
const eslint = require('gulp-eslint');
const del = require('del');
const PolymerProject = require('polymer-build').PolymerProject;
const rename = require('gulp-rename');

let argv = require('yargs').argv;

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

gulp.task('new-level', function() {
  let level = argv.level;
  if (level < 10) {
    level = '0' + level;
  }

  if (!level) {
    console.error('请输入levle');
  }

  return gulp.src(['tasks/*'])
    .pipe(rename(path => {
      path.basename = path.basename.replace('xx', level);
    }))
    .pipe(gulp.dest('levels/level' + level));
});

// 检查全部代码
gulp.task('lint', ['lint-components', 'lint-tests'], function() {});

// 清除文件
gulp.task('clean', function() {
  return del.sync(['build'], {
    force: true
  });
});

let polymerConfig = {
  entrypoint: 'index.html',
  shell: 'src/pl-app.html',
  sources: [
    'src/**/*',
    'levels/**/*',
    'bower.json',
    'blank.html'
  ],
  extraDependencies: [
    'bower_components/webcomponentsjs/webcomponents-lite.min.js',
    'bower_components/font-roboto/**/*',
    'bower_components/ace-builds/**/*',
    'bower_components/mocha/mocha.js',
    'bower_components/mocha/mocha.css',
    'bower_components/chai/chai.js',
    'bower_components/emoji-rain/emoji-rain.html'
  ]
};

let project = new PolymerProject(polymerConfig);
const mergeStream = require('merge-stream');
gulp.task('build', ['clean'], function(cb) {
  let polymerStuff = mergeStream(project.sources(), project.dependencies())
    .pipe(project.analyzer);

  const forkStream = require('polymer-build').forkStream;

  forkStream(polymerStuff).pipe(gulp.dest('build/unbundled'));

  return forkStream(polymerStuff)
    .pipe(project.bundler)
    .pipe(gulp.dest('build/bundled'));
});
