module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'build/',
                    src: ['**', '!**/*.d.ts'],
                    dest: '../GameOfLifeWeb/Scripts/'
                }]
            },
            lib: {
                files: [{
                    expand: true,
                    cwd: 'lib/',
                    src: ['**', '!**/*.d.ts'],
                    dest: 'build/lib'
                }]
            },
            content: {
                files: [{
                    expand: true,
                    cwd: 'content/',
                    src: ['**'],
                    dest: '../GameOfLifeWeb/Content/'
                }]
            },
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'build/<%= pkg.name %>.min.js': ['build/gameoflife.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['uglify', 'copy:lib', 'copy:main', 'copy:content']);

};