import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
//@ts-ignore
import LogoUrl from '@site/static/img/logo.png';

import styles from './index.module.scss';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className={clsx('container', styles.hero__inner)}>
        <img className={styles.mainLogo} src={LogoUrl} alt="SpringRoll Logo" />
        <Heading as="h1" className="hero__title font-aleo">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle font-aleo">{siteConfig.tagline}</p>
        <div className={styles.tutorial__buttons}>
            <Link
              className="button button--secondary"
              to="/docs/springroll/getting-started#installation">
              SpringRoll Quick Start
            </Link>
            <Link
              className="button button--secondary"
              to="/docs/springroll-container/getting-started">
              Container Quick Start
            </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
