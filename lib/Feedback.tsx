import React from 'react'
import styled from 'styled-components'

import Spinner from './img/spinner.svg'

const FeedbackArea = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

interface IFeedbackProps {
  readonly waiting: boolean
}

export const Feedback: React.FC<IFeedbackProps> = ({ waiting }) => {
  return <FeedbackArea>{waiting && <Spinner />}</FeedbackArea>
}
