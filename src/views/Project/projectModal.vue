<template>
  <validation-observer ref="observer" v-slot="{ passes }">
    <b-modal :id="'projectModal'+project.id"
             size="lg" ref="modal"
             @ok.prevent="passes(() => { onSubmit($event) })"
             @hidden="resetModal">
      <template #modal-title>
        <h2>Project Details</h2>
      </template>
      <b-form-row>
        <b-col md="4">
          <validation-provider
            name="Project-ID"
            :rules="{ required: true }"
            v-slot="validationContext">
            <b-form-group
              id="input-group-1"
              label="Project Description"
              label-for="Project-ID"
              label-class="font-weight-bold">
              <b-form-input
                name="Project-ID"
                id="Project-ID"
                v-model="pro.pid"
                placeholder="Project-ID"
                :state="getValidationState(validationContext)"
                aria-describedby="input-1-live-feedback"
              ></b-form-input>
              <b-form-invalid-feedback id="input-1-live-feedback">{{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </b-col>
        <b-col md="8" class="margin-top">
          <base-input name="ProjectName"
                      id="ProjectName"
                      v-model="pro.name"
                      placeholder="ProjectName"
          ></base-input>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col md="8">
          <base-input name="Street"
                      id="Street"
                      v-model="pro.street"
                      placeholder="Street"
          ></base-input>
        </b-col>
        <b-col md="4">
          <base-input name="HouseNumber"
                      id="HouseNumber"
                      v-model="pro.number"
                      placeholder="HouseNumber"
          ></base-input>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col md="4">
          <base-input name="PLZ"
                      id="PLZ"
                      v-model="pro.plz"
                      placeholder="PLZ"
          ></base-input>
        </b-col>
        <b-col md="8">
          <base-input name="Ort"
                      id="Ort"
                      v-model="pro.ort"
                      placeholder="Ort"
          ></base-input>
        </b-col>
      </b-form-row>
      <b-button v-if="project.id !== 0" variant="link" class="float-left text-danger margin-bottom"
                @click="removeProject">Delete Project
      </b-button>

    </b-modal>
  </validation-observer>
</template>

<script>
  export default {
    name: "projectModal",
    props: {
      project: {
        type: Object
      }
    },
    data() {
      return {
        pro: {
          id: '',
          pid: '',
          name: '',
          street: '',
          number: '',
          plz: '',
          ort: '',
        }
      };
    },
    watch: {
      project: {
        handler() {
          this.updateDisplayText();
        },
        immediate: true
      }
    },
    methods: {
      getValidationState({dirty, validated, valid = null}) {
        return dirty || validated ? valid : null;
      },
      resetModal() {
        this.updateDisplayText()
      },
      onSubmit(evt) {
        evt.preventDefault();

        // Add Project
        this.$store.commit('editProject', this.pro);
        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('projectModal' + this.project.id)
        })
      },
      removeProject() {
        this.$store.commit('removeProject', this.project);
        this.$bvModal.hide('projectModal' + this.project.id)
      },
      updateDisplayText() {
        this.pro.id = this.project.id;
        this.pro.pid = this.project.pid;
        this.pro.name = this.project.name;
        this.pro.street = this.project.street;
        this.pro.number = this.project.number;
        this.pro.plz = this.project.plz;
        this.pro.ort = this.project.ort;

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
