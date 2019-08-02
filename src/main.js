import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import vuetify from './plugins/vuetify';
import * as firebase from 'firebase';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyDlAWtdswE7S_jUzNrnna3h7V5ariXi_e8',
  authDomain: 'task-cabinet.firebaseapp.com',
  databaseURL: 'https://task-cabinet.firebaseio.com',
  projectId: 'task-cabinet',
  storageBucket: '',
  messagingSenderId: '1088200976068',
  appId: '1:1088200976068:web:92569e254386d831',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.usePublicVapidKey(
  'BKWGEMGWg78ApjGMWvx8YY0IwTBgJhwnFZDbHfWliWOn7RRVSCVh40SjNnYS18ManOz7uc3nfLTHvjslBvigiM0'
);

// 通知の受信許可
Notification.requestPermission()
  .then(() => {
    console.log('Notification permission granted.');

    // トークン取得
    messaging.getToken().then(token => {
      console.log(token);
    });
  })
  .catch(err => {
    console.log('Unable to get permission to notify.', err);
  });
