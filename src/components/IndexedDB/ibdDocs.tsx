import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.scss';
import clsx from 'clsx';


/**
 * A data structure for documentation steps
 */
interface DocsData {
  [key: string]: {
    name: string;
    steps: string[];
  };
}

/**
 * IbdDocs - Component to display the documentation for the IndexedDB example
 * @returns JSX.Element
 */
export default function IbdDocs(): JSX.Element {
    const [activeTab, setActiveTab] = useState<string>('open');

    // The steps for each tab
    const docs: DocsData = {
      open: {
        name: 'Open Database',
        steps: [
          'Enter a value for Database Name and Store Name',
          'Optional: Enter 2 for DBVersion. The higher number is for ease of testing when deleting the database',
          'Click the "Open Database" button',
          'To see this database click the "Display Data" button',
          'Optionally you can view the database information inside the dev tools console by hitting "f12"',
          'Go to the Storage Tab, it may be hidden inside the >> menu',
          'Under Indexed BD > should be your database with the given store.',
        ],
      },
      deleteStore: {
        name: 'Delete a Store',
        steps: [
          'Enter a value for Delete Store Name',
          'Click the "Delete Store" button',
        ],
      },
      create: {
        name: 'Create a Record',
        steps: [
          'Enter a value for recordStore, the value given in the open connection step',
          'Enter a value for the recordKey',
          'Enter a value for the recordValue',
          'Press the "Create Record" button',
          'You can check the value either by using the "Display Data" button, using the dev tools or by following the Read Record step',
        ],
      },
      update: {
        name: 'Update a Record',
        steps: [
          'Enter a value for updateRecordStore, the value given in the open connection step',
          'Enter a value for the updateRecordKey',
          'Enter a value for the updateRecordValue',
          'Press the "Update Record" button',
          'You can check the value either by using the "Display Data" button, the dev tools or by following the Read Record step',
        ],
      },
      delete: {
        name: 'Delete a Record',
        steps: [
          'Enter a value for deleteRecordStore, the value given in the open connection step',
          'Enter a value for the deleteRecordKey',
          'Press the "Delete Record" button',
          'You can check the value either by using the "Display Data" button, the dev tools or by following the Read Record step, this should output undefined',
        ],
      },
      read: {
        name: 'Read a Record',
        steps: [
          'Enter a value for readRecordStore, the value given in the open connection step',
          'Enter a value for readRecordKey, the value given in the add record step',
          'Press the "Read Record" button',
          'The output should be given as a value',
        ],
      },
      deleteDB: {
        name: 'Delete a Database',
        steps: [
          'This method required you to close the connection to the database, press the Close DB Button',
          'OPTIONAL: try to open a connection with the database with a lower version number to see it fail due to having a lower version number than the current version',
          'Enter in the name of the database created in the Open Database step',
          'Press the "Delete Database" button',
          'To check this worked, check the storage tab in the dev tools or, one could try to open a connection with the version number of 1. If this works, the database was deleted. If not, it will throw an error showing that the database already exists and has a higher version number',
        ],
      },
      close: {
        name: 'Close Database',
        steps: [
          'Simply click the "Close DB Connection" button',
        ],
      },
    };
  
    return (
      <div>
        <Link className={styles.ibdReadme} to="https://github.com/SpringRoll/SpringRoll/tree/main/src/state#indexeddb">
          UserData - IndexedDB README
        </Link>
        <div className="card">
          <div className="card__header">
            <h3>How to use this example</h3>
          </div>
          <div className="card__body">
            <ul className={clsx("pills",styles.pillContainer)}>
              {Object.entries(docs).map(([key, section]) => (
                <li
                  key={key}
                  className={`pills__item ${activeTab === key ? "pills__item--active" : ""}`}
                  onClick={() => setActiveTab(key)}
                >
                  {section.name}
                </li>
              ))}
            </ul>
            <div className="padding-vert--md">
              <ol>
                {docs[activeTab].steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
};
