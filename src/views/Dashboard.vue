<template>
  <div>

    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
    </base-header>

    <b-container fluid class="mt--7">
      <b-row>
        <b-col xl="12" class="mb-5 mb-xl-0">
          <card type="default" header-classes="bg-transparent">
            <b-row align-v="center" slot="header">
              <b-col xl="12">
                <h6 class="text-light text-uppercase ls-1 mb-1">Overview</h6>
                <h5 class="h3 text-white mb-0">BootstrapVue Dashboard Template</h5>
                <div class="text-white"><p>This mini project consists of the following items:</p>
                  <ul>
                    <li> User management ( Add / Edit / Delete )</li>
                    <li> Project management ( Add / Edit / Delete )</li>
                    <li> User / Project in connection</li>
                  </ul>
                  <p>The data is stored with Vuex in cleintseit. </p>
                </div>
              </b-col>
              <b-col>
              </b-col>
            </b-row>
          </card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>

  export default {
    components: {},
    data() {
      return {};
    },
    methods: {},
    mounted() {
    }
  };
</script>
<style>
  .el-table .cell {
    padding-left: 0px;
    padding-right: 0px;
  }
</style>
