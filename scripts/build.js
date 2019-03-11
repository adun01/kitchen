'use strict';

// Do this as the first thing so that any code reading it knows the right env.

if (!process.env.dev) {
    process.env.BABEL_ENV = 'production';
    process.env.NODE_ENV = 'production';
} else {
    process.env.BABEL_ENV = 'development';
    process.env.NODE_ENV = 'development';
}

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
    throw err;
});

// Ensure environment variables are read.
require('../config/env');

const chalk = require('react-dev-utils/chalk');
const webpack = require('webpack');
const configFactory = require('../config/webpack.config');
const paths = require('../config/paths');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
    process.exit(1);
}

// Generate configuration
const config = configFactory(process.env.NODE_ENV);

// Create the production/dev build and print the deployment instructions.
let compiler = webpack(config, (err, stats) => {
    console.log(stats);
    let messages;
    if (err) {
        if (!err.message) {
            return reject(err);
        }
        messages = formatWebpackMessages({
            errors: [err.message],
            warnings: [],
        });
    } else {
        messages = formatWebpackMessages(
            stats.toJson({all: false, warnings: true, errors: true})
        );
    }
    if (messages.errors.length) {
        // Only keep the first error. Others are often indicative
        // of the same problem, but confuse the reader with noise.
        if (messages.errors.length > 1) {
            messages.errors.length = 1;
        }
        return reject(new Error(messages.errors.join('\n\n')));
    }
});
