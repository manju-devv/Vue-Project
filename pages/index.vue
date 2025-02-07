<!-- <script setup lang="ts">
  const {data,isFetching,error}:any =  await useFetch("https://dummyjson.com/recipes");
  console.log(data._rawValue.recipes);
</script> -->



 <!-- <script setup lang="ts">
  const GetItems = async () => {
    try{
      const {data} = await useFetch("https://dummyjson.com/recipes");
      console.log(data.value);
    } catch(e:any){
      console.log(e)
    }
  }
  onMounted(()=>{
    GetItems();
  })
</script>  -->

<!-- 
<script setup lang="ts">
import type { Recipe } from '~/Types/recipe';

const cook = ref<Recipe[]>([]);

const GetItems = async () => {
  try {
    const { data, error } = await useFetch<{recipes:Recipe[]}>("https://dummyjson.com/recipes");

    if (error.value) {
      console.error("Fetch error:", error.value);
      return;
    }

    if (data.value) {
      console.log("Fetched data:", data.value); 
      cook.value = data.value.recipes;
      console.log(cook.value);
    }
  } catch (e: any) {
    console.error("Error fetching data:", e);
  }
};

onMounted(() => {
  GetItems();
}); 
 </script> -->


 <script setup lang="ts">
  import type { Recipe } from '~/Types/recipe';
  const cook = ref<Recipe[]>([]);
  const currentIndex = ref(0);
  const items = ref(3);
  const isMobile = ref(false);
  
  const {data,error,status} = await useAsyncData<{recipes:Recipe[]}>('recipes',()=>$fetch("https://dummyjson.com/recipes"));
  watchEffect(()=>{
    if(data.value){
      cook.value = data.value.recipes;
    }
  });

  if(error.value){
    console.log(error.value)
  }
const visibleCards = computed(()=>{
  return isMobile.value ? cook.value : cook.value.slice(currentIndex.value,currentIndex.value+items.value)
});

const next = () => {
  if(currentIndex.value < cook.value.length - items.value){
    currentIndex.value++;
  }else{
    currentIndex.value = 0;
  };
};
const prev = () => {
  if(currentIndex.value > 0){
    currentIndex.value--;
  }else{
    currentIndex.value = cook.value.length - items.value;
  }
};

const updateWindow = () => {
  const width = window.innerWidth;
  if(width <= 640){
    items.value = 1;
    isMobile.value = true;
  } else if(width <= 1024){
    items.value = 2;
    isMobile.value = false;
  } else {
    items.value = 3;
    isMobile.value = false;
  }
}

onMounted(()=>{
  updateWindow();
  window.addEventListener('resize',updateWindow);
});

onUnmounted(()=>{
  window.removeEventListener('resize',updateWindow)
})

</script>

<template>
    <div class="flex flex-col sm:flex-row items-center justify-center mt-28 mb-10">
      <button v-if="!isMobile" @click="prev" class="bg-gray-800 text-white px-4 py-2 rounded-md mr-2">
          ◀ 
        </button>
      <div class=" flex gap-4 sm:flex-row flex-col md:max-w-[620px] lg:max-w-[940px]"
      :class="{ 'mobile-scroll': isMobile, 'horizontal-scroll': !isMobile }">
        <TransitionGroup name="slide-fade">
          <div class="card cursor-pointer" v-for="(item,index) in visibleCards" :key="item.id">
            <div class="data w-[280px] bg-gray-100 border border-solid border-blue-200 p-8 rounded-md shadow-lg md:w-[300px] md:p-2">
              <div class="dynamic-rotation">
                <div class="inner">
                  <div class="flip-img">
                    <img :src="item.image" class="item rounded-md" alt="">
                  </div>
                  <div class="flip-data">
                    <h2 class="text-xl underline">Ingredients</h2>
                    <p v-for="(ingredient,i) in item.ingredients.slice(0,6)" :key="i">{{ `${i+1}. ${ingredient}` }}</p>
                  </div>
                </div>
              </div>
             
              <div class="mt-6 flex flex-col">
                <div class="name flex items-center justify-center">
                  <h1>{{ item.name }}</h1>
                </div>
                <div class="flex justify-around mt-5">
                  <p>time: {{ item.cookTimeMinutes }}min</p>
                  <p>calories: {{ item.caloriesPerServing }}</p>
                </div>
                <div class="flex items-start justify-around">
                  <p>ratings: {{ item.rating }}</p>
                  <p>reviews: {{ item.reviewCount }}</p>
                </div>
              </div>
              <NuxtLink :to="`/products/${item.id}`"><p class="text-end mt-4">See Details</p></NuxtLink>
            </div>
          </div>
        </TransitionGroup>
      </div>
      <button v-if="!isMobile" @click="next" class="bg-gray-800 text-white px-4 py-2 rounded-md ml-2">
        ▶
      </button>
    </div>
</template>



<style scoped>

  .data{
    box-shadow: 4px 4px 8px rgb(129, 158, 158);
  }
  .card{
    transition: 1s ease;
  }
  .card:hover{
    transform: translateX(-5px) translateY(-5px);
  }
  .item{
    transition: 2s ease;
  }


  .slide-fade-enter-active, .slide-fade-leave-active{
    transition: transform 0.5s ease, opacity 0.5s ease;
  }
  .slide-fade-enter-from{
    opacity: 0;
    transform: translateX(10px);
  }
  .slide-fade-leave-to{
    opacity: 0;
    transform: translateX(-10px);
  }

  .dynamic-rotation{
    perspective: 1000px;
  }

  .inner{
    transition: 1s ease;
    position: relative;
    transform-style: preserve-3d;
  }

  .dynamic-rotation:hover .inner{
    transform: rotateY(180deg);
  }
  .flip-image,.flip-data{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
  }
  .flip-img{
    border-radius: 6px;
  }
  .flip-data{
  background: black;
  color: white;
  transform: rotateY(180deg);
  padding: 20px;

  }


  @media screen and (max-width: 640px) {
  .mobile-scroll {
    height: 80vh;
    overflow-y: scroll;
  }
}

@media screen and (min-width: 640px) {
  .horizontal-scroll {
    overflow-x: auto;
    scrollbar-width: none;
  }
}

</style>