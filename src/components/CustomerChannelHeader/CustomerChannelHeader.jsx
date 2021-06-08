/* eslint-disable global-require */
import React from 'react'

import './CustomerChannelHeader.css'

import { ClockIcon } from '../../assets'

import IntlMessages from '../IntlMessages'

export const CustomerChannelHeader = ({ customerChannel }) => {
  return (
    <div className='channel-header__container'>
      <div className='channel-header__heading'>
        <div style={{ width: '75px' }}>
          <img
            className='channel-header__image-3'
            src={customerChannel.data.created_by.image}
            alt='user'
            height='64'
            width='64'
          />
          <div className='channel-header__active' />
        </div>
        <div className='channel-header__text'>
          <p className='channel-header__name'>
            <IntlMessages id='HeaderHello' />
            <span role='img' aria-label='waving-hand'>
              👋
            </span>
          </p>
          <p className='channel-header__subtitle'>
            {customerChannel.data.created_by.name},
            <br />
            <IntlMessages id='LastOnlineIcon' />
          </p>
        </div>
      </div>
      <div className='channel-header__wait__wrapper' style={{ marginTop: 25 }}>
        <ClockIcon color='#fff' />
        <p className='channel-header__wait__text'>
          <IntlMessages id='TimeAverageWait' />{' '}
          <b>
            <IntlMessages id='TimeAverage' />
          </b>
        </p>
      </div>
    </div>
  )
}
