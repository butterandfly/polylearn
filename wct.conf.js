let ret = {
  suites: ['./src/**/*.test.html'],
  skipUpdateCheck: true,
  webserver: {
    pathMappings: []
  },
  plugins: {
    local: {
      skipSeleniumInstall: true,
      browsers: ['chrome']
    }
  }
};

module.exports = ret;
