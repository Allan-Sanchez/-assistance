import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2';
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase';
import './components/firebaseInit';
import VueQRCodeComponent from 'vue-qrcode-component'
// import firebase from 'firebase';
import vuetify from './plugins/vuetify';

import 'sweetalert2/dist/sweetalert2.min.css';

let app;
Vue.config.productionTip = false;
Vue.component('qr-code', VueQRCodeComponent)
Vue.use(VueSweetalert2);


firebase.auth().onAuthStateChanged(function() {
  if(!app){
     app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app');
  }
});

