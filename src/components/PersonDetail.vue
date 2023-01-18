<template>
  <button @click="goBackToPeople"
          class="bg-orange-400 hover:bg-orange-700 text-white font-bold py-2 px-4 mx-2 rounded">Go back
  </button>
  <div class="cart relative shadow-md rounded-l m-[5px] bg-white ml-[40%] mr-[40%] mt-[5%]">
    <div class="image flex justify-center ">
      <img :src="personDetail?.Photo" class="rounded-md w-[100%]">
    </div>
    <div class="info p-[10px]">
      <h6 class="font-bold text-[30px]" @click="editField('name')">
        <input v-if="edit === 'name'" v-model="personDetail.Name" class="w-[100%]" autofocus type="text"
               @keyup.enter="edit = null">
        <span v-else class="cursor-pointer">{{ personDetail?.Name }}</span>
      </h6>
      <p class="text-[20px]" @click="editField('title')">
        <input v-if="edit === 'title'" v-model="personDetail.Title" class="w-[100%]" autofocus type="text"
               @keyup.enter="edit = null">
        <span v-else class="cursor-pointer">{{ personDetail?.Title }}</span>
      </p>
      <hr class="bg-black h-[4px]">
      <div class="profit my-[5px]">
        <div class="flex justify-between text-[10px]">
          <p class="text-[#D7D7D7]">Profit</p>
          <p>+$257</p>
        </div>
        <div class="h-[15px]  rounded-md bg-[#D7D7D7] relative">
          <div class="w-[15px] h-[14px] absolute left-0 top-0 z-1000 cursor-pointer"><img src="../assets/images/-.png"
                                                                                          alt=""
                                                                                          @click="decrementProfit">
          </div>
          <div v-for="profit in personDetail?.Profit" class="h-[100%] rounded-md"
               :style="{background: '#' + profit.Color, width : profit.Amount/10 +'%', 'z-index': 100-profit.Amount}"></div>
          <div class="w-[15px] h-[14px] absolute right-0 top-0 z-1000 cursor-pointer"><img src="../assets/images/+.png"
                                                                                           alt=""
                                                                                           @click="incrementProfit">
          </div>
        </div>
      </div>
      <div class="attention my-[5px]">
        <div class="flex justify-between text-[10px]">
          <p class="text-[#D7D7D7]">Attention</p>
          <p>48h</p>
        </div>
        <div class="h-[15px] rounded-md bg-[#D7D7D7] relative">
          <div class="h-[100%] rounded-md w-[25%] absolute top-0 left-0"
               :style="{background: '#'+ attention.Color, width : attention.Amount +'%', 'z-index': attention.Amount<=100 ? 100-attention.Amount : 100 }"
               v-for="attention in personDetail?.Attention"></div>
          <div class="w-[15px] h-[14px] absolute right-0 top-0 [z-1000] cursor-pointer"><img
              src="../assets/images/+.png"
              v-show="!isClickedInIncOfAttention"
              alt="" @click="AddAttention">
          </div>
        </div>
        <div v-show="isClickedInIncOfAttention">
          <div>
            <div class="h-[15px] rounded-md bg-[#D7D7D7] relative mt-1"
                 v-for="(attention, index) in personDetail?.Attention" :key="index">
              <div class="w-[15px] h-[14px] absolute left-0 top-0 z-[101] cursor-pointer"
                   @click="AddAttentionProperty(index,'dec')"><img
                  src="../assets/images/-.png"
                  alt=""></div>
              <div class="h-[100%] rounded-md w-[25%] absolute top-0 left-0"
                   :style="{background: '#'+ attention.Color, width : attention.Amount +'%', 'z-index': attention.Amount<=100 ? 100-attention.Amount : 100 }"></div>
              <div class="w-[15px] h-[14px] absolute right-0 top-0 z-[101] cursor-pointer"
                   @click="AddAttentionProperty(index,'inc')"><img
                  src="../assets/images/+.png"
                  alt=""></div>
            </div>
          </div>
        </div>

        <div class="flex justify-center gap-1 flex-wrap">
          <div v-for="(color, index) in colors" :key="index">
            <div v-for="(row, index) in arrayForRectangles" :key="index" class="flex justify-center gap-1">
              <div v-for="(col, index) in arrayForRectangles" :key="index" class="w-[20px] h-[15px] mt-1 rounded-sm"
                   :style="{background: '#'+ color}">

              </div>
            </div>
          </div>
        </div>
        <div class="tags absolute top-0 right-0 pt-[20px]">
          <div v-for="tag in personDetail?.Tags" :style="{background: '#' + tag.Color}" class="rounded-md">
            <p>{{ tag.Name }}</p>
          </div>
        </div>
      </div>
    </div>
    <button class="bg-orange-400 hover:bg-orange-700 text-white font-bold p-1 rounded mx-[30%] my-[5px]"
            @click="saveChanges">Save changes
    </button>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: "PersonDetail",
  props: ['id'],
  emits: ['goBackToPeople'],
  data() {
    return {
      personDetail: null,
      edit: null,
      colors: [],
      arrayForRectangles: [1, 2, 3, 4, 5],
      isClickedInIncOfAttention: false
    }
  },
  methods: {
    goBackToPeople() {
      this.$emit('goBackToPeople')
    },
    editField(parameter) {
      this.edit = parameter
    },
    decrementProfit() {
      if (this.personDetail.Profit[0].Amount >= 0) {
        this.personDetail.Profit[0].Amount -= 10;
      }
    },
    incrementProfit() {
      if (this.personDetail.Profit[0].Amount <= 1000) {
        this.personDetail.Profit[0].Amount += 10;
      }
    },
    AddAttention() {
      this.isClickedInIncOfAttention = !this.isClickedInIncOfAttention
    },
    AddAttentionProperty(index, action) {
      switch (action) {
        case 'inc':
          if (this.personDetail.Attention[index].Amount <= 100) {
            this.personDetail.Attention[index].Amount += 2
          }
          break
        case 'dec':
          if (this.personDetail.Attention[index].Amount >= 0) {
            this.personDetail.Attention[index].Amount -= 2
          }
          break
      }
    },
    saveChanges() {
      let updatedData = JSON.stringify(this.personDetail);
      axios.post('https://interview-api-luvkm7etwa-uc.a.run.app/people/' + this.id, updatedData,
          {
            headers: {
              "X-Auth-Token": 'AIzaSyA_EdaXKzEQ_Yg1YnAl8ikzQDooFirlTis',
              "Content-Type": 'application/json'
            }
          }).then((response) => {
        console.log(response)
        this.goBackToPeople()
      })
          .catch(err => console.log(err.message))
    }
  }
  ,
  mounted() {
    axios.get('https://interview-api-luvkm7etwa-uc.a.run.app/people/' + this.id, {
      headers: {
        "X-Auth-Token": 'AIzaSyA_EdaXKzEQ_Yg1YnAl8ikzQDooFirlTis'
      }
    }).then((response) => {
          this.personDetail = response.data;
          this.colors.push(this.personDetail.Profit[0].Color)
          this.personDetail.Attention?.forEach(item => this.colors.push(item.Color))
        }
    )
        .catch(err => alert(err.message)
        )
  }
}
</script>