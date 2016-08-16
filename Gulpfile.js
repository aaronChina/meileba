/**
 * @美乐吧自动化工程
 * @time : 2016年7月14日15:10:31
 * @author : aaron
 * */

'use strict';
const gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    minifCss = require('gulp-minify-css'),
    uglify = require('gulp-uglify');

const devDir = 'app/',
    destDir = 'dist/';


/**
 * @编译合并压缩 sass文件
 * */
gulp.task('sass' , function () {
    return gulp.src( [ devDir + 'css/**/*.sass' ]  )
        .pipe( sass().on('error', sass.logError) )
        .pipe( concat('app.css') )
        .pipe( minifCss() )
        .pipe(gulp.dest(destDir + './css'))
});
/**
 * @压缩合并js文件
 * */
gulp.task('js' , function () {
    return gulp.src( [ devDir + 'js/**/*.js' ] )
        .pipe( concat('app.js') )
        .pipe( uglify() )
        .pipe( gulp.dest(destDir + './js') );
});
/**
 * @编译jade模板
 * */
gulp.task('jade' , function () {
    return gulp.src( [ devDir + 'html/**/*.jade' ]  )
        .pipe( jade({
            pretty: true
        }) )
        .pipe( gulp.dest(destDir + './html') );
});
gulp.task('default' , ['sass' , 'js'] , function () {
    gulp.watch([ devDir + 'css/**/*.sass' ] ,  ['sass'] );
    gulp.watch([ devDir + 'js/**/*.js' ] ,  ['js'] );
    gulp.watch([ devDir + 'html/**/*.jade' ] ,  ['jade'] );
});

