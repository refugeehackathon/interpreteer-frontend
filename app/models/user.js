import DS from 'ember-data';

export default DS.Model.extend({
  username: DS.attr('string'),
  email: DS.attr('string'),
  offers: DS.hasMany('offer'),
  requests: DS.hasMany('requests')
});
