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
              <h2 class="mb-0 float-left">User</h2>
              <b-button @click="showModal(newUser)" class=" float-right" variant="primary">+ New User</b-button>
            </template>
            <b-card-text>
              <el-table class="table"
                        header-row-class-name="thead-light"
                        :data="users">
                <el-table-column label="FirstName"
                                 min-width="140px"
                                 prop="firstName"></el-table-column>
                <el-table-column label="LastName"
                                 prop="lastName"
                                 min-width="140px"></el-table-column>
                <el-table-column label="E-Mail"
                                 prop="email"
                                 min-width="240px">
                </el-table-column>

                <el-table-column label="Roll"
                                 prop="roll"
                                 min-width="130px">
                  <template v-slot="{row}">
                    <i :class="`ni ni-single-02 text-${row.roll}`"></i> {{row.roll}}
                  </template>
                </el-table-column>
                <el-table-column label="Status"
                                 min-width="120px"
                                 prop="status">
                  <template v-slot="{row}">
                    <b-badge variant="success">{{row.status}}</b-badge>
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
    <user-modal :user="selectedUser"/>
  </div>
</template>

<script>
  import BaseHeader from '@/components/BaseHeader';
  import userModal from "./userModal";
  import {Table, TableColumn} from 'element-ui';
  import {mapState} from "vuex";

  export default {
    name: "User",
    components: {
      BaseHeader, userModal,
      [Table.name]: Table,
      [TableColumn.name]: TableColumn
    },
    data() {
      return {
        selectedUser: {},
        newUser: {
          id: 0,
          firstName: '',
          lastName: '',
          email: '',
          roll: null,
          status: '',
          projects: []
        },
      };
    },
    computed: {
      ...mapState(['users'])
    },
    methods: {
      showModal(user) {
        this.selectedUser = user;
        this.$nextTick(() => {
          this.$bvModal.show('userModal' + this.selectedUser.id)
        });
      }
    }
  }
</script>

<style scoped>
  .text-Admin {
    color: #d3504d;
  }

  .text-Clerk {
    color: #cbb118;
  }

  .text-Trainee {
    color: #0257a8;
  }
</style>
