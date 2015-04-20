var gulp = require("gulp");
var uglify = require("gulp-uglify");
var minifyHTML = require("gulp-minify-html");
var rename = require("gulp-rename");



gulp.task('js', function(){
	return gulp.src('dev/*.js')
		.pipe(uglify())
		.pipe(rename({extname: ".min.js"}))
		.pipe(gulp.dest('./'));
});

gulp.task('html', function(){
	var opts = {
		empty: true,
		conditionals: true,
		quotes: true};

	return gulp.src('dev/*.html')
		.pipe(minifyHTML(opts))
		.pipe(gulp.dest('./'));
});
