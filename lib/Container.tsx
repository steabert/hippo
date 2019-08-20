import React from 'react'
import styled from 'styled-components'

type AspectRatio = '16:9' | '16:10' | '3:2' | '4:3'

const ASPECT_RATIO_HEIGHT_PCT = {
  '16:9': '56.25',
  '16:10': '62.5',
  '3:2': '66.666667',
  '4:3': '75',
}

const DEFAULT_HEIGHT_PCT = ASPECT_RATIO_HEIGHT_PCT['16:9']

const getHeightPct = (aspectRatio: AspectRatio = '16:9') => {
  return ASPECT_RATIO_HEIGHT_PCT[aspectRatio] || DEFAULT_HEIGHT_PCT
}

const ContainerBase = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ContainerBody = styled.div<{ readonly aspectRatio?: AspectRatio }>`
  width: 100%;
  padding-top: ${props => getHeightPct(props.aspectRatio)}%;
  background: black;
  position: relative;
`

export const Layer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`

export const Container: React.FC = ({ children }) => {
  return (
    <ContainerBase>
      <ContainerBody>{children}</ContainerBody>
    </ContainerBase>
  )
}
