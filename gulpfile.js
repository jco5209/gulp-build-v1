'use-strict';

const gulp = require('gulp');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const eslint = require('gulp-eslint');
const del = require('del');
const connect = require('gulp-connect');

// Linting tool for JS files
gulp.task('lint', () => {
  return gulp.src('js/circle/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
})


// Clean distribution folder
gulp.task('clean', () => {
  del('dist/*').then(paths => {
      console.log('Deleted files and folders:\n', paths.join('\n'));
  });
});


// Concat JS files - minify JS files - create sourcemap
gulp.task('scripts', () => {
  return gulp.src('js/circle/*.js')
    .pipe(sourcemaps.init())
      .pipe(concat('all.min.js'))
      .pipe(gulp.dest('dist/scripts'))
      .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/scripts'))
});


// Compile sass to css - minify css
gulp.task('styles', () => {
	return gulp.src('./sass/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(cleanCSS())
    .pipe(rename('all.min.css'))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('dist/styles'))
});


// Optimize images
gulp.task('imageOpt', () =>
    gulp.src('images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/content'))
);

// Gulp serve
gulp.task('serve', ['watch'], () => {
  connect.server({
    port: 3000,
    livereload: true
  });
});

// Gulp watch
gulp.task('watch', ['build'], () => {
	gulp.watch('./js/circle/*.js', ['js'])
});

// js
gulp.task('js', () => {
	gulp.src('./js/circle/*.js')
		.pipe(connect.reload());
})




gulp.task('build', ['lint', 'clean', 'scripts', 'styles', 'imageOpt']);

gulp.task('default', ['build']);
