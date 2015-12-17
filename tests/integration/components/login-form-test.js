import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('login-form', 'Integration | Component | login form', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{login-form}}`);

  assert.equal(this.$().text().trim().indexOf('OR') > -1, true);
  assert.equal(this.$().text().trim().indexOf('Log In') > -1, true);
  assert.equal(this.$().text().trim().indexOf('Forgot Password?') > -1, true);
  assert.equal(this.$().text().trim().indexOf('Create Account') > -1, true);
});
