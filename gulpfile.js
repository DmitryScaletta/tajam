const gulp         = require('gulp')

const sass         = require('gulp-sass')
const csso         = require('gulp-csso')
const autoprefixer = require('gulp-autoprefixer')
const babel        = require('gulp-babel')
const uglify       = require('gulp-uglify')
const concat       = require('gulp-concat')
const inlinesource = require('gulp-inline-source')
const minifyMarkup = require('gulp-htmlmin')
const imagemin     = require('gulp-imagemin')
const cache        = require('gulp-cache')

const browserSync  = require('browser-sync').create()
const pngquant     = require('imagemin-pngquant')

const http         = require('http')
const st           = require('st')
const del          = require('del')


const SOURCE_FOLDER = './src'
const OUTPUT_FOLDER = './dist'

const FOLDERS = {
	source: {
		folder:    `${SOURCE_FOLDER}`,
		html:      `${SOURCE_FOLDER}/*.html`,
		styles:    `${SOURCE_FOLDER}/sass/**/*.scss`,
		scripts:   `${SOURCE_FOLDER}/js/**/*.js`,
		polyfills: `${SOURCE_FOLDER}/js-polyfills/**/*.js`,
		images:    `${SOURCE_FOLDER}/img/**/*`,
		fonts:     `${SOURCE_FOLDER}/fonts/**/*`,
	},
	output: {
		folder:     `${OUTPUT_FOLDER}`,
		html:       `${OUTPUT_FOLDER}`,
		styles:     `${OUTPUT_FOLDER}/css`,
		scripts:    `${OUTPUT_FOLDER}/js`,
		images:     `${OUTPUT_FOLDER}/img`,
		fonts:      `${OUTPUT_FOLDER}/fonts`,
	},
}


gulp.task('styles', () => { 
	return gulp
		.src(FOLDERS.source.styles)
		.pipe(sass({
			// outputStyle: 'compressed', // nested | expanded | compact | compressed | 
			// indentedSyntax: true,
			includePaths: [
				'node_modules/susy/sass',
				'node_modules/flexboxgrid-sass',
				'node_modules/bourbon-neat/core',
			],
		}).on('error', sass.logError))
		.pipe(autoprefixer('last 15 versions', 'ie 10', 'ie 11'))
		.pipe(csso())
		.pipe(gulp.dest(FOLDERS.output.styles))
		.pipe(browserSync.stream())
})

gulp.task('scripts', ['scripts:polyfills'], () =>  {
	return gulp
		.src(FOLDERS.source.scripts)
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(concat('script.js'))
		.pipe(uglify())
		.pipe(gulp.dest(FOLDERS.output.scripts))
})

gulp.task('scripts:polyfills', () =>  {
	return gulp
		.src(FOLDERS.source.polyfills)
		.pipe(concat('polyfills.js'))
		.pipe(uglify())
		.pipe(gulp.dest(FOLDERS.output.scripts))
})

gulp.task('markup', () => {
	return gulp
		.src(FOLDERS.source.html)
		.pipe(gulp.dest(FOLDERS.output.html))
})

gulp.task('images', () => {
	return gulp
		.src(FOLDERS.source.images)
		.pipe(cache(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest(FOLDERS.output.images))
})

gulp.task('fonts', () => {
	return gulp
		.src(FOLDERS.source.fonts)
		.pipe(gulp.dest(FOLDERS.output.fonts))
})

gulp.task('clean', () => del.sync('dist'))

gulp.task('build', ['clean', 'scripts', 'styles', 'images', 'fonts'], () => {
	return gulp
		.src(FOLDERS.source.html)
		.pipe(inlinesource({
			compress: false,
			rootpath: FOLDERS.output.folder
		}))
		.pipe(minifyMarkup({
			collapseWhitespace: true,
			collapseBooleanAttributes: true,
			removeComments: true,
			removeRedundantAttributes: true,
		}))
		.pipe(gulp.dest(FOLDERS.output.html))
})

gulp.task('default', ['build'])

gulp.task('serve', () => {
	browserSync.init({
		server: OUTPUT_FOLDER,
		notify: false
	})
})

gulp.task('watch', ['serve', 'markup', 'styles', 'scripts'], () => {
	gulp.watch(FOLDERS.source.styles,  ['styles'])
	gulp.watch(FOLDERS.source.html,    ['markup',  browserSync.reload])
	gulp.watch(FOLDERS.source.scripts, ['scripts', browserSync.reload])
})