import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios'

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
          setInitialChannel(result.data.channel)
          setFetch(true)
        })
        .catch((error) => {
          console.error(error)
          setFetch(true)
        })
    } else {
      setFetch(true)
    }
  }, [fetch, initialChannel])

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
                    Hello
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
                        <div className='welcome-card-title'>
                          <span>Resume conversation</span>
                        </div>
                        <div className='welcome-card-container-time'>
                          <img
                            className='welcome-card-img'
                            src='https://picsum.photos/200'
                            alt='error 404'
                          />

                          <div className='welcome-card-flex-container'>
                            <span className='welcome-card-text'>
                              Our usual reply time
                            </span>
                            <span className='welcome-card-text timer'>
                              A few minutes
                            </span>
                          </div>
                        </div>
                        <button
                          className='welcome-card-btn-send'
                          onClick={() => changeWidget()}
                        >
                          Send us a message
                        </button>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <div className='welcome-card-title'>
                          <span>Start conversation</span>
                        </div>
                        <div className='welcome-card-container-time'>
                          <img
                            className='welcome-card-img'
                            src='https://picsum.photos/200'
                            alt='error 404'
                          />

                          <div className='welcome-card-flex-container'>
                            <span className='welcome-card-text'>
                              Our usual reply time
                            </span>
                            <span className='welcome-card-text timer'>
                              A few minutes
                            </span>
                          </div>
                        </div>
                        <button
                          className='welcome-card-btn-send'
                          onClick={() => changeWidget()}
                        >
                          Send us a message
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
                Powered by{' '}
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
