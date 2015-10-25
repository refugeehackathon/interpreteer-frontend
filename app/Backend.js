/// <reference path="ref/jquery/jquery.d.ts" />
var Backend;
(function (Backend) {
    var Api = (function () {
        function Api() {
            //until the api is properly implemented, we gonna use a dummy object here
            this.dummy = {
                users: [],
                offers: [
                    { avatar: basePath.img + 'business-person-807754.jpg', title: 'Übersetzung Dokumente deutsch (A3)', summary: 'Sprachen: deutsch, arabisch' },
                    { avatar: basePath.img + 'example-bg.png', title: 'Tandem-Workshop Deutsch für den Restaurantbesuch', summary: 'Sprachen: deutsch, arabisch, englisch' }
                ],
                matchingOffers: [
                    { avatar: basePath.img + 'business-person-807754.jpg', title: 'Übersetzung Dokumente deutsch (A3)', summary: 'Sprachen: deutsch, arabisch' },
                    { avatar: basePath.img + 'sp-information-technology-img.png', title: 'Tandem-Workshop Deutsch für den Restaurantbesuch', summary: 'Sprachen: deutsch, arabisch, englisch' },
                    { avatar: basePath.img + 'example-bg.png', title: 'Unterstützung (Dolmetscher) Vostellungsgespräch', summary: 'Sprachen: arabisch, englisch' }
                ],
                requests: [
                    { title: 'Übersetzung Bafög-Antrag', summary: '10117 Berlin' },
                    { title: 'Unterstützung Elternabend (Kindergarten)', summary: '14478 Potsdam' }
                ]
            };
        }
        Api.prototype.postData = function (model, data, onSuccess) {
            $.post(basePath.api + model, JSON.stringify(data), function (response) {
                onSuccess(data);
            }, "json");
        };

        Api.prototype.getData = function (model, onSuccess, onError) {
            var _this = this;
            if (typeof onError === "undefined") { onError = null; }
            var url = basePath.api + model + '/?format=json';

            $.ajax({
                url: url,
                //dataType: 'json',
                success: function (result) {
                    return onSuccess(result);
                },
                error: function (request, textStatus, errorThrown) {
                    console.error(errorThrown.toString());

                    //unitl the api is properly implemented, we just return a dummy object
                    onSuccess(_this.dummy[model]);

                    return;

                    if (onError != null)
                        onError(errorThrown);
                }
            });
        };
        return Api;
    })();
    Backend.Api = Api;
})(Backend || (Backend = {}));
//# sourceMappingURL=Backend.js.map
