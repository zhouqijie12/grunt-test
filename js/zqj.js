// JavaScript Document
(function(){
	if(!window.ZQJ){ window['ZQJ']={} };
	
	//添加侦听事件
	function addHandler(element, type, handler){
		if(element.addEventListener)
		{
			element.addEventListener(type, hadnler, false);
		}
		else if(element.attachEvent)
		{
			element.attachEvent('on' + type, function(){
				handler.call(element);
			});
		}
		else
		{
			element['on' + type] = handle;
		}
		
	};
	window['ZQJ']['addHandler'] = addHandler;
	
	//移除侦听事件
	function removeHandler(element, type, handler){
		if(element.removeEventListener)
		{
			element.removeEventListener(type, hadnler, false);
		}
		else if(element.detachEvent)
		{
			element.detachEvent('on' + type, hadnler);
		}
		else
		{
			element['on' + type] = null;
		}
		
	}
	window['ZQJ']['removeHandler'] = removeHandler;
	
	//事件
	function getEvent(event){
		return event ? event : window.event;
	}
	window['ZQJ']['getEvent'] = getEvent;
	
	//目标
	function getTarget(event){
		return event.target || event.srcElement;
	}
	window['ZQJ']['getTarget'] = getTarget;
	
	//阻止默认行为
	function preventDefault(event){
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue = false;
		}
	}
	ZQJ['preventDefault'] = preventDefault;
	
	//阻止冒泡
	function stopPropagation(event){
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble = true;
		}
	}
	window['ZQJ']['stopPropagation'] = stopPropagation;
	
	
	//获取元素
	function $(str, oParent) {
		switch (str.charAt(0)) {
		case '#':
			var sTmp = str.substring(1);
			return document.getElementById(sTmp);
			break;
		case '.':
			var sTmp = str.substring(1);
			var obj = oParent || document;
			if (obj.getElementsByClassName) {
				return obj.getElementsByClassName(sTmp);
			} else {
				var arr = [];
				var aChild = obj.getElementsByTagName('*');
				var re = new RegExp('\\b' + sTmp + '\\b', 'i');
				for (var i = 0; i < aChild.length; i++) {
					if (re.test(aChild[i].className)) {
						arr.push(aChild[i]);
					}
				}
				return arr;
			}
			break;
		case '!':
			var sTmp = str.substring(1);
			return document.getElementsByName(sTmp);
			break;
		//oParent必须为一个id的引用;
		default:
			var obj = oParent || document;
			return obj.getElementsByTagName(str);
		}
	}
	window['ZQJ']['$'] = $;
	
	//CSS操作 (获取时注意不可用简称，如 background
	function css(obj,attr,value){
		var oar = arguments.length;
		switch(oar){
			case 2:
				if(typeof arguments[1] == 'object'){
					for(var i in attr){
						obj.style[i] = attr[i];	
					}	
				}else{
					return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj,null)[attr];	
				}
				break;
			case 3:
				obj.style[attr]=value;
				break;
			default:
				alert('参数有问题');
		}
	}
	window['ZQJ']['css']= css;
	
	//className操作
	function addClass(obj, sClass) {
		if(!obj.className)
		{
			obj.className = sClass;
		}
		else
		{
			obj.className += ' ' + sClass;
		}
		
	}
	function removeClass(obj, sClass) {
		if(obj.className)
		{
			var str = obj.className;
			obj.className = str.replace(sClass, '');
		}
		
	}
	window['ZQJ']['addClass']= addClass;
	window['ZQJ']['removeClass']= removeClass;
	
	//获取第一个子节点
	function firstOne(obj) {
		return obj.firstChild.nodeType == 1 ? obj.firstChild: nextOne(obj.firstChild);
	}
	window['ZQJ']['firstOne']= firstOne;
	
	//获取最后一个子节点
	function lastOne(obj) {
		return obj.lastChild.nodeType == 1 ? obj.lastChild: prevOne(obj.lastChild);
	}
	window['ZQJ']['lastOne']= lastOne;
	
	//获取上一个同级节点
	function prevOne(obj) {
		return obj.previousSibling.nodeType == 1 ? obj.previousSibling: prevOne(obj.previousSibling);
	}
	window['ZQJ']['prevOne']= prevOne;
	
	//获取下一个同级节点
	function nextOne(obj) {
		return obj.nextSibling.nodeType == 1 ? obj.nextSibling: nextOne(obj.nextSibling);
	}
	window['ZQJ']['nextOne']= nextOne;
	
	//获取所有标签为sTag的同级
	function nextTag(obj, sTag) {
		return obj.parentNode.getElementsByTagName(sTag);
	}
	window['ZQJ']['nextTag']= nextTag;
	
	//用className获取同级节
	function getClass(target,sClass){
		var el = target.getElementsByTagName("*");
		var arr=[];
		for(var i=0;i<el.length;i++){
			if(el[i].className == sClass){
				arr.push(el[i]);	
			}	
		}
		return arr;
	}
	window['ZQJ']['getClass']= getClass;
	
	//在oParent最后插入sTag标签
	function append(oParent, sTag) {
		var tmp = document.createElement(sTag);
		oParent.appendChild(tmp);
		return tmp;
	}
	window['ZQJ']['append']= append;
	
	//在oParent的第一个位置插入sTag标签
	function appBefore(oParent, sTag) {
		var tmp = document.createElement(sTag);
		var arr = oParent.getElementsByTagName(sTag);
		if (arr.length == 0) {
			oParent.appendChild(tmp);
		} else {
			oParent.insertBefore(tmp, arr[0]);
		}
		return tmp;
	}
	window['ZQJ']['appBefore']= appBefore;
	
	//在oParent的第iNum个位置前插入sTag
	function appTo(oParent, sTag, iNum) {
		var tmp = document.createElement(sTag);
		var arr = oParent.getElementsByTagName(sTag);
		if (arr.length == 0) {
			oParent.appendChild(tmp);
		} else {
			oParent.insertBefore(tmp, arr[iNum]);
		}
		return tmp;
	}
	window['ZQJ']['appTo']= appTo;
	
	//获取元素距离可视区的定位
	function posVis (obj,sValue) {
		var ro = obj.getBoundingClientRect();
		switch (sValue) {
		case 'top': 
			return ro.top;
			break;
		case 'left': 
			return ro.left;
			break;
		case 'bottom':
			return ro.bottom;
			break;
		case 'right':
			return ro.right;
			break;
		default:
			alert('posVis出错！');
		}
	}
	window['ZQJ']['posVis']= posVis;
	
	
	//scrollTop
	function scrollY(){
		return document.body.scrollTop||document.documentElement.scrollTop;
	}
	//获取元素距离整个页面最上方的定位 (需依赖 scrollY)
	function posWinTop (obj) {
		if (obj.getBoundingClientRect()) {
			var ro=obj.getBoundingClientRect();
			return ro.top+scrollY();               //scrollY
		}else {
			var iTop=0;
			while(obj){
				iTop+=obj.offsetTop;
				obj=obj.offsetParent;
			}
			return iTop;
		}
	}
	window['ZQJ']['posWinTop']= posWinTop;
	
	//事件绑定
	//bindEvent(oDiv,'click',function(){} );
	function bindEvent(obj, sEvent, fn) {
		if (obj.attachEvent) {
			obj.attachEvent('on' + sEvent,
			function() {
				fn.call(obj);
			});
		} else {
			obj.addEventListener(sEvent, fn, false);
		}
	}
	window['ZQJ']['bindEvent']= bindEvent;
	
	//字符串前面加0补足位数.tar-目标元素，n-位数.
	function addZero(tar,n){
		var str =""+tar;
		while(str.length < n){
			str = "0"+str;
		}
		return str;
	}
	window['ZQJ']['addZero']= addZero;
	
	//获取页面内任何一个元素的位置，位置是相对于浏览器的左上角也就是body.
	/*function getPosition(obj){
		var left=0;
		var top=0;
		
		while(obj != document.body){
			left += obj.offsetLeft;
			top += obj.offsetTop;
			obj = obj.offsetParent;	
		}
		alert("Left Is : " + left + "\r\n" + "Top Is : " + top);
	}
	window['ZQJ']['getPosition']= getPosition;*/
	
	//触发绑定事件
	function tgrEvent(obj, sEv) {
		if (document.createEventObject) {
			obj.fireEvent('on' + sEv);
		} else {
			var evObj = document.createEvent('Events');
			evObj.initEvent(sEv, true, false);
			obj.dispatchEvent(evObj);
		}
	}
	window['ZQJ']['tgrEvent']= tgrEvent;
	
	//Ajax
	function ajax(url, fnSucc, fnFaild) {
		//1.创建Ajax对象
		var oAjax = null;

		if (window.XMLHttpRequest) {
			oAjax = new XMLHttpRequest();
		} else {
			oAjax = new ActiveXObject("Microsoft.XMLHTTP");
		}

		//2.连接服务器
		oAjax.open('GET', url, true);

		//3.发送请求
		oAjax.send();

		//4.接收服务器的返回
		oAjax.onreadystatechange = function() {
			if (oAjax.readyState == 4) //完成
			{
				if (oAjax.status == 200) //成功
				{
					fnSucc(oAjax.responseText);
				} else {
					if (fnFaild) fnFaild(oAjax.status);
				}
			}
		};
	}
	window['ZQJ']['ajax']= ajax;

	//show() 显示
	function show(obj) {
		obj.style.display = 'block';
	}
	window['ZQJ']['show']= show;
	//hide() 隐藏
	function hide(obj) {
		obj.style.display = 'none';
	}
	window['ZQJ']['hide']= hide;
	
	//动画
	function startMove(obj, json, fnEnd)
	{
		if(obj.timer)
		{
			clearInterval(obj.timer);
		}
		obj.timer=setInterval(function (){
			doMove(obj, json, fnEnd);
		}, 30);
		
		var oDate=new Date();
		
		if(oDate.getTime()-obj.lastMove>30)
		{
			doMove(obj, json, fnEnd);
		}
	}
	function getStyle(obj, attr)
	{
		if(obj.currentStyle)
		{
			return obj.currentStyle[attr];
		}
		else
		{
			return getComputedStyle(obj, false)[attr];
		}
	}
	function doMove(obj, json, fnEnd)
	{
		var iCur=0;
		var attr='';
		var bStop=true;	//假设运动已经该停止了
		
		for(attr in json)
		{
			if(attr=='opacity')
			{
				iCur=parseInt(100*parseFloat(getStyle(obj, 'opacity')));
			}
			else
			{
				iCur=parseInt(getStyle(obj, attr));
			}
			
			if(isNaN(iCur))
			{
				iCur=0;
			}
			
			var iSpeed=(json[attr]-iCur)/8;
			iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
			
			if(parseInt(json[attr])!=iCur)
			{
				bStop=false;
			}
			
			if(attr=='opacity')
			{
				obj.style.filter="alpha(opacity:"+(iCur+iSpeed)+")";
				obj.style.opacity=(iCur+iSpeed)/100;
			}
			else
			{
				obj.style[attr]=iCur+iSpeed+'px';
			}
		}
		
		if(bStop)
		{
			clearInterval(obj.timer);
			obj.timer=null;
			
			if(fnEnd)
			{
				fnEnd();
			}
		}
		
		obj.lastMove=(new Date()).getTime();
	}
	window['ZQJ']['startMove']= startMove;
	
	//缓冲运动（需要引用CSS方法）
	function bufferMove(obj, json, fn) {
		clearInterval(obj.timer);
		obj.timer = setInterval(function() {
			var bStop = true;
			for (var attr in json) {
				var iCur = 0;
				if (attr == 'opacity') {
					iCur = parseInt(parseFloat(css(obj, attr)) * 100); //css
				} else {
					iCur = parseInt(css(obj, attr));  //css
				}
				var iSpeed = (json[attr] - iCur) / 8;
				iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
				if (iCur != json[attr]) {
					bStop = false;
				}
				if (attr == 'opacity') {
					obj.style.filter = 'alpha(opacity:' + (iCur + iSpeed) + ')';
					obj.style.opacity = (iCur + iSpeed) / 100;
				} else {
					obj.style[attr] = iCur + iSpeed + 'px';
				}
			}
			if (bStop) {
				clearInterval(obj.timer);
				if (fn) {
					fn.call(obj);
				}
			}
		},
		30)
	}
	window['ZQJ']['bufferMove']= bufferMove;
	
	//弹性运动 （需CSS方法）
	function flexMove(obj, json,fn) {
		var iSpeed = 0;
		var iNum = 0;
		clearInterval(obj.timer);
		obj.timer = setInterval(function() {
			for (var i in json) {
				iSpeed += (json[i] - parseInt(css(obj, i))) / 5;   //CSS
				iSpeed *= 0.7;
				iNum += iSpeed;
				if (Math.abs(iSpeed)<1 && Math.abs(iNum-json[i])<1) {
					clearInterval(obj.timer);
					obj.style[i]=json[i]+'px';
					if (fn) {
						fn.call(obj);
					}
				}else {
					obj.style[i] = iNum + 'px';	
				}
			}
		},
		30);
	}
	window['ZQJ']['flexMove']= flexMove;
	
	//渐渐消失(需引用CSS方法)
	function fadeOut(obj, iTarget) {
		var itmp = 0;
		if (iTarget) {
			itmp = iTarget;
		}
		var timer = null;
		var iAlpha = css(obj, 'opacity') * 100;  //css
		if (iAlpha <= itmp) {
			return false;
		}
		clearInterval(timer);
		timer = setInterval(fnFadeOut, 30);
		function fnFadeOut() {
			if (iAlpha == itmp) {
				clearInterval(timer);
			}
			obj.style.opacity = iAlpha / 100;
			obj.style.filter = 'alpha(opacity=' + iAlpha + ')';
			iAlpha -= 10;
		}
	}
	window['ZQJ']['fadeOut']= fadeOut;
	
	//渐渐显示(需引用CSS方法)
	function fadeIn(obj, iTarget) {
		var itmp = 100;
		if (iTarget) {
			itmp = iTarget;
		}
		var timer = null;
		var iAlpha = css(obj, 'opacity') * 100;  //css
		if (iAlpha >= itmp) {
			return false;
		}
		clearInterval(timer);
		timer = setInterval(fnFadeIn, 30);
		function fnFadeIn() {
			if (iAlpha == itmp) {
				clearInterval(timer);
			}
			obj.style.opacity = iAlpha / 100;
			obj.style.filter = 'alpha(opacity=' + iAlpha + ')';
			iAlpha += 10;
		}
	}
	window['ZQJ']['fadeIn']= fadeIn;
	
	
	//滑动出现（需引用运动框架和CSS方法，布局限制，仅仅可以Y轴滑动）
	function slideDown(obj) {
		var aChild = obj.getElementsByTagName('*');
		var iTarget = aChild[0].offsetHeight * aChild.length;
		bufferMove(obj, {
			height: iTarget
		});
	}
	window['ZQJ']['slideDown']= slideDown;
	
	//滑动隐藏（需引用运动框架和CSS方法）
	function slideUp(obj) {
		bufferMove(obj, {
			height: 0
		});
	}
	window['ZQJ']['slideUp']= slideUp;
	
	//index()获取当前元素的键值
	function getIndex(obj) {
		var aBrother = obj.parentNode.children;
		var i = 0;
		for (i = 0; i < aBrother.length; i++) {
			if (aBrother[i] == obj) {
				return i;
			}
		}
	}
	window['ZQJ']['getIndex']= getIndex;
	
	//拖拽
	function drag(obj) {
		if (obj.offsetParent.nodeName.toLowerCase() == 'body' || obj.offsetParent.nodeName.toLowerCase() == 'html') {
			var iClientL = document.documentElement.clientWidth;
			var iClientT = document.documentElement.clientHeight;
			var parentL = obj.offsetLeft;
			var parentT = obj.offsetTop;
		} else {
			var parentRo = obj.offsetParent.getBoundingClientRect();
			var iClientL = obj.offsetParent.offsetWidth;
			var iClientT = obj.offsetParent.offsetHeight;
			var parentL = parentRo.left;
			var parentT = parentRo.top;
		}
		obj.onmousedown = function(ev) {
			var oEv = ev || event;
			var ro = obj.getBoundingClientRect();
			var iL = oEv.clientX - ro.left;
			var iT = oEv.clientY - ro.top;
			if (obj.setCapture) {
				obj.setCapture();
				obj.onmousemove = objMove;
				obj.onmouseup = function() {
					obj.onmousemove = null;
					obj.onmouseup = null;
					obj.releaseCapture();
				}
			} else {
				document.onmousemove = objMove;
				document.onmouseup = function() {
					document.onmousemove = null;
					document.onmouseup = null;
				}
			}
			return false;
			function objMove(ev) {
				var oEv = ev || event;
				var l = oEv.clientX - iL - parentL;
				var t = oEv.clientY - iT - parentT;
				if (l < 0) {
					l = 0;
				} else if (l > iClientL - obj.offsetWidth) {
					l = iClientL - obj.offsetWidth;
				}
				if (t < 0) {
					t = 0;
				} else if (t > iClientT - obj.offsetHeight) {
					t = iClientT - obj.offsetHeight;
				}
				obj.style.left = l + 'px';
				obj.style.top = t + 'px';
			}
		}
	}
	window['ZQJ']['drag']= drag;
	
	//拖拽-仿window(依赖CSS)
	function dragWin(obj) {
		if (obj.offsetParent.nodeName.toLowerCase() == 'body' || obj.offsetParent.nodeName.toLowerCase() == 'html') {
			var iClientL = document.documentElement.clientWidth;
			var iClientT = document.documentElement.clientHeight;
			var parentL = obj.offsetLeft;
			var parentT = obj.offsetTop;
		} else {
			var parentRo = obj.offsetParent.getBoundingClientRect();
			var iClientL = obj.offsetParent.offsetWidth;
			var iClientT = obj.offsetParent.offsetHeight;
			var parentL = parentRo.left;
			var parentT = parentRo.top;
		}
		obj.onmousedown = function(ev) {
			var oEv = ev || event;
			var ro = obj.getBoundingClientRect();
			var iL = oEv.clientX - ro.left;
			var iT = oEv.clientY - ro.top;
			var obj2=obj.cloneNode(true);
			obj2.style.opacity=0.5;
			obj2.style.filter='alpha(opacity=50)';
			if (isNaN(css(obj,'zIndex'))) {       //css
				css(obj2,{'zIndex':1});           //css
			}else {
				var iIndex=css(obj,'zIndex');     //css
				css(obj2,{'zIndex':iIndex+1});    //css
			}
			obj.parentNode.appendChild(obj2);
			if (obj2.setCapture) {
				obj2.setCapture();
				obj2.onmousemove = objMove;
				obj2.onmouseup = function() {
					obj.style.left = obj2.style.left;
					obj.style.top = obj2.style.top;
					obj.parentNode.removeChild(obj2);
					obj2.onmousemove = null;
					obj2.onmouseup = null;
					obj2.releaseCapture();
				}
			} else {
				document.onmousemove = objMove;
				document.onmouseup = function() {
					obj.style.left = obj2.style.left;
					obj.style.top = obj2.style.top;
					obj.parentNode.removeChild(obj2);
					document.onmousemove = null;
					document.onmouseup = null;
				}
			}
			return false;
			function objMove(ev) {
				var oEv = ev || event;
				var l = oEv.clientX - iL - parentL;
				var t = oEv.clientY - iT - parentT;
				if (l < 0) {
					l = 0;
				} else if (l > iClientL - obj2.offsetWidth) {
					l = iClientL - obj2.offsetWidth;
				}
				if (t < 0) {
					t = 0;
				} else if (t > iClientT - obj2.offsetHeight) {
					t = iClientT - obj2.offsetHeight;
				}
				obj2.style.left = l + 'px';
				obj2.style.top = t + 'px';
			}
		}
	}
	window['ZQJ']['dragWin']= dragWin;
	
	//图片异步加载 （需依赖bindEvent，使用方法：绑定到 window.onload里）
	function loadImg() {
		var aImg = document.getElementsByTagName('img');
		var aImgShow = [];
		for (var i = 0,l = aImg.length; i < l; ++i) {
			if (aImg[i].getAttribute('_src')) {
				aImgShow.push(aImg[i]);
			}
		}
		for (var i = 0,l = aImgShow.length; i < l; ++i) {
			aImgShow[i].show = true;
		}
		toChange();
		bindEvent(window, 'scroll', toChange);
		function toChange() {
			var iClient = document.documentElement.clientHeight;
			for (var j = 0,t = aImgShow.length; j < t; ++j) {
				var ro = aImgShow[j].getBoundingClientRect();
				if (ro.top < iClient && aImgShow[j].show) {
					aImgShow[j].src = aImgShow[j].getAttribute('_src');
					aImgShow[j].show = false;
				}
			}
		}
	}
	window['ZQJ']['loadImg']= loadImg;
	
	//判断obj是否出现在可视范围内(依赖posVis)
	function isVis(obj,sValue) {
		var iClientH=document.documentElement.clientHeight; 
		if (sValue) {
			if (iClientH>posVis(obj,'top') && obj[sValue]) {
				obj[sValue]=false;
				return true;
			}	
		}else {
			if (iClientH>posVis(obj,'top')) {
				return true;
			}
		}
	}
	window['ZQJ']['isVis']= isVis;
	
	//图片预加载
	function loadImage(url, callback) {
		var img = new Image();           //创建一个Image对象，实现图片的预下载
		img.src = url; 
		if (img.complete) {		         // 如果图片已经存在于浏览器缓存，直接调用回调函数
			 callback.call(img);                     // 直接返回，不用再处理onload事件
		}else {
			img.onload = function () {      //图片下载完毕时异步调用callback函数。
				callback.call(img);         //将回调函数的this替换为Image对象
				img.onload = null;
			}
		}
	}
	window['ZQJ']['loadImage']= loadImage;
	
	//移除制定class
	function reClass(obj, nClass){
		var classNames = obj.className.split(/\s+/);
		var pos = -1,
			i,
			len;
			
			for (i=0, len=classNames.length; i<len; i++){
				if(classNames[i] == nClass){
					pos = i;
					break;
				}
			}
		classNames.splice(pos,1);
		obj.className = classNames.join(" ");
	}
	window['ZQJ']['reClass']= reClass;
	
	//获取元素偏移量
	function getOffsetLR(element){
		var oLeft = element.offsetLeft;
		var oTop = element.offsetTop;
		
		var current = element.offsetParent;
		
		while (current !== null){
			oLeft += current.offsetLeft;
			oTop += current.offsetTop;
			current = current.offsetParent;
		}
		return {
			left: oLeft,
			top: oTop
		};
	}
	window['ZQJ']['getOffsetLR']= getOffsetLR;
	
	//获取元素各边界相对于视口的距离
	function getBoundingClientRect(elem){
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
		
		if(elem.getBoundingClientRect){
			if(arguments.callee.offset != "number"){
				var temp = document.createElement('div');
				temp.style.cssText = "position:absolute; left:0; top:0;";
				document.body.appendChild(temp);
				
				arguments.callee.offset = -temp.getBoundingClientRect().top - scrollTop;
				document.body.removeChild(temp);
				temp = null;
				
			}
			var rect = elem.getBoundingClientRect();
			var offset = arguments.callee.offset;
			
			return {
				left: rect.left + offset,
				right: rect.right + offset,
				top: rect.top + offset,
				bottom: rect.bottom + offset
			};
		}else{
			var actualLeft = getOffsetLR(elem).left;  //依赖getOffsetLR;
			var actualTop = getOffsetLR(elem).top;	//依赖getOffsetLR;
			
			return {
				left: actualLeft - scrollLeft,
				right: actualLeft + elem.offsetWidth - scrollLeft,
				top: actualTop - scrollTop,
				bottom: actualTop + elem.offsetHeight - scrollTop
			}
		}
	}
	window['ZQJ']['getBoundingClientRect']= getBoundingClientRect;
	
})();