var ajax = (function() {
	function ajax(params) {
		this.params = params;
		this.init();
	}
	ajax.prototype.init = function() {
		// パラメータ精査
		this.ajaxParameter = {
			type: this.params.type ? this.params.type : "GET",
			url: this.params.url,
			cache: false,
			contentType: false,
			processData: false,
			dataType: this.params.dataType ? this.params.dataType : "json",
			success: this.params.success ? this.params.success : undefined,
			error: this.params.error ? this.params.error : function() {
				/*
				isConnecting = false;
				popClose();
				openAlertModal(lang_ajax_error);
				*/
			},
			complete: this.params.complete ? this.params.complete : function() {
				this.isConnecting = false;
				alert('complete');
			}
		};

		queryString = "";
		if (typeof this.params.query === "object") {
			console.log("object");
			var i = 0;
			for (var key in this.params.query) {
				if (this.params.query.hasOwnProperty(key)) {
					if (i != 0) {
						queryString += "&";
					}
					queryString += key + "=" + this.params.query[key];
					i++;
				}
			}
		}
		this.ajaxParameter.data = queryString;

		console.log(this.ajaxParameter);
		//this.ajaxParameter;

		this.isConnecting = false;
		this.get();
	};

	ajax.prototype.get = function(callBack) {
		if(this.isConnecting) {
			return;
		}
		// queryパラメータを文字列へ
		/*
		console.log(this.params.query);
		if (typeof this.params.query === "object") {
			console.log("object");
			queryObject = this.params.query;
			this.params.query = "";
			var i = 0;
			for (var key in queryObject) {
				if (queryObject.hasOwnProperty(key)) {
					if (i != 0) {
						this.params.query += "&";
					}
					this.params.query += key + "=" + queryObject[key];
					i++;
				}
			}
		};
		console.log(this.params.query);
		*/
		/*
		// 外のパラメータをつける
		if(this.params.query) {
			idx = this.params.query.indexOf("&");
			// 見つかった場合
			if( idx > -1) {
				this.params.query += "&";
			}
		}
		this.params.query += "page=" + curPage;

		// ソート条件
		var target = $("th.asc, th.desc").attr("data-target");
		if (typeof target == "undefined") {
		} else {
			this.params.query += '&' + target + '=';
			if($('th.asc').length == 1) {
				this.params.query += 'asc';
			} else {
				this.params.query += 'desc';
			}
		}

		// 検索条件
		if ($("#searchValue").val() != "") {
			this.params.query += '&word='+ $('#searchValue').val();
		}
		*/

		console.log(this.ajaxParameter);
		console.log(this.isConnecting);

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
		/*
		error: function() {
			alert('ERROR');
		},
		complete: function() {
			alert('COMPLETE');
		}
		*/
	}
);
