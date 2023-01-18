<template>
  <section class="bg-gray-50">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <img class="w-15 h-15 mr-2" src="../assets/images/logo.png" alt="logo">
      <div class="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Create account
          </h1>
          <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Your email</label>
            <input v-model="email" type="email" name="email" id="email"
                   class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                   placeholder="name@company.com" required="">
          </div>
          <div>
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
            <input type="password" name="password" id="password" v-model="password" placeholder="••••••••"
                   class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                   required="">
          </div>
          <div>
            <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
            <input type="password" v-model="confirmPassword" name="confirm-password" id="confirm-password"
                   placeholder="••••••••"
                   class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                   required="">
          </div>
          <button @click="register"
                  class="bg-orange-400 hover:bg-orange-700 text-white font-bold py-2 px-4 mx-2 rounded">
            Create an account
          </button>
          <p class="text-sm font-light text-gray-500">
            Already have an account?<router-link to="/login" v-if="!isUserLogin" class="font-medium text-primary-600 hover:underline">Login here</router-link>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

import {auth} from '@/firebase'
import {createUserWithEmailAndPassword} from 'firebase/auth'

export default {
  name: "Register",
  data() {
    return {
      email: null,
      password: null,
      confirmPassword: null
    }
  },
  methods: {
    register() {
      if (this.password === this.confirmPassword) {
        // Create a new user with email and password using firebase
        createUserWithEmailAndPassword(auth, this.email, this.password)
            .then(res => {
              alert('Thank you for registration!');
              this.$router.push({name: 'login'})
            })
            .catch(err => {
              alert(err.message)
            })
      } else {
        alert("Your password is incorrect, please check it.")
      }
    }
  }
}
</script>