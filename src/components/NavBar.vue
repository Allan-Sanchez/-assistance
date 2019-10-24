<template>
    <div>
        <!-- navigation bar -->
    <v-navigation-drawer
      v-model="primaryDrawer.model"
      :clipped="primaryDrawer.clipped"
      :floating="primaryDrawer.floating"
      :mini-variant="primaryDrawer.mini"
      :permanent="primaryDrawer.type === 'permanent'"
      :temporary="primaryDrawer.type === 'temporary'"
      app
      overflow
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title text-center">Assistance</v-list-item-title>
          <v-list-item-subtitle class="text-center">organize</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in menuItems" :key="item.title" router :to="item.link" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar dark color="red darken-2" :clipped-left="primaryDrawer.clipped" app>
      <v-app-bar-nav-icon
        v-if="primaryDrawer.type !== 'permanent'"
        @click.stop="primaryDrawer.model = !primaryDrawer.model"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>
         <router-link to="/" tag="span" style="cursor:pointer">Assistance App</router-link>
        
      </v-toolbar-title>

      <div class="flex-grow-1"></div>

      <!--Buttons navBar  -->
      <div class="d-none d-md-flex">
        <v-btn class="mx-12 px-10" icon v-for="item in menuItems" :key="item.title" router :to="item.link">
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
        <v-btn @click="logout()" class="mx-12 pl-10" icon>
          <v-icon left>mdi-logout</v-icon>
          logout
        </v-btn>
      </div>
    </v-app-bar>
    </div>
</template>

<script>
import firebase from 'firebase';
export default {
    data() {
        return {
      menuItems: [
        // { icon: "mdi-account-multiple", title: "View Meetup" ,link:"/meetup" },
        // { icon: "mdi-map-marker", title: "Organize Meetup" ,link:"/meetup/new" },
        // { icon: "mdi-account-card-details", title: "Explore Meetups" },
        { icon: "mdi-home", title: "Profile" ,link:"/" },
        { icon: "mdi-lock", title: "Login" ,link:"/login" },
        { icon: "mdi-face", title: "Sign in" ,link:"/signin" }

      ],
      primaryDrawer: {
        model: false,
        type: "default (no property)",
        clipped: false,
        floating: false,
        mini: false
      }
    };
    },
    methods: {
      logout(){
        firebase.auth().signOut().then(() => {
                this.$router.push('login');
            })
      }
    },
}
</script>