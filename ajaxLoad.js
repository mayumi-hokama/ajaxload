var ajax = (function() {
	function ajax(params) {
		this.init(params);
	}
	ajax.prototype.init = function(params) {
		// パラメータ精査
		this.params = {
			type: params.type ? params.type : "GET",
			url: params.url,
			data : params.query ? function() {
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
				}
			} : "",
			cache: false,
			contentType: false,
			processData: false,
			dataType: params.dataType ? params.dataType : "json",
			success: params.success ? params.success : undefined,
			error: params.error ? params.error : function() {
				/*
				isConnecting = false;
				popClose();
				openAlertModal(lang_ajax_error);
				*/
			},
			complete: params.complete ? params.complete : function() {
				this.isConnecting = false;
			},
		}
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

		console.log(this.params);
		console.log(this.isConnecting);

		// ajax実行
		this.isConnecting = true;
		$.ajax(this.params);
		
		/*
		$.ajax({
			type: this.params.type,
			url: this.params.url,
			data: this.params.query,
			cache: false,
			contentType: false,
			processData: false,
			dataType: this.params.dataType,
			success: function (m) {
				if (callBack.success) {
					callBack.success();
				}
				*/
				/*
				$('#member-list').fadeOut(1000,function() {
					$('#member-list').html(m).fadeIn('fast', function(){
						isConnecting = false;
						popClose();
					});
					setPagination(parseInt((MAX_PAGE_NUM - 1) / DEFAULT_PER_PAGE) + 1);
				});
				*/
			/*
			},
			error: function (m) {
				if (callBack.error) {
					callBack.error();
				} else {

				}
				*/
				/*
				isConnecting = false;
				popClose();
				openAlertModal(lang_ajax_error);
				*/
				/*
			},
			complete: function () {
				this.isConnecting = false;
				if (callBack.complete) {
					callBack.complete();
				}
			},
		});
	*/
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
		complete: function() {
			alert('COMPLETE');
		}
	}
);
