<script>
import { mapActions } from 'pinia';
import { useProjectsStore } from '../stores/projects';

export default {
  methods: {
    ...mapActions(useProjectsStore, ['goToRegisterOwnerPage', 'goToRegisterMitraPage'])
  }
}
</script>

<template>
    <div class="landing-page mt-5">
    <a style="margin-left:2vh"><img src="../assets/logont.png" class="rounded mb-2"></a>
      <h1 style="padding-top: 3vh;">Welcome to <span style="color: rgb(24, 24, 136);">Nala</span>tech.id!</h1>
      <p>Please choose register options below:</p>
      <div class="options" style="padding-bottom: 19.8vh;">
        <button @click.prevent="goToRegisterOwnerPage" class="rounded btn btn-outline-warning p-3">Register as Project Owner</button>
        <button @click.prevent="goToRegisterMitraPage" class="rounded btn btn-outline-warning p-3">Register as Mitra</button>
      </div>
    </div>
</template>

<style>
.landing-page {
  text-align: center;
  padding: 1.4vh 0;
}

.lp-brand {
    border-radius: 70%;
}

.options {
  margin-top: 2rem;
}

button {
  margin: 0 1rem;
  padding: 1rem 2rem;
  font-size: 1rem;
}
</style>