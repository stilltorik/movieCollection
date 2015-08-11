module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-bowercopy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    var taskConfig = {
        pkg: grunt.file.readJSON("package.json"),
        clean: {
            build: {
                src: ['target-grunt','vendor']
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [
                    'src/main/init.js',
                    'src/main/mainCtrl.js',
                    'src/main/view/*.js',
                    'src/main/js/frw/*.js'
                ],
                dest: 'src/main/js/all.min.js'
            }
        },
        uglify: {
            minify: {
                options: {
                    mangle: false,
                    screwIE8: true
                },
                files: {
                    'src/main/js/all.min.js': [
                        'src/main/js/all.min.js'
                    ]
                }
            },
            buildVendorJs: {
                options: {
                    mangle: false,
                    screwIE8: true
                },
                files: {
                    'vendor/vendor.min.js':
                        [
                            "vendor/jquery/dist/jquery.min.js",
                            "vendor/angular/angular.min.js"
                        ]
                }
            }

        },
        less: {
            build: {
                files: {
                    "src/main/css/all.css":
                        [
                            "src/main/css/common.less",
                            "src/main/css/variables.less",
                            "src/main/homePage.less",
                            "src/main/view/*.less"
                        ]
                }
            }
        },
        bower: {
            install: {
                options: {
                    layout: 'byType',
                    install: true,
                    verbose: false,
                    cleanTargetDir: false,
                    cleanBowerDir: false,
                    bowerOptions: {}
                }
            }
        },
        bowercopy: {
            options: {
                srcPrefix: 'bower_components'
            },
            scripts: {
                options: {
                    destPrefix: 'vendor'
                },
                files: {
                    //'jquery/dist/jquery.min.js': 'jquery/dist/jquery.min.js',
                    'angular/angular.min.js': 'angular/angular.min.js'
                }
            }
        },
        copy:
        {
            dist: {
                files: [
                    {cwd: 'src/main',src: 'index.html',dest: 'target-grunt/dist',expand: true},
                    {cwd: 'src/main/css',src: 'all.css',dest: 'target-grunt/dist',expand: true},
                    {cwd: 'src/main/js',src: 'all.min.js',dest: 'target-grunt/dist',expand: true},
                    {cwd: 'src/main/view',src: '*.html',dest: 'target-grunt/dist/view',expand: true},
                    {cwd: 'src/main/images',src: '*.*',dest: 'target-grunt/dist/images',expand: true},
                    {cwd: 'vendor'  ,src: 'vendor.min.js',dest: 'target-grunt/dist',expand: true}
                ]
            }/*,
            deploy: {
                files: [
                    {cwd: 'src/main',src: 'index.html',dest: '../public',expand: true},
                    {cwd: 'src/main/css',src: 'all.css',dest: '../public',expand: true},
                    {cwd: 'src/main/js',src: 'all.min.js',dest: '../public',expand: true},
                    {cwd: 'src/main/view',src: '*.html',dest: '../public/view',expand: true},
                    {cwd: 'src/main/postsImages',src: '*.*',dest: '../public/postsImages',expand: true},
                    {cwd: 'src/main/images',src: '*.*',dest: '../public/images',expand: true},
                    {cwd: 'vendor'  ,src: 'vendor.min.js',dest: '../public',expand: true}
                ]
            }*/
        },
        karma: {
            unit:
            {
                configFile: 'karma.conf.js',
                singleRun: true,
                browsers: ['PhantomJS']
            }
        },
        jshint: {
            src: [
                'src/main/js/**/*.js',
                'src/main/view/*.js',
                '!src/main/js/all.min.js',
                '!src/main/js/vendor.min.js'
            ],
            test: [
                'src/test/js/**/*.js'
            ],
            gruntfile: [
                'Gruntfile.js'
            ],
            options: {
                curly: true,
                immed: true,
                newcap: true,
                noarg: true,
                sub: true,
                boss: true,
                eqnull: true
            }
        },
        watch: {
            LESS_MODULES: {
                options: {
                    cwd: './src'
                },
                files: [
                    '**/*.less',
                    '**/*.css',
                    '!main/css/all.css'
                ],
                tasks: [
                    'less', 'copy'
                ]
            },
            JS_MODULES: {
                options: {
                    cwd: './src'
                },
                files: [
                    '**/*.js',
                    '!main/js/all.min.js',
                    '!main/js/vendor.min.js'
                ],
                tasks: [
                    'concat', 'copy'
                ]
            },
            HTML_MODULES: {
                files: [
                    'main/src/index.html',
                    'main/src/*.html'
                ],
                tasks: [
                    'copy'
                ]
            }
        }
    };

    grunt.initConfig(taskConfig);

    grunt.registerTask( 'default', [ 'build'] );
    grunt.registerTask( 'build', ['clean','bower','less','bowercopy', 'concat', 'uglify:buildVendorJs', /*'uglify',*/'copy:dist','karma:unit','jshint']);
    grunt.registerTask( 'deploy', ['clean','bower','less','bowercopy', 'concat', 'uglify:buildVendorJs', 'uglify','copy:deploy','karma:unit','jshint']);
    grunt.registerTask( 'lightBuild', ['clean','bower','less','bowercopy', 'concat', 'uglify:buildVendorJs', 'copy:dist','karma:unit','jshint']);
    grunt.registerTask( 'integration-test', []);
    grunt.registerTask('watchCode', ['lightBuild','watch']);
};

