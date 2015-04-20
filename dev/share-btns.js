(function(d){
	"use strict";

	var sitesList = {
		"twitter":{
			"url":"https://twitter.com/intent/tweet?url=%%URL%%&text=%%TEXT%%",
			"icon":"icon-twitter"
		},
		"facebook":{
			"url":"http://www.facebook.com/share.php?u=%%URL%%",
			"icon":"icon-facebook"
		},
		"hatena":{
			"url":"http://b.hatena.ne.jp/entry/%%URL%%",
			"icon":"hatenabookmark-logo-monocolor"
		},
		"google":{
			"url":"https://plus.google.com/share?url=%%URL%%",
			"icon":"icon-googleplus"
		},
		"line":{
			"url":"http://line.me/R/msg/text/?%%TEXT%%%0D%0A%%URL%%",
			"icon":"icon-line"
		}
	};

	var od = (d._currentScript || d.currentScript).ownerDocument;
	var prt = Object.create(HTMLElement.prototype);
	var pageUrl = d.querySelector("head link[rel='canonical']");
	if(pageUrl){
		pageUrl = pageUrl.getAttribute("href");
	}else{
		pageUrl = d.URL;
	}
	var text = 'test text';

	prt.createdCallback = function(){

		var core = d.importNode(od.querySelector("template.core").content, true);
		this._root = this.createShadowRoot();

		//append core
		this._root.appendChild(core);


		//icon svgをshadow dom内に取り込む
		var icons = d.querySelectorAll("body>svg");
		for(var i=0, c=icons.length; i<c; ++i){
			var clone = icons[i].cloneNode(true);
			this._root.appendChild(clone);
		}






	}

	prt.attachedCallback = function(){
		this._init();
	}

	prt.detachedCallback = function(){
	}

	prt.attributeChangedCallback = function(attrName, oldVal, newVal){
		if(attrName === "data-url"){
			this._init();
		}
	}
	
	prt._init = function(){
		var that = this;
		var sites;
		var re = /\s*,\s*/;
		var atr = this.getAttribute("data-sites");
		var ul = this._root.querySelector("ul");
		var url;

		this.url = this.getAttribute("data-url") || pageUrl; 
		if(atr && this.url){
			url = encodeURIComponent(this.url);
			if(text){
				text = encodeURIComponent(text);
			}
			sites = atr.split(re);
		}else{
			return false;
		}


		sites.forEach(function(val, index, parent){
			var tpl;
			var content;
			var ancs;
			var svgs;
			var li;

			if(sitesList.hasOwnProperty(val)){
				tpl = od.querySelector("template."+val);
				content = d.importNode(tpl.content, true);
				ancs = content.querySelectorAll("a");
				ancs = Array.apply(null, ancs);

				ancs.forEach(function(val2){
					var linkUrl = sitesList[val].url.replace("%%URL%%", url).replace("%%TEXT%%", text);
					val2.setAttribute("href", linkUrl);
				});

				//webcompoents.jsではuseがうまく動かないので無理やり動かす
				//もし将来的に解決したらuseを使いたい
				svgs = Array.apply(null, content.querySelectorAll("svg"));
				svgs.forEach(function(val2, index, parent){
					var path = Array.apply(null, that._root.querySelectorAll("#"+sitesList[val].icon+">*"));
					path.forEach(function(val3){
						val2.appendChild(val3.cloneNode(true));
					});
				});



				li = d.createElement('li');
				li.appendChild(content);

				ul.appendChild(li);
			}
		});
	}

	d.registerElement("share-btns", {prototype: prt});

})(document);
