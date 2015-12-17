import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),

  actions: {
    authenticateWithDjango() {
      let { identification, password} = this.getProperties('identification', 'password');

      this.get('session').authenticate('authenticator:django-rest', {identification: identification, password: password}).then((data) => {
        console.log(data);
      }).catch(() => {
        this.setProperties({
          'passwordError': true,
          'emailError': true,
          'errorMessage': 'Username and Password didn\'t match. Please try again.'
        });
      });
    },

    authenticateWithFacebook() {
      this.get('session').authenticate('authenticator:torii', 'facebook').catch((reason) => {
        this.set('errorMessage', reason.responseText);
      });
    }
  }

});
