/// <reference path="ref/jquery/jquery.d.ts" />

module Backend {

	declare var basePath: any;

	export class Api {

		//until the api is properly implemented, we gonna use a dummy object here
		dummy: any = {
			users: [
			],

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
		}

		constructor() {
		}

		postData(model: string, data: any, onSuccess: Function) {
			$.post(basePath.api + model, JSON.stringify(data), (response) => {
				onSuccess(data);
			}, "json")
		}

		getData(model: String, onSuccess: Function, onError: Function = null) {

			var url: string = basePath.api + model + '/?format=json';

			$.ajax({
				url: url,
				//dataType: 'json',
				success: (result) =>
					onSuccess(result),
				error: (request, textStatus, errorThrown) => {

					console.error(errorThrown.toString());

					//unitl the api is properly implemented, we just return a dummy object
					onSuccess(this.dummy[model]);

					return;

					if (onError != null)
						onError(errorThrown);
				}
			});
		}
	}
}