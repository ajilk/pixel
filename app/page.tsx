'use client'

import { Component, ReactNode } from "react"

class A extends Component {
  render(): ReactNode {
    return <h1>hello</h1>
  }
}

export default function Home() {
  const items: A[] = [1, 2, 3].map((v: number) => new A({}));
  return items.map(v => v.render());
}
