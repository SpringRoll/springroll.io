import { useState, JSX, useMemo, useEffect, useRef, useCallback } from 'react';
import CodeBlock from '@theme/CodeBlock';
import styles from './styles.module.scss';
import clsx from 'clsx';

const listeners = ['w', 'a', 's', 'd', 'enter', 'arrowleft', 'arrowright', 'arrowup', 'arrowdown', ' '];

/**
 * Controls Component - Simple demo page showing off SpringRoll's Control class and how to handle key events. Referenced in docs/Examples/controls.mdx
 * @returns JSX.Element
 */
export default function ControlsExample(): JSX.Element {
  // Used to indicate if the component is mounted
  const isMountedRef = useRef(true);

  const [controller, setController] = useState(null);
  const [intervalID, setIntervalID] = useState(null);


  /**
   * Toggles the control div highlights when a key is pressed or released
   * @param key - The key that was pressed or released
   * @param add - If the highlight should be added or removed
   */
  const toggleElementHighlight = (key: string, add: boolean) => {
    const element = document.getElementById(`key_${key === ' ' ? 'space' : key}`);
    if (element) {
      if(add) element.classList.add(styles.keyActive);
      else element.classList.remove(styles.keyActive);
    }
  };

  /**
   * Prevents default behavior when example keys are pressed to prevent the page from scrolling. 
   * This listener is removed when unmounting.
   * @param e - The keyboard event
   */
  const preventKeyDefault = (e: KeyboardEvent) => {
    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
      e.preventDefault();
    }
  }

  /**
   * Update the controller (polls for input)
   */
  const updateController = useCallback(() => {
    if (controller && isMountedRef.current) {
      controller.update();
    }
  }, [controller]);

  /**
   * Sets up the controller and event listeners, 
   * dynamically imports the SpringRoll Controller class because we need the window object
   * 
   * The return handles unmount cleanup, removing listeners and clearing the interval
   */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('springroll').then(({ Controller }) => {
        window.addEventListener("keydown", preventKeyDefault);
        setController(
          new Controller(listeners.map(key => ({
            key,
            down: () => toggleElementHighlight(key, true),
            up: () => toggleElementHighlight(key, false)
          })))
        );
      });
    }

    return () => {
      isMountedRef.current = false;
      if (intervalID) clearInterval(intervalID);
      window.removeEventListener("keydown", preventKeyDefault);
    };
  }, []);

  /**
   * Once the controller is setup, start the interval to update it
   */
  useEffect(() => {
    if (controller && isMountedRef.current) {
      setIntervalID(setInterval(updateController));
    }
  }, [controller, updateController]);


  /**
   * Build a code example based on the listeners array
   */
  const codeExample = useMemo(
    () => `const controller = new Controller([${
      listeners.map(key => 
        `\n   {key: '${key}', down: keyDown(), up: keyUp()}`
      ).join(',')
    }\n ]);\n\n setInterval(() => controller.update());`,
    []
  );

  /**
   * Render a div that represents a key on the keyboard
   * @param id - The id of the div
   * @param text - The text to display on the key
   * @param extraClasses - Any additional CSS classes to add to the div
   */
  const renderKey = (id: string, text: string, extraClasses: string = '') => (
    <div id={`key_${id}`} className={clsx("col", "shadow--lw", styles.rows, styles.key, styles.keyColor, extraClasses)}>{text}</div>
  );

  return (
    <section>
      <div className="row">
        <div className="col col--10">
          <div className={clsx("row row--no-gutters", styles.columns)}>
            <div className={clsx("col", styles.rows, styles.key)} />
            {renderKey('w', 'W')}
            {renderKey('enter', 'Enter', 'col--5')}
            {renderKey('arrowup', '↑')}
            <div className={clsx("col", styles.rows, styles.key)} />
          </div>

          <div className={clsx("row row--no-gutters", styles.columns)}>
            {renderKey('a', 'A')}
            {renderKey('s', 'S')}
            {renderKey('d', 'D')}
            <div className={clsx("col", styles.rows, styles.key)} />
            {renderKey('arrowleft', '←')}
            {renderKey('arrowdown', '↓')}
            {renderKey('arrowright', '→')}
          </div>

          <div className={clsx("row row--no-gutters", styles.columns)}>
            <div className={clsx("col", styles.rows, styles.key)} />
            {renderKey('space', 'Space Bar', 'col col--8')}
            <div className={clsx("col", styles.rows, styles.key)} />
          </div>
        </div>

        <div className="col">
          {codeExample && (
            <CodeBlock>
              {codeExample}
            </CodeBlock>
          )}
        </div>
      </div>
    </section>
  );
}