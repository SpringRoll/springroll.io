import { useEffect, JSX } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { Container, SoundPlugin, PausePlugin } from 'springroll-container';
import Heading from '@theme/Heading';


/**
 * Game Demo Component - Creates a springroll container and loads the demo game into it. Referenced in docs/Examples/game.mdx
 * @returns JSX.Element
 */
export default function GameDemo(): JSX.Element {
  // Instantiate the container and load the demo game after the component mounts  
  useEffect(() => {
    const container = new Container('#demo-game', {
      plugins: [
        new SoundPlugin({
          soundButtons: '#btnMute',
        }),
        new PausePlugin('#btnPause'),
      ]
    });

    container.openPath('http://springroll.io/springroll-io-demo-game/');
  }, []);
  return (
    <section className={styles.gameDemoRoot}>
      <iframe id="demo-game" className={styles.gameContainer}></iframe>

      <div className={styles.gameEvents}>
        <Heading as="h2" className={clsx('hero__subtitle', styles.gameHeader)}>
          Game Options
        </Heading>
        
        <button id="btnPause" type="button" className={clsx('button button--primary', styles.gameOptionButton)}>
          <span className="toggleOn">Pause</span>
          <span className="toggleOff">Unpause</span>
        </button>
        <button id="btnMute" type="button" className={clsx('button button--primary', styles.gameOptionButton)}>
          <span className="toggleOn">Mute</span>
          <span className="toggleOff">Unmute</span>
        </button>
        <button id="btnHint" type="button" className={clsx('button button--primary', styles.gameOptionButton)}>
          <span>Hint</span>
        </button>


        <Heading as="h2" className={clsx('hero__subtitle', styles.gameHeader)}>
          Game Events
        </Heading>

        <div className={clsx('button button--secondary', styles.gameOptionButton)}>Localiztion</div>
        <div className={clsx('button button--secondary', styles.gameOptionButton)}>Speech Synch</div>
        <div className={clsx('button button--secondary', styles.gameOptionButton)}>Pause</div>
        <div className={clsx('button button--secondary', styles.gameOptionButton)}>Sound Mute</div>
        <div className={clsx('button button--secondary', styles.gameOptionButton)}>Captions Start</div>
      </div>
    </section>
  );
}
