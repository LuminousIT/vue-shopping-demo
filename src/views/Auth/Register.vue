<template>
  <div class="w-full h-screen flex border-2 justify-center items-center">
    <div class="shadow w-3/4 md:w-2/4 h-auto py-8 px-8 rounded-lg text-center">
      <p class="text-red-900 mb-4">T Shopping Store</p>
      <p class="text-red-900 mb-4">Register User</p>
      <form class="flex flex-col items-center">
        <input
          name="fullname"
          placeholder="Fullname"
          required
          v-model="fullname"
          class="border-2 w-3/4 border-gray-500 text-xs my-3 py-2 px-1 col-span-2"
        />
        <div v-if="fullnameError">
          <p class="text-xs text-red-500">{{ fullnameError }}</p>
        </div>
        <input
          name="name"
          placeholder="Username"
          required
          v-model="username"
          class="border-2 w-3/4 border-gray-500 text-xs mb-3 py-2 px-1 col-span-2"
        />
        <div v-if="usernameError">
          <p class="text-xs text-red-500">{{ usernameError }}</p>
        </div>
        <input
          name="email"
          placeholder="Email"
          type="email"
          required
          v-model="email"
          class="border-2 w-3/4 border-gray-500 text-xs mb-3 py-2 px-1 col-span-2"
        />
        <div v-if="emailError">
          <p class="text-xs text-red-500">{{ emailError }}</p>
        </div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          v-model="password"
          class="border-2 w-3/4 border-gray-500 text-xs mb-3 py-2 px-1 col-span-2"
        />
        <div v-if="passwordError">
          <p class="text-xs text-red-500">{{ passwordError }}</p>
        </div>
        <input
          type="password"
          name="cpassword"
          placeholder="Confirm Password"
          required
          v-model="cpassword"
          class="border-2 w-3/4 border-gray-500 text-xs mb-3 py-2 px-1 col-span-2"
        />
        <div v-if="cpasswordError">
          <p class="text-xs text-red-500">{{ cpasswordError }}</p>
        </div>

        <div class="w-3/4 text-right">
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
            Register
          </button>

          <!-- <p class="text-xs mt-2">Click here to Register</p> -->
        </div>
      </form>
    </div>
  </div>
</template>;

<script>
export default {
  data() {
    return {
      fullname: "",
      username: "",
      email: "",
      password: "",
      cpassword: "",
      fullnameError: "",
      usernameError: "",
      emailError: "",
      passwordError: "",
      cpasswordError: "",
      loading: false,
    };
  },
  methods: {
    validateForm() {
      this.fullnameError =
        this.fullname.trim().length == 0 ? "Please enter your fullname" : "";
      this.usernameError =
        this.username.trim().length == 0 ? "Please enter your username" : "";
      this.emailError =
        this.email.trim().length == 0 ? "Please enter your email" : "";
      this.passwordError =
        this.password.trim().length == 0 ? "Please enter your password" : "";
      this.cpasswordError =
        this.cpassword.trim().length == 0 ? "Please confirm your password" : "";

      this.cpasswordError =
        this.cpassword.trim() == this.password.trim()
          ? ""
          : "Password does not match";
    },
    async submit() {
      this.validateForm();
      if (
        !this.fullnameError &&
        !this.usernameError &&
        !this.emailError &&
        !this.passwordError &&
        !this.cpasswordError
      ) {
        this.loading = true;
        const result = {
          username: this.username,
          password: this.password,
          email: this.email,
          fullname: this.fullname,
          id: 10 * Math.random(),
        };
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(result),
        };
        await fetch("http://localhost:3000/users", requestOptions);
        this.loading = false;
        console.log("success");
        this.$router.push("/login");
      }
    },
  },
};
</script>