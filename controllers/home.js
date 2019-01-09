var path = require('path');

exports.Index = function(req,res){
    res.sendFile(path.resolve('public/html/index.html'));
};