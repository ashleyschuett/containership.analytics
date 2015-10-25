var fs = require("fs");
var crypto = require("crypto");
var providers = require([__dirname, "..", "providers", "index"].join("/"));
try{
    var containership = require([__dirname, "..", "..", "..", "package"].join("/"));
}
catch(e){
    var containership = {
        version: "unknown"
    }
}

module.exports = {

    track: function(provider, fn){
        var self = this;

        if(!process.env.CS_NO_ANALYTICS){
            this.get_uid(function(err, uid){
                if(err)
                    return fn(err);
                else if(!providers[provider])
                    return fn(new Error(["Provider", provider, "does not exist"].join(" ")));
                else{
                    var options = {
                        user_id: uid.value,
                        version: containership.version,
                        provider: provider
                    }

                    var event = uid.new ? "package_install" : "package_update";
                    providers[options.provider][event](options, fn);
                }
            });
        }
        else
            return fn(new Error("Analytics tracking disabled!"));
    },

    get_uid: function(fn){
        var path = [process.env.HOME, ".containership.analytics"].join("/");

        fs.exists(path, function(exists){
            if(exists){
                fs.readFile(path, function(err, uid){
                    return fn(err, {
                        new: false,
                        value: uid.toString()
                    });
                });
            }
            else{
                var uid = crypto.randomBytes(32).toString("hex");
                fs.writeFile(path, uid, function(err){
                    return fn(err, {
                        new: true,
                        value: uid
                    });
                });
            }
        });
    }

}
