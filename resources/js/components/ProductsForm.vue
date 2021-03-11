<template>
  <div
    class="modal fade"
    id="productsForm"
    tabindex="-1"
    aria-labelledby="procuctsFormModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5
            v-text="productId ? 'Edit Product' : 'Create Product'"
            class="modal-title"
            id="procuctsFormModalLabel"
          ></h5>
          <button
            @click="closeModal"
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div v-if="updated" class="alert alert-success">
            Updated successfully!
          </div>
          <div v-if="created" class="alert alert-success">
            Created successfully!
          </div>
          <form @submit.prevent="onSubmit" id="editForm">
            <div class="form-group">
              <label for="name">Name</label>
              <input
                v-model="product.name"
                type="text"
                :class="['form-control', hasError('name') ? 'is-invalid' : '']"
                id="name"
              />
              <span
                v-if="hasError('name')"
                class="invalid-feedback d-inline"
                role="alert"
              >
                <strong>{{ getError("name") }}</strong>
              </span>
            </div>

            <div class="form-group">
              <label for="name">Price</label>
              <input
                v-model="product.price"
                type="text"
                :class="['form-control', hasError('price') ? 'is-invalid' : '']"
                id="name"
              />
              <span
                v-if="hasError('price')"
                class="invalid-feedback d-inline"
                role="alert"
              >
                <strong>{{ getError("price") }}</strong>
              </span>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            @click="closeModal"
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
          >
            Close
          </button>
          <button type="submit" form="editForm" class="btn btn-primary">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../api/products";

export default {
  props: ["productId"],
  data() {
    return {
      product: {},
      errors: {},
      updated: false,
      created: false,
    };
  },
  methods: {
    closeModal() {
      this.updated = false;
      this.created = false;
      this.$emit("modal:close");
    },
    onSubmit() {
      if (this.productId) {
        api
          .update(this.product.id, this.product)
          .then((response) => {
            this.updated = true;
            this.clearErrors();
            this.$emit("product:updated", response.data.data);
          })
          .catch((error) => {
            this.setErrors(error);
            this.updated = false;
          });
      } else {
        api
          .store(this.product)
          .then((response) => {
            this.$emit("product:created", response.data.data);
            this.clearErrors();
            this.product = {};
            this.created = true;
          })
          .catch((error) => {
            this.setErrors(error);
            this.created = false;
          });
      }
    },

    onModalLaunch(id) {
      let findById = this.productId ? this.productId : id
      if (findById) {
        api.find(findById).then((response) => {
          this.product = response.data.data;
        });
      } else {
        this.product = {};
      }
    },

    setErrors(error) {
      this.errors = error.response.data.errors;
    },
    clearErrors() {
      this.errors = {};
    },
    hasError(field) {
      return this.errors.hasOwnProperty(field);
    },
    getError(field) {
      if (this.errors[field]) {
        return this.errors[field][0];
      }
    },
  },

  created() {

    this.onModalLaunch(this.productId)

  },
};
</script>