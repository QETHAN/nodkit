var url = require('url'),
	fs = require('fs'),
	path = require('path');

function url2path(url_path) {
	var urlObj = url.parse(url_path);
	var path = urlObj.path;
	return path;
}

/*
 * /public ----> parent_path
 * /public/xxx/xxx
 *
 */
module.exports = function static(parent_path) {

	//这个插件无需调用next
	return function(req,res,next) {

		var path = url2path(req.url);
		function cb(err,data) {

			if(err) {
				res.statusCode = 404;
			} else {
				res.write(data);
			}
			res.end();
		}

		fs.readFile(path.join(parent_path,path),cb);
	}
}