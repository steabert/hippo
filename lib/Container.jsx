import React from 'React'
import styled from 'styled-components'

const AR_16_9 = '16:9'
const AR_16_10 = '16:10'
const AR_3_2 = '3:2'
const AR_4_3 = '4:3'

const ASPECT_RATIO_HEIGHT_PCT = {
  [AR_16_9]: '56.25',
  [AR_16_10]: '62.5',
  [AR_3_2]: '66.666667',
  [AR_4_3]: '75'
}
const DEFAULT_HEIGHT_PCT = ASPECT_RATIO_HEIGHT_PCT[AR_16_9]

const getHeightPct = (aspectRatio = AR_16_9) => {
  return ASPECT_RATIO_HEIGHT_PCT[aspectRatio] || DEFAULT_HEIGHT_PCT
}

const ContainerBase = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ContainerBody = styled.div`
  width: 100%;
  padding-top: ${(props) => getHeightPct(props.aspectRatio)}%;
  background: green;
  position: relative;
`

const Layer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`

function Container ({children}) {
  return (
    <ContainerBase>
      <ContainerBody>
        {children}
      </ContainerBody>
    </ContainerBase>
  )
}

export {
  Container,
  Layer
}
