<template>
  <validation-observer ref="observer" v-slot="{ passes }">
    <b-modal :id="'userModal'+user.id"
             size="lg" ref="modal"
             @ok.prevent="passes(() => { onSubmit($event) })"
             @hidden="resetModal">
      <template #modal-title>
        <h2>User Add / Edit <i class="ni ni-ruler-pencil"></i></h2>
      </template>
      <b-form-row>
        <b-col md="6">
          <validation-provider
            name="firstName"
            :rules="{ required: true, max:20 }"
            v-slot="validationContext">
            <b-form-group
              id="input-group-1"
              label="Main Data"
              label-for="firstName"
              label-class="font-weight-bold">
              <b-form-input
                name="firstName"
                id="firstName"
                v-model="userModel.firstName"
                placeholder="FirstName"
                :state="getValidationState(validationContext)"
                aria-describedby="input-1-live-feedback"
              ></b-form-input>
              <b-form-invalid-feedback id="input-1-live-feedback">{{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </b-col>
        <b-col md="6" class="margin-top">
          <validation-provider
            name="lastName"
            :rules="{ required: true , max:20}"
            v-slot="validationContext">
            <b-form-group
              id="input-group-2"
              label-for="lastName"
              label-class="font-weight-bold">
              <b-form-input
                name="lastName"
                id="lastName"
                v-model="userModel.lastName"
                placeholder="LastName"
                :state="getValidationState(validationContext)"
                aria-describedby="input-2-live-feedback"
              ></b-form-input>
              <b-form-invalid-feedback id="input-2-live-feedback">{{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col md="6">
          <validation-provider
            name="email"
            :rules="{ required: true, max:30, email: true }"
            v-slot="validationContext">
            <b-form-group
              id="input-group-3"
              label="Contact details"
              label-for="email"
              label-class="font-weight-bold">
              <b-form-input
                name="email"
                id="email"
                v-model="userModel.email"
                placeholder="E-Mail-Address"
                :state="getValidationState(validationContext)"
                aria-describedby="input-3-live-feedback"
              ></b-form-input>
              <b-form-invalid-feedback id="input-3-live-feedback">{{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </b-col>
        <b-col md="6" class="margin-top">
          <validation-provider
            name="roll"
            :rules="{ required: true }"
            v-slot="validationContext">
            <b-form-group
              id="input-group-4"
              label-for="roll"
              label-class="font-weight-bold">
              <b-form-select
                id="roll"
                name="roll"
                v-model="userModel.roll"
                :options="optionsRoll"
                :state="getValidationState(validationContext)"
                aria-describedby="input-2-live-feedback"
              ></b-form-select>
              <b-form-invalid-feedback id="input-2-live-feedback">{{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </b-col>
      </b-form-row>
      <b-col md="12">
        <b-form-group
          label-class="font-weight-bold"
          id="input-group-5"
          label="Assign Projects">
          <multiselect v-model="userModel.projects"
                       placeholder="Search and Select Project(s)"
                       :close-on-select="false"
                       :searchable="true"
                       :show-labels="false"
                       :clear-on-select="false"
                       track-by="id"
                       lable="id"
                       :options="projects"
                       :multiple="true"
                       :custom-label="idWithPid"
          ></multiselect>
        </b-form-group>
      </b-col>
      <b-button v-if="user.id !== 0" variant="link" class="float-left text-danger margin-bottom"
                @click="removeUser">Delete User
      </b-button>
    </b-modal>
  </validation-observer>
</template>

<script>
  import Multiselect from 'vue-multiselect';
  import "vue-multiselect/dist/vue-multiselect.min.css";
  import {mapState} from 'vuex'

  export default {
    name: "userModal",
    components: {
      Multiselect
    },
    props: {
      user: {
        type: Object
      }
    },
    data() {
      return {
        selectedProjects: [],
        userModel: {
          id: '',
          firstName: '',
          lastName: '',
          email: '',
          roll: null,
          status: '',
          projects: []
        },
        optionsRoll: [
          {value: null, text: "--Select the role--"},
          {value: "Admin", text: "Admin"},
          {value: "Clerk", text: "Clerk"},
          {value: "Trainee", text: "Trainee"}
        ]
      }
    },
    watch: {
      user: {
        handler() {
          this.updateDisplayUser();
        },
        immediate: true,
      }
    },
    computed: {
      ...mapState(['projects'])
    },
    methods: {
      getValidationState({dirty, validated, valid = null}) {
        return dirty || validated ? valid : null;
      },
      resetModal() {
        this.updateDisplayUser()
      },
      onSubmit(evt) {
        evt.preventDefault();

        // Add / Edit User
        this.$store.commit('editUser', this.userModel);

        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('userModal' + this.user.id)
        })
      },
      idWithPid({pid}) {
        return `${pid}`
      },
      removeUser() {
        this.$store.commit('removeUser', this.user);
        this.$bvModal.hide('userModal' + this.user.id)
      },
      updateDisplayUser() {
        this.userModel.id = this.user.id;
        this.userModel.firstName = this.user.firstName;
        this.userModel.lastName = this.user.lastName;
        this.userModel.email = this.user.email;
        this.userModel.roll = this.user.roll;
        this.userModel.status = this.user;
        this.userModel.projects = this.user.projects;

      },
    }

  }
</script>

<style scoped>
  .margin-top {
    margin-top: 4%;
  }

  .margin-bottom {
    margin-bottom: -7%;
  }
</style>

