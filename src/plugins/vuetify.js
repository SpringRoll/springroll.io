import '@mdi/font/css/materialdesignicons.css'; // Ensure you are using css-loader
import Vue from 'vue';
import Vuetify, {
  VForm,
  VApp,
  VBtn,
  VMain,
  VAppBar,
  VTextField,
  VSlider,
  VSelect,
  VList,
  VListGroup,
  VListItem,
  VListItemContent,
  VListItemTitle,
  VIcon,
  VNavigationDrawer,
  VCard,
  VExpansionPanel,
  VDialog,
  VSpacer,
  VTooltip,
  VTabItem,
  VCardText,
  VTabs,
  VTab,
  VToolbar,
  VToolbarTitle,
} from 'vuetify/lib';

Vue.use(Vuetify, {
  components: {
    VForm,
    VApp,
    VBtn,
    VAppBar,
    VMain,
    VTextField,
    VSlider,
    VSelect,
    VList,
    VListGroup,
    VListItem,
    VListItemContent,
    VListItemTitle,
    VIcon,
    VNavigationDrawer,
    VCard,
    VExpansionPanel,
    VDialog,
    VSpacer,
    VTooltip,
    VTabItem,
    VCardText,
    VTabs,
    VTab,
    VToolbar,
    VToolbarTitle,
  }
});

const opts = {
  theme: {
    dark: false,
    themes: {
      light: {
        primary: '#095B8F',
        secondary: '#123550',
        accent: '#0C7AC0',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      }
    }
  }
};

export default new Vuetify(opts);