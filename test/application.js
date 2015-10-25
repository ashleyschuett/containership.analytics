var _ = require("lodash");

var tests = {
    segment: require([__dirname, "segment"].join("/"))
}

var run_tests = function(){
    _.each(tests, function(test, test_name){
        test.start();
    });
}

run_tests();
