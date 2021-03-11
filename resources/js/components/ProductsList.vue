<template>
  <div>
    <div class="my-3">
      <button
        @click="createProduct"
        data-toggle="modal"
        data-target="#productsForm"
        class="btn btn-primary"
      >
        Create
      </button>
    </div>

    <div v-if="deleted" class="alert alert-success">Deleted successfully!</div>
    <table class="table">
      <thead>
        <tr class="d-flex">
          <th class="col-3">ID</th>
          <th @click="sortByName" class="col-3" style="cursor: pointer;">
            Name 
            <span class="ml-2">{{ sortNameAsc ? '⬆️' : '⬇️' }}</span>
          </th>
          
          <th class="col-3">Price</th>
          <th class="col-3"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in laravelData.data" :key="product.id" class="d-flex">
          <td class="col-3">{{ product.id }}</td>
          <td class="col-3">{{ product.name }}</td>
          <td class="col-3">{{ product.price }}</td>
          <td class="col-3">
            <button
              @click="editProduct(product.id)"
              class="btn btn-secondary"
              data-toggle="modal"
              data-target="#productsForm"
            >
              Edit
            </button>
            <button @click="deleteProduct(product.id)" class="btn btn-danger">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <products-form
      v-if="showFormModal"     
      :product-id="editMode" 
      @product:created="productCreated"
      @product:updated="productUpdated"
      @modal:close="editMode = null"
      ref="formModalRef"></products-form>

    <pagination
      :data="laravelData"
      @pagination-change-page="getResults"
    ></pagination>
  </div>
</template>

<script>
import ProductsForm from "./ProductsForm.vue";
import api from "../api/products";

export default {
  name: "ProductsList",
  components: {
    ProductsForm,
  },
  data() {
    return {
      laravelData: {},

      sortNameAsc: false,

      editMode: null,
      showFormModal: false,

      deleted: false,
    };
  },
  methods: {
    getResults(page) {
      api.getPage(page).then((response) => {
        this.laravelData = response.data;
      });
    },

    sortByName() {
      if (this.sortNameAsc) {
        this.laravelData.data.sort(
          (a, b) => a.name < b.name
        );
        this.sortNameAsc = false;
      } else {
        this.laravelData.data.sort(
          (a, b) => a.name > b.name
        );      
        this.sortNameAsc = true;
      }

    },
    
    createProduct() {
      this.editMode = null 
      this.showFormModal = true
    },

    editProduct(id) {
      this.editMode = id
      this.showFormModal = true
      if (this.$refs.formModalRef) {
        this.$refs.formModalRef.onModalLaunch(this.editMode)
      }
    },



    productCreated(product) {
      this.laravelData.data.unshift(product)
    },    

    productUpdated(newProduct) {
      let objId = this.laravelData.data.findIndex(
        (obj) => obj.id == newProduct.id
      );

      console.log(this.laravelData.data[objId]);

      this.laravelData.data[objId].name = newProduct.name;
      this.laravelData.data[objId].price = newProduct.price;
    },

    deleteProduct(id) {
      api.delete(id).then((response) => {
        this.deleted = true;
        setTimeout(() => {
          this.deleted = false;
        }, 5000);
        this.laravelData.data = this.laravelData.data.filter(
          (el) => el.id !== id
        );
      });
    },
  },
  created() {
    this.getResults();
  },
};
</script>
