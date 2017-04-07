var gulp = require('gulp'),
    karma = require('karma').Server,
    plugins = require('gulp-load-plugins')({
        DEBUG: true,
        pattern: ['gulp-*', 'gulp.*'],
        replaceString: /\bgulp[\-.]/
    }),
    webserver = require('gulp-webserver');

var dest = '/src/vendor/';

gulp.task('run_server', function () {
    var stream = gulp.src('src')
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            open: true
        }));
});

/*
 gulp.task('uglify', function () {
 var logicFiles = ['src/logic', 'src/logic/record'];
 gulp.src(plugins.mainBowerFiles())
 .pipe(debug())
 .pipe(logicFiles)
 .pipe(plugins.filter('*.js'))
 .pipe(plugins.concat('main.js'))
 .pipe(plugins.uglify())
 .pipe(gulp.dest(dest));

 });
 */
gulp.task('unit-test', function(done){
    new karma({
        configFile: __dirname + '/src/tests/karma.conf.js'
        //singleRun: false
    }, function(){done();}).start();
});

gulp.task('close', function () {
    stream.emit('kill');
});

gulp.task('serve', [/*'uglify', */'run_server']);
gulp.task('close', ['close']);


