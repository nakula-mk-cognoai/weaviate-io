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
                  <div className={styles.longCell}>
                    <hr></hr>
                  </div>
                  <div className={styles.smallCell}>
                    <span>Best for</span>
                  </div>
                  <hr></hr>
                  <div className={styles.smallCell}>
                    <span>Deployment Options</span>
                    <hr></hr>
                  </div>
                  <div className={styles.smallCell}>
                    <span> Available on Marketplaces</span>
                    <hr></hr>
                  </div>
                  <div className={styles.longCell}>
                    <span>Pricing type</span>
                    <hr></hr>
                  </div>
                </div>
                {/* Serverless Table */}
                <div className={styles.serverlessTable}>
                  <div className={styles.longCell}>
                    <div className={styles.cellContent}>
                      <div className={styles.cellImage}></div>
                      <h3>Serverless</h3>
                      <span>
                        We manage everything for you in Weaviate Cloud Services
                        (WCS)
                      </span>
                      <hr></hr>
                    </div>
                  </div>
                  <div className={styles.smallCell}>
                    <span>
                      Building and prototyping with seamless scaling and
                      flexible pay-as-you-go pricing
                    </span>
                  </div>
                  <hr></hr>
                  <div className={styles.smallCell}>
                    <div className={styles.cellContent}>
                      <div className={styles.cellLogo}>
                        <div className={styles.logoText}>
                          <span>Weaviate</span>
                          <span>Cloud Services</span>
                        </div>
                      </div>
                    </div>
                    <hr></hr>
                  </div>
                  <div className={styles.smallCell}>
                    <span> Available on Marketplaces</span>
                    <hr></hr>
                  </div>
                  <div className={styles.longCell}>
                    <span>
                      Charges are consumption-based, pay-as-you-go, determined
                      by the dimensions stored and the chosen SLA package
                    </span>
                    <hr></hr>
                  </div>
                </div>
                {/* Enterprise Table */}
                <div className={styles.serverlessTable}>
                  <div className={styles.longCell}>
                    <div className={styles.cellContent}>
                      <div className={styles.cellImage}></div>
                      <h3>Enterprise Dedicated</h3>
                      <span>
                        We manage everything for you in a dedicated instance in
                        Weaviate Cloud Services (WCS)
                      </span>
                      <hr></hr>
                    </div>
                  </div>
                  <div className={styles.smallCell}>
                    <span>
                      Deploying large-scale production use cases without the
                      complexities of self-management
                    </span>
                  </div>
                  <hr></hr>
                  <div className={styles.smallCell}>
                    <div className={styles.cellContent}>
                      <div className={styles.cellLogo}>
                        <div className={styles.logoText}>
                          <span>Weaviate</span>
                          <span>Cloud Services</span>
                        </div>
                      </div>
                    </div>
                    <hr></hr>
                  </div>
                  <div className={styles.smallCell}>
                    <div className={styles.cellLogo}>
                      <div className={styles.logoText}>
                        <span>Weaviate</span>
                        <span>Cloud Services</span>
                      </div>
                    </div>
                    <div className={styles.cellLogo}>
                      <div className={styles.logoText}>
                        <span>Weaviate</span>
                        <span>Cloud Services</span>
                      </div>
                    </div>
                    <div className={styles.cellLogo}>
                      <div className={styles.logoText}>
                        <span>Weaviate</span>
                        <span>Cloud Services</span>
                      </div>
                    </div>
                    <hr></hr>
                  </div>
                  <div className={styles.longCell}>
                    <span>
                      Charges are consumption-based, pay-as-you-go, determined
                      by the dimensions stored and the chosen SLA package
                    </span>
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
