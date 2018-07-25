//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './',

    files: [
      'lib/angular.min.js',
      'lib/angular-animate.min.js',
      'lib/angular-aria.min.js',
      'lib/angular-material.min.js',
      'lib/*.js',
      '*!(.module|.spec).js',
      '!(bower_components)/**/*!(.module|.spec).js',
      '**/*.spec.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome', 'Firefox'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine'
    ]

  });
};
