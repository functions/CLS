'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        // 清理目录
        clean: {
            dev: ["dev/**"],
            publish: ["publish/**"],
            pack: ['dev/**/*.js', '!dev/**/main.js', '!dev/scripts/libs/**/*.js']
        },
        // 拷贝
        copy: {
            dev: {
                files: [
                    {
                        cwd: 'src/',
                        expand: true, 
                        src: '**',
                        dest: 'dev'
                    }
                ]
            },
            publish: {
                files: [
                    {
                        cwd: 'dev/',
                        expand: true,
                        src: '**',
                        dest: 'publish'
                    }
                ]
            }
        },
        // 把 cmd 模块转换为具名模块，以便于打包后调用
        transport : {
            options: {
                // idleading: '/dev/',
                // alias: '<%= pkg.spm.alias %>',
                debug: false
            },
            cmd: {
                files: [
                    {
                        expand: true,
                        cwd: 'dev/scripts',
                        src: 'modules/**/*.js',
                        dest: 'dev/scripts'
                    }
                ]
            }
        },
        // 打包
        concat: {
            basic_and_extras: {
                files: {
                    'dev/scripts/main.js': [
                        'dev/scripts/libs/sea.js',
                        'dev/scripts/libs/zepto.min.js',
                        'dev/scripts/libs/fx.js',
                        'dev/scripts/main.js'
                    ]
                }
            }
        },
        // 混淆js
        uglify: {
            publish: {
                files: [{
                    expand: true,
                    cwd: 'publish/scripts',
                    src: '**/*.js',
                    dest: 'publish/scripts'
                }]
            }
        },
        qunit: {
            files: ['test/**/*.html']
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: 'src/styles/',
                src: ['*.css', '!*.min.css'],
                dest: 'publish/styles/',
                ext: '.css'
            },
            combine: {
                files: {
                    '<%= cssmin.minify.dest %>page1_base.css': [
                        '<%= cssmin.minify.dest %>base.css',
                        '<%= cssmin.minify.dest %>page1.css'
                    ]
                }
            }
        },
        watch: {
            dev: {
                files: ['src/**/*'],
                tasks: ['dev']
            },
            publish: {
                files: ['src/**/*'],
                tasks: ['__publish']
            }
        },
        connect: {
            options: {
                port: 9000,
                hostname: '*' //默认就是这个值，可配置为本机某个 IP，localhost 或域名
            },
            dev: {
                options: {
                    base: [
                        'dev'
                    ]
                }
            },
            publish: {
                options: {
                    base: [
                        'publish'
                    ]
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 开发调试
    grunt.registerTask(
        'dev', ['clean:dev', 'copy:dev', 'transport:cmd', 
                'concat']
    );

    // 发布
    grunt.registerTask(
        // '__publish', ['clean:dev', 'copy:dev', 'transport:cmd', 'concat', 
        //             'clean:pack', 'clean:publish', 
        //             'copy:publish', 'uglify', 'cssmin']
        '__publish', ['clean:dev', 'copy:dev', 'transport:cmd', 
                'concat','uglify', 'cssmin']
    );
    grunt.registerTask(
        'publish', ['__publish', 'connect:publish', 'watch:publish']
    );

    // Default task.
    grunt.registerTask('default', ['dev', 'connect:dev', 'watch:dev']);

};