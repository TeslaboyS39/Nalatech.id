<script>
import { mapState, mapActions } from 'pinia';
import { useProjectsStore } from '../stores/projects';

export default {
  computed: {
    ...mapState(useProjectsStore, ['contracts'])
  },
  methods: {
    ...mapActions(useProjectsStore, ['fetchContracts'])
  },
  created() {
    this.fetchContracts(); 
  }
}
</script>

<template>
  <div id="table-contracts">
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
                          <th scope="col">Project Name</th>
                          <th scope="col">Mitra Applier Name</th>
                          <th scope="col">Status</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(contract, index) in contracts" :key="contract.id">
                          <td class="align-middle">{{ index + 1 }}</td>
                          <td class="align-middle">{{ contract.Project.title }}</td>
                          <td class="align-middle">{{ contract.User.userName }}</td>
                          <td class="align-middle">{{ contract.status }}</td>
                          <td class="align-middle">
                            <button type="button" class="btn bg-warning rounded hover">Approve</button>
                          </td>
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

#table-contracts{
    padding-bottom: 2vh;
}
</style>