import { useEffect, JSX } from 'react';
import styles from './styles.module.scss';
import { Container } from 'springroll-container';

/**
 * Game Demo Component - Creates a springroll container and loads the demo game into it. Referenced in docs/Examples/game.mdx
 * @returns JSX.Element
 */
export default function GameDemo(): JSX.Element {
  // Instantiate the container and load the demo game after the component mounts  
  useEffect(() => {
    const container = new Container('#demo-game', {
      plugins: []
    });

    container.openPath('http://springroll.io/springroll-io-demo-game/');
  }, []);
  return (
    <section className={styles.gameDemoRoot}>
      <iframe id="demo-game" className={styles.gameContainer}></iframe>

      <div className={styles.gameEvents}>
        <h2 className={styles.gameHeader}>Game Options</h2>
        
        <button type="button" className={styles.optionButton}>
          <span>Pause</span>
        </button>
        <button type="button" className={styles.optionButton}>
          <span>Mute</span>
        </button>

        <h2 className={styles.gameHeader}>Game Events</h2>

        <div className={styles.gameEvent}>Localiztion</div>
        <div className={styles.gameEvent}>Speech Synch</div>
        <div className={styles.gameEvent}>Pause</div>
        <div className={styles.gameEvent}>Sound Mute</div>
        <div className={styles.gameEvent}>Captions Start</div>
      </div>
    </section>
  );
}
