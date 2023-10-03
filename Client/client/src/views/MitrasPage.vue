<script>
import { mapState, mapActions } from 'pinia';
import { useProjectsStore } from '../stores/projects';

export default {
  computed: {
    ...mapState(useProjectsStore, ['mitras'])
  },
  methods: {
    ...mapActions(useProjectsStore, ['fetchMitras'])
  },
  created() {
    this.fetchMitras(); 
  }
}
</script>

<template>
  <div id="table-mitras">
    <section class="intro">
      <div class="mask d-flex align-items-center h-100">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-12">
              <div class="card shadow-2-strong">
                <div class="card-body p-0">
                  <div class="table-responsive table-scroll" data-mdb-perfect-scrollbar="true"
                    style="position: relative; height: 700px">
                    <table class="table table-dark mb-0">
                      <thead style="background-color: #393939;">
                        <tr class="text-uppercase text-success">
                          <th scope="col">#</th>
                          <th scope="col">ProfileUrl</th>
                          <th scope="col">Username</th>
                          <th scope="col">Email</th>
                          <th scope="col">Contact</th>
                          <th scope="col">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(mitra, index) in mitras" :key="mitra.id">
                          <td class="align-middle">{{ index + 1 }}</td>
                          <td class="align-middle"><img :src="mitra.profileUrl" width="100"></td>
                          <td class="align-middle">{{ mitra.userName }}</td>
                          <td class="align-middle">{{ mitra.email }}</td>
                          <td class="align-middle">{{ mitra.contact }}</td>
                          <td class="align-middle">{{ mitra.description }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
html,
body,
.intro {
  height: 100%;
  
}

table td,
table th {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.card {
  border-radius: .5rem;
}

.table-scroll {
  border-radius: .5rem;
}

thead {
  top: 0;
  position: sticky;
}

#table-mitras{
    padding-bottom: 2vh;
}
</style>