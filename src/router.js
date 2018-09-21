import Vue from 'vue';
import Router from 'vue-router';

import Example from '@/views/Example';
import Main from '@/views/Main';
import Docs from '@/views/Docs';
import CaptionStudio from '@/views/CaptionStudio';
import Game from '@/views/Game';
import V1 from '@/views/V1';

// Example views
import SpeechSynth from '@/views/examples/SpeechSynth';
import ColorFilter from '@/views/examples/ColorFilter';
import ScaleManager from '@/views/examples/ScaleManager';
import Controls from '@/views/examples/Controls';
import Bellhop from '@/views/examples/Bellhop';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', name: 'home', component: Main, title: 'Main', icon: 'home' },
    { path: '/game', name: 'game', component: Game, title: 'Game Demo', icon: 'code'},
    {
      path: '/docs',
      name: 'docs',
      component: Docs,
      title: 'Docs',
      icon: 'code'
    },
    {
      path: '/captions',
      name: 'captions',
      component: CaptionStudio,
      title: 'Caption Studio',
      icon: 'code'
    },
    {
      path: '/v1',
      name: 'v1',
      component: V1,
      title: 'SpringRoll 1.0',
      icon: 'code'
    },
    {
      path: '/examples',
      component: Example,
      title: 'Examples',
      icon: 'stars',
      children: [
        {
          path: '',
          name: 'SpeechSynth',
          component: SpeechSynth
        },
        {
          path: 'color-filter',
          name: 'ColorFilter',
          component: ColorFilter
        },
        {
          path: 'resize',
          name: 'Resize',
          component: ScaleManager
        },
        {
          path: 'controls',
          name: 'Controls',
          component: Controls
        },
        {
          path: 'bellhop',
          name: 'Bellhop',
          component: Bellhop
        }
      ]
    }
  ]
});
