import DS from 'ember-data';

export default DS.Model.extend({
  sessionKey: DS.attr('string'),
  username: DS.attr('string'),
  email: DS.attr('string'),
  first_name: DS.attr('string'),
  last_name: DS.attr('string'),
  offers: DS.hasMany('offer'),
  requests: DS.hasMany('requests')
});
