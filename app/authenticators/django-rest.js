// entirely based on https://github.com/zaubererty/ember-cli-django-rest-auth/blob/master/app/authenticators/django-rest.js
// just made some changes in order to make this code work

import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import ENV from 'interpreteer-ember/config/environment';

export default Base.extend({

  init: function() {
    var globalConfig = ENV['simple-auth'];
    this.serverTokenEndpoint = globalConfig.serverTokenEndpoint;
    this.identificationFieldName = globalConfig.identificationFieldName;
    this.passwordFieldName = globalConfig.passwordFieldName;
  },

  authenticate: function(credentials) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      var data = {
        [this.identificationFieldName]: credentials.identification,
        [this.passwordFieldName]: credentials.password,
      };
      this.makeRequest(this.serverTokenEndpoint, data).then(function(response) {
        Ember.run(function() {
          resolve(response);
        });
      }, function(error) {
        Ember.run(function() {
          reject(error);
        });
      });
    });
  },

  restore: function(data) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (!Ember.isEmpty(data.access_token)) {
        resolve(data);
      } else {
        reject();
      }
    });
  },

  invalidate: function() {
    function success(resolve) {
      resolve();
    }
    return new Ember.RSVP.Promise(function(resolve) {
      success(resolve);
    });
  },

  makeRequest: function(url, data) {
    return Ember.$.ajax({
      url:         url,
      type:        'POST',
      data:        data,
      dataType:    'json',
      contentType: 'application/x-www-form-urlencoded'
    });
  },
});
