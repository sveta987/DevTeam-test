<template>
  <div class="fixed top-0 bottom-0 left-0 right-0 flex justify-center bg-[#000000da]" v-if="isClickedLogOut"
       @click="clickLogOut">
    <div class="modal bg-white my-[20%] mx-[15%] p-[30px] rounded-3xl text-center" @click.stop>
      <h1>Do you really want to log out?</h1>
      <div class="buttons pt-[5px]">
        <button @click="signOutUser" class="bg-orange-400 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mt-[50px] mr-[10px]">Yes</button>
        <button @click="clickLogOut" class="bg-orange-400 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mt-[50px]">No</button>
      </div>
    </div>
  </div>
</template>

<script>
import {signOut} from 'firebase/auth'
import {auth} from '@/firebase'
import {mapActions, mapWritableState} from 'pinia'
import {useLoginStore} from '@/stores'

export default {
  name: "LogOut",
  computed: {
    ...mapWritableState(useLoginStore, {
      isClickedLogOut: 'isClickedLogOut'
    }),
  },
  methods: {
    ...mapActions(useLoginStore, ['clickLogOut']),
    ...mapActions(useLoginStore, ['logOutUser']),
    signOutUser() {
      signOut(auth).then(
          () => {
            this.logOutUser()
            this.clickLogOut()
            localStorage.removeItem('isLogin')
            this.$router.push({path: '/'})
          }
      ).catch(error => console.log(error.message))
    },
  }
}
</script>