/* eslint-disable */
const withPlugins = require('next-compose-plugins');
const typescript = require('@zeit/next-typescript');

const config = {
  distDir: '../dist',
};

module.exports = withPlugins([
  [typescript],
], config);
