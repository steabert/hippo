import React from 'react'
import logo from './logo.png'

import styled from 'styled-components'

import {Player} from '../lib/index'

const AppContainer = styled.div`
  text-align: center;
`

const AppHeader = styled.div`
  background-color: #222;
  height: 150px;
  padding: 20px;
  color: white;
`

const Logo = styled.img`
  animation: App-logo-spin infinite 20s linear;
  height: 80px;

  @keyframes App-logo-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`

function App () {
  return (
    <AppContainer>
      <AppHeader>
        <Logo src={logo} alt='logo' />
        <h1>Welcome to Hippo</h1>
      </AppHeader>
      <p>
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
      <Player />
    </AppContainer>
  )
}

export {App}
