/// <reference path="ref/jquery/jquery.d.ts" />
/// <reference path="ref/knockout/knockout.d.ts" />
/// <reference path="ref/require.d.ts" />

/// <reference path="Backend.ts" />

declare var basePath: any;

declare var requirejsconfig: any;

class App {

	//bindable vars

	//contains alls matching items
	user: KnockoutObservable<any>;

	//todo: wrap this up in a structured object, binding to a user instance did not work for now :(
	offers: KnockoutObservableArray<any>;

	requests: KnockoutObservableArray<any>;

	filter: KnockoutObservable<string>;

	matchingOffers: KnockoutObservableArray<any>;
	matchingRequests: KnockoutObservableArray<any>;

	notifications: KnockoutObservableArray<any>;

	//internal api wrapper
	api: Backend.Api;

	constructor() {

		this.filter = ko.observable(null);

		this.user = ko.observable(null);

		this.offers = ko.observableArray();
		this.requests = ko.observableArray();

		this.matchingOffers = ko.observableArray();
		this.matchingRequests = ko.observableArray();
	}

	init() {
		
		//cleanup webflow-dummys
		$('.w-dyn-items[data-bind] > .w-dyn-item:not(:first)').remove();

		//todo: handle request args
		var params: any = {}; (<any>window.location.search).replace(/[?&]+([^=&]+)=([^&]*)/gi, function (str, key, value) { params[key] = value; });

		$.extend(params, {});

		this.api = new Backend.Api();

		this.api.getData('requests', (result) => { this.requests(result); });
		this.api.getData('offers', (result) => { this.offers(result); });

		this.api.getData('matchingOffers', (result) => { this.matchingOffers(result); });
		this.api.getData('matchingRequests', (result) => { this.matchingRequests(result); });

		this.api.getData('users', (result) => { this.user(result[0]); });
	}
	
	run() {

		console.info('app.init()');

		this.init();

		console.info('app.run()');

		ko.applyBindings(this);
	}

	doSearch() {
	}

	resetFilter() {
	}

	onSubmitRequest() {

		//grab form data as JSON here
		var formData = (<any>$('#wf-form-request-form')).serializeJSON();

		$.extend(formData, {
			"location": {
				"location": "",
				"zip_code": formData.zipcode
			},
			"kind": "0",
			"start_time": "2015-11-01T10:00:00",
			"end_time": "2015-11-01T18:00:00",
			"direction": "2",
			"required_language": "en",
			"known_languages": ["en", "de" , "fr"]
		});

		this.api.postData('requests', formData, (result: any) => {

			if (result.status == 'success') {
				this.goto('offers')
			}
		});
	}

	onSubmitOffer() {

		//grab form data as JSON here
		var formData = (<any>$('#wf-form-request-form-2')).serializeJSON();

		$.extend(formData, {
			"location": 10117, 
			"kind": 0,
			"start_time": "2015-11-01 10:00",
			"end_time": "2015-11-01 18:00"
		});

		this.api.postData('offers', formData, (result: any) => {

			if (result.status == 'success') {
				this.goto('requests')
			}
		});
	}

	goto(url: string) {
		document.location.pathname = "/" + url;
	}
}