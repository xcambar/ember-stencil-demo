import Controller from '@ember/controller';

export default Controller.extend({
  greeting: 'Hi',
  name: 'Ember',
  withSlot: true,
  actions: {
    toggleGreeting() {
      this.set('greeting', this.greeting === 'Hi' ? 'Hello' : 'Hi')
    },
    toggleSlot() {
      this.toggleProperty('withSlot')
    }
  }
});
