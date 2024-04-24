import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function OnDemand() {
  return (
    <div className={styles.bgColor}>
      <div className="container">
        <div className={styles.marketTitle}>
          <h2 className={styles.marketText}>On-demand webinars</h2>
        </div>
        <div className={styles.ondemandSection}>
          <div className={styles.marketBox}>
            <div className={styles.marketImage}></div>
            <span>WEBINAR</span>
            <p>How to build an AI-Native foundation for enterprise apps</p>
            <Link to="https://webinars.devops.com/how-to-build-an-ai-native-foundation-for-enterprise-apps">
              Watch Video
            </Link>
          </div>
          <div className={styles.marketBox}>
            <div className={styles.marketImage}></div>
            <span>WEBINAR</span>
            <p>
              Beyond Vector Search: Taking a hybrid approach for better results
            </p>
            <Link to="https://events.weaviate.io/hybrid-search-webinar">
              Watch Video
            </Link>
          </div>
          <div className={styles.marketBox}>
            <div className={styles.marketImage}></div>
            <span>WEBINAR</span>
            <p>
              Multimodal Product Discovery: The next generation of search for
              ecommerce
            </p>
            <Link to="https://events.weaviate.io/ecommerce-webinar">
              Watch Video
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
