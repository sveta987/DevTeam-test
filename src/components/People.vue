<template>
  <spinner/>
  <div v-if="!isOpenPersonDetail && isLoginUser" id="wrapper">
    <div class="flex ml-[25%] mr-[25%] bg-[#F8F8F8] max-lg:ml-[10%] max-lg:mr-[10%] max-md:mx-[5%] max-sm:mx-[10px]"
         ref="wrapper">
      <div class="flex flex-wrap">
        <person :person="person" v-for="(person, index) in people" :key="index" @openPersonDetail="openPersonDetail"/>
        <div class="plus">
          <img src="../assets/images/plus.png" class="cursor-pointer">
        </div>
      </div>
    </div>
  </div>
  <person-detail v-else :detailForPerson="detailForPerson" @goBackToPeople="goBackToPeople"/>
</template>

<script>
import NavbarComp from "@/components/NavbarComp"
import axios from "axios"
import Person from "@/components/Person"
import PersonDetail from "@/components/PersonDetail"
import {mapActions, mapWritableState} from 'pinia'
import {useLoginStore} from '@/stores'
import Spinner from "@/components/Spinner"
import {onAuthStateChanged} from "firebase/auth"
import {auth} from '@/firebase'

export default {
  name: "People",
  components: {Spinner, Person, NavbarComp, PersonDetail},
  data() {
    return {
      people: [],
      isOpenPersonDetail: false,
      idForPersonDetail: null,
      page: 1,
    }
  },
  computed: {
    ...mapWritableState(useLoginStore, {
      isLoginUser: 'isLogin'
    }),
    ...mapWritableState(useLoginStore, {
      isLoading: 'isLoading'
    }),
  },
  methods: {
    ...mapActions(useLoginStore, ['loading']),
    ...mapActions(useLoginStore, ['loginUser']),
    openPersonDetail(id) {
      this.isOpenPersonDetail = !this.isOpenPersonDetail
      localStorage.setItem('isOpenPersonDetail',this.isOpenPersonDetail)
      this.detailForPerson = this.people.find(person => person.Id === id)
      localStorage.setItem('personDetail', JSON.stringify(this.detailForPerson))
    },
    showMorePeople() {
      this.loading();
      axios.get('https://interview-api-luvkm7etwa-uc.a.run.app/people?pp=8&p=' + this.page, {
        headers: {
          "X-Auth-Token": 'AIzaSyA_EdaXKzEQ_Yg1YnAl8ikzQDooFirlTis'
        }
      }).then((response) => {
            if (response.data.length) {
              this.page++
              this.people = [...this.people, ...response.data]
            } else {
              this.page = null
            }
          }
      )
          .catch(err => alert(err.message))
          .finally(() => this.loading())
    },
    goBackToPeople() {
      this.isOpenPersonDetail = !this.isOpenPersonDetail
    },

    handleScroll() {
      if ((window.pageYOffset + window.innerHeight >= this.$refs.wrapper?.offsetHeight) && !this.isLoading && this.page) {
        this.showMorePeople()
      }
    },
  },
  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.showMorePeople()
      } else {
        this.$router.push({path: '/'})
      }
    });
    window.addEventListener('scroll', this.handleScroll)
    this.isOpenPersonDetail = localStorage.getItem('isOpenPersonDetail')
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>