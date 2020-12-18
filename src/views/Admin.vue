<template>
  <nav
    class="home flex justify-between items-center bg-indigo-900 px-10 py-2 text-white fixed top-0 right-0 left-0"
  >
    <p class="">Phone Store</p>
    <div class="flex text-xs">
      <router-link class="ml-2" to="/login" @click="logout">
        Logout
      </router-link>
    </div>
  </nav>

  <div class="mt-12 mx-10">
    <div class="text-center w-full flex justify-center">
      <p class="text-center p-2 my-2 rounded-md bg-gray-200">Welcome Admin</p>
    </div>
    <div class="flex justify-between items-center">
      <h1>List of Products</h1>
      <button
        @click="toggleModal"
        class="bg-blue-500 rounded-md p-2 text-xs text-white"
      >
        Add Product
      </button>
    </div>

    <div v-if="products.length">
      <table
        class="border-collapse border border-green-800 table-auto w-full my-5"
      >
        <thead>
          <tr>
            <!-- <th class="border border-green-600">Product ID</th> -->
            <th class="border border-green-600">Product name</th>
            <th class="border border-green-600">Product description</th>
            <th class="border border-green-600">Product price</th>
            <th class="border border-green-600">Actions</th>
          </tr>
        </thead>
        <tbody v-for="product in products" :key="product.index">
          <tr>
            <td class="border border-green-600 text-center p-2">
              {{ product.name }}
            </td>
            <td class="border border-green-600 text-center">
              {{ product.description }}
            </td>
            <td class="border border-green-600 text-center">
              {{ product.price }}
            </td>
            <td class="border border-green-600">
              <button
                @click="toggleEditModal(product)"
                class="text-xs py-1 px-3 mx-2 rounded-md bg-green-500 text-white"
              >
                Edit
              </button>

              <button
                @click="deleteEntry(product.id)"
                class="text-xs py-1 px-3 mr-2 rounded-md bg-white border border-red-500 text-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <img
        src="../assets/img/loader.gif"
        alt="loading..."
        width="50"
        height="50"
        class="flex justify-center"
      />
    </div>
  </div>

  <div v-if="showModal">
    <AddProductModal @close="toggleModal" @reload="refreshProducts" />
  </div>
  <div v-if="showEditModal">
    <EditProductModal
      @close="toggleEditModal"
      :product="product"
      @reload="refreshProducts"
    />
  </div>
</template>

<script>
import AddProductModal from "../components/AddProductModal.vue";
import EditProductModal from "../components/EditProductModal.vue";

export default {
  setup() {},
  components: {
    AddProductModal,
    EditProductModal,
  },
  data() {
    return {
      products: [],
      showModal: false,
      showEditModal: false,
      product: null,
      name: "",
      description: "",
      price: "",
    };
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    },
    toggleEditModal(product) {
      this.product = product;
      this.showEditModal = !this.showEditModal;
    },
    submit() {},
    logout() {
      localStorage.clear();
    },
    refreshProducts() {
      fetch("http://localhost:3000/products")
        .then((res) => res.json())
        .then((data) => (this.products = data));
    },
    async deleteEntry(id) {
      let deleteConfirm = confirm("Are you sure you want to delete?");
      if (deleteConfirm) {
        await fetch("http://localhost:3000/products/" + id, {
          method: "DELETE",
        });
        await fetch("http://localhost:3000/products")
          .then((res) => res.json())
          .then((data) => (this.products = data));

        toast.info("Delete Successful!");
      }
    },
  },
  mounted() {
    this.refreshProducts();
    // fetch("http://localhost:3000/products")
    //   .then((res) => res.json())
    //   .then((data) => (this.products = data));
  },
};
</script>

<style scoped>
.modal-style {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>