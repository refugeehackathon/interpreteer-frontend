import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),
  i18n: Ember.inject.service('i18n'),

  actions: {
    authenticateWithDjango() {
      let { identification, password} = this.getProperties('identification', 'password');

      this.get('session').authenticate('authenticator:django-rest', {identification: identification, password: password}).then((data) => {
        console.log(data);
      }).catch(() => {
        this.setProperties({
          'passwordError': true,
          'emailError': true,
          'errorMessage': this.get('i18n').t('login.wrong_credentials')
        });
      });
    },

    authenticateWithFacebook() {
      this.get('session').authenticate('authenticator:torii', 'facebook').catch((reason) => {
        this.set('errorMessage', reason.responseText);
      });
    },

    emailPlaceholder() {
      return this.get('i18n').t('login.email_placeholder');
    },

    passwordPlaceholder() {
      return this.get('i18n').t('login.password_placeholder');
    }
  }

});
