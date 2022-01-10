module.exports = function (config) {
  config.set({
    frameworks: ["jasmine"],
    files: ["../src/pages/estimation-detail/Export/ExportEstimation.spec.js"],
    browsers: ["Chrome"],
    singleRun: true,
    concurrency: Infinity,
  });
};
