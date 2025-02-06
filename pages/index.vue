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
  
  const {data,error,status} = await useAsyncData<{recipes:Recipe[]}>('recipes',()=>$fetch("https://dummyjson.com/recipes"));
  watchEffect(()=>{
    if(data.value){
      cook.value = data.value.recipes;
      console.log(cook.value)
    }
  });
  if(error.value){
    console.log(error.value)
  }
</script>

<template>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 mt-16">
      <div class="card cursor-pointer" v-for="(item,index) in cook" :key="index">
        <div class="data bg-gray-100 border border-solid border-blue-200 flex flex-col p-2 rounded-md overflow-hidden">
          <img :src="item.image" class="item rounded-md" alt="">
          <div class="mt-6 flex flex-col ">
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
        </div>
      </div>
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
  .item:hover{
    transform: scale(1.04);
  }
</style>