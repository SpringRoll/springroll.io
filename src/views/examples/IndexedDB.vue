<template>
<Example>
  <div class="idb__game-container" slot="example">
    <iframe slot="example" class="idb__game" id="idb"></iframe>
    <v-btn :loading="loading" color="primary" class="font-16" dark @click.stop="getData">
      Display Data
    </v-btn>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title class="font-21">Settings</v-toolbar-title>
        </v-toolbar>
          <v-data-table
            :headers="headers"
            :items="dataVisual"
            :items-per-page="10"
            class="elevation-1"
          ></v-data-table>
      </v-card>
    </v-dialog>
  </div>
  <div slot="code" class="code__container">
    <v-select v-model="currentExample" :items="Object.values(codeBlocks)" label="Operation" solo></v-select>
    <CodeBlock :code="codeBlocks[currentExample].code"></CodeBlock>
  </div>
  <IDBDocs slot="docs"></IDBDocs>
</Example>
</template>

<script>
import Iframe from '@/mixins/Iframe';
import CodeBlock from '@/components/CodeBlock';
import Example from '@/components/Example';
import IDBDocs from '@/components/IDBDocs';

import {
  Container,
  UserDataPlugin
} from 'springroll-container';

export default {
  mixins: [Iframe],
  components: {
    CodeBlock,
    Example,
    IDBDocs
  },
  data() {
    return {
      currentExample: 'openDB',
      dialog: false,
      loading: false,
      dataVisual: '',
      headers: [
        { text: 'Key', value: 'key', align: 'start'},
        { text: 'Value', value: 'value'}
      ],
      dbData: {
        dbName: '',
        store: '',
      },
      eventMap: {
        IDBOpen: 'openDB',
        IDBAdd: 'createRecord',
        IDBRemove: 'deleteRecord',
        IDBRead: 'getRecord',
        IDBUpdate: 'updateRecord',
        IDBClose: 'closeDB',
        IDBDeleteDB: 'deleteDB',
      },
      codeBlocks: {
        openDB: {
          code: `
//Full example
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
        version.value,
        { stores: [{ storeName: storeName.value }] } //additions parameter. Used to create new store
    );

    console.log(openResult);
  });
});`,
          text: 'Open Database',
          value: 'openDB'
        },
        deleteStore: {
          code: `
let deleteResult = await springroll.UserData.IDBOpen(
  dbName.value,
  version.value != "" ? version : null,
  null, // additions parameter unused when deleting
  deleteStoreName.value != "" ? { stores: [{ storeName: deleteStoreName.value }] } : null
);
console.log(deleteResult);

          `,
          text: 'Delete Store',
          value: 'deleteStore'
        },
        createRecord: {
          code: `
let createResult = await springroll.UserData.IDBAdd(
  storeName.value,
  recordValue.value,
  recordKey.value
);
console.log(createResult);
          `,
          text: 'Create Record',
          value: 'createRecord'
        },
        updateRecord: {
          code: `
let updateResult = await springroll.UserData.IDBUpdate(
  storeName.value,
  recordKey.value,
  recordValue.value
);
console.log(updateResult);
          `,
          text: 'Update Record',
          value: 'updateRecord'
        },
        deleteRecord: {
          code: `
let deleteResult = await springroll.UserData.IDBRemove(
  storeName.value,
  recordKey.value
);
console.log(deleteResult);
          `,
          text: 'Delete Record',
          value: 'deleteRecord'
        },
        getRecord: {
          code: `
let result = await springroll.UserData.IDBRead(
  storeName.value,
  recordKey.value
);
console.log(result);
          `,
          text: 'Get Record',
          value: 'getRecord'
        },
        deleteDB: {
          code: `
let deleteDBResult = await springroll.UserData.IDBDeleteDB(dbName.value);
console.log(deleteDBResult);
          `,
          text: 'Delete Database',
          value: 'deleteDB'
        },
        closeDB: {
          code: `
let closeResult = await springroll.UserData.IDBClose();
console.log(closeResult)
          `,
          text: 'Close Database',
          value: 'closeDB'
        }
      }
    };
  },
  mounted() {
    const userDataPlugin = new UserDataPlugin();
    const events = [ 'IDBOpen', 'IDBAdd', 'IDBRemove', 'IDBRead', 'IDBUpdate', 'IDBClose', 'IDBReadAll', 'IDBDeleteDB' ];

    const container = new Container('#idb', {
      plugins: [
        userDataPlugin
      ]
    });

    this.container = container;

    this.container.openPath(this.base + 'idb-child.html');

    events.forEach(event => {
      this.container.client.on(event, (data) => {
        this.currentExample = this.eventMap[data.type];
        this.setDBData(data.data);
      });
    });

  },

  destroyed() {
    this.container.destroy();
  },
  methods: {
    setDBData(data) {
      this.dbData.dbName = data.dbName ? data.dbName : '';
      if (data.additions) {
        this.dbData.store = data.additions.stores[0].storeName;
      } else {
        this.dbData.store = data.storeName ?  data.storeName : '';
      }
    },
    /* eslint-disable */
    getData: async function() {
      this.loading = true;
      const request = window.indexedDB.open(this.dbData.dbName);

      //const promisifiedRead = this.promisifiedRead.bind(this);

      request.onsuccess = (e) => {
        const db = e.target.result;
        const trans = db.transaction(this.dbData.store, 'readwrite');
        const store = trans.objectStore(this.dbData.store);
        const request = store.getAllKeys(); //get the data

        request.onsuccess = async (e) => {
          const data = e.target.result; //  All records in store
          db.close(); // close the db

          const results = [];
          for (const key of data) {
            results.push({key: key, value: await this.promisifiedRead(key)});
          }
          this.dataVisual = results;
          this.loading = false;
          this.dialog = true;
        };

        request.onerror = (e) => {
          console.log('Error Getting: ', e);
        };
      };
    },
    promisifiedRead(key) {
      return new Promise((resolve, reject) => {
        const request = window.indexedDB.open(this.dbData.dbName);

        request.onsuccess = (e) => {
          const db = e.target.result;
          const trans = db.transaction(this.dbData.store, 'readwrite');
          const store = trans.objectStore(this.dbData.store);
          const request = store.get(key); //get the data

          request.onsuccess = (e) => {
            const data = e.target.result; //  All records in store
            db.close(); // close the db
            resolve(data);
          };
          request.onerror = function (e) {
            reject('Error Getting: ', e);
          };
        };
      });
    }
  }
};
</script>

<style lang="scss">
@import "~@/scss/colors";

.idb {
  &__game-container {
    min-width: 400px;
    height: 400px;
  }

  &__game {
    height: 100%;
    width: 100%;
  }
}

.docs__text {
  color: black;
}

.v-list-item__title {
  font-size: 1.6rem
}

//TODO: organize this a bit more cleanly
//Dealing with the vuetify font-sizes
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  font-size: 16px;
}
.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  font-size: 16px;
}
.v-data-footer__select .v-select__selections .v-select__selection--comma {
  font-size: 16px;
}
.v-data-footer {
  font-size: 16px !important;
}
</style>
