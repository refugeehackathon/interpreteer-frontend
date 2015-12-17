import Ember from 'ember';


export default Ember.Service.extend({
  session: Ember.inject.service('session'),
  store: Ember.inject.service('store'),

  loadCurrentUser() {
    return new Ember.RSVP.Promise((resolve, reject) => {
      const userID = this.get('session.data.authenticated.user_id');
      if (!Ember.isEmpty(userID)) {
        return this.get('store').find('user', userID).then((user) => {
          this.set('user', user);
          resolve();
        }, reject);
      } else {
        resolve();
      }
    });
  }
});
