var gulp = require("gulp");
var cssnano = require("gulp-cssnano");
var concat = require("gulp-concat");
var order = require("gulp-order");
var del = require("del");

// gulp.task("clean", function () {
//     return del(["public/styles/group.min.css", "public/styles/group.css"]);
// });

// gulp.task("css_merge", function () {
//     return gulp
//         .src("public/styles/*.css")
//         .pipe(order(["lance_link.css"]))
//         .pipe(concat("group.css"))
//         .pipe(gulp.dest("public/styles"));
// });

gulp.task(
    "minifyCSS",
    gulp.series(function () {
        return gulp
            .src("public/styles/group.css")
            .pipe(concat("group.min.css"))
            .pipe(cssnano())
            .pipe(gulp.dest("public/styles"));
    }),
);

gulp.task("default", gulp.parallel("minifyCSS"));
