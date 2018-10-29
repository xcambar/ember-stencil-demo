import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'other-component',
  styleUrl: 'other-component.css',
  shadow: true
})
export class MyComponent {
  @Prop() greeting: string = 'Bye';

  render() {
    return <div>
      {this.greeting} <slot name="my-name">🤓</slot>!
    </div>;
  }
}

