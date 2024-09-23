import clsx from 'clsx';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

const PBSKidsLogo = require('@site/static/svg/pbs-kids-logo.svg').default;

export default function PBSKids(): JSX.Element {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className={styles.PBSKidsContainer}>
                    <div className={clsx(styles.logoContainer)}><PBSKidsLogo className={styles.logo} role="img" /></div>
                    <div className={clsx(styles.description)}>
                        <p>PBS KIDS has been actively updating and improving SpringRoll for over a decade. This ecosystem powers hundreds of educational games available on the <Link to="https://pbskids.org/games">PBS KIDS website</Link> and <Link to="https://pbskids.org/apps/play-pbs-kids-games.html">PBS KIDS Games app</Link>, reaching millions of players. <br /> <br />
                        PBS KIDS collaborates with children’s media producers, game development studios, and curriculum and accessibility advisors. They have built a framework that is stable, scalable, high-performance, and modern.
                            </p></div>

                </div>
            </div>
        </section>
    );
}
