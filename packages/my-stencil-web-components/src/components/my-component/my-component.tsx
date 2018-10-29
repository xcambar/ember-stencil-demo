import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {
  @Prop() greeting: string = 'Hello';

  render() {
    return <div>
      {this.greeting} <slot name="my-name">🤓</slot>!
    </div>;
  }
}
