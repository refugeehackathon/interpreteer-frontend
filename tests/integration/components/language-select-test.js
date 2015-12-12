import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('language-select', 'Integration | Component | language select', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{language-select}}`);

  assert.equal(this.$().text().trim().indexOf("German") > -1, true);
  assert.equal(this.$().text().trim().indexOf("English") > -1, true);
});
