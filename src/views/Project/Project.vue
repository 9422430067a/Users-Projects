<template>
  <div>
    <!-- BootstrapVue Done -->
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
    </base-header>
    <b-container fluid class="mt--7">
      <b-row class="justify-content-center">
        <b-col lg="12">
          <b-card header-tag="header">
            <template #header>
              <b-row>
              <b-col md="4">
              <h2 class="mb-0 float-left">Project</h2>
              </b-col>
              <b-col md="4">
              <base-input name="user" id="user" >
                <select class="form-control" v-model="selectedUser" >
                  <option value='all' >All Projects</option>
                  <option v-for="user in users" :key="user.id" :value='user.id' >{{user.firstName + ' ' + user.lastName}}</option>
                </select>
              </base-input>
              </b-col>
              <b-col md="4">
              <b-button @click="showModal(newProject)" class=" float-right" variant="primary">+ New Project</b-button>
              </b-col>
              </b-row>
            </template>
            <b-card-text>
              <el-table class="table"
                        header-row-class-name="thead-light"
                        :data="dataTable">
                <el-table-column label="Project-ID"
                                 min-width="150px"
                                 prop="pid"></el-table-column>
                <el-table-column label="ProjectName"
                                 prop="name"
                                 min-width="160px"></el-table-column>
                <el-table-column label="Address"
                                 prop=""
                                 min-width="240px">
                  <template v-slot="{row}">
                    {{row.street + row.number}}<br>
                    {{row.plz + row.ort}}
                  </template>
                </el-table-column>
                <el-table-column label=""
                                 min-width="100px"
                                 prop="">
                  <template v-slot="{row}">
                    <b-button variant="outline-primary" size="sm" @click="showModal(row)">
                      <i class="ni ni-ruler-pencil"></i>
                    </b-button>
                  </template>
                </el-table-column>

              </el-table>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <project-modal :project="selectedProject"/>
  </div>
</template>

<script>
  import BaseHeader from '@/components/BaseHeader';
  import ProjectModal from "./projectModal";
  import {Table, TableColumn} from 'element-ui';
  import {mapState, mapGetters} from "vuex";

  export default {
    name: "Project",
    components: {
      ProjectModal,
      BaseHeader,
      [Table.name]: Table,
      [TableColumn.name]: TableColumn
    },
    data() {
      return {
        selectedProject: {},
        newProject: {
          id: 0,
          pid: '',
          name: '',
          street: '',
          number: '',
          plz: '',
          ort: '',
        },
        selectedUser: 'all',
        dataTable : []
      };
    },
    computed: {
      ...mapState(['projects','users']),
      ...mapGetters(['getProjectsByUserId'])
    },
    watch: {
      selectedUser: {
        handler(newVal) {
          this.updateDataTable(newVal)
        },
        immediate: true
      },
      projects: function () {
        this.updateDataTable(this.selectedUser)
      }
    },
    methods: {
      updateDataTable(value){
        if (value === 'all')
          this.dataTable = this.projects;
        else
          this.dataTable = this.getProjectsByUserId(this.selectedUser);
      },
      showModal(project) {
        this.selectedProject = project;
        this.$nextTick(() => {
           this.$bvModal.show('projectModal' + this.selectedProject.id)
        });
      }
    }
  }
</script>

<style scoped>

</style>
