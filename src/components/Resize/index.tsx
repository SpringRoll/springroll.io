import { useState, JSX, useMemo, useEffect } from 'react';
import CodeBlock from '@theme/CodeBlock';

/**
 * Resize Component - Simple demo page showing off SpringRoll's SafeScaleManager. Referenced in docs/Examples/resize.mdx
 * @returns JSX.Element
 */
export default function ResizeExample(): JSX.Element {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [ratio, setRatio] = useState(0);

  const [manager, setManager] = useState(null);
  // SafeScaleManager uses the window object which isn't available in Node
  // so the build process requires it to be dynamically imported to avoid errors
  useEffect(() => {

    if (typeof window !== 'undefined' && window.speechSynthesis) {
      import('springroll').then(({ SafeScaleManager }) => {
        setManager(
          new SafeScaleManager({
            width: 1320,
            height: 780,
            safeWidth: 1024,
            safeHeight: 660,
            callback: function (resizeData) {
              console.log('This is called on window resize');
              console.log('width: ', resizeData.width);
              console.log('height: ', resizeData.height);
              console.log('scale ratio: ', resizeData.scale);

              setWidth(resizeData.width);
              setHeight(resizeData.height);
              setRatio(resizeData.scaleRatio);
            }
          })
        );
      });
    }
  }, []);

  const codeExample = useMemo(
    () => `const manager = new SafeScaleManager({ 
  width: 1320,
  height: 780,
  safeWidth: 1024,
  safeHeight: 660,
  callback: function (resizeData){
    console.log('This is called on window resize');
    console.log('width: ', resizeData.width); // ${width}
    console.log('height: ', resizeData.height); // ${height}
    console.log('scale ratio: ', resizeData.scale); // ${ratio}
  }
});`,
    [width, height, ratio]
  );

  return (
    <section>
      <div className="row">
        <div className="col  col--3">
          <p>Try resizing the window</p>
          <h4>Width: {width}</h4>
          <h4>Height: {height}</h4>
          <h4>Scale: {ratio}</h4>
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