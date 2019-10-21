// require all test components

const testsContext = require.context(".", true, /-test$/);
testsContext.keys().forEach(testsContext);

// require all src components

const componentsContext = require.context("../src/", true, /index\.js$/);
componentsContext.keys().forEach(componentsContext);
