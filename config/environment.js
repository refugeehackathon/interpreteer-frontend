/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'interpreteer-ember',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      host: 'https://interpreteer.herokuapp.com'
    }
  };

  ENV.i18n = {
    defaultLocale: "en"
  };

  ENV.torii = {
    providers: {
      'facebook-oauth2': {
        apiKey: '1802408876653301'
      }
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.APP.API_HOST = 'http://localhost:8000';
    ENV['simple-auth'] = {
      authorizer: 'authorizer:django-rest',
      serverTokenEndpoint: ENV.APP.API_HOST + '/auth/login/',
      facebookEndpoint: ENV.APP.API_HOST + '/auth/facebook/',
      crossOriginWhitelist: ['http://localhost:4200', 'http://localhost:8000'],
      identificationFieldName: 'username',
      passwordFieldName: 'password'
    }
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
