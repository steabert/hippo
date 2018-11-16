import React, {useState} from 'react'
import PropTypes from 'prop-types'

import {Container, Layer} from './Container.jsx'
import Display from './Display.jsx'
import Controls from './Controls.jsx'
import Feedback from './Feedback.jsx'

function Player ({
  hostname,
  type,
  parameters
}) {
  const [play, setPlay] = useState(false)
  const [key, setKey] = useState(0)
  const [host, setHost] = useState(hostname)
  const [waiting, setWaiting] = useState(false)

  const toggle = () => {
    if (play) {
      setPlay(false)
    } else {
      setWaiting(true)
      setHost(hostname)
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
    setHost('')
    setWaiting(false)
  }

  return (
    <Container>
      <Layer>
        <Display
          key={key}
          play={play}
          host={host}
          type={type}
          parameters={parameters}
          onPlaying={() => setWaiting(false)}
        />
      </Layer>
      <Layer>
        <Feedback waiting={waiting} />
      </Layer>
      <Layer>
        <Controls
          play={play}
          src={host}
          onPlay={toggle}
          onStop={stop}
          onRefresh={refresh}
        />
      </Layer>
    </Container>
  )
}

Player.defaultProps = {
  hostname: window.location.hostname
}

export default Player
