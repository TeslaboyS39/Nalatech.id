<script>
import { mapActions, mapState } from 'pinia';
import { useProjectsStore } from '../stores/projects';

export default {
  computed: {
    ...mapState(useProjectsStore, ['isLogin', 'currentUserIsOwner'])
  },
  methods: {
    ...mapActions(useProjectsStore, ['goToLogOut', 'fetchDataProjects', 'paymentGateway'])
  }
}
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-secondary p-2 text-dark bg-opacity-50">
      <a class="navbar-brand" style="margin-left:2vh"><img
          src="../assets/logont.png"
          class="d-inline-block align-top"></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mr-auto align-items-center">
            <li class="nav-item active">
              <router-link to="/home" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item active">
              <router-link to="/about" class="nav-link">About Us</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/projects" class="nav-link">Projects</router-link>
            </li>        
            <li class="nav-item">
              <router-link to="/mitras" class="nav-link">Our Mitras</router-link>
            </li>        
            <li class="nav-item" v-if="currentUserIsOwner">
              <router-link to="/contracts" class="nav-link">Contracts</router-link>
            </li>        
            <li class="nav-item">
              <button @click.prevent="paymentGateway">
                Pay Now
              </button>
            </li>        
            <li class="nav-item d-flex" style="margin-left:105vh">
              <router-link @click.prevent="goToLogOut" to="/" class="nav-link logout-link">👤Logout</router-link>
            </li>
        </ul>
      </div>
    </nav>
  </template>
  
  <style>
  .d-inline-block {
    height: 7vh; 
    margin-right: 0.5vh; 
    border-radius: 3px;
  }  
  </style>