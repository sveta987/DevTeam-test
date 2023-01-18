<template>
  <nav class=" m-2 flex !justify-between flex-row">
    <div class="logo w-[40px] h-[40px]">
      <img src="../assets/images/logo.png" alt="logo">
    </div>
    <div class="displaySettingsAndSearch flex max-sm:hidden">
      <div class="displaySettings">
        <!--              icons             -->
        <button class="ml-2"><img src="../assets/images/icon1.png" alt=""></button>
        <button class="ml-2"><img src="../assets/images/icon2.png" alt=""></button>
        <button class="ml-2"><img src="../assets/images/icon3.png" alt=""></button>
      </div>
      <div class="search">
        <input type="text" class="border-black border-[1px] rounded-md">
      </div>
      <div class="filterAndSort">
        <button class="ml-2"><img src="../assets/images/icon4.png" alt=""></button>
        <button class="ml-2"><img src="../assets/images/icon5.png" alt=""></button>
      </div>
    </div>
    <div class="profile flex max-sm:hidden">
      <img src="../assets/images/profile.png" alt="profile" v-show="isUserLogin">
      <router-link to="/login" v-if="!isUserLogin"
                   class="bg-orange-400 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Login
      </router-link>
      <router-link to="/logout" v-if="isUserLogin"
                   class="bg-orange-400 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                   @click="clickLogOut">LogOut
      </router-link>
      <router-link to="/register" v-show="!isUserLogin"
                   class="bg-orange-400 hover:bg-orange-700 text-white font-bold py-2 px-4 mx-2 rounded">Register
      </router-link>
    </div>
    <div v-show="isOpenHamburger" class="absolute top-[7%] z-[100] bg-white w-[100%] flex flex-col px-[35%] py-[5%] ">
      <input type="text" class="border-black border-[1px] rounded-md ">
      <div class="pt-[20px] ml-[25%]">
        <router-link to="/login" v-if="!isUserLogin"
                     class="bg-orange-400 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Login
        </router-link>
        <router-link to="/logout" v-if="isUserLogin"
                     class="bg-orange-400 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                     @click="clickLogOut">LogOut
        </router-link>
        <router-link to="/register" v-show="!isUserLogin"
                     class="bg-orange-400 hover:bg-orange-700 text-white font-bold py-2 px-4 mx-2 rounded">Register
        </router-link>
      </div>
    </div>

    <button type="button"
            class=" hidden max-sm:inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-expanded="false" @click="openHamburger">
      <span class="sr-only">Open main menu</span>
      <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
           xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"></path>
      </svg>
    </button>
  </nav>
  <router-view/>
</template>


<script>
import {mapActions, mapWritableState} from 'pinia'
import {useLoginStore} from '@/stores'

export default {
  name: "NavbarComp",
  computed: {
    ...mapWritableState(useLoginStore, {
      isUserLogin: 'isLogin'
    }),
    ...mapWritableState(useLoginStore, {
      isUserWantToLogOut: 'isClickedLogOut'
    })
  },
  data() {
    return {
      isOpenHamburger: false
    }
  },
  methods: {
    ...mapActions(useLoginStore, ['clickLogOut']),
    openHamburger() {
      this.isOpenHamburger = !this.isOpenHamburger
      console.log(this.isOpenHamburger)
    }
  }
}
</script>