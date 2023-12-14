"use client";

import { useState } from "react";


export default function Home() {
  const [count, setCount] = useState(4)
  return (
    <>
    <Counter
    count = {count}
    updateCount={()=>{
      setCount(count + 1)
    }
  }
  resetCount = {()=>{
    setCount (0)
  }}
    />
    </>
  )
}

export const Counter = (props)=>{
  return (
    <>
    <h1>{props.count}</h1>
    <button onClick={props.updateCount}>Toogoo nemeh</button>
    <button onClick={props.resetCount}>resetleh</button>
    </>
  )
}
