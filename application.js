#!/usr/bin/env node

var analytics = require([__dirname, "lib", "analytics"].join("/"));
var args = process.argv.splice(2);
analytics.track(args[0]);
