module.exports = function(grunt) {
   grunt.initConfig({
   browserify: {
   	js: {
       src: 'app/js/app.js',
       dest: 'dist/js/app.js',
       options: {
         external: ['angular'],
         debug: true,
         browserifyOptions: { debug: true }
       }
     }
   },
   copy: {
	   all: {
       // This copies all the html and css into the dist/ folder
       expand: true,
       cwd: 'app/',
       src: ['**/*.html', '**/*.css', '**/*.png', 'lib/**'],
       dest: 'dist/',
     }, 
     files: {
      cwd: 'lib',  // set working folder / root to copy
      src: '**/*',           // copy all files and subfolders
      dest: 'dist/lib',    // destination folder
      expand: true           // required when using cwd
    }
   },
   concat: {
      sass: {
        src: ['app/**/*.scss'],
        dest: 'dist/css/concat.scss'
      }
    },
    sass: {
      css: {
        options: {
          style: 'compressed',
          sourcemap: 'none'
        },
        files: {
          'dist/css/styles.css': 'dist/css/concat.scss'
        }
      }
   },
   compass: {
      dist: {
        options: {
          sassDir: 'app/css',
          cssDir: 'app/css',
          environment: 'production'
        }
      }
   },
   clean: {
      build: {
        force: true,
        src: ['dist']
      }
    },
   watch: {
    compass: {
      files: ['app/**/*.scss'],
      tasks: ['compass:dist']
    },
   	js: {
       files: "app/**/*.js",
       tasks: "browserify"
     },
     html: {
       files: 'app/**/*.html',
       tasks: 'copy'
     },
     scss: {
        files: 'app/**/*.scss',
        tasks: ['concat', 'sass', 'copy']
     },
     css: {
       files: 'app/**/*.css',
       tasks: 'copy'
     }
   }
 });

 // Load the npm installed tasks
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // The default tasks to run when you type: grunt
  grunt.registerTask('default', ['concat', 'browserify', 'sass', 'copy', 'compass']);
};
	 
	 