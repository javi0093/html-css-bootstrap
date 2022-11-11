module.exports = function (grunt){
	require('time-grunt')(grunt);
	require('jit-grunt')(grunt, {
		useminPrepare: 'grunt-usemin'
	});

	grunt.initConfig({
		sass: {
			dist: {
				files: [{
					expand: true,
					cwd: 'css',
					src: ['*.scss'],
					dest: 'css',
					ext: '.css'
				}]
			}
		},
		watch: {
			files: ['css/*.scss'],
			tasks: ['css']
		},
		browserSync: {
			dev: {
				bsFiles: {		// Browser Files.
					src: [
					'css/*.css',
					'*.html',
					'js/*.js'
					]
				},
				options: {
					watchTask: true,
					server: {
						baseDir: './'	// Directorio base para nuestro servidor.
					}
				}
			}
		},

		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: './',
					src: 'images/*.{png,gif,jpg,jpeg}',
					dest: 'dist/images',
				}]
			}
		},
		copy: {
			 html: {
			 	files: [{
			 		expand: true,
			 		dot: true,
			 		cwd: './',
			 		src: ['*.html'],
			 		dest: 'dist'
			 	}]
			 },

			 	files: [{
			 		// for font-awesome
			 		expand: true,
			 		dot: true,
			 		cwd: 'node_modules/open-iconic/font/',
			 		src: ['fonts/*.*'],
			 		dest: 'dist'	
			 	}]
			
		},

		clean: {
			build: {
				src:['dist/']
			}
		},

		cssmin: {
			dist: {}
		},

		uglify: {
			dist: {}		//para crear el js
		},

		filerev: {	//genera un codigo para que no sea cacheable
			options: {
				encoding: 'utf8',
				algorithm: 'md5',
				length: 20
			},
			release: {
				files: [{
					src: [
						'dist/js/*.js',
						'dist/css/*.css',
					]
				}]
			}
		},

		concat: {
			 options: {
			 	separator: ';'
			 },
			 dist: {}
		},

		useminPrepare: {
			foo: {
				dest: 'dist',
				src: ['index.html', 'precios.html' , 'contacto.html', 'nosotros.html']
			},
			options: {
				flow: {
					steps: {
						css: ['cssmin'],
						js: ['uglify']
					},
					post: {
						css: [{
							name: 'cssmin',
							createConfig: function(context, block) {
								var generated = context.options.generated;
								generated.options = {
									keepSpecialComments: 0,
									rebase: false
								}
							}
						}]
					}
				}
			}
		},

		usemin: {
			html: ['dist/index.html','dist/precios.html', 'dist/contacto.html', 'dist/nosotros.html'],
			options: {
				assetsDir: ['dist', 'dist/css', 'dist/js']
			}
		}

	});




	
	grunt.loadNpmTask('grunt-contrib-uglify');
	grunt.loadNpmTask('grunt-usemin');
	grunt.registerTask('css',['sass']);
	grunt.registerTask('img:compress',['imagemin']);
	grunt.registerTask('build', [
						'clean',
						'copy',
						'imagemin',
						'useminPrepare',
						'concat',
						'cssmin',
						'uglify',
						'filerev',
						'usemin'
						]);

	// Tarea por defecto que se ejecuta al ejecutar 'grunt' solo.
	grunt.registerTask('default',['browserSync','watch']);

};