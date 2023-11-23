

import { SET_MSG } from '../store/reducers/todo.reducer.js'

const { useState, useEffect, useRef } = React
const { useSelector, useDispatch } = ReactRedux

export function Msg() {
  const dispatch = useDispatch()
  const msg = useSelector(storeState => storeState.todoModule.msg)

  useEffect(() => {
    if (msg) {
      var timeoutId = setTimeout(closeMsg, 2000)
    }
    return () => {
      clearTimeout(timeoutId)
    }
  }, [msg])

  function closeMsg() {
    dispatch({ type: SET_MSG, msg: null })
  }

  if (!msg) return <span></span>
  return (
    <section className={`msg ${msg.type}`}>
      {msg.txt}
      <button onClick={closeMsg}>x</button>
    </section>
  )
}
