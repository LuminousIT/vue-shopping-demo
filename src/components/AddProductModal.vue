<template>
  <modal
    class="h-screen fixed top-0 left-0 right-0 z-200 flex justify-center items-center bg-black modal-style"
  >
    <div class="pb-4 w-4/12 bg-white text-black opacity-100 rounded-md">
      <div class="p-2 bg-gray-100 rounded-t-md">
        <p>Add Product</p>
      </div>

      <form
        class="text-xs px-2 m-2 flex flex-col justify-start items-start gap-1"
      >
        <!-- <div > -->
        <label>Name: </label>
        <input
          name="name"
          placeholder="Product Name"
          required
          v-model="name"
          class="border w-full border-green-500 text-xs py-2 px-1 col-span-2"
        />
        <div v-if="nameError">
          <p class="text-xs text-red-500">{{ nameError }}</p>
        </div>

        <label>Description: </label>
        <textarea
          name="description"
          placeholder="Product Description"
          v-model="description"
          class="border w-full border-green-500 text-xs py-2 px-1 col-span-2"
        >
        </textarea>
        <div v-if="descriptionError">
          <p class="text-xs text-red-500">{{ descriptionError }}</p>
        </div>
        <!-- <input
          name="name"
          placeholder="Product Description"
          required
          class="border border-green-500 text-xs py-2 px-1 col-span-2"
        /> -->
        <label>Price: </label>
        <input
          name="name"
          placeholder="Product Price"
          required
          v-model="price"
          type="number"
          class="border w-full border-green-500 text-xs py-2 px-1 col-span-2"
        />
        <div v-if="priceError">
          <p class="text-xs text-red-500">{{ priceError }}</p>
        </div>
        <!-- </div> -->
      </form>
      <div class="flex justify-items-center">
        <button
          @click.prevent="submit"
          class="submit py-1 px-3 ml-4 mr-2 bg-blue-500 text-xs text-white grid justify-items-end"
        >
          Add
        </button>
        <button
          @click="closeModal"
          class="submit py-1 px-3 bg-white border border-blue-500 text-xs text-black grid justify-items-end"
        >
          Cancel
        </button>
        <!-- <p>name: {{ name }}</p>
        <p>description: {{ description }}</p> -->
      </div>
    </div>
  </modal>
</template>

<script>
import { useToast } from "vue-toastification";

const toast = useToast();
export default {
  data() {
    return {
      name: "",
      description: "",
      price: "",
      nameError: "",
      descriptionError: "",
      priceError: "",
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
      this.$emit("reload");
    },
    validateForm() {
      this.nameError =
        this.name.trim().length == 0 ? "Please enter product name" : "";
      this.descriptionError =
        this.description.trim().length == 0
          ? "Please enter product description"
          : "";
      this.priceError =
        this.price.trim().length == 0 ? "Please enter valid product price" : "";
    },
    async submit() {
      this.validateForm();
      if (!this.nameError && !this.descriptionError && !this.priceError) {
        const result = {
          name: this.name,
          description: this.description,
          price: this.price,
          id: 10 * Math.random(),
          img: "hey",
        };

        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(result),
        };
        await fetch("http://localhost:3000/products", requestOptions);
        toast.success("Product added successfuly!");
        this.closeModal();
      }

      // .then((response) => response.json())
      // .then((data) => console.log("this. data", data));
    },
  },
};
</script>