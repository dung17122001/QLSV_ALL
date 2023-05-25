module.exports = {
    // các cài đặt khác của webpack
    resolve: {
        fallback: {
            path: require.resolve('path'),
        },
    },
    fallback: {
        path: require.resolve('path-browserify'),
        process: require.resolve('process/browser'),
        util: require.resolve('browser-util'),
    },
};
