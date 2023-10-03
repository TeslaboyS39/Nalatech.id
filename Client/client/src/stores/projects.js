import { defineStore } from 'pinia';
import axios from 'axios';

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    // baseUrl: 'https://client-project-01.fatahillah.shop',
    baseUrl: 'http://localhost:3000',
    projects: [],
    mitras: [],
    contracts: [],
    registerDataOwner: {
      name: '',
      email: '',
      password: '',
      contact: '',
      description: '',
      website: '',
      photoUrl: ''
    },
    registerDataMitra: {
      userName: '',
      email: '',
      password: '',
      profileUrl: '',
      contact: '',
      description: '',
    },
    inputLoginOwner: {
      email: '',
      password: ''
    },
    inputLoginMitra: {
      email: '',
      password: ''
    },
    isLogin: false,
    currentUserIsOwner: false,
    news: []
  }),
  getters: {},
  actions: {
    async doRegisterOwner() {
      try {
        const { data } = await axios({
          url: this.baseUrl + '/owner/register',
          method: 'POST',
          data: this.registerDataOwner
        })

        console.log(data)
        this.router.push({ name: 'loginOwner' })
      } catch (error) {
        console.log(error)
      }
    },
    async doRegisterMitra() {
      try {
        const { data } = await axios({
          url: this.baseUrl + '/register',
          method: 'POST',
          data: this.registerDataMitra
        })

        console.log(data)
        this.router.push({ name: 'loginMitra' })
      } catch (error) {
        console.log(error)
      }
    },
    goToLoginOwnerPage() {
      this.router.push({ name: 'loginOwner' })
      this.isLogin = true
    },
    goToLoginMitraPage() {
      this.router.push({ name: 'loginMitra' })
      this.isLogin = true
    },
    async doLoginOwner() {
      try {
        const { data } = await axios({
          url: this.baseUrl + '/owner/login',
          method: 'POST',
          data: this.inputLoginOwner
        })

        console.log(data)
        localStorage.access_token = data.access_token
        this.isLogin = true
        this.currentUserIsOwner = true;
        this.router.push({ name: 'home' })
      } catch (error) {
        console.log(error)
      }
    },
    async doLoginMitra() {
      try {
        const { data } = await axios({
          url: this.baseUrl + '/login',
          method: 'POST',
          data: this.inputLoginMitra
        })

        console.log(data)
        localStorage.access_token = data.access_token
        this.isLogin = true
        this.currentUserIsOwner = false;
        this.router.push({ name: 'home' })
      } catch (error) {
        console.log(error)
      }
    },
    goToLogOut() {
      localStorage.clear()
      this.isLogin = false
      this.router.push('/')
    },
    goToRegisterOwnerPage() {
      this.router.push('/registerOwner')
    },
    goToRegisterMitraPage() {
      this.router.push('/registerMitra')
    },
    async fetchMitras() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: this.baseUrl + '/owner/mitra',
          headers: {
            access_token: localStorage.access_token
          }
        })

        console.log('Fetched mitras:', data)
        this.mitras = data
      } catch (error) {
        console.log(error.response.data.message)
      }
    },
    async fetchProjects() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: this.baseUrl + '/project',
          headers: {
            access_token: localStorage.access_token
          }
        })

        console.log('Fetched projects:', data)
        this.projects = data
      } catch (error) {
        console.log(error.response.data.message)
      }
    },
    async fetchContracts() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: this.baseUrl + '/owner/contract',
          headers: {
            access_token: localStorage.access_token
          }
        })

        console.log('Fetched projects:', data)
        this.contracts = data
      } catch (error) {
        console.log(error.response.data.message)
      }
    },
    async postProject(id) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: this.baseUrl + '/owner/project',
          data: {
            title,
            description,
          },
          headers: {
            access_token: localStorage.access_token
          }
        })

        console.log(data)
        Swal.fire(
          'Add project success!',
          'Thank you for add a project to our platform',
          'success'
        ) 
        this.fetchProjects()
        this.router.push('/projects')
      } catch (error) {
        console.log(error)
      }
    },
    async createContract(id) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: this.baseUrl + '/user',
          data: {
            ProjectId: id
          },
          headers: {
            access_token: localStorage.access_token
          }
        })

        console.log(data)
        Swal.fire(
          'Contract created successfully!',
          'Thank you for add new contract to our platform',
          'success'
        ) 
        this.fetchContracts()
        this.router.push('/home')
      } catch (error) {
        console.log(error)
      }
    },
    async updateContract({ contractId, amount }) {
      try {
        const { data } = await axios({
          method: 'PATCH',
          url: `${this.baseUrl}/owner/contract/${contractId}`,
          data: {
            amount
          },
          headers: {
            access_token: localStorage.access_token
          }
        });
    
        console.log(data);
        Swal.fire(
          'Contract updated successfully!',
          'The contract has been updated with the new amount',
          'success'
        );
        this.fetchContracts();

        this.router.push('/contracts');
      } catch (error) {
        console.log(error);
      }
    },
    async paymentGateway() {
      try {
        console.log('MASUK GAN');
        const { data } = await axios({
          method: 'POST',
          url: `${this.baseUrl}/owner/generate-midtrans-token`,
          data: {
            amount : 5000000
          },
          headers: {
            access_token: localStorage.access_token
          }
        })
        console.log(data);
        window.snap.pay(data.token, {
          onSuccess: function(result){
            /* You may add your own implementation here */
            console.log(result);
            Swal.fire(
              'Transaction updated successfully!',
              'Transaction has been updated with the new amount',
              'success'
            );
          }
        })
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    async newsData() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `${this.baseUrl}/news`
        })

        console.log(data);
        this.news = data;
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    async doGoogleLogin(response) {
      try {
        const { data } = await axios({
          url: this.baseUrl + '/google-login',
          method: 'POST',
          headers: {
            credential: response.credential
          }
        })

        console.log(data)
        localStorage.access_token = data.access_token
        this.isLogin = true
        this.router.push({ name: 'home' })
      } catch (error) {
        console.log(error.response.data.message)
      }
    }
  }
});

