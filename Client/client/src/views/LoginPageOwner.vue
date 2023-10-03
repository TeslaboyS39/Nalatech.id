<script>
import { mapActions, mapState } from 'pinia'
import { useProjectsStore } from '../stores/projects';

export default {
  computed: {
    ...mapState(useProjectsStore,  ['inputLoginOwner'])
  },
  methods: {
    ...mapActions(useProjectsStore , ['doLoginOwner', 'goToRegisterOwnerPage'])
  },
}
</script>

<template>
    <div id="loginO-section">
        <section class=" text-center text-lg-start">
            <div class="card mb-3">
                <div class="row g-0 d-flex align-items-center">
                    <div class="col-lg-4 d-none d-lg-flex">
                        <img src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg" alt="Trendy Pants and Shoes"
                            class="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5" />
                    </div>
                    <div class="col-lg-8">
                        <div class="card-body py-5 px-md-5">
                            <h1 class="mb-2">Login as Project Owner</h1>
                            <h5 class="mb-5">By becoming project owner, it means you are participating in job creation that can have a broad impact on the livelihoods of many people.</h5>
    
                            <form @submit.prevent="doLoginOwner">
                                <!-- Email input -->
                                <div class="form-outline mb-4">
                                    <input v-model="inputLoginOwner.email" type="email" id="form2Example1" class="form-control" />
                                    <label class="form-label" for="form2Example1">Email address</label>
                                </div>
    
                                <!-- Password input -->
                                <div class="form-outline mb-4">
                                    <input v-model="inputLoginOwner.password" type="password" id="form2Example2" class="form-control" />
                                    <label class="form-label" for="form2Example2">Password</label>
                                </div>
    
                                <!-- 2 column grid layout for inline styling -->
                                <div class="row mb-4">
                                    <div class="col d-flex justify-content-center">
                                        <!-- Checkbox -->
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="" id="form2Example31"
                                                checked />
                                            <label class="form-check-label" for="form2Example31"> Remember me </label>
                                        </div>
                                    </div>
    
                                    <div class="col">
                                        <!-- Simple link -->
                                        <a @click.prevent="goToRegisterOwnerPage" href="#!">Don't have an account?</a>
                                    </div>
                                </div>
    
                                <!-- Submit button -->
                                <button type="submit" class="btn btn-primary btn-block mb-4">Sign in</button>
    
                            </form>
    
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style>
.rounded-t-5 {
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}

@media (min-width: 992px) {
  .rounded-tr-lg-0 {
    border-top-right-radius: 0;
  }

  .rounded-bl-lg-5 {
    border-bottom-left-radius: 0.5rem;
  }
}

#loginO-section {
    padding-top: 6vh;
    padding-bottom: 2vh;
    padding-left: 1.5vh;
    padding-right: 1.5vh;
}
</style>