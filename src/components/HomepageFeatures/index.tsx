import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.scss';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Lightweight',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Written in pure JavaScript, SpringRoll is only ~120KB when minified and is designed to be framework/engine agnostic. It can be dropped into
        any JS environment. 
      </>
    ),
  },
  {
    title: 'End to End communication',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        SpringRoll and SpringRoll Container take care of all communication. Perform the initial setup and let SpringRoll handle the rest.
      </>
    ),
  },
  {
    title: 'Extensible',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        SpringRoll has a powerful plugin based architecture. If you require additional functionality you can write
        custom plugins to do anything you need.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
