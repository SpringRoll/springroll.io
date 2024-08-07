import { useState, JSX, useMemo, useEffect } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';
import CodeBlock from '@theme/CodeBlock';

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
      </div>
      <div className={clsx('col', styles.synth__container)}>
        <CodeBlock>
          {<p>yooooo+</p>}
        </CodeBlock>
        <button className="button button--primary" >Speak</button>
      </div>
      </div>
    </section>
  );
}
