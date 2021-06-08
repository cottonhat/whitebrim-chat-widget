// import 'vimond-replay/index.css' // ! ONLY IN DEVELOPMENT
import 'stream-chat-react/dist/css/index.css' // ! ONLY IN DEVELOPMENT
import './index.css'

import React, { Fragment, useState } from 'react'
import { SwitchTransition, CSSTransition } from 'react-transition-group'

import { IntlProvider } from 'react-intl'
import AppLocale from './lang/'
import ptChat from './lang/chatPt'
import enChat from './lang/chatEn'

import { Chat, Streami18n } from 'stream-chat-react'
import { StreamChat } from 'stream-chat'

import { CustomerApp } from './CustomerApp'
import CustomWidget from './components/CustomWidget'
import axios from 'axios'
// import CustomPlayer from './components/stream/CustomPlayer'

const customerClient = StreamChat.getInstance('zkkaf8bcf5xp')
const apiUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://10.0.8.2:4001'
    : 'https://api.whitebrim.co'

const WhitebrimChatWidget = ({
  projectId,
  introMessage,
  openingPrompts,
  locale
}) => {
  const i18n = new Streami18n({
    language: locale,
    translationsForLanguage: locale === 'pt' ? ptChat : enChat
  })

  //* 1st Box
  const [widgetOpen, setWidgetOpen] = useState(false)

  //* 2nd Box
  const [chatOpen, setChatOpen] = useState(false)

  //* Show 1st Message Controller
  const [chatOpenMessage, setChatOpenMessage] = useState(false)

  //* Which Box to Show
  const [widget, setWidget] = useState(false)
  const [video, setVideo] = useState(false)

  const changeVisibility = (handleToggle) => {
    if (handleToggle) {
      setChatOpen(!chatOpen)
    } else {
      setWidgetOpen(!widgetOpen)
    }
  }

  const changeWidget = () => {
    if (!chatOpenMessage) {
      setChatOpenMessage(true)
    }

    setWidget(true)

    if (!chatOpen) {
      setChatOpen(true)
    }
  }

  const currentAppLocale = AppLocale[locale]

  return (
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}
    >
      <SwitchTransition>
        <CSSTransition
          key={widget ? 'A' : 'B'}
          timeout={{ enter: 300, exit: 300 }}
          classNames='fadeJumbo'
          mountOnEnter
          unmountOnExit
          in
        >
          {widget && customerClient ? (
            <Chat
              client={customerClient}
              i18nInstance={i18n}
              theme='commerce light'
            >
              <CustomerApp
                apiUrl={apiUrl}
                projectId={projectId}
                introMessage={introMessage}
                openingPrompts={openingPrompts}
              />
            </Chat>
          ) : (
            !widget && (
              <Fragment>
                {video ? (
                  // <CustomPlayer
                  //   initialPlaybackProps={{ isPaused: true }}
                  //   source='https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
                  // />
                  <Fragment />
                ) : (
                  <CustomWidget
                    apiUrl={apiUrl}
                    projectId={projectId}
                    introMessage={introMessage}
                    widgetOpen={widgetOpen}
                    changeVisibility={changeVisibility}
                    changeWidget={changeWidget}
                  />
                )}
              </Fragment>
            )
          )}
        </CSSTransition>
      </SwitchTransition>
    </IntlProvider>
  )
}

const convertChatUser = ({ projectId }) => {
  axios
    .post(
      `${apiUrl}/api/livestream/${projectId}/convert`,
      { chatUserId: localStorage.getItem('chatUserId') },
      {
        headers: {
          Authorization: localStorage.getItem('wb_token')
        }
      }
    )
    .then((result) => {
      // console.log(result)
    })
    .catch((error) => {
      console.error(error)
    })
}

export { WhitebrimChatWidget, convertChatUser }
