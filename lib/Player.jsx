import React, {useState} from 'react'

import {Container, Layer} from './Container.jsx'
import WsRtspVideo from './WsRtspVideo.jsx'
import Controls from './Controls.jsx'

const WS_URI = 'ws://localhost:8854'
const RTSP_URI = 'rtsp://localhost:8554/test'

function Player ({
  ended,
  onEnded,
  onPlaying,
  onCanPlay
}) {
  const [play, setPlay] = useState(false)
  const [key, setKey] = useState(0)
  const [rtsp, setRtsp] = useState(RTSP_URI)
  const toggle = () => {
    if (play) {
      setPlay(false)
    } else {
      setRtsp(RTSP_URI)
      setPlay(true)
    }
  }
  const refresh = () => {
    setKey(key + 1)
  }
  const stop = () => {
    setPlay(false)
    setRtsp('')
  }
  return (
    <Container>
      <Layer>
        <WsRtspVideo
          key={key}
          play={play}
          ws={WS_URI}
          rtsp={rtsp}
        />
      </Layer>
      <Layer>
        <Controls
          play={play}
          onPlay={toggle}
          onStop={stop}
          onRefresh={refresh}
        />
      </Layer>
    </Container>
  )
}

export default Player
