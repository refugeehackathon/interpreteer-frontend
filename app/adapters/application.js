import DRFAdapter from 'ember-django-adapter/adapters/drf';
import ENV from "interpreteer-ember/config/environment";
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DRFAdapter.extend(DataAdapterMixin, {
  host: ENV.APP.API_HOST,
  namespace: 'api',
  authorizer: 'authorizer:application'
});
