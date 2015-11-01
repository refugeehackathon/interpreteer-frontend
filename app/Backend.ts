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
				{ title: 'Übersetzung Bafög-Antrag', description: '10117 Berlin' },
				{ title: 'Unterstützung Elternabend (Kindergarten)', description: '14478 Potsdam' }
			],

			matchingRequests: [
				{ title: 'Übersetzung Bafög-Antrag', description: '10117 Berlin' },
				{ title: 'Unterstützung Elternabend (Kindergarten)', description: '14478 Potsdam' }
			]
		}

		constructor() {
		}

		postData(model: string, data: any, onSuccess: Function) {

			onSuccess({status: 'success'});

			return;

			$.ajax(
				basePath.api + model + '/',
				{
					type: 'POST',
					data: JSON.stringify(data),
					processData: false,
					contentType: 'application/json',
					success: (response) => { onSuccess(data); }
				});
		}

		getData(model: String, onSuccess: Function, onError: Function = null) {

			//return dummy data until backend is properly implemented
			if (model == "offers" || model == "matchingOffers" || model == "matchingRequests") {

				onSuccess(this.dummy[model]);

				return;
			}

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