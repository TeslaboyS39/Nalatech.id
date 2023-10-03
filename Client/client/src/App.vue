<script>
import Navbar from './components/Navbar.vue'

export default {
  components: {
    Navbar
}
}
</script>

<template>
  <div class="main-container">
    <Navbar />
    <!-- <router-view></router-view> -->
    <router-view></router-view>
  </div>
</template>

<style>
.main-container {
  background-image: url('https://static.vecteezy.com/system/resources/previews/012/866/356/non_2x/colorful-abstract-geometric-shape-background-purple-polygonal-geometric-design-background-free-vector.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  /* padding-bottom: 23.3vh; */
}
</style>
