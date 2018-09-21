import Vue from 'vue';
import {
  Vuetify,
  VApp,
  VBtn,
  VGrid,
  VToolbar,
  VTextField,
  VSlider,
  VSelect,
  VList,
  VIcon,
  VNavigationDrawer,
  VCard,
  VExpansionPanel,
  VDialog
} from 'vuetify';
import 'vuetify/src/stylus/app.styl';

Vue.use(Vuetify, {
  components: {
    VApp,
    VBtn,
    VGrid,
    VToolbar,
    VTextField,
    VSlider,
    VSelect,
    VList,
    VIcon,
    VNavigationDrawer,
    VCard,
    VExpansionPanel,
    VDialog
  },
  theme: {
    primary: '#095B8F',
    secondary: '#123550',
    accent: '#0C7AC0',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
});

import './vuetify.styl';
