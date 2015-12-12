import DRFAdapter from 'ember-django-adapter/adapters/drf';
import ENV from "interpreteer-ember/config/environment";

export default DRFAdapter.extend({
  host: ENV.APP.host,
  namespace: 'api'
});
