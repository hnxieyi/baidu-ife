/**
 * containerid 容器id
 * templateid 模板id
 * url 异步调用url
 * data 请求参数
 */
function getDataAndBindHtml(containerid, templateid, url, data, func){
	$.ajax({
		url: url,
		data: data,
		type: "GET",
		dataType: "json",
		beforeSend:function(){
			
		},
		success:function(data){
			$("#" + containerid).setTemplateElement(templateid);
			$("#" + containerid).processTemplate(data);
			//console.log(data);
			if(undefined != func){
				func(data);
			}
		},
		error:function(e){
			
		}

	});
}

/**
 * 获取请求的参数值
 * @param k
 */
function getRequestParam(k){
	var params = location.search.substring(1).split("&");
	for (var i = 0; i < params.length; i++) {
		if (params[i] != "" && params[i].split("=")[0] == k) {
			return params[i].split("=")[1];
		}
	}
	return "";
}

/**
 * 异步提交并跳转到指定地址
 * @param form 
 * @param url 处理地址
 * @param redirect_url 跳转地址
 * @returns {Boolean}
 */
function formSubmitAndRedirect(form, url, redirectUrl){
	$(form).ajaxSubmit({
		url:url,
		type:"post",
		dataType:"json",
		beforeSend:function(){
			//$(":submit").replaceWith(SUBMITTING);
		},
		success:function(result){
			if (result.resultCode == 1000){
				if(result.message != null){
					alert(result.message);
				}
				if(result.data!=null)
					location.href = result.data;
				else if(redirectUrl != null)
					location.href = redirectUrl;
				else 
					location.reload();
			}else {
				alert(result.error);
				//$(".submitting").replaceWith("<input class='input_tijiao col_44b549' type='submit'/>");
			}
		},
		error:function(e){
			//alert("error:" + e);
			//$(".submitting").replaceWith("<input class='input_tijiao col_44b549' type='submit'/>");
		}
	})
	return false;
}

function getDataAndBindHtmlWithPage(page, containerid, templateid, url, param){
	//alert("1234");
	if(typeof param == "string")
		param = eval("("+ param +")"); //JSON.stringify(param);
	param.page = page;
	$.ajax({
		url: url,
		data: param,
		type: "GET",
		dataType: "json",
		beforeSend:function(){
			
		},
		success:function(data){
			$("#" + containerid).setTemplateElement(templateid);
			$("#" + containerid).processTemplate(data);
			console.log(data);
			var __html_page = "";
			var navigatePageNumbers = data.navigatePageNumbers;
			console.log(navigatePageNumbers);
			var datas = navigatePageNumbers.split(" ");
			for (var i = 0; i < datas.length; i++) {
				if(page == datas[i]){
					__html_page += "<span>" +datas[i]+ "</span>"; 
				}else {
					__html_page += "<a href=\"javascript:void(0);\" onclick=\"getDataAndBindHtmlWithPage(" + datas[i] + ", \'" + containerid + "\', \'" + templateid + "\', \'" + url + "\', " + param.toString() + ")\">" + datas[i] + "</a>";					
				}
			}
			$(".pages").html(__html_page);
		},
		error:function(e){
			
		}

	});
}

String.prototype.startWith=function(str){  
    if(str==null||str==""||this.length==0||str.length>this.length)  
      return false;  
    if(this.substr(0,str.length)==str)  
      return true;  
    else  
      return false;  
    return true;  
}  


String.prototype.endWith=function(str){  
    if(str==null||str==""||this.length==0||str.length>this.length)  
      return false;  
    if(this.substring(this.length-str.length)==str)  
      return true;  
    else  
      return false;  
    return true;  
}

$(document).ready(function(){
	$("img").each(function() {
		var src = $(this).attr("src");
		if(!src.startWith("http://") && !src.startWith('/')){
			//$(this).load(function(){
				$(this).attr("src", "assets/" + src);				
			//});
		}
	});
});

if (!Array.prototype.forEach) {  
    Array.prototype.forEach = function(callback, thisArg) {  
        var T, k;  
        if (this == null) {  
            throw new TypeError(" this is null or not defined");  
        }  
        var O = Object(this);  
        var len = O.length >>> 0; // Hack to convert O.length to a UInt32  
        if ({}.toString.call(callback) != "[object Function]") {  
            throw new TypeError(callback + " is not a function");  
        }  
        if (thisArg) {  
            T = thisArg;  
        }  
        k = 0;  
        while (k < len) {  
            var kValue;  
            if (k in O) {  
                kValue = O[k];  
                callback.call(T, kValue, k, O);  
            }  
            k++;  
        }  
    };  
}

function buildPage(pager) {
	var __html_page = "";
	var navigatePageNumbers = pager.navigatePageNumbers;
	var total_page = pager.total;
	var page = pager.page;
	var pageNumbers = navigatePageNumbers;
	var before_page = page - 1;
	var next_page = page + 1;

	__html_page += '<li class="button"><a id="btn_prev" class="disabled trblBor" href="javascript:void(0);" onclick="getPartsList(' + (before_page) + ')"><b>上一页</b></a></li>';

	for (var i = 0; i < pageNumbers.length; i++) {
		if (page == pageNumbers[i]) {
			__html_page += "<li><a class='trblBor current'><b>" + pageNumbers[i] + "</b></a></li>";
		} else {
			__html_page += "<li><a class='trblBor' href='javascript:void(0);' onclick='getPartsList(" + pageNumbers[i] + ")'><b>" + pageNumbers[i] + "</b></a></li>";
		}
	}
	__html_page += '<li class="button"><a id="btn_next" class="disabled trblBor" href="javascript:void(0);" onclick="getPartsList(' + (next_page) + ')"><b>下一页</b></a></li>';
	$(".pages_us").html(__html_page);
	if (page > 1) {
		$('#btn_prev').removeClass('disabled');
	}
	if (page < total_page) {
		$('#btn_next').removeClass('disabled');
	}
}