module.exports = function (config) {
  config.set({
    frameworks: ["jasmine"],
    files: [{ pattern: "*/*.spec.js", type: "module", autoWatch: true }],
    singleRun: false,
    concurrency: Infinity,
    autoWatch: true,
    browser: ["chrome"],
    port: 9876,
  });
};
