import {
  useState,
  JSX,
  useMemo,
  useEffect,
  ChangeEventHandler,
  useRef,
} from "react";
import CodeBlock from "@theme/CodeBlock";
//@ts-ignore
import Example from "@site/static/img/example.jpg";
import styles from './styles.module.scss';
import { ColorFilter } from "springroll";
import clsx from "clsx";

/**
 * Color Filter Component - Simple demo page showing off SpringRoll's ColorFilter. Referenced in docs/Examples/filter.mdx
 * @returns JSX.Element
 */
export default function ColorFilterExample(): JSX.Element {
  const [colorFilter, setColorFilter] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("none");
  const filterExampleImageRef = useRef<HTMLImageElement | null>(null);

  //Instantiate the ColorFilter and set the reference to the example image
  useEffect(() => {
    setColorFilter(new ColorFilter());
    filterExampleImageRef.current = document.getElementById("filterExampleImage") as HTMLImageElement;
  }, []);

  // Create the options for the select box based on the filter types
  useEffect(() => {
    if (colorFilter) {
      setOptions(
        colorFilter.types.map((type) => (
          <option key={type.name} value={type.value}>
            {type.name}
          </option>
        )),
      );
    }
  }, [colorFilter]);

  // Apply the selected filter to the example image, or remove the filter if "none" is selected
  useEffect(() => {
    if (!colorFilter) return;
    if (selectedOption !== "none") {
      console.log(`Selected option: ${selectedOption}`);
      colorFilter.applyFilter(filterExampleImageRef.current, selectedOption);
    } else {
      colorFilter.removeFilter();
    }
  }, [selectedOption]);

  const codeExample = useMemo(
    () => (selectedOption == "none") ? 'filter.removeFilter()' : `const filter = new ColorFilter(); \n\nfilter.changeFilter('${selectedOption}');`,
    [selectedOption],
  );

  // Handle the select box change event
  const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setSelectedOption(event.currentTarget.value);
  };

  return (
    <section>
      <div className={clsx('row', styles.filterContainer)}>
        <div className="col col--5">
          <p className={styles.filterLabel}>Color Filter</p>
          <select id="types" className={styles.selectBox} onChange={handleChange}>
            <option key="none" value="none">
              None
            </option>
            {options.length > 0 && options}
          </select>

          <img
            id="filterExampleImage"
            className={styles.exampleImage}
            src={Example}
            alt="Color Filter Example Image"
          />
        </div>
        <div className="col">
          {codeExample && <CodeBlock className={styles.filterCodeBlock}>{codeExample}</CodeBlock>}
        </div>
      </div>
    </section>
  );
}
