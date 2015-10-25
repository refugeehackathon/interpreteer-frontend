var requirejsconfig = {
	baseUrl: './js',
	paths: {
		app: '../app',
		data: '../data'
	}
}

require.config(requirejsconfig);

//define some global paths
var basePath = {
	data: 'data/',
	img: 'images/',
	api: 'https://interpreteer.herokuapp.com/'
}

require(['jquery', 'knockout-3.3.0', 'js/serializejson.js', 'app/Backend', 'app/Main', 'domReady!'], function ($, ko) {

	//register modules globally
	window.$ = $;
	window.ko = ko;

	var app = new App();

	app.run();
});