<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 mx-auto md:h-screen lg:py-0">
      <img class="w-15 h-15 mr-2" src="../assets/images/logo.png" alt="logo">
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0" @keyup.enter="login">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Sign in to your account
          </h1>
          <p v-show="errMsg.code=== 2" class="text-red-600 text-center text-[10px]">{{ errMsg.msg }}</p>
          <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Your email</label>
            <input v-model="email" type="email" name="email" id="email"
                   class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                   :class="{'border-red-600' : errMsg.code=== 1 || errMsg.code === 10 || errMsg.code === 2}"
                   placeholder="name@company.com" required="">
            <p v-show="errMsg.code=== 1 || errMsg.code === 10 " class="text-red-600 text-center text-[10px]">{{ errMsg.msg }}</p>
          </div>
          <div>
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password </label>
            <input v-model="password" type="password" name="password" id="password" placeholder="••••••••"
                   class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                   :class="{'border-red-600' : errMsg.code === 10 || errMsg.code === 3}"
                   required="">
            <p v-show="(errMsg.code === 10 ||errMsg.code === 3 )" class="text-red-600 text-center text-[10px]">{{ errMsg.msg }}</p>
          </div>
          <button type="submit" @click="login"
                  class="bg-orange-400 hover:bg-orange-700 text-white font-bold py-2 px-4 mx-2 rounded">
            Sign in
          </button>
          <p class="text-sm font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet?
            <router-link to="/register" class="font-medium text-primary-600 hover:underline">Sign up</router-link>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {auth} from '@/firebase'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {mapActions} from 'pinia'
import {useLoginStore} from '@/stores'

export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      errMsg: {
        code: 0,
        msg: ''
      },
    }
  },
  methods: {
    ...mapActions(useLoginStore, ['loginUser']),
    login() {
      signInWithEmailAndPassword(auth, this.email, this.password)
          .then(() => {
            this.loginUser();
            localStorage.setItem('isLogin', 'true')
            this.$router.push({path: '/dashboard'})
          })
          .catch(error => {
            switch (error.code) {
              case 'auth/invalid-email':
                this.errMsg.code = 1
                this.errMsg.msg = 'Invalid Email'
                break
              case 'auth/user-not-found':
                this.errMsg.code = 2
                this.errMsg.msg = 'No account with that email was found'
                break
              case 'auth/wrong-password':
                this.errMsg.code = 3
                this.errMsg.msg = 'Incorrect Password'
                break
              default:
                this.errMsg.code = 10
                this.errMsg.msg = 'Email or Password was Incorrect'
                break
            }
            this.password = null
          });
    }
  }
}
</script>