require([
	"dojo/query",
    "dojo/_base/lang",
	"dojo/_base/connect",
	'dojo/dom-construct',
	'pages/widget/nav_widget',
    "dojo/NodeList-dom",
    "dojo/domReady!"
	], function (query,lang,connect, domConstruct,navWidget) {
		var greetingNode = query('#greeting')[0];

		domConstruct.place('<p> Dojo!</p>', greetingNode);

		//greetingNode.addContent("<p> :-(</p>");

		var div_nav = query("#nav");
        var nav=new navWidget({}, div_nav[0]);

	});

	//销毁Widget
	function _destroyWidget (id) {

		var widget = dijit.registry.byId(id);
		if (widget) {
			widget.destroyRecursive(true);
		}
	}