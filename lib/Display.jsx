import React from 'react'
import PropTypes from 'prop-types'

import WsRtspVideo from './WsRtspVideo.jsx'
import WsRtspCanvas from './WsRtspCanvas.jsx'
import StillImage from './StillImage.jsx'

const AXIS_IMAGE_CGI = 'jpg'
const AXIS_VIDEO_CGI = 'mjpg'
const AXIS_MEDIA_AMP = 'media'

const API_TYPES = new Set([
  AXIS_IMAGE_CGI, AXIS_VIDEO_CGI, AXIS_MEDIA_AMP
])

const AXIS_API = {
  [AXIS_IMAGE_CGI]: 'axis-cgi/jpg/image.cgi',
  [AXIS_VIDEO_CGI]: 'axis-cgi/mjpg/video.cgi',
  [AXIS_MEDIA_AMP]: 'axis-cgi/media/media.amp'
}

const DEFAULT_VIDEO_CODEC = 'h264'

const wsUri = (host) => {
  const wsProtocol = window.location.protocol === 'http:' ? 'ws:' : 'wss:'
  return host ? `${wsProtocol}//${host}/rtsp-over-websocket` : ''
}

const rtspUri = (host, searchParams) => {
  return host ? `rtsp://${host}/${AXIS_API[AXIS_MEDIA_AMP]}?${searchParams}` : ''
}

const imgUri = (host, searchParams) => {
  return host ? `http://${host}/${AXIS_API[AXIS_IMAGE_CGI]}?${searchParams}` : ''
}

const PARAMETERS = {
  [AXIS_IMAGE_CGI]: new Set([
    'resolution',
    'camera',
    'compression',
    'rotation',
    'palette',
    'squarepixel'
  ]),
  [AXIS_VIDEO_CGI]: new Set([
    'resolution',
    'camera',
    'compression',
    'rotation',
    'palette',
    'squarepixel'
  ]),
  [AXIS_MEDIA_AMP]: new Set([
    'videocodec',
    'camera',
    'resolution',
    'h264profile',
    'streamprofile',
    'recordingid',
    'audio',
    'compression',
    'colorlevel',
    'color',
    'palette',
    'clock',
    'date',
    'text',
    'textstring',
    'textcolor',
    'textbackgroundcolor',
    'rotation',
    'textpos',
    'overlayimage',
    'overlaypos',
    'duration',
    'nbrofframes',
    'fps',
    'pull'
  ])
}

const search = (type, parameters = {}) => {
  if (!API_TYPES.has(type)) {
    throw new Error(`unknown API type ${type}`)
  }
  const parameterSet = PARAMETERS[type]
  return Object.entries(parameters)
    .filter(([key]) => parameterSet.has(key))
    .map(([key, value]) => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    })
    .join('&')
}

function Display ({
  host,
  type,
  parameters,
  play,
  onPlaying
}) {
  const searchParams = search(type, parameters)
  switch (type) {
    case AXIS_MEDIA_AMP:
      const ws = wsUri(host)
      const rtsp = rtspUri(host, searchParams)
      const props = {ws, rtsp, play, onPlaying}
      const videocodec = parameters.videocodec || DEFAULT_VIDEO_CODEC
      switch (videocodec) {
        case 'h264':
          return <WsRtspVideo {...props} />
        case 'jpeg':
          return <WsRtspCanvas {...props} />
        default:
          return null
      }
    case AXIS_IMAGE_CGI:
      const src = imgUri(host, searchParams)
      return <StillImage src={src} />
    case AXIS_VIDEO_CGI:
      console.warn(```
if you want to use motion JPEG, use type '${AXIS_MEDIA_AMP}'
with videocodec=jpeg instead of type '${AXIS_VIDEO_CGI}'
      ```)
      // fallthrough
    default:
      console.warn(`not implemented: type=${type}`)
      return null
  }
}

Display.propTypes = {
  host: PropTypes.string,
  type: PropTypes.oneOf(API_TYPES.values()),
  parameters: PropTypes.object,
  play: PropTypes.bool,
  onPlaying: PropTypes.func
}

Display.defaultProps = {
  type: AXIS_IMAGE_CGI,
  parameters: {},
  play: false,
  onPlaying: () => {}
}

export default Display
