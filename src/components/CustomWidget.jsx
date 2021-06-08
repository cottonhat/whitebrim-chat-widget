import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios'

import IntlMessages from './IntlMessages'

import { CloseCustomerIcon, OpenCustomerIcon } from '../assets'

const CustomWidget = ({
  apiUrl,
  projectId,
  widgetOpen,
  changeVisibility,
  changeWidget,
  introMessage
}) => {
  const [initialChannel, setInitialChannel] = useState(null)
  const [fetch, setFetch] = useState(false)

  useEffect(() => {
    if (
      !fetch &&
      localStorage.getItem('wb_token') &&
      localStorage.getItem('chatUserId')
    ) {
      axios
        .post(
          `${apiUrl}/api/livestream/${projectId}/channel`,
          { chatUserId: localStorage.getItem('chatUserId') },
          {
            headers: {
              Authorization: localStorage.getItem('wb_token')
            }
          }
        )
        .then(async (result) => {
          setInitialChannel(result.data)
          setFetch(true)
        })
        .catch((error) => {
          console.error(error)
          setFetch(true)
        })
    } else {
      setFetch(true)
    }
  }, [])

  return (
    <div
      className={
        widgetOpen ? 'customer-wrapper wrapper--open' : 'customer-wrapper'
      }
    >
      <div
        style={{ position: 'relative' }}
        className={
          widgetOpen
            ? 'str-chat str-chat-channel commerce light active'
            : 'str-chat str-chat-channel commerce light hidden'
        }
      >
        <div className='str-chat-container'>
          <div className='str-chat__main-panel'>
            <div className='channel-header__container'>
              <div className='channel-header__heading'>
                <div className='channel-header__text'>
                  <p className='channel-header__name'>
                    <IntlMessages id='HeaderHello' />
                    <span role='img' aria-label='waving-hand'>
                      👋
                    </span>
                  </p>
                  <p className='channel-header__subtitle'>{introMessage}</p>
                </div>
              </div>
            </div>
            <div style={{ background: '#212121' }}>
              <div className='str-chat__list'>
                <div className='empty-state__container'>
                  <div className='welcome-card-container'>
                    {!fetch ? (
                      <div className='loader___abs' />
                    ) : fetch && initialChannel ? (
                      <Fragment>
                        <div
                          className='welcome-card-title'
                          style={{ marginBottom: 10 }}
                        >
                          <span>
                            <IntlMessages id='CardTitle2' />
                          </span>
                        </div>
                        <div className='welcome-card-container-time'>
                          <img
                            className='welcome-card-img'
                            src={initialChannel.channel.created_by.image}
                            alt='error 404'
                          />

                          <div className='welcome-card-flex-container'>
                            <span className='welcome-card-text'>
                              {initialChannel.channel.created_by.name}
                            </span>
                            <span className='welcome-card-text timer'>
                              {
                                initialChannel.messages[
                                  initialChannel.messages.length - 1
                                ]
                              }
                            </span>
                          </div>
                        </div>
                        <button
                          className='welcome-card-btn-send'
                          onClick={() => changeWidget()}
                        >
                          <IntlMessages id='CardButton' />
                        </button>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <div className='welcome-card-title'>
                          <span>
                            <IntlMessages id='CardTitle' />
                          </span>
                        </div>
                        <div className='welcome-card-container-time'>
                          <img
                            className='welcome-card-img'
                            src='https://picsum.photos/200'
                            alt='error 404'
                          />

                          <div className='welcome-card-flex-container'>
                            <span className='welcome-card-text'>
                              <IntlMessages id='CardSubtitle' />
                            </span>
                            <span className='welcome-card-text timer'>
                              <IntlMessages id='LastOnline' />
                            </span>
                          </div>
                        </div>
                        <button
                          className='welcome-card-btn-send'
                          onClick={() => changeWidget()}
                        >
                          <IntlMessages id='CardButton' />
                        </button>
                      </Fragment>
                    )}
                  </div>
                  {/* <div
                    className='welcome-card-container'
                    style={{ paddingBottom: 0 }}
                  >
                    <div className='welcome-card-container-time'>
                      <img
                        className='welcome-card-img'
                        src='https://picsum.photos/200'
                        alt='error 404'
                      />

                      <div className='welcome-card-flex-container'>
                        <span
                          style={{ fontSize: 12 }}
                          className='welcome-card-text'
                        >
                          Status: All Systems Operational
                        </span>
                        <span
                          style={{ fontSize: 12 }}
                          className='welcome-card-text timer'
                        >
                          Updated May 25, 10:26 UTC
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    className='welcome-card-container'
                    style={{ paddingBottom: 0 }}
                  >
                    <div className='welcome-card-container-time'>
                      <img
                        className='welcome-card-img'
                        src='https://picsum.photos/200'
                        alt='error 404'
                      />

                      <div className='welcome-card-flex-container'>
                        <span
                          style={{ fontSize: 12 }}
                          className='welcome-card-text'
                        >
                          Teste
                        </span>
                        <span
                          style={{ fontSize: 12 }}
                          className='welcome-card-text timer'
                        >
                          Teste
                        </span>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            <footer className='footer whitebrim-footer'>
              <span className='footer-text'>
                <IntlMessages id='Powered' />{' '}
                <a
                  className='whitebrim-link'
                  href='https://whitebrim.co/'
                  target='_blank'
                  rel='noreferrer'
                >
                  Whitebrim
                </a>
              </span>
            </footer>
          </div>
        </div>
      </div>
      <div
        onClick={() => changeVisibility(null)}
        className={`${
          widgetOpen ? 'toggle-button close-button' : 'toggle-button false'
        }`}
      >
        {widgetOpen ? (
          <CloseCustomerIcon className='toggle-button-close' />
        ) : (
          <OpenCustomerIcon className='toggle-button-open' />
        )}
      </div>
    </div>
  )
}

export default CustomWidget
