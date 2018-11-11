import React, {useRef} from 'react'
import styled from 'styled-components'

import useUserActive from './useUserActive.js'

import Button from './Button.jsx'
import Play from './img/play.svg'
import Pause from './img/pause.svg'
import Stop from './img/stop.svg'
import Replay from './img/replay.svg'

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
  height: 32px;
  background: #00000066;
  opacity: ${(props) => props.visible ? 1 : 0};
  transition: opacity 0.3s ease-in-out;
  display: flex;
`

function Controls ({
  play,
  src,
  onPlay,
  onStop,
  onRefresh
}) {
  const controlArea = useRef(null)
  const userActive = useUserActive(controlArea)

  return (
    <ControlArea ref={controlArea}>
      <ControlBar visible={!play || userActive}>
        <Button onClick={onPlay}>{play ? <Pause /> : <Play />}</Button>
        {src && <Button onClick={onStop}><Stop /></Button>}
        {src && <Button onClick={onRefresh}><Replay /></Button>}
      </ControlBar>
    </ControlArea>
  )
}

export default Controls
