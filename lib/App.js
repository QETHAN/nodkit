var http = require('http');

function App() {

	//中间件有序列表
	var middleList = this._middleList = [];

	function handle(req,res) {

		if(middleList.length === 0) {
			//没有中间件，插件
		} else {

			//循环执行
			var middleIndex = 0;

			execMiddle();

			function next() {
				middleIndex += 1;
				execMiddle();
			}

			function execMiddle() {

				var middle = middleList[middleIndex];
				if(middle) {
					middle(req,res,next);
				}
			}
		}
	}

	this._server = http.createServer(handle);
}

//添加中间件
App.prototype.use = function(middle) {
	this._middleList.push(middle);
}

//监听端口
App.prototype.listen = function() {
	this._server.listen.apply(this._server,arguments);
}

module.exports = App;