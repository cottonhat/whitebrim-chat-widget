import * as React from 'react'

import { defaultClassNamePrefix } from 'vimond-replay/components/common'

// Non-connected controls
import ControlsBar from 'vimond-replay/components/controls/ControlsBar/ControlsBar'
import FullscreenButton from 'vimond-replay/components/controls/FullscreenButton/FullscreenButton'
import ExitButton from 'vimond-replay/components/controls/ExitButton/ExitButton'

// Connected controls
import PlaybackMonitor from 'vimond-replay/components/controls/PlaybackMonitor/PlaybackMonitor'
import {
  BufferingIndicator,
  GotoLiveButton,
  PlayerUIContainer,
  PlayPauseButton,
  QualitySelector,
  SettingsStorage,
  SkipButton,
  TimeDisplay,
  TimelineInformation,
  Timeline,
  PipButton,
  AirPlayButton
} from 'vimond-replay/components/player/PlayerController/connectedControls'
import connectControl, {
  ControlledVideoStreamer
} from 'vimond-replay/components/player/PlayerController/connectControl'
import PreferredSettingsApplicator from 'vimond-replay/components/player/settings-helpers/PreferredSettingsApplicator'

import UnconnectedTitleOverlay from './TitleOverlay'
import graphics from 'vimond-replay/default-player/default-skin/graphics'
import strings from 'vimond-replay/default-player/strings'

import { CloseCustomerIcon, OpenCustomerIcon } from '../../assets'

const { AudioSelector, SubtitlesSelector, Volume } = SettingsStorage
const getSkipBackOffset = (conf) =>
  conf && conf.controls && conf.controls.skipButtonOffset
const getLiveDisplayMode = (conf) =>
  conf && conf.controls && conf.controls.liveDisplayMode
const getQSStrategy = (conf) =>
  conf && conf.controls && conf.controls.qualitySelectionStrategy

const TitleOverlay = connectControl(UnconnectedTitleOverlay, [
  'duration',
  'isPaused'
])

const merge = (strings, graphics) => {
  const merged = {}
  Object.entries(strings).forEach(([control, props]) => {
    merged[control] = { ...merged[control], ...props }
  })
  Object.entries(graphics).forEach(([control, props]) => {
    merged[control] = { ...merged[control], ...props }
  })
  return merged
}

const u = merge(strings, graphics)

const renderPlayerUI = ({
  configuration,
  externalProps,
  widgetOpen,
  changeVisibility
}) => {
  const prefix = {
    classNamePrefix:
      (configuration && configuration.classNamePrefix) || defaultClassNamePrefix
  }
  return (
    <div
      className={true ? 'customer-wrapper wrapper--open' : 'customer-wrapper'}
    >
      <div
        style={{ position: 'relative' }}
        className={
          true
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
                    We are live!
                    <span role='img' aria-label='waving-hand'>
                      💪
                    </span>
                  </p>
                  <p className='channel-header__subtitle'>
                    Please stay till the end
                  </p>
                </div>
              </div>
            </div>
            <PlayerUIContainer
              configuration={configuration}
              {...prefix}
              render={({ fullscreenState, interactionState }) => (
                <Fragment>
                  <ControlledVideoStreamer {...prefix} />

                  <ExitButton
                    {...u.exitButton}
                    {...prefix}
                    onClick={externalProps && externalProps.onExit}
                  />

                  <PlaybackMonitor
                    {...u.playbackMonitor}
                    configuration={configuration}
                  />

                  <TitleOverlay
                    title={externalProps.title}
                    isUserActive={interactionState.isUserActive}
                  />

                  <ControlsBar {...prefix}>
                    <PlayPauseButton {...u.playPauseButton} {...prefix} />

                    <SkipButton
                      {...u.skipButton}
                      {...prefix}
                      offset={getSkipBackOffset(configuration)}
                    />

                    <Timeline {...u.timeline} {...prefix}>
                      <TimelineInformation {...prefix} />
                    </Timeline>

                    <TimeDisplay
                      {...u.timeDisplay}
                      {...prefix}
                      liveDisplayMode={getLiveDisplayMode(configuration)}
                    />

                    <GotoLiveButton {...u.gotoLiveButton} {...prefix} />

                    <Volume
                      {...u.volume}
                      {...prefix}
                      configuration={configuration}
                    />

                    <AudioSelector
                      {...u.audioSelector}
                      {...prefix}
                      configuration={configuration}
                    />

                    <SubtitlesSelector
                      {...u.subtitlesSelector}
                      {...prefix}
                      configuration={configuration}
                    />

                    <QualitySelector
                      {...u.qualitySelector}
                      {...prefix}
                      selectionStrategy={getQSStrategy(configuration)}
                    />

                    <PipButton {...u.pipButton} {...prefix} />

                    <AirPlayButton {...u.airPlayButton} {...prefix} />

                    <FullscreenButton
                      {...u.fullscreenButton}
                      {...prefix}
                      {...fullscreenState}
                    />
                  </ControlsBar>

                  <BufferingIndicator {...u.bufferingIndicator} {...prefix} />

                  <PreferredSettingsApplicator
                    configuration={configuration}
                    {...externalProps.initialPlaybackProps}
                  />
                </Fragment>
              )}
            />
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
          true ? 'toggle-button close-button' : 'toggle-button false'
        }`}
      >
        {true ? (
          <CloseCustomerIcon className={`toggle-button-close`} />
        ) : (
          <OpenCustomerIcon className={`toggle-button-open`} />
        )}
      </div>
    </div>
  )
}

export default renderPlayerUI
