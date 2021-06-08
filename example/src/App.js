import React from 'react'

import { WhitebrimChatWidget } from 'whitebrim-chat-widget'
import 'whitebrim-chat-widget/dist/index.css'

const App = () => {
  return (
    <WhitebrimChatWidget
      projectId='5f3e99d77e0c0f3d06fe361b'
      introMessage={'We are actually here to help you mentally'}
      openingPrompts={[
        'I have a pricing question',
        'I have a question about Enterprise',
        'I would like to learn more about the company',
        'Other'
      ]}
      locale='pt'
    />
  )
}

export default App
