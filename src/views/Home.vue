<template>
  <nav
    class="home flex justify-between items-center bg-indigo-900 px-10 py-2 text-white fixed top-0 right-0 left-0"
  >
    <p class="">Phone Store</p>
    <!-- <div class="flex text-xs"> -->
    <router-link class="ml-2 text-xs" to="/login" @click="logout">
      Logout
    </router-link>
    <!-- <p class="ml-2">Logout</p> -->
    <!-- </div> -->
  </nav>

  <div class="mt-10">
    <div v-if="loading">
      <vue-loaders
        v-if="loading"
        name="ball-clip-rotate"
        color="black"
        scale="0.5"
        class="p-0 m-0"
      ></vue-loaders>
    </div>
    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-9/12 pl-8"
    >
      <HomeProductList @addProductToCart="assignProductToList($event)" />
    </div>

    <div
      class="fixed w-3/12 top-10 right-0 overflow-y-scroll bottom-0 shadow py-1"
    >
      <div class="flex justify-between items-center flex-col md:flex-row">
        <p class="m-2">Shopping Cart</p>
        <span v-if="cartedProducts.length" class="mr-2">
          <button
            @click="toggleModal"
            class="rounded-sm py-1 px-2 border border-blue-500 ml-8 text-xs hover:text-white hover:bg-blue-500"
          >
            Checkout {{ cartedProducts.length }}
          </button>
        </span>
      </div>

      <div v-if="cartedProducts.length">
        <div v-for="product in cartedProducts" :key="product.id">
          <div class="flex justify-between py-2 px-2 bg-gray-100 my-2">
            <div>
              <p class="text-md">{{ product.name }}</p>
              <p class="text-xs">{{ product.description }}</p>
            </div>
            <div>
              <p class="font-bold">${{ product.price }}</p>
              <button
                @click="removeProductFromCart(product.id)"
                class="rounded-sm py-1 px-2 bg-red-400 text-xs text-white"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="text-xs text-gray-400 ml-2">Empty Cart...</p>
      </div>
    </div>
  </div>
  <div v-if="showModal" class="z-auto">
    <CheckoutModal
      :products="cartedProducts"
      @clearCart="clearCart"
      @close="toggleModal"
    />
  </div>
</template>

<script>
import HomeProductList from "../components/HomeProductList.vue";
import CheckoutModal from "../components/CheckoutModal.vue";
export default {
  name: "Home",
  data() {
    return {
      cartedProducts: [],
      showModal: false,
      loading: false,
    };
  },
  components: {
    HomeProductList,
    CheckoutModal,
  },
  methods: {
    assignProductToList(product) {
      this.cartedProducts.push(product);
      console.log("parent product", this.cartedProducts);
    },
    removeProductFromCart(id) {
      console.log("id ", id);
      const result = this.cartedProducts.filter((prod) => prod.id != id);
      this.cartedProducts = result;
    },
    toggleModal() {
      this.showModal = !this.showModal;
    },
    clearCart() {
      this.cartedProducts = [];
    },
    logout() {
      localStorage.clear();
    },
  },
  // computed: {
  //   filteredProducts(product) {
  //     console.log("aaaaaaaaa");
  //     const a = this.cartedProducts.filter((prod) => prod.id == product.id);
  //     console.log("aaaa", a);
  //     this.cartedProducts = a;
  //   },
  // },
};
</script>

<style scoped>
.modal-style {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>