var dojoConfig=(function(){
	
	var href = location.href.split("/");
		href.pop();
		href = href.join("/");

	var indexPages = href.indexOf("/pages", 0)
	if (indexPages >= 0) {
		href = href.substring(0, indexPages).trim("/");
	}

	return {
		async:true,
        isDebug: true,
		packages:[{
			name:"pages",
			location:  href+ '/pages'
		}]
	}
})()