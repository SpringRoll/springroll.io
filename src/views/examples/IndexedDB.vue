<template>
<Example>
  <div class="idb__game-container" slot="example">
    <iframe slot="example" class="idb__game" id="idb"></iframe>
  </div>
  <div slot="code" class="code__container">
    <code-block></code-block>
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
      codeBlocks: {
        openDB: '',
        deleteStore: '',
        createRecord: '',
        updateRecord: '',
        deleteRecord: '',
        getRecord: '',
        deleteDB: '',
        closeDB: '',
      },
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
</style>
