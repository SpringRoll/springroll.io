import React, { useState, useEffect, useRef } from 'react';
import { Container, UserDataPlugin } from 'springroll-container';
import CodeBlock from '@theme/CodeBlock';
import styles from './styles.module.scss';
import clsx from 'clsx';
import DataTable, { DataTableProps } from '../DataTable'
import { codeBlocks, eventMap } from './exampleData';
import IbdDocs from './ibdDocs';

interface DBData {
    dbName: string;
    store: string;
}

interface DataVisual {
    key: string;
    value: any;
}

const columns: DataTableProps['columns'] = [
    { key: 'key', label: 'Key' },
    { key: 'value', label: 'Value' }
];

/**
 * IndexedDBExample - Component to display the IndexedDB example
 * @returns JSX.Element
 */
export default function IndexedDBExample(): JSX.Element {
    const [currentExample, setCurrentExample] = useState<string>('openDB');
    const [visualizeError, setVisualizeError] = useState<string>('');
    const [dialog, setDialog] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [dataVisual, setDataVisual] = useState<DataVisual[]>([]);
    const [dbData, setDbData] = useState<DBData>({ dbName: '', store: '' });
    const containerRef = useRef<Container | null>(null);

    useEffect(() => {
        const events = Object.keys(eventMap);

        const container = new Container('#idb', {
            plugins: [new UserDataPlugin()]
        });

        containerRef.current = container;

        container.openPath('/idb-child.html');

        events.forEach(event => {
            container.client.on(event, (data: any) => {
                setCurrentExample(eventMap[data.type]);
                setDBData(data.data);
            });
        });

        return () => {
            container.destroy();
        };
    }, []);

    const setDBData = (data: any) => {
        console.log(`setDBData: `, data);
        if (data.type === 'IDBRemove') {
            setDbData({ dbName: '', store: '' });
            return;
        }

        setDbData(prevState => ({
            dbName: data.dbName ? data.dbName : prevState.dbName,
            store: data.additions ? data.additions.stores[0].storeName : (data.storeName ? data.storeName : '')
        }));
    };

    const getData = async () => {
        
        setVisualizeError('');
        if (!dbData.dbName) {
            setVisualizeError('Database Visualization requires an open DB connection');
            return;
        }
        console.log(`getData: `, dbData);
        setLoading(true);
        const request = window.indexedDB.open(dbData.dbName);

        request.onsuccess = (e) => {
            const db = (e.target as IDBOpenDBRequest).result;
            let trans, store, request;

            try {
                trans = db.transaction(dbData.store, 'readwrite');
                store = trans.objectStore(dbData.store);
                request = store.getAllKeys(); // get the data
            } catch (error) {
                console.error(error);
                setVisualizeError(error.message);
                setLoading(false);
                return;
            }

            request.onsuccess = async (e) => {
                const data = (e.target as IDBRequest).result; // All records in store
                db.close(); // close the db

                const results = [];
                for (const key of data) {
                    results.push({
                        key: key,
                        value: await promisifiedRead(key)
                    });
                }
                setDataVisual(results);
                setLoading(false);
                setDialog(true);
            };

            request.onerror = (e) => {
                setLoading(false);
                console.log('Error Getting: ', e);
            };
        };

        request.onerror = (e) => {
            console.log('Error Getting: ', e);
            setLoading(false);
        };
    };

    const promisifiedRead = (key: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            const request = window.indexedDB.open(dbData.dbName);

            request.onsuccess = (e) => {
                const db = (e.target as IDBOpenDBRequest).result;
                const transaction = db.transaction(dbData.store, 'readwrite');
                const objectStore = transaction.objectStore(dbData.store);
                const getRequest = objectStore.get(key);

                getRequest.onsuccess = (event) => {
                    resolve((event.target as IDBRequest).result);
                };

                getRequest.onerror = (event) => {
                    reject((event.target as IDBRequest).error);
                };
            };

            request.onerror = (event) => {
                reject((event.target as IDBOpenDBRequest).error);
            };
        });
    };

    return (
        <section>
            <div className="row">
                <div className="col col--5">
                    <iframe className={clsx("row", styles.exampleFrame)} id="idb"></iframe>
                    <div className={clsx( styles.buttonRow)}>
                        <button className={clsx("button button--primary", styles.button)} onClick={getData} disabled={loading}>
                            Display Data
                        </button>
                        <input
                            className={styles.storeInputField}
                            type="text"
                            value={dbData.store}
                            onChange={(e) => setDbData({ ...dbData, store: e.target.value })}
                            placeholder="Store to Display"
                        />
                        {visualizeError && <p className="data-display__error">{visualizeError}</p>}
                        {dialog && (
                            <div className={styles.modalOverlay}>
                                <div className={styles.modal}>
                                <button aria-label="Close" className={clsx("clean-btn close",styles.closeButton)} type="button"  onClick={() => setDialog(false)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                    <DataTable rows={dataVisual} columns={columns} />
                                </div>
                            </div>
                        )}
                    </div>

                </div>
                <div className="col col--5">
                    <select
                        className={clsx(styles.selectBox)}
                        value={currentExample}
                        onChange={(e) => setCurrentExample(e.target.value)} >
                        {Object.values(codeBlocks).map(block => (
                            <option key={block.value} value={block.value}>{block.text}</option>
                        ))}
                    </select>
                    <CodeBlock className={clsx(styles.codeBlock)}>{codeBlocks[currentExample].code}</CodeBlock>
                    
                </div>
                <IbdDocs />
            </div>
        </section>
    );
};