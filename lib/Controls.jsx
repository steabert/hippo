import React, {useRef} from 'react'
import styled from 'styled-components'

import useUserActive from './useUserActive.js'

const ControlArea = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

const ControlBar = styled.div`
  text-align: center;
  width: 100%;
  height: 20px;
  background: black;
  opacity: ${(props) => props.visible ? 1 : 0};
  transition: opacity 0.3s ease-in-out;
`

function Controls ({
  play,
  onPlay,
  onStop,
  onRefresh
}) {
  const controlArea = useRef(null)
  const userActive = useUserActive(controlArea)

  return (
    <ControlArea ref={controlArea}>
      <ControlBar visible={!play || userActive}>
        <button onClick={onPlay}>{play ? 'Pause!' : 'Play!'}</button>
        <button onClick={onStop}>Stop</button>
        <button onClick={onRefresh}>Refresh</button>
      </ControlBar>
    </ControlArea>
  )
}

export default Controls
