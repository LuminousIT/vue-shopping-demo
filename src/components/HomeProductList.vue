<template>
  <!-- <div v-if="products.length"> -->
  <div v-for="product in products" :key="product.id">
    <div class="m-2 bg-white rounded-lg shadow min-w-200 inline-block">
      <!-- src="../assets/img/iphonex.jpg" -->
      <img class="rounded-t-lg" src="../assets/img/iphonex.jpg" alt="image" />
      <!-- ../assets/img/iphonex.jpg -->
      <div class="p-2">
        <div class="flex justify-between">
          <div>
            <p class="text-xs text-gray-400">Name:</p>
            <h2>{{ product.name }}</h2>
          </div>

          <div>
            <p class="text-xs text-gray-400">Price:</p>
            <p class="font-bold">${{ product.price }}</p>
          </div>
        </div>

        <p class="text-xs text-gray-400">Description:</p>
        <p class="text-xs">{{ product.description }}</p>

        <button
          @click="addProductToCart(product)"
          class="px-2 py-1 my-2 shadow self-end bg-blue-700 rounded-md text-white text-xs"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
  <!-- </div>
  <div v-else>
    <Skeleton count="{5}" />
  </div> -->
</template>

<script>
import { Skeleton } from "vue-loading-skeleton";

export default {
  components: {
    Skeleton,
  },
  data() {
    return {
      products: [],
      loading: false,
    };
  },
  methods: {
    addProductToCart(product) {
      console.log("prod", product.description);
      this.$emit("addProductToCart", product);
    },
  },
  async mounted() {
    this.loading = true;
    await fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => (this.products = data));
    this.loading = false;
  },
};
</script>