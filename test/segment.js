var fs = require("fs");
var assert = require("assert");
var analytics = require([__dirname, "..", "lib", "analytics"].join("/"));

var provider = "segment";

module.exports = {

    start: function(){
        describe("segment_track_package_install", function(){
            this.timeout(10000);

            before(function(fn){
                delete process.env.CS_NO_ANALYTICS;

                var path = [process.env.HOME, ".containership.analytics"].join("/");
                fs.unlink(path, function(){
                    return fn();
                });
            });

            it("should create package install event", function(fn){
                analytics.track(provider, fn);
            });
        });

        describe("segment_track_package_update", function(){
            this.timeout(10000);

            before(function(fn){
                delete process.env.CS_NO_ANALYTICS;
                var path = [process.env.HOME, ".containership.analytics"].join("/");
                fs.unlink(path, function(){
                    analytics.get_uid(fn);
                });
            });

            it("should create package install event", function(fn){
                analytics.track(provider, fn);
            });

            after(function(fn){
                var path = [process.env.HOME, ".containership.analytics"].join("/");
                fs.unlink(path, fn);
            });
        });

        describe("segment_CS_NO_ANALYTICS", function(){
            it("should prevent event from being tracked", function(fn){
                process.env.CS_NO_ANALYTICS = 1;
                analytics.track(provider, function(err){
                    return fn(err.message != "Analytics tracking disabled!");
                });
            });

            after(function(fn){
                delete process.env.CS_NO_ANALYTICS;
                return fn();
            });
        });
    }

}
