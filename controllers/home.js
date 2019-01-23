var path = require('path');

exports.Index = function(req,res){
    res.sendFile(path.resolve('public/html/index.html'));
};

exports.Login = function(req,res){
    res.sendFile(path.resolve('public/html/login.html'));
};

exports.Register = function(req,res){
    res.sendFile(path.resolve('public/html/register.html'));
};

exports.Start = function(req,res){
    res.sendFile(path.resolve('public/html/start.html'));
};
exports.Error = function(req,res){
    res.sendFile(path.resolve('public/html/error.html'));
};