import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <img
          src={useBaseUrl('img/logo.svg')}
          alt="TablissNG Logo"
          className={styles.heroLogo}
        />
        <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
        <div className={styles.storeButtons}>
          <a href="https://addons.mozilla.org/en-US/firefox/addon/tablissng/" className={styles.storeButton}>
            <img src="https://blog.mozilla.org/addons/files/2020/04/get-the-addon-fx-apr-2020.svg" height="50" />
          </a>
          <a href="https://chromewebstore.google.com/detail/tabliss-a-beautiful-new-t/dlaogejjiafeobgofajdlkkhjlignalk" className={styles.storeButton}>
            <img src="https://developer.chrome.com/static/docs/webstore/branding/image/HRs9MPufa1J1h5glNhut.png" alt="Get the Extension on Chrome" height="50" style={{ border: '1px solid transparent', borderRadius: '6px' }} />
          </a>
          <a href="https://microsoftedge.microsoft.com/addons/detail/tablissng/mkaphhbkcccpgkfaifhhdfckagnkcmhm" className={styles.storeButton}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Get_it_from_Microsoft_Badge.svg/320px-Get_it_from_Microsoft_Badge.svg.png" alt="Get the Extension on Edge" height="50" style={{ border: '1px solid transparent', borderRadius: '4px' }} />
          </a>
        </div>
        <div className={styles.buttons} style={{ gap: '1rem' }}>
          <Link
            className="button button--primary button--lg"
            to="/docs/intro">
            View Documentation
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="https://bookcatkid.github.io/TablissNG/">
            Try in Browser
          </Link>
        </div>
        <div className={styles.showcase} style={{ marginTop: '4rem' }}>
          <img
            src={useBaseUrl('img/screenshots/screenshot_1.png')}
            alt="Tabliss Showcase"
            className={styles.showcaseImage}
            style={{ maxWidth: '1000px' }}
          />
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} Docs`}
      description="TablissNG - A beautiful, private, and customizable new tab page for your browser.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <section className={styles.showcaseSection}>
          <div className="container">
            <div className={styles.showcase} style={{ gap: '2rem' }}>
              <div className={styles.showcaseGrid}>
                <img src={useBaseUrl('img/screenshots/screenshot_2.png')} alt="Screenshot 2" className={styles.showcaseImage} />
                <img src={useBaseUrl('img/screenshots/screenshot_3.png')} alt="Screenshot 3" className={styles.showcaseImage} />
              </div>
              <div className={styles.buttons}>
                <Link
                  className="button button--secondary button--lg"
                  to="/gallery">
                  View All Screenshots
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
