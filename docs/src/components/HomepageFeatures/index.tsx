import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Beautiful Backgrounds',
    description: (
      <>
        Choose from millions of high-quality photos from Unsplash, NASA, Bing, and more.
        Or use your own custom images, videos, and gradients.
      </>
    ),
  },
  {
    title: 'Powerful Widgets',
    description: (
      <>
        Stay productive with widgets for time, weather, notes, todos, and system information.
        All fully customizable to fit your workflow.
      </>
    ),
  },
  {
    title: 'Privacy Focused',
    description: (
      <>
        TablissNG respects your privacy. No tracking, no unnecessary permissions,
        and open source for full transparency.
      </>
    ),
  },
];

function Feature({title, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
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
