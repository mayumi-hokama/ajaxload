var isConnecting = false;
var ajaxLoad = {
	params : {
		type: "GET",
		url: "",
		query: "" || {},
		dataType: "json",
	},
	data: function(successCallBack, errorCallBack, completeCallBack) {
		if(isConnecting) {
			return;
		}
		// queryパラメータを文字列へ
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
		}
		console.log(this.params.query);
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
		console.log(isConnecting);

		// ajax実行
		isConnecting = true;
		$.ajax({
			type: this.params.type,
			url: this.params.url,
			data: this.params.query,
			cache: false,
			contentType: false,
			processData: false,
			dataType: this.params.dataType,
			success: function (m) {
				if (successCallBack) {
					successCallBack();
				}
				/*
				$('#member-list').fadeOut(1000,function() {
					$('#member-list').html(m).fadeIn('fast', function(){
						isConnecting = false;
						popClose();
					});
					setPagination(parseInt((MAX_PAGE_NUM - 1) / DEFAULT_PER_PAGE) + 1);
				});
				*/
			},
			error: function (m) {
				if (errorCallBack) {
					errorCallBack();
				} else {

				}
				/*
				isConnecting = false;
				popClose();
				openAlertModal(lang_ajax_error);
				*/
			},
			complete: function () {
				isConnecting = false;
				if (completeCallBack) {
					completeCallBack();
				}
			},
		});
	},
};

ajaxLoad.params = {
	type: "GET",	// 省略可(デフォルトGET)
	url: "http://localhost/test",
	/*/
	query: {
		aa:"aaaaa",
		bb:"bbbbb",
	} // ない場合は省略
	//*/
};
ajaxLoad.data(
	function(){
		// successCallBack
		alert('OK');
	},
	function() {
		// errorCallBack 省略可
		alert('ERROR');
	},
	function() {
		// completeCallBack 省略可
		alert('COMPLETE');
	}
);