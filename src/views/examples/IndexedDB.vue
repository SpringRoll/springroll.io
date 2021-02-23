<template>
  <Example>
    <div class="idb__game-container" slot="example">
      <iframe slot="example" class="idb__game" id="idb"></iframe>
    </div>
    <div slot="code" class="code__container">
      <code-block></code-block>
    </div>
    <div slot="docs">
      <v-card>
        <v-toolbar
          flat
          color="primary"
          dark
        >
          <v-toolbar-title class="font-21">Indexed DB</v-toolbar-title>
        </v-toolbar>
        <v-tabs vertical>
          <v-tab class="font-16">
            Option 1
          </v-tab>
          <v-tab class="font-16">
            Option 2
          </v-tab>
          <v-tab class="font-16">
            Option 3
          </v-tab>

          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <p class="docs__text font-16">
                  Sed aliquam ultrices mauris. Donec posuere vulputate arcu. Morbi ac felis. Etiam feugiat lorem non metus. Sed a libero.
                </p>

                <p class="docs__text font-16">
                  Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel, lacus. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc. Aliquam lobortis. Aliquam lobortis. Suspendisse non nisl sit amet velit hendrerit rutrum.
                </p>

                <p class="docs__text font-16">
                  Phasellus dolor. Fusce neque. Fusce fermentum odio nec arcu. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Phasellus blandit leo ut odio.
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <p class="docs__text font-16">
                  Morbi nec metus. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Nunc sed turpis.
                </p>

                <p class="docs__text font-16">
                  Suspendisse feugiat. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In hac habitasse platea dictumst. Fusce ac felis sit amet ligula pharetra condimentum.
                </p>

                <p class="docs__text font-16">
                  Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Nam commodo suscipit quam. In consectetuer turpis ut velit. Sed cursus turpis vitae tortor. Aliquam eu nunc.
                </p>

                <p class="docs__text font-16">
                  Etiam ut purus mattis mauris sodales aliquam. Ut varius tincidunt libero. Aenean viverra rhoncus pede. Duis leo. Fusce fermentum odio nec arcu.
                </p>

                <p class="docs__text font-16">
                  Donec venenatis vulputate lorem. Aenean viverra rhoncus pede. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. Fusce commodo aliquam arcu. Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi.
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <p class="docs__text font-16">
                  Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In dui magna, posuere eget, vestibulum et, tempor auctor, justo.
                </p>

                <p class="docs__text font-16">
                  Cras sagittis. Phasellus nec sem in justo pellentesque facilisis. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nam at tortor in tellus interdum sagittis.
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </div>
  </Example>
</template>

<script>
import Iframe from '@/mixins/Iframe';
import CodeBlock from '@/components/CodeBlock';
import Example from '@/components/Example';
import { Container, UserDataPlugin } from 'springroll-container';

export default {
  mixins: [Iframe],
  components: {
    CodeBlock,
    Example
  },
  data() {
    return {
      codeBlocks: {
        openDB: '',
        createRecord: '',
        updateRecord: '',
        deleteRecord: '',
        deleteBD: ''
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
    height: 30rem;
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
