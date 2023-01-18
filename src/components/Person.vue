<template>
  <div class="cart w-[22%] relative shadow-md rounded-l m-[5px] bg-white max-md:w-[25%] max-sm:w-[40%] max-xs:w-[100%]"
       @click="openPersonDetail">
    <div class="image w-[100%] h-[150px]">
      <img :src="person.Photo" class="w-[100%] h-[100%] rounded-md">
    </div>
    <div class="info p-[10px]">
      <h6 class="font-bold">{{ person.Name }}</h6>
      <p class="text-[12px]">{{ person.Title }}</p>
      <hr>
      <div class="profit my-[5px]">
        <div class="flex justify-between text-[10px]">
          <p class="text-[#D7D7D7]">Profit</p>
          <p>+$257</p>
        </div>
        <div class="h-[10px] w-[100%] rounded-md bg-[#D7D7D7]">
          <div v-for="profit in person.Profit" class="h-[100%] rounded-md"
               :style="{background: '#' + profit.Color, width : profit.Amount/10 +'%', 'z-index': 100-profit.Amount}"></div>
        </div>
      </div>
      <div class="attention my-[5px]">
        <div class="flex justify-between text-[10px]">
          <p class="text-[#D7D7D7]">Attention</p>
          <p>48h</p>
        </div>
        <div class="h-[10px] w-[100%] rounded-md bg-[#D7D7D7] relative">
          <div class="h-[100%] rounded-md w-[25%] absolute top-0 left-0"
               :style="{background: '#'+ attention.Color, width : attention.Amount +'%', 'z-index': 100-attention.Amount }"
               v-for="attention in person.Attention"></div>
        </div>
      </div>

      <div class="tags absolute top-0 right-0 pt-[20px]">
        <div v-for="tag in person.Tags" :style="{background: '#' + tag.Color}" class="rounded-md"><p>{{ tag.Name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Person",
  props: ['person'],
  emits: ['openPersonDetail'],
  data() {
    return {}
  },
  methods: {
    openPersonDetail() {
      this.$emit('openPersonDetail', this.person.Id);
    }
  }
}
</script>

<style scoped>

</style>