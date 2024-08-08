import { useState, JSX, useMemo, useEffect } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';
import CodeBlock from '@theme/CodeBlock';

// import childURL from '@site/static/BellHopExampleChild/child.html';

/**
 * Speech Synth Component - Simple demo page showing off SpringRoll's speech synth module. Referenced in docs/Examples/Bellhop.mdx
 * @returns JSX.Element
 */
export default function BellhopExample(): JSX.Element {

  const [bellhop, setBellhop] = useState(null);
  const [message, setMessage] = useState('');

  // Bellhop uses the window object which isn't available in Node
  // so the build process requires it to be dynamically imported to avoid errors
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('bellhop-iframe').then(({ Bellhop }) => {
        setBellhop(new Bellhop());
      });
    }
  }, []);

  if (!bellhop) {
    return <div>Loading Bellhop...</div>;
  }
  
  return (
    <section className={clsx('container', styles.BellhopRoot)}>
      <div className='row'>
        <div className={clsx('col', styles.synth__controls)}>
          <iframe id="demo-game" className={styles.gameContainer} src='@site/BellHopExampleChild/child.html'></iframe>
        </div>
        <div className={clsx('col', styles.synth__container)}>

          <button className="button button--primary" >Send PostMessage</button>
        </div>
      </div>
      <div className="row">
        <CodeBlock>
            {<p>yooooo+</p>}
        </CodeBlock>
      </div>
    </section>
  );
}
