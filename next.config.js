/** @type {import('next').NextConfig} */
const path = require('path');
module.exports = {
  reactStrictMode: true,
  distDir: 'build',
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}
