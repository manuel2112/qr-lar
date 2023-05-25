import { createApp } from 'vue'
import App from './App.vue'

import router from "./router/router";
import store from './store';

import jQuery from 'jquery'
window.jQuery = window.$ = jQuery

import './styles/styles.scss'

createApp(App)
        .use( store )
        .use( router )
        .mount('#app')
