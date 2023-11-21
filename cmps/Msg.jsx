

import { SET_MSG } from '../store/reducers/todo.reducer.js'

const { useState, useEffect, useRef } = React
const { useSelector, useDispatch } = ReactRedux

export function Msg() {
  const dispatch = useDispatch()
  const msg = useSelector(storeState => storeState.todoModule.msg)
  // const timeoutId = useRef()

  const timeoutIdRef = useRef()

  useEffect(() => {
    // console.log('useEffect:')
    if (timeoutIdRef.current) {
      timeoutIdRef.current = null
      clearTimeout(timeoutIdRef.current)
    }
    timeoutIdRef.current = setTimeout(closeMsg, 2000)

    //   const timeoutId = setTimeout(closeMsg, 2000)
    //   return () => {
    //     clearTimeout(timeoutId)
    // }
  }, [])

  function closeMsg() {
    console.log('closeMsg:')
    dispatch({ type: SET_MSG, msg: { ...msg, isShow: false } })
    // clearTimeout(timeoutId.current)
  }

  if (!msg.isShow) return <span></span>
  return (
    <section className={`msg ${msg.type}`}>
      aaaaaaaaaaaaaaaaaaaaaaaaaaaa
      <button onClick={closeMsg}>x</button>
      {msg.txt}
    </section>
  )
}
