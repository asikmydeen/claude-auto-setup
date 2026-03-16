module.exports = function (api) {
  return {
    plugins: [
      ["@babel/plugin-proposal-class-properties", { loose: true }],
      ["@babel/plugin-proposal-private-methods", { loose: true }],
    ].filter(Boolean),
  };
};
