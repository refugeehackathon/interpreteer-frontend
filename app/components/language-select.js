import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: [ 'language-select', 'dropdown' ],
  i18n: Ember.inject.service(),
  current: Ember.computed.readOnly('i18n.locale'),

  locales: Ember.computed('i18n.locales', function() {
    const i18n = this.get('i18n');
    return this.get('i18n.locales').map(function (loc) {
      return { id: loc, text: i18n.t('language_code.' + loc) };
    });
  }),

  locale: Ember.computed('i18n.locale', function() {
      return this.get('i18n').t('language_code.' + this.get('i18n.locale'));
  }),

  change: function(locId) {
    this.get('i18n').set('locale', locId);
  }
});
