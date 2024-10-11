interface BlockData {
    code: string;
    text: string;
    value: string;
}

const createBlockData = (code: string, text: string, value: string): BlockData => ({
    code,
    text,
    value
});


export const codeBlocks: Record<string, BlockData> = {
    openDB:
        createBlockData(
            `//Full example
const testApp = new springroll.Application({
    features: {
        userData: true
    }
});

const openButton = document.querySelector('#open');

const dbName = document.querySelector('#dbName');
const storeName = document.querySelector('#storeName');
const version = document.querySelector('#version');

testApp.container.on('connected', async () => {
    openButton.addEventListener('click', async () => {
        //Open database call is also used to create new stores if required
        let openResult = await springroll.UserData.IDBOpen(
            dbName.value,
            Number.parseInt(version.value),// Must be an integer, any other type may give unexpected results
            { stores: [{ storeName: storeName.value }] } // Additions parameter. Used to create new store
        );

        console.log(openResult);
    });
});`,
            'Open Database',
            'openDB'
        ),
    deleteStore: createBlockData(
        `// If you have an active DB connection, close it before deleting the store
const closeResult = await springroll.UserData.IDBClose();
let deleteResult = await springroll.UserData.IDBOpen(
    dbName.value,
    version.value, // Must be an integer, and higher than the current version
    null, // additions parameter unused when deleting
    deleteStoreName.value != "" ? { stores: [{ storeName: deleteStoreName.value }] } : null
);
console.log(deleteResult);`,
        'Delete Store',
        'deleteStore'
    ),
    createRecord: createBlockData(
        `let createResult = await springroll.UserData.IDBAdd(
    storeName.value,
    recordValue.value,
    recordKey.value
);
console.log(createResult);`,
        'Create Record',
        'createRecord'
    ),
    updateRecord: createBlockData(
        `let updateResult = await springroll.UserData.IDBUpdate(
    storeName.value,
    recordKey.value,
    recordValue.value
);
console.log(updateResult);`,
        'Update Record',
        'updateRecord'
    ),
    deleteRecord: createBlockData(
        `let deleteResult = await springroll.UserData.IDBRemove(
    storeName.value,
    recordKey.value
);
console.log(deleteResult);`,
        'Delete Record',
        'deleteRecord'
    ),
    getRecord: createBlockData(
        `let result = await springroll.UserData.IDBRead(
    storeName.value,
    recordKey.value
);
console.log(result);`,
        'Get Record',
        'getRecord'
    ),
    deleteDB: createBlockData(
        `let deleteDBResult = await springroll.UserData.IDBDeleteDB(dbName.value);
console.log(deleteDBResult);`,
        'Delete Database',
        'deleteDB'
    ),
    closeDB: createBlockData(
        `let closeResult = await springroll.UserData.IDBClose();
console.log(closeResult)`,
        'Close Database',
        'closeDB'
    )
};

// A mapping of event names to their examples
export const eventMap: Record<string, string> = {
    IDBOpen: 'openDB',
    IDBAdd: 'createRecord',
    IDBRemove: 'deleteRecord',
    IDBRead: 'getRecord',
    IDBUpdate: 'updateRecord',
    IDBClose: 'closeDB',
    IDBDeleteDB: 'deleteDB',
    IDBReadAll: 'readAll'
};