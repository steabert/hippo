import { useState, useEffect } from 'react'

/**
 * Use a state set by an event:
 *  - default state is false
 *  - when event fired, state is true
 *
 * @param {Object} ref A React ref for the element
 * @param {String} eventName The name of the event setting the state to true
 * @return {Array} The boolean state and a function to switch state to false
 */
const useEventState = (ref, eventName) => {
  const [eventState, setEventState] = useState(false)

  const setEventStateTrue = () => setEventState(true)
  const setEventStateFalse = () => setEventState(false)

  useEffect(() => {
    if (!eventState) {
      const el = ref.current
      el.addEventListener(eventName, setEventStateTrue)
      return () => {
        el.removeEventListener(eventName, setEventStateTrue)
      }
    }
  }, [eventState])

  return [eventState, setEventStateFalse]
}

export default useEventState
