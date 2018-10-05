/**
 * Grunt Module of log4js.
 */
/*jshint node:true */

module.exports = function (grunt) {
    /**
     * Configuration
     */
    grunt.initConfig({
        /**
         * Get package meta data
         */
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                // the banner is inserted at the top of the output
                banner: '/*! <%= pkg.name %>-<%= pkg.version %>  <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },            
            build: {
                src: ["src/main/js/log4js.js",
                    "src/main/js/level.js",
                    "src/main/js/logger.js",
                    "src/main/js/custom-event.js",
                    "src/main/js/logging-event.js",
                    "src/main/js/date-formatter.js",
                    "src/main/js/fifo-buffer.js",
                    "src/main/js/appender.js",
                    "src/main/js/appenders/*.js",
                    "src/main/js/layout.js",
                    "src/main/js/layouts/*.js",
                    "src/main/js/log4js-all.js"
                ],
                dest: "target/files/<%= pkg.name %>/js/<%= pkg.name %>.combined.js"
            }
        },
        /**
         *
         */
        uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: '/*! <%= pkg.name %>-<%= pkg.version %>  <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            build: {
                src: ['**/*.js', '!*.min.js'],
                cwd: 'target/files/<%= pkg.name %>/js/',
                dest: 'target/files/<%= pkg.name %>/js/',
                expand: true,
                rename: function (dest, src) {
                    var folder = src.substring(0, src.lastIndexOf('/'));
                    var filename = src.substring(src.lastIndexOf('/'), src.length);
                    filename = filename.substring(0, filename.lastIndexOf('.')).replace(/\.combined/, "");

                    return dest + folder + filename + '.min.js';
                }
            }
        },
        /**
         *
         */
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            files: [
                'Gruntfile.js',
                'src/main/js/*.js',
                'src/test/js/*.js'
            ]
        },
        /**
         *
         */
        copy: {
            resources: {
                nonull: true,
                cwd: 'src/main/resources',
                src: ['**'],
                expand: true,
                dest: 'target/files/<%= pkg.name %>/resources'
            },
            example: {
                nonull: true,
                cwd: 'src/main/example',
                src: ['**'],
                expand: true,
                dest: 'target/files/<%= pkg.name %>/example'
            }
        },
        /**
         *
         */
        compress: {
            main: {
                options: {
                    archive: 'target/<%= pkg.name %>-<%= pkg.version %>.zip',
                    mode: 'zip'
                },
                files: [
                    {
                        expand: true,
                        cwd: 'target/files/<%= pkg.name %>/',
                        src: ['**']
                    }
                ]
            }
        },
        jsdoc: {
            build: {
                src: ["src/main/js/**/*.js"],
                options: {
                    destination: "target/files//<%= pkg.name %>/docs/"
                }
            }
        },
        /**
         *
         */
        clean: {
            build: {
                src: ['target/']
            },
            deploy: {
                src: ['../xampp/htdocs/<%= pkg.name %>/']
            }
        },
        /**
         * 
         */
        watch: {
            grunt: {
                files: ['Gruntfile.js']
            },
            livereload: {
                files: [
                    'src/*',
                    'src/css/**/*.css',
                    'src/html/**/*.{html,php}',
                    'src/images/**/*.{png,jpg,jpeg,gif}',
                    'src/js/**/*.{js,json}',
                    'src/language/**/*.ini'
                ],
                tasks: ['copy:example'],
                options: {
                    //interrupt: true,
                    livereload: true
                }
            }
        },
        karma: {
            unit: {
                configFile: 'src/test/karma.conf.js',
                // browsers: ['Chrome'],
                singleRun: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.loadTasks('tasks');

    /**
     * Build task
     * Run `grunt build` on the command line
     * This will generate ZIP-Archive with all required artifacts.
     */
    grunt.registerTask('build', ['concat:build', 'uglify', 'jsdoc', 'compress', 'copy'] );

    grunt.registerTask('test', ['build', 'karma'] );
    /**
     * Default task
     * Run `grunt` on the command line
     */
    grunt.registerTask('default', ['watch']);
};
