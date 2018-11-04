import React, {useState} from 'react'
import styled from 'styled-components'

import WsRtspVideo from './WsRtspVideo.jsx'

const VideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const VideoDisplay = styled.div`
  width: 320px;
  height: 180px;
  background: green;
`

const VideoControls = styled.div`
  text-align: center;
  width: 320px;
  height: 20px;
  background: black;
`

const WS_URI = 'ws://localhost:8854'
const RTSP_URI = 'rtsp://localhost:8554/test'

function VideoPlayer ({
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
    <VideoContainer>
      <VideoDisplay>
        <WsRtspVideo
          key={key}
          play={play}
          ws={WS_URI}
          rtsp={rtsp}
        />
      </VideoDisplay>
      <VideoControls>
        <button onClick={toggle}>{play ? 'Pause!' : 'Play!'}</button>
        <button onClick={stop}>Stop</button>
        <button onClick={refresh}>Refresh</button>
      </VideoControls>
    </VideoContainer>
  )
}

export default VideoPlayer
