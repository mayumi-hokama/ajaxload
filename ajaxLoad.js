var ajax = (function() {
	function ajax(params) {
		this.params = params;
		this.init();
	}
	ajax.prototype.init = function() {
		// パラメータ精査
		var _this = this;
		this.ajaxParameter = {
			type: _this.params.type ? _this.params.type : "GET",
			url: _this.params.url,
			data: (function() {
				queryString = "";
				if (typeof _this.params.query === "object") {
					var i = 0;
					for (var key in _this.params.query) {
						if (_this.params.query.hasOwnProperty(key)) {
							if (i != 0) {
								queryString += "&";
							}
							queryString += key + "=" + _this.params.query[key];
							i++;
						}
					}
				} else if (_this.params.query) {
					if (_this.params.query.length > 0) {
						queryString += _this.params.query;
					}
				}
				return queryString;
			})(),
			cache: false,
			contentType: false,
			processData: false,
			dataType: _this.params.dataType ? _this.params.dataType : "json",
			success: _this.params.success ? _this.params.success : undefined,
			error: _this.params.error ? this.params.error : function() {
			},
			complete: _this.params.complete ? this.params.complete : function() {
				_this.isConnecting = false;
				alert('complete');
			}
		};

		this.isConnecting = false;
		this.get();
	};

	ajax.prototype.get = function(callBack) {
		if(this.isConnecting) {
			return;
		}
		// ajax実行
		this.isConnecting = true;
		$.ajax(this.ajaxParameter);

	};
	return ajax;
})();

var aj = new ajax(
	{
		type: "GET",
		url: "http://localhost/test",
		query: {
			a:"ああああ"
		},
		dataType: "html",
		success: function() {
			alert('OK');
		},
		error: function() {
			alert('ERROR');
		},
		/*
		complete: function() {
			alert('COMPLETE');
		}
		*/
	}
);
