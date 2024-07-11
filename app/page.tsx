'use client';

import { Component, ReactNode } from 'react';

class Button extends Component<{ text: string; onClick?: () => {} }> {
  render(): ReactNode {
    return (
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-max"
        onClick={this.props.onClick}
      >
        {this.props.text}
      </button>
    );
  }
}

export default function Home() {
  return (
    <>
      <div className="container mx-auto py-10">
        <Button text={'Add to Cart'}></Button>
      </div>
    </>
  );
}
