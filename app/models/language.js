import DS from 'ember-data';

export default DS.Model.extend({
  language_code: DS.attr('string'),

  translation_key: Ember.computed('language_code', function() {
    return `language_code.${this.get('language_code')}`;
  })
});
