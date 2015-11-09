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
                    { title: 'Übersetzung Bafög-Antrag', description: '10117 Berlin' },
                    { title: 'Unterstützung Elternabend (Kindergarten)', description: '14478 Potsdam' }
                ],
                matchingRequests: [
                    { title: 'Übersetzung Bafög-Antrag', description: '10117 Berlin' },
                    { title: 'Unterstützung Elternabend (Kindergarten)', description: '14478 Potsdam' }
                ]
            };
        }
        Api.prototype.postData = function (model, data, onSuccess) {
            onSuccess({ status: 'success' });

            $.ajax(basePath.api + model + '/', {
                type: 'POST',
                data: JSON.stringify(data),
                processData: false,
                contentType: 'application/json',
                success: function (response) {
                    onSuccess(data);
                },
                error: function (jqXhr, textStatus, error) {
                    console.log(textStatus);
                    console.log(jqXhr);
                }

            });
        };

        Api.prototype.getData = function (model, onSuccess, onError) {
            var _this = this;
            if (typeof onError === "undefined") { onError = null; }
            if (model == "offers" || model == "matchingOffers" || model == "matchingRequests") {
                onSuccess(this.dummy[model]);

                return;
            }

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
