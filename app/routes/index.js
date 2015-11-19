import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      requests: this.store.findAll('request')//,
      //offers: this.store.findAll('offer')
    });
  }
});

/*export default Ember.Route.extend({
  loadPlugin: function() {
    // Use run loop if you need to setup the DOM first
    Ember.run.scheduleOnce('afterRender', this, function() {
      $('#myTabs a[href="#request"]').tab('show')
      $('#myTabs a[href="#offer"]').tab('show')
    });
  }.on('init')
});*/
