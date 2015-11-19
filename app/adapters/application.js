import DRFAdapter from 'ember-django-adapter/adapters/drf';

export default DRFAdapter.extend({
  host: 'http://localhost:8000',
  namespace: 'api'
});
