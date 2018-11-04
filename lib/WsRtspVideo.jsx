import React, {useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import debug from 'debug'

import {pipelines} from 'media-stream-library'

const debugLog = debug('hippo:ws-rtsp-video')

const VideoNative = styled.video`
  object-fit: contain;
  width: 100%;
`

/**
 * Properties:
 *
 * play: indicated the _intended_ playback state
 * ws/rtsp: src URIs for WebSocket/RTP server
 *
 * Internal state:
 * canplay: there is enough data on the video element to play
 * playing: the video element playback is progressing
 */

function WsRtspVideo ({
  play,
  ws,
  rtsp,
  autoPlay,
  muted
}) {
  const videoRef = useRef(null)
  const [pipeline, setPipeline] = useState(null)
  const [canplay, setCanplay] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [fetching, setFetching] = useState(false)

  useEffect(() => {
    if (play && canplay && !playing) {
      debugLog('play')
      videoRef.current.play()
    } else if (!play && playing) {
      debugLog('pause')
      videoRef.current.pause()
      setPlaying(false)
    }
  })

  useEffect(() => {
    if (!canplay) {
      const setCanplayTrue = () => {
        debugLog('canplay')
        setCanplay(true)
      }
      const videoEl = videoRef.current
      videoEl.addEventListener('canplay', setCanplayTrue)
      return () => {
        videoEl.removeEventListener('canplay', setCanplayTrue)
      }
    }
  }, [videoRef.current, canplay])

  useEffect(() => {
    if (!playing) {
      const setPlayingTrue = () => {
        debugLog('playing')
        setPlaying(true)
      }
      const videoEl = videoRef.current
      videoEl.addEventListener('playing', setPlayingTrue)
      return () => {
        videoEl.removeEventListener('playing', setPlayingTrue)
      }
    }
  }, [videoRef.current, playing])

  useEffect(() => {
    if (!ws || !rtsp) {
      debugLog('src removed')
      videoRef.current.src = ''
      setCanplay(false)
      setPlaying(false)
    } else if (videoRef.current) {
      debugLog('create pipeline')
      const pipeline = new pipelines.Html5VideoPipeline({
        ws: { uri: ws },
        rtsp: { uri: rtsp },
        mediaElement: videoRef.current
      })
      setPipeline(pipeline)

      return () => {
        debugLog('destroy pipeline')
        pipeline.close()
        setPipeline(null)
        setFetching(false)
      }
    }
  }, [ws, rtsp])

  if (play && pipeline && !fetching) {
    pipeline.ready.then(() => {
      debugLog('fetch')
      pipeline.rtsp.play()
      setFetching(true)
    })
  }

  return (
    <VideoNative autoPlay={autoPlay} muted={muted} ref={videoRef} />
  )
}

WsRtspVideo.propTypes = {
  play: PropTypes.bool,
  ws: PropTypes.string,
  rtsp: PropTypes.string,
  autoPlay: PropTypes.bool,
  muted: PropTypes.bool
}

WsRtspVideo.defaultProps = {
  play: true,
  ws: '',
  rtsp: '',
  autoPlay: true,
  muted: true
}

export default WsRtspVideo
