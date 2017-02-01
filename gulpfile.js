'use-strict';

const gulp = require('gulp');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const del = require('del');


gulp.task('clean', () => {
  del('dist/*').then(paths => {
      console.log('Deleted files and folders:\n', paths.join('\n'));
  });
});


gulp.task('scripts', () => {
  return gulp.src('js/circle/*.js')
    .pipe(sourcemaps.init())
      .pipe(concat('all.min.js'))
      .pipe(gulp.dest('dist/scripts'))
      .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/scripts'));
});


gulp.task('styles', () => {
	return gulp.src('./sass/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(cleanCSS())
    .pipe(rename('all.min.css'))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('dist/styles'))
});

gulp.task('imageOpt', () =>
    gulp.src('images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/content'))
);

gulp.task('build', ['clean', 'scripts', 'styles', 'imageOpt']);

gulp.task('default', ['build']);