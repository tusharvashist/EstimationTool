module.exports = function (config) {
  config.set({
    frameworks: ["jasmine"],
    files: ["./*.spec.js"],
    singleRun: false,
    concurrency: Infinity,
    autoWatch: true,
    browser: ["chrome"],
    port: 9876,
  });
};
