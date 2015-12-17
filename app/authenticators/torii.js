import Ember from 'ember';
import Torii from 'ember-simple-auth/authenticators/torii';
import raw from 'ic-ajax';
import ENV from 'interpreteer-ember/config/environment';

export default Torii.extend({
  torii: Ember.inject.service('torii'),

  authenticate() {
    return new Ember.RSVP.Promise((resolve, reject) => {
      this._super(...arguments).then((data) => {
        raw({
          url: ENV['simple-auth'].facebookEndpoint,
          type: 'POST',
          dataType: 'json',
          data: { 'grant_type': 'facebook_auth_code', 'auth_code': data.authorizationCode }
        }).then((response) => {
          resolve({
            access_token: response.access_token,
            provider: data.provider
          });
        }, reject);
      }, reject);
    });
  }
});
