<template>
  <modal
    class="h-screen fixed overflow-y-auto top-0 left-0 right-0 z-250 flex justify-center items-center bg-black modal-style"
  >
    <div
      class="w-3/4 md:w-2/4 h-auto bg-white text-black opacity-100 rounded-md"
    >
      <div
        class="p-2 bg-gray-100 rounded-t-md flex justify-between items-center"
      >
        <p>Checkout Products</p>
        <p class="text-xs mr-1 cursor-pointer" @click="closeModal">X</p>
      </div>

      <div class="flex flex-col md:flex-row">
        <div class="md:w-2/4 p-2">
          <div>
            <p class="text-md">Checkout</p>
            <p class="text-xs">Billed to:</p>
            <!-- <div class="flex"> -->
            <input
              name="name"
              placeholder="Fullname"
              required
              v-model="fullname"
              class="border border-gray-500 w-full text-xs mt-2 py-2 px-1 col-span-2"
            />
            <input
              name="email"
              placeholder="Email"
              required
              type="email"
              v-model="email"
              class="border border-gray-500 w-full text-xs my-1 py-2 px-1 col-span-2"
            />
            <!-- </div> -->

            <p class="text-xs">Card details:</p>
            <div></div>
            <input
              name="cnumber"
              placeholder="Card Number"
              required
              type="number"
              v-model="cnumber"
              class="border w-full border-gray-500 text-xs my-1 py-2 px-1 col-span-2"
            />
            <div class="flex justify-center items-center">
              <input
                name="month"
                placeholder="Month"
                required
                type="number"
                v-model="month"
                class="border w-2/4 border-gray-500 text-xs my-1 py-2 px-1"
              />
              <input
                name="cv2"
                placeholder="CV2"
                required
                type="number"
                v-model="cv2"
                class="border w-2/4 border-gray-500 text-xs my-1 py-2 px-1"
              />
            </div>

            <button
              @click.prevent="submit"
              class="py-2 px-3 w-full text-center bg-blue-500 text-xs text-white flex justify-center items-center"
            >
              <vue-loaders
                v-if="loading"
                name="ball-clip-rotate"
                color="black"
                scale="0.5"
                class="p-0 m-0"
              ></vue-loaders>
              Pay {{ totalP }} Now
            </button>
          </div>
        </div>
        <div class="md:w-2/4 bg-gray-50 p-2">
          <p class="text-md">Order Summary</p>
          <div class="grid grid-cols-2 mt-5">
            <p class="text-xs">Order sum total:</p>
            <p class="text-xs">${{ totalP }}</p>
          </div>
          <div class="flex justify-evenly">
            <p class="text-xs">Tax:</p>
            <p class="text-xs">$5.00</p>
          </div>
          <div class="flex justify-evenly">
            <p class="text-xs font-bold">Total:</p>
            <p class="text-xs font-bold">${{ totalP + 5 }}</p>
          </div>
        </div>
      </div>

      <!-- <div class="flex justify-items-center">
        <button
          @click="submitMe"
          class="submit py-1 px-3 ml-4 mr-2 bg-blue-500 text-xs text-white grid justify-items-end"
        >
          Update
        </button>
        <button
          @click="closeModal"
          class="submit py-1 px-3 mt-2 bg-white border border-blue-500 text-xs text-black grid justify-items-end"
        >
          Cancel
        </button>
      </div> -->
    </div>
  </modal>
</template>

<script>
import { useToast } from "vue-toastification";

const toast = useToast();
export default {
  props: ["products"],
  data() {
    // totalPrice();
    console.log("this prod", this.products);
    return {
      // products: this.products,
      totalP: "",
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    submit() {
      toast.success("Payment Successful!");
      this.$emit("close");
      this.$emit("clearCart");
    },
  },
  mounted() {
    // totalPrice() {
    const tot = this.products?.reduce((a, b) => a + b.price, 0);
    console.log("tot", tot);
    this.totalP = tot;

    // }
  },
};
</script>