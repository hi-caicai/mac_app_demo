var fs = require('fs');
var path = require('path');
var async = require('async');
var workPath = path.join(process.cwd(), 'data');

var marked = require('marked');
var renderer = new marked.Renderer();
marked.setOptions({
    renderer: renderer,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
});

var cheerio = require('cheerio')

exports.getList = function (callback) {
    var picFiles = fs.readdirSync(path.join(process.cwd(), 'data'));
    async.map(picFiles, function (picFile, callback){

        if( !/\.md$/.test(picFile) ) return callback(null)
        
        var content = fs.readFileSync(path.join(workPath, picFile)).toString();
        callback(null, marked(content))

    }, function (err, pics) {
        callback(pics.filter(function(v){
            return v
        }));
    });
};

