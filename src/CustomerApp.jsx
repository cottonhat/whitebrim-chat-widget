import React, { Fragment, useContext, useEffect, useState } from 'react'
import {
  Channel,
  ChatContext,
  MessageCommerce,
  MessageInput,
  MessageList,
  Window
} from 'stream-chat-react'
import axios from 'axios'

import { EmptyStateIndicator } from './components/CustomerEmptyStateIndicator/EmptyStateIndicator'
import { CustomerChannelHeader } from './components/CustomerChannelHeader/CustomerChannelHeader.jsx'
import { CustomerMessageInput } from './components/MessageInput/CustomerMessageInput'

import { CloseCustomerIcon, OpenCustomerIcon } from './assets'

export const CustomerApp = ({ projectId, apiUrl }) => {
  const { client: customerClient } = useContext(ChatContext)

  const [customerChannel, setCustomerChannel] = useState(null)
  const [open, setOpen] = useState(true)

  useEffect(() => {
    const getCustomerChannel = async () => {
      //! IF LOGGED IN & WITHOUT TOKEN
      if (
        localStorage.getItem('wb_token') &&
        !localStorage.getItem('chatToken') &&
        !customerChannel
      ) {
        axios
          .get(`${apiUrl}/api/livestream/${projectId}/member`, {
            headers: {
              Authorization: localStorage.getItem('wb_token')
            }
          })
          .then((result) => {
            localStorage.setItem('chatUserName', result.data.chatUserName)
            localStorage.setItem('chatUserId', result.data.chatUserId)
            localStorage.setItem('chatToken', result.data.token)

            customerClient.connectUser(
              {
                id: result.data.chatUserId,
                image: null
              },
              result.data.token
            )
            axios
              .post(
                `${apiUrl}/api/livestream/${projectId}/channel`,
                {
                  chatUserId: localStorage.getItem('chatUserId')
                },
                {
                  headers: {
                    Authorization: localStorage.getItem('wb_token')
                  }
                }
              )
              .then(async (result) => {
                const newChannel = await customerClient.channel(
                  'commerce',
                  result.data.channel.id,
                  {
                    name: 'Agent Name',
                    image: null, // eslint-disable-line
                    subtitle: 'Teste'
                  }
                )

                if (newChannel.state.messages.length) {
                  newChannel.state.clearMessages()
                }

                await newChannel.watch()

                setCustomerChannel(newChannel)
              })
              .catch((error) => {
                console.error(error)
              })
          })
          .catch((error) => {
            console.error(error)
          })
      } else if (
        !localStorage.getItem('wb_token') &&
        !localStorage.getItem('chatToken') &&
        !customerChannel
      ) {
        //! IF NOT LOGGED IN & WITHOUT TOKEN
        axios
          .get(`${apiUrl}/api/livestream/${projectId}/guest`)
          .then((result) => {
            localStorage.setItem('chatUserName', result.data.chatUserName)
            localStorage.setItem('chatUserId', result.data.chatUserId)
            localStorage.setItem('chatToken', result.data.token)

            customerClient.connectUser(
              {
                id: result.data.chatUserId,
                image: null
              },
              result.data.token
            )
            axios
              .post(`${apiUrl}/api/livestream/${projectId}/channel`, {
                chatUserId: localStorage.getItem('chatUserId')
              })
              .then(async (result) => {
                const newChannel = await customerClient.channel(
                  'commerce',
                  result.data.channel.id,
                  {
                    name: 'Agent Name',
                    image: null, // eslint-disable-line
                    subtitle: 'Teste'
                  }
                )

                if (newChannel.state.messages.length) {
                  newChannel.state.clearMessages()
                }

                await newChannel.watch()

                setCustomerChannel(newChannel)
              })
              .catch((error) => {
                console.error(error)
              })
          })
          .catch((error) => {
            console.error(error)
          })
      } else if (!customerChannel) {
        //! IF LOGGED IN || HAS TOKEN
        customerClient.connectUser(
          {
            id: localStorage.getItem('chatUserId'),
            image: null
          },
          localStorage.getItem('chatToken')
        )
        axios
          .post(
            `${apiUrl}/api/livestream/${projectId}/channel`,
            { chatUserId: localStorage.getItem('chatUserId') },
            localStorage.getItem('wb_token') && {
              headers: {
                Authorization: localStorage.getItem('wb_token')
              }
            }
          )
          .then(async (result) => {
            const newChannel = await customerClient.channel(
              'commerce',
              result.data.channel.id,
              {
                name: 'Agent Name',
                image: null, // eslint-disable-line
                subtitle: 'Teste'
              }
            )

            if (newChannel.state.messages.length) {
              newChannel.state.clearMessages()
            }

            await newChannel.watch()

            setCustomerChannel(newChannel)
          })
          .catch((error) => {
            console.error(error)
          })
      }
    }

    getCustomerChannel()
  }, [])

  return (
    <div className={`customer-wrapper ${open ? 'wrapper--open' : ''}`}>
      {customerChannel && open ? (
        <Channel channel={customerChannel} Avatar={false}>
          <Window>
            <CustomerChannelHeader customerChannel={customerChannel} />
            {open && (
              <div>
                <MessageList
                  EmptyStateIndicator={(props) => (
                    <EmptyStateIndicator {...props} channel={customerChannel} />
                  )}
                  Message={MessageCommerce}
                />
              </div>
            )}
            <MessageInput
              Input={(props) => (
                <CustomerMessageInput {...props} {...{ open, setOpen }} />
              )}
              focus
            />
          </Window>
        </Channel>
      ) : (
        !customerChannel &&
        open && (
          <div
            style={{ position: 'relative' }}
            className={
              open
                ? 'str-chat str-chat-channel commerce light active-chat'
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
                      <p className='channel-header__subtitle'>
                        We are here to help.
                      </p>
                    </div>
                  </div>
                </div>
                <div style={{ background: '#212121' }}>
                  <div
                    style={{ position: 'relative' }}
                    className='str-chat__list'
                  >
                    <div
                      className='loader___abs spinner-border'
                      role='status'
                    />
                  </div>
                </div>
                <footer className='footer whitebrim-footer'>
                  <span className='footer-text'>
                    Powered by{' '}
                    <a
                      className='whitebrim-link'
                      href='https://whitebrim.co/'
                      target='_blank'
                    >
                      Whitebrim
                    </a>
                  </span>
                </footer>
              </div>
            </div>
          </div>
        )
      )}
      <div
        className={`toggle-button ${open && 'close-button'}`}
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <CloseCustomerIcon className={`toggle-button-close`} />
        ) : (
          <OpenCustomerIcon className={`toggle-button-open`} />
        )}
      </div>
    </div>
  )
}
