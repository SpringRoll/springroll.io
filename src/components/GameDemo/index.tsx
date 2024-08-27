import { useEffect, JSX, useCallback, useState, useRef } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';
import Heading from '@theme/Heading';

/**
 * GameDemo component, used to display a game demo. Uses SpringRoll container to load the game.
 * @returns JSX.Element
 */
export default function GameDemo(): JSX.Element {
  // Storing a container reference and mounted state
  const containerRef = useRef(null);
  const isMountedRef = useRef(true);

  // Function to highlight game event elements
  const highlightElement = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.classList.add(`badge--info`);
      setTimeout(() => {
        element.classList.remove(`badge--info`);
      }, 500);
    }
  }, []);

  // Import and initialize SpringRoll container
  useEffect(() => {
    const initContainer = async () => {
      // If the component is unmounting (changing pages), skip this because cleanup should be happening
      if (!isMountedRef.current) return;

      // Import Container and plugins
      const { Container, SoundPlugin, PausePlugin, CaptionsTogglePlugin } = await import('springroll-container');

      // Initialize the container, and store a reference
      containerRef.current = new Container('#demo-game', {
        plugins: [
          new SoundPlugin({ soundButtons: '#btnMute' }),
          new PausePlugin('#btnPause'),
          new CaptionsTogglePlugin('#btnCaptions'),
        ]
      });

      const client = containerRef.current.client;

      // Events to listen for, and the element to highlight
      const events = [
        { name: 'localizerResolve', element: 'evtLocalization' },
        { name: 'speechSynthStart', element: 'evtSpeechSynth' },
        { name: 'soundMute', element: 'evtSoundMute' },
        { name: 'playCaption', element: 'evtCaptions' },
        { name: 'pauseScreenActive', element: 'evtPause' },
      ];

      // Setup event listeners
      events.forEach(event => {
        client.on(event.name, () => {
          highlightElement(event.element);
        })
      });

      // Open the game 
      containerRef.current.openPath('http://springroll.io/springroll-io-demo-game/');

    };

    // Run the init function
    initContainer();

    // Cleanup function, will fire when the component unmounts
    return () => {
      isMountedRef.current = false;

      // Destroy the container and client
      if (containerRef.current) {
        containerRef.current.client.destroy();
        containerRef.current.destroy();
        containerRef.current = null;
      }

    };
  }, [highlightElement]);

  return (
    <section className={styles.gameDemoRoot}>
      <iframe id="demo-game" className={styles.gameContainer}></iframe>

      <div className={styles.gameEvents}>
        <Heading as="h2" className={clsx('hero__subtitle', styles.gameHeader)}>
          Game Options
        </Heading>

        <button id="btnPause" type="button" className={clsx('button button--primary unpaused', styles.gameOptionButton)}>
          <span className="toggleOn">Pause</span>
          <span className="toggleOff">Unpause</span>
        </button>
        <button id="btnMute" type="button" className={clsx('button button--primary unmuted', styles.gameOptionButton)}>
          <span className="toggleOn">Mute</span>
          <span className="toggleOff">Unmute</span>
        </button>
        <button id="btnCaptions" type="button" className={clsx('button button--primary unmuted', styles.gameOptionButton)}>
          <span className="toggleOn">Mute Captions</span>
          <span className="toggleOff">Unmute Captions</span>
        </button>

        <Heading as="h2" className={clsx('hero__subtitle', styles.gameHeader)}>
          Game Events
        </Heading>

        <div id="evtLocalization" className={clsx('badge badge--secondary', styles.gameEventBadge)}>Localization</div>
        <div id="evtSpeechSynth" className={clsx('badge badge--secondary', styles.gameEventBadge)}>Speech Synth</div>
        <div id="evtPause" className={clsx('badge badge--secondary', styles.gameEventBadge)}>Pause</div>
        <div id="evtSoundMute" className={clsx('badge badge--secondary', styles.gameEventBadge)}>Sound Mute</div>
        <div id="evtCaptions" className={clsx('badge badge--secondary', styles.gameEventBadge)}>Captions</div>
      </div>
    </section>
  );
}