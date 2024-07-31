import { useState, JSX, useMemo, useEffect } from 'react';
import CodeBlock from '@theme/CodeBlock';
import Example from '@site/static/img/example.jpg';
import { ColorFilter } from 'springroll';

/**
 * Resize Component - Simple demo page showing off SpringRoll's SafeScaleManager. Referenced in docs/Examples/resize.mdx
 * @returns JSX.Element
 */
export default function ColorFilterExample(): JSX.Element {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [ratio, setRatio] = useState(0);

  const [colorFilter, setColorFilter] = useState(null);
  const [options, setOptions] = useState([]);
  // SafeScaleManager uses the window object which isn't available in Node
  // so the build process requires it to be dynamically imported to avoid errors
  useEffect(() => {
    setColorFilter(new ColorFilter());
    // setOptions(colorFilter.types.map((type) => <option value={type}>{type}</option>));
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      // import('springroll').then(({ SafeScaleManager }) => {
      //   // setManager(
      //   //   new SafeScaleManager({
      //   //     width: 1320,
      //   //     height: 780,
      //   //     safeWidth: 1024,
      //   //     safeHeight: 660,
      //   //     callback: function (resizeData) {
      //   //       console.log('This is called on window resize');
      //   //       console.log('width: ', resizeData.width);
      //   //       console.log('height: ', resizeData.height);
      //   //       console.log('scale ratio: ', resizeData.scale);

      //   //       setWidth(resizeData.width);
      //   //       setHeight(resizeData.height);
      //   //       setRatio(resizeData.scaleRatio);
      //   //     }
      //   //   })
      //   // );
      // });
    }
  }, []);

  useEffect(() => {
    if (colorFilter) {
      setOptions(Object.entries(colorFilter.types).map(([key, value]) => 
        <option key={type} value={type}>{type}</option>
      )));
    }
  }, [colorFilter]);

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
        <div slot="example">
        <p className="filter__label font-12">Color Filter</p>
          <select id="types">
            {options.length > 0 && options}
          </select> 
          
          <img src={Example} alt="Color Filter Example Image" />
        
          {/* <img width="50%" height="50%" class="filter__image" ref="image" src="@/assets/example.jpg" alt="Example Image">
          <label class="filter__label font-12">Color Filter</label>
          <v-select class="filter__select" v-model="selected" item-text="name" :items="types" @input="changeFilter($event)" /> */}
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