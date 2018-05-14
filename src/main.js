// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import props from './mixins/props'
import firestore from 'firebase/firestore'

Vue.config.productionTip = false

var config = {
  apiKey: 'AIzaSyCvDUonH7Cu2d6AtNEH_U7-z0IKShSltjE',
  authDomain: 'bbdd-11fe4.firebaseapp.com',
  databaseURL: 'https://bbdd-11fe4.firebaseio.com',
  projectId: 'bbdd-11fe4',
  storageBucket: 'bbdd-11fe4.appspot.com',
  messagingSenderId: '575554522267'
};
firebase.initializeApp(config);
Vue.use(firebase)
Vue.use(firestore)
Vue.mixin(props)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
