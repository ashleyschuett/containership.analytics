var https = require("https");

module.exports = {

    config: {
        token: "6r06bi8W8fJeeOjdlYW1UPaeD2QkjnZq"
    },

    package_install: function(options, fn){
        var self = this;

        this.identify({
            user_id: options.user_id
        }, function(err){
            if(err)
                return fn(err);

            self.track({
                user_id: options.user_id,
                event: "Package Install",
                properties: {
                    version: options.version
                }
            }, fn);
        });
    },

    package_update: function(options, fn){
        this.track({
            user_id: options.user_id,
            event: "Package Update",
            properties: {
                version: options.version
            }
        }, fn);
    },

    identify: function(options, fn){
        var post_body = JSON.stringify({
            userId: options.user_id
        });

        var post_options = {
            host: "api.segment.io",
            port: 443,
            path: "/v1/identify",
            method: "POST",
            headers: {
                "Authorization": ["Basic", new Buffer([this.config.token, ""].join(":")).toString("base64")].join(" "),
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(post_body)
            }
        }

        var post_request = https.request(post_options, function(res){
            res.on("data", function(){});
            res.on("end", fn);
        });
        post_request.on("error", fn);
        post_request.write(post_body);
        post_request.end();
    },

    track: function(options, fn){
        var post_body = JSON.stringify({
            userId: options.user_id,
            event: options.event,
            properties: options.properties
        });

        var post_options = {
            host: "api.segment.io",
            port: 443,
            path: "/v1/track",
            method: "POST",
            headers: {
                "Authorization": ["Basic", new Buffer([this.config.token, ""].join(":")).toString("base64")].join(" "),
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(post_body)
            }
        }

        var post_request = https.request(post_options, function(res){
            res.on("data", function(){});
            res.on("end", fn);
        });
        post_request.on("error", fn);
        post_request.write(post_body);
        post_request.end();
    }

}
