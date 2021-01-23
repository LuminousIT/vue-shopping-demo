<template>
  <div class="w-full h-screen flex border-2 justify-center items-center">
    <div class="shadow w-3/4 md:w-2/4 h-auto py-8 px-8 rounded-lg text-center">
      <p class="text-indigo-900 font-bold mb-4">Project Shopping Store</p>
      <form class="flex flex-col items-center">
        <!-- <select class="w-3/4">
          <option value="1">Customer</option>
          <option value="2">Admin</option>
        </select> -->
        <input
          name="name"
          placeholder="Username"
          required
          v-model="username"
          class="border-2 w-3/4 border-gray-500 text-xs my-3 py-2 px-1 col-span-2"
        />
        <div v-if="usernameError">
          <p class="text-xs text-red-500">{{ usernameError }}</p>
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
        <div class="w-3/4 text-right">
          <button
            @click.prevent="submit"
            class="py-2 px-3 w-full text-center bg-blue-500 text-xs text-white flex justify-center items-center"
          >
            <!-- <Spinner size="medium" /> -->
            <!-- <vue-simple-spinner size="medium" /> -->
            <vue-loaders
              v-if="loading"
              name="ball-clip-rotate"
              color="black"
              scale="0.5"
              class="p-0 m-0"
            ></vue-loaders>
            Login
          </button>
          <div>
            <router-link to="/register" class="text-xs"
              >Click here to Register
            </router-link>
          </div>

          <!-- <p class="text-xs mt-2">Click here to Register</p> -->
        </div>
      </form>
      <div v-if="error" class="w-full text-center">
        <p class="text-xs text-red-500">{{ error }}</p>
      </div>
    </div>
  </div>
</template>;




<script>
import { useToast } from "vue-toastification";

const toast = useToast();
export default {
  data() {
    return {
      username: "",
      password: "",
      error: "",
      usernameError: "",
      passwordError: "",
      loading: false,
    };
  },
  components: {
    // Spinner,
  },
  methods: {
    validateForm() {
      this.usernameError =
        this.username.trim().length == 0 ? "Please enter username" : "";
      this.passwordError =
        this.password.trim().length == 0 ? "Please enter password" : "";
    },
    async submit() {
      this.validateForm();

      if (!this.usernameError && !this.passwordError) {
        this.loading = true;
        const result = {
          username: this.username,
          password: this.password,
        };
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(result),
        };
        await fetch("http://localhost:3000/users")
          .then((response) => response.json())
          .then((data) =>
            data.filter((user, index) => user.username == this.username)
          )
          .then((data) => {
            this.loading = false;

            if (data.length) {
              if (data[0].username == "admin") {
                if (this.password == data[0].password) {
                  localStorage.setItem("userProfile", JSON.stringify(data[0]));
                  toast.success("Login Successfull");
                  // this.$router.push("/admin");
                  window.location.pathname = "/admin";
                } else {
                  this.error = "correct guy but check your password";
                  toast.warning("Invalid Password!");
                }
              } else {
                if (this.password == data[0].password) {
                  localStorage.setItem("userProfile", JSON.stringify(data[0]));
                  this.$router.push("/");
                  window.location.pathname = "/";
                } else {
                  this.error = "correct guy but check your password";
                  toast.warning("Invalid Password!");
                }
              }
            } else {
              this.error = "user does not exist";
              toast.warning("User does not exist!");
            }
          })
          .catch((err) => {
            this.loading = false;
            toast.error(err.message);
          });
      }
    },
  },
};

// to start the network: type command npx json-server --watch data/db.json
</script>