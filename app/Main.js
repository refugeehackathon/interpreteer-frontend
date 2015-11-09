var App = (function () {
    function App() {
        this.filter = ko.observable(null);

        this.user = ko.observable(null);

        this.offers = ko.observableArray();
        this.requests = ko.observableArray();

        this.matchingOffers = ko.observableArray();
        this.matchingRequests = ko.observableArray();
    }
    App.prototype.init = function () {
        var _this = this;
        //cleanup webflow-dummys
        $('.w-dyn-items[data-bind] > .w-dyn-item:not(:first)').remove();

        //todo: handle request args
        var params = {};
        window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (str, key, value) {
            params[key] = value;
        });

        $.extend(params, {});

        this.api = new Backend.Api();

        this.api.getData('requests', function (result) {
            _this.requests(result);
        });
        this.api.getData('offers', function (result) {
            _this.offers(result);
        });

        this.api.getData('matchingOffers', function (result) {
            _this.matchingOffers(result);
        });
        this.api.getData('matchingRequests', function (result) {
            _this.matchingRequests(result);
        });

        this.api.getData('users', function (result) {
            _this.user(result[0]);
        });
    };

    App.prototype.run = function () {
        console.info('app.init()');

        this.init();

        console.info('app.run()');

        ko.applyBindings(this);
    };

    App.prototype.doSearch = function () {
    };

    App.prototype.resetFilter = function () {
    };

    App.prototype.onSubmitRequest = function () {
        var _this = this;
        //grab form data as JSON here
        var formData = $('#wf-form-request-form').serializeJSON();

        $.extend(formData, {
            "location": {
                "location": "",
                "zip_code": formData.zipcode
            },
            "kind": 0,
            "known_languages": ["en", "de", "fr"]
        });
        formData["start_time"] = new Date(formData["start_time"]);

        // TODO fixme
        formData["end_time"] = formData["start_time"];

        this.api.postData('requests', formData, function (result) {
            if (result.status == 'success') {
                _this.goto('offers');
            }
        });
    };

    App.prototype.onSubmitOffer = function () {
        var _this = this;
        //grab form data as JSON here
        var formData = $('#wf-form-request-form-2').serializeJSON();

        $.extend(formData, {
            "start_time": "2015-11-01 10:00",
            "end_time": "2015-11-01 18:00"
        });

        this.api.postData('offers', formData, function (result) {
            if (result.status == 'success') {
                _this.goto('requests');
            }
        });
    };

    App.prototype.goto = function (url) {
        document.location.pathname = "/" + url;
    };
    return App;
})();
