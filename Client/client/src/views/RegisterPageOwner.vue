<script>
import { mapActions, mapState } from 'pinia';
import { useProjectsStore } from '../stores/projects';

export default {
  computed: {
    ...mapState(useProjectsStore, ['registerDataOwner'])
  },
  methods: {
    ...mapActions(useProjectsStore, ['doRegisterOwner', 'goToLoginOwnerPage'])
  },
}
</script>

<template>
    <div id="registerO-section">
            <div class="mask d-flex align-items-center h-100 gradient-custom-3">
                <div class="container h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div class="card" style="border-radius: 15px;">
                                <div class="card-body p-5">
                                    <h2 class="text-uppercase text-center mb-1">Create an account</h2>
                                    <p class="text-uppercase text-center mb-5">as Project Owner</p>
    
                                    <form>
    
                                        <div class="form-outline mb-4">
                                            <input v-model="registerDataOwner.name" type="text" id="form3Example1cg" class="form-control form-control-lg" />
                                            <label class="form-label" for="form3Example1cg">Your Name or Organization's Name</label>
                                        </div>
    
                                        <div class="form-outline mb-4">
                                            <input v-model="registerDataOwner.email" type="email" id="form3Example3cg" class="form-control form-control-lg" />
                                            <label class="form-label" for="form3Example3cg">Your Email</label>
                                        </div>
    
                                        <div class="form-outline mb-4">
                                            <input v-model="registerDataOwner.password" type="password" id="form3Example4cg" class="form-control form-control-lg" />
                                            <label class="form-label" for="form3Example4cg">Password</label>
                                        </div>
    
                                        <div class="form-outline mb-4">
                                            <input v-model="registerDataOwner.contact" type="contact" id="form3Example4cdg" class="form-control form-control-lg" />
                                            <label class="form-label" for="form3Example4cdg">Contact</label>
                                        </div>
                                        
                                        <div class="form-outline mb-4">
                                            <textarea v-model="registerDataOwner.description" type="description" id="form3Example4cdg" class="form-control form-control-lg" />
                                            <label class="form-label" for="form3Example4cdg">Brief description about yourself/ your organization</label>
                                        </div>
    
                                        <div class="form-outline mb-4">
                                            <input v-model="registerDataOwner.website" type="website" id="form3Example4cdg" class="form-control form-control-lg" />
                                            <label class="form-label" for="form3Example4cdg">Website</label>
                                        </div>
    
                                        <div class="form-outline mb-4">
                                            <input v-model="registerDataOwner.photoUrl" type="photoUrl" id="form3Example4cdg" class="form-control form-control-lg" />
                                            <label class="form-label" for="form3Example4cdg">Photo or Logo Url</label>
                                        </div>
    
                                        <div class="form-check d-flex justify-content-center mb-4">
                                            <input class="form-check-input me-2" type="checkbox" value=""
                                                id="form2Example3cg" />
                                            <label class="form-check-label" for="form2Example3g">
                                                I agree all statements in <a href="#!" class="text-body"><u>Terms of
                                                        service</u></a>
                                            </label>
                                        </div>
    
                                        <div class="d-flex justify-content-center">
                                            <button type="button"
                                                class="btn btn-primary btn-block btn-lg gradient-custom-4 text-body" @click="doRegisterOwner">Register</button>
                                        </div>
    
                                        <p class="text-center text-muted mt-3 mb-0" @click="goToLoginOwnerPage">Have already an account? <a href="#!"
                                                class="fw-bold text-body"><u>Login here</u></a></p>
    
                                    </form>
    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>

<style>
.container {
    padding-top: 2vh;
    margin-top: 2vh;
}

#registerO-section {
  padding-bottom: 0vh;
}

.main-container {
  padding-bottom: 0vh;
}
</style>