require.config(requirejsconfig);

//define some global paths
var basePath = {
	data: 'data/',
	img: 'images/',
	api: 'api/'
};

require(['jquery', 'knockout-3.3.0', 'lang', 'serializejson', 'app/Backend', 'app/Main', 'domReady!'], function ($, ko) {

	//register modules globally
	window.$ = $;
	window.ko = ko;

	var app = new App();

	app.run();
});
