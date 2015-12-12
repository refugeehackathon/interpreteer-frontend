import Ember from 'ember';
const { Component, computed, inject } = Ember;

export default Ember.Component.extend({
  tagName: 'li',
  classNames: [ 'language-select', 'dropdown' ],
  i18n: inject.service(),
  current: computed.readOnly('i18n.locale'),

  locales: computed('i18n.locales', function() {
    const i18n = this.get('i18n');
    return this.get('i18n.locales').map(function (loc) {
      return { id: loc, text: i18n.t('language_code.' + loc) };
    });
  }),

  locale: computed('i18n.locale', function() {
      return this.get('i18n').t('language_code.' + this.get('i18n.locale'))
  }),

  // It would be nice to do this with `{{action "setLocale" on="change"}}`
  // in the template, but the template doesn't include the component's own
  // tag yet. See https://github.com/emberjs/rfcs/pull/60
  change: function(locId) {
    this.get('i18n').set('locale', locId);
  }
});
