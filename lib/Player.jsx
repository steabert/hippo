import React, {useState} from 'react'

import {Container, Layer} from './Container.jsx'
import WsRtspVideo from './WsRtspVideo.jsx'
import WsRtspCanvas from './WsRtspCanvas.jsx'
import Controls from './Controls.jsx'
import Feedback from './Feedback.jsx'

const WS_URI = 'ws://localhost:8854'
const RTSP_URI_H264 = 'rtsp://localhost:8554/test'
const RTSP_URI_MJPEG = 'rtsp://localhost:8555/test'

function Player ({
  ended,
  onEnded,
  onPlaying,
  onCanPlay
}) {
  const [play, setPlay] = useState(false)
  const [key, setKey] = useState(0)
  const [src, setSrc] = useState('')
  const [waiting, setWaiting] = useState(false)

  const toggle = () => {
    if (play) {
      setPlay(false)
    } else {
      setWaiting(true)
      setSrc(RTSP_URI_MJPEG)
      setPlay(true)
    }
  }
  const refresh = () => {
    setPlay(true)
    setKey(key + 1)
    setWaiting(true)
  }
  const stop = () => {
    setPlay(false)
    setSrc('')
  }

  return (
    <Container>
      <Layer>
        <WsRtspCanvas
          key={key}
          play={play}
          ws={WS_URI}
          rtsp={src}
          onPlaying={() => setWaiting(false)}
        />
      </Layer>
      <Layer>
        <Feedback waiting={waiting} />
      </Layer>
      <Layer>
        <Controls
          play={play}
          src={src}
          onPlay={toggle}
          onStop={stop}
          onRefresh={refresh}
        />
      </Layer>
    </Container>
  )
}

export default Player
