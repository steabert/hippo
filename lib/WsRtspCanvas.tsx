import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import debug from 'debug'

import { pipelines } from 'media-stream-library'

import useEventState from './useEventState'

const debugLog = debug('hippo:ws-rtsp-video')

const CanvasNative = styled.canvas`
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

function WsRtspCanvas({ play, ws, rtsp, onPlaying }) {
  const canvasRef = useRef(null)

  // State tied to resources
  const [pipeline, setPipeline] = useState(null)
  const [fetching, setFetching] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (ws && rtsp) {
      debugLog('create pipeline')
      const pipeline = new pipelines.Html5CanvasPipeline({
        ws: { uri: ws },
        rtsp: { uri: rtsp },
        mediaElement: canvas,
      })
      setPipeline(pipeline)

      return () => {
        debugLog('destroy pipeline')
        pipeline.pause()
        pipeline.close()
        setPipeline(null)
        setFetching(false)
        debugLog('canvas cleared')
      }
    }
  }, [ws, rtsp])

  useEffect(() => {
    if (play && pipeline && !fetching) {
      pipeline.ready.then(() => {
        debugLog('fetch')
        pipeline.rtsp.play()
        setFetching(true)
      })
    } else if (play && pipeline) {
      debugLog('play')
      pipeline.play()
      onPlaying()
    } else if (!play && pipeline) {
      debugLog('pause')
      pipeline.pause()
    }
  }, [play, pipeline, fetching])

  return <CanvasNative ref={canvasRef} />
}

WsRtspCanvas.propTypes = {
  play: PropTypes.bool,
  ws: PropTypes.string,
  rtsp: PropTypes.string,
  autoPlay: PropTypes.bool,
  muted: PropTypes.bool,
}

WsRtspCanvas.defaultProps = {
  play: true,
  ws: '',
  rtsp: '',
  autoPlay: true,
  muted: true,
}

export default WsRtspCanvas
