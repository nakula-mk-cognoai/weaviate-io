import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function PricingTable() {
  return (
    <div className={styles.bgContainer}>
      <div className={styles.soc2Container}>
        <div className="container">
          <div className={styles.box}>
            <div className={styles.soc2Box}>
              <h2>Pricing Overview</h2>

              <p>
                Our ecosystem is designed to give you the capabilities to build
                and test your applications for free. When you are ready to move
                to production, simply pick a plan that best suits your needs.
              </p>
            </div>

            <div className={styles.tableBackground}>
              <div className={styles.tableContainer}>
                <div className={styles.tablePoints}>
                  <div className={styles.longSquare}>
                    <span>Best for</span>
                    <hr></hr>
                  </div>
                  <div className={styles.smallSquare}>
                    <span>Deployment Options</span>
                    <hr></hr>
                  </div>
                  <div className={styles.smallSquare}>
                    <span> Available on Marketplaces</span>
                    <hr></hr>
                  </div>
                  <div className={styles.longSquare}>
                    <span>Pricing type</span>
                    <hr></hr>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
