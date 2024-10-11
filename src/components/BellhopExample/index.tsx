import { useState, JSX, useMemo, useEffect } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';
import CodeBlock from '@theme/CodeBlock';

/**
 * Speech Synth Component - Simple demo page showing off SpringRoll's speech synth module. Referenced in docs/Examples/Bellhop.mdx
 * @returns JSX.Element
 */
export default function BellhopExample(): JSX.Element {

  const code = `const bellhop = new Bellhop(); \nbellhop.connect(document.querySelector('#demo-game')); \n \n
document.querySelector('#sendButton').addEventListener('click', () => {\n     bellhop.send('message', { message: 'Hello, World!' });\n }); \n
document.querySelector('#clearButton').addEventListener('click', () => {\n     bellhop.send('clearMessages');\n });
  `;

  const childCode = `const bellhop = new window.Bellhop(); // Using UMD\n
bellhop.connect();\n
const messageList = document.querySelector('#messageList');\n
bellhop.on('message', (event) => {
  const newMessage = document.createElement('li');
  newMessage.innerText = event.data.message;
  messageList.appendChild(newMessage);
  console.log(event.data.message);
  });\n
bellhop.on('clearMessages', () => {
  messageList.innerHTML = '';
});`;

  const [bellhop, setBellhop] = useState(null);
  const message = 'Hello, World!';

  const sendPostMessage = () => {
    if (!bellhop) return;

    bellhop.send('message', { message });
  }

  const clearMessages = () => {
    if (!bellhop) return;
    bellhop.send('clearMessages');
  }

  // Bellhop uses the window object which isn't available in Node
  // so the build process requires it to be dynamically imported to avoid errors
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('bellhop-iframe').then(({ Bellhop }) => {
        setBellhop(new Bellhop());
      });
    }
  }, []);

  useEffect(() => {
    if (bellhop) {
      bellhop.connect(document.querySelector('#demo-game'));
    }
  }, [bellhop])

  if (!bellhop) {
    return <div>Loading Bellhop...</div>;
  }
  
  return (
    <section className='container'>
      <div className='row'>
        <div className={clsx('col', styles.bellhop_gameContainer)}>
          <iframe id="demo-game" className={styles.bellhop_iframe} src='/BellHopExampleChild/index.html'></iframe>
        </div>
        <div className={clsx('col', styles.bellhop_controls)}>
          <button id='sendButton' className="button button--primary" onClick={sendPostMessage}>Send Message</button>
          <button id='clearButton' className="button button--primary" onClick={clearMessages}>Clear Messages</button>
        </div>
      </div>
      <div className="row">
      <div className="col">
        <p>Bellhop is an integral part of SpringRoll and makes use of the PostMessage 
          API to send messages back and forth between an iFrame and the containing web page. 
          You can send a message that is only an event name or you can optionally include a 
          payload for the reciver
        </p>
        </div>
      </div>
      <div className="row">
        <div className="col">
        <h2>Containing Page</h2>
        <CodeBlock className={styles.codeBlock}>
            {code}
        </CodeBlock>
        </div>
      </div>
      <div className="row">
      <div className="col">
        <h2>Child Page</h2>
        <CodeBlock className={styles.codeBlock}>
            {childCode}
        </CodeBlock>
        </div>
      </div>
    </section>
  );
}
