<template>
<Example>
  <div class="idb__game-container" slot="example">
    <iframe slot="example" class="idb__game" id="idb"></iframe>
  </div>
  <div slot="code" class="code__container">
    <v-select
      v-model="currentExample"
      :items="Object.values(codeBlocks)"
      label="Operation"
      solo
    ></v-select>
    <CodeBlock :code="codeBlocks[currentExample].code"></CodeBlock>
    <!-- <div class="code__controls">
      <v-btn color="accent" class="controls font-14" @click="currentExample='openDB'">Open DB</v-btn>
      <v-btn color="accent" class="controls font-14" @click="currentExample='deleteStore'">Delete Store</v-btn>
      <v-btn color="accent" class="controls font-14" @click="currentExample='createRecord'">Create Record</v-btn>
      <v-btn color="accent" class="controls font-14" @click="currentExample='updateRecord'">Update Record</v-btn>
      <v-btn color="accent" class="controls font-14" @click="currentExample='deleteRecord'">Delete Record</v-btn>
      <v-btn color="accent" class="controls font-14" @click="currentExample='getRecord'">Get Record</v-btn>
      <v-btn color="accent" class="controls font-14" @click="currentExample='deleteDB'">Delete DB</v-btn>
      <v-btn color="accent" class="controls font-14" @click="currentExample='closeDB'">Close DB</v-btn>
    </div> -->
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

    const container = new Container('#idb', {
      plugins: [
        userDataPlugin
      ]
    });

    this.container = container;

    this.container.openPath(this.base + 'idb-child.html');
  },

  destroyed() {
    this.container.destroy();
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
</style>
