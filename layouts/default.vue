<script setup lang="ts">
    const show = ref<boolean>(false);
    const isHidden = ref<boolean>(true);
    const windowSize = ref<number>(0);

    function display():void{
        show.value = true;
    }
    function hide():void{
        show.value = false;
    }

    function toggleIcon():void{
        isHidden.value = !isHidden.value;
    }

    function updateWindow():void {
        windowSize.value = window.innerWidth;
    }

    onMounted(()=>{
        updateWindow();
        window.addEventListener('resize',updateWindow);
    });
    onUnmounted(()=>{
        window.removeEventListener('resize',updateWindow);
    });
</script>


<template>
    <div>
        <header class="flex justify-between items-center relative">
            <div class="flex items-center justify-center sm:flex-row md:flex-col">
                <NuxtLink to="/"><img @mouseover="display" @mouseleave="hide" class="icon w-[4rem] rounded-full border-[1.5px] border-gray-900 p-0.5 ml-8 mt-4" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGFg8vYWFMWdrefox0BMb4iqlywZ629vZN7g&s"></NuxtLink>
                <div v-if="show" class="alert absolute left-[7rem] top-[2.3rem] bg-[#F2F767] px-4 rounded-md text-blue-400 font-semibold">Eat fruits and stay healthy!!</div>
                <p class="iconName ml-8 text-xl">Pine-App</p>
            </div>

            <div class="menu-container relative" :class="{'s':show}">
                <div class="toggle cursor-pointer right-0" v-if="windowSize <= 640" @click="toggleIcon">
                    <img v-if="isHidden"  class="menu-icon w-10" src="https://th.bing.com/th/id/OIP.9kksv3x3Tk_A7y0qNOg6dAHaHa?w=177&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7">
                    <img v-else  class="menu-icon w-10" src="https://ts2.mm.bing.net/th?id=OIP.mr-rXfqTuAnkNX7RkBqpmAHaHa&pid=15.1">
                </div>

                <nav class="links flex font-bold text-gray-100 lg:gap-8 lg:text-xl lg:mr-14 md:gap-6 md:mr-8 md:text-lg sm:mr-4 sm:gap-2 sm:text-sm"
                    :class="{'isVisible': !isHidden && windowSize <= 640}">
                    <NuxtLink class="link" to="/">Home</NuxtLink>
                    <NuxtLink class="link" to="/about">About</NuxtLink>
                    <NuxtLink class="link" to="/products">Products</NuxtLink>
                    <NuxtLink class="link" to="/products/fruits">Fruits</NuxtLink>
                </nav>
            </div>

        </header>
        <slot />
    </div>
</template>



<style scoped>
    .icon,.iconName{
        cursor: pointer;
        transition: 1s ease;
    }
    .icon:hover{
        transform: translateX(-2px) translateY(-2px);
        box-shadow: 2px 2px 10px rgb(0,0,0,0.5);
    }
    .link{
        padding: 0.2rem 1rem;
        border-radius: 3px;
        background: rgba(0, 0, 0, 0.5); 
        transition: 1s ease;
        text-shadow: 3px 3px 8px gold;
        backdrop-filter: blur(18px);
    }
    .link:hover{
        transform: translateX(-2px) translateY(-2px);
        box-shadow: 6px 6px 10px rgba(45, 43, 43, 0.5);
    }
    .alert{
        animation: slide 2s ease-in-out; 
        transition: opacity 0.3s ease-in-out;
    }
    .menu-icon{
        mix-blend-mode: multiply;    
        transition: transform 1s ease-in-out;
    }
    @keyframes slide {
        0% {
            transform: translateY(-50%); 
        }
        100% {
            transform: translateY(0%); 
        }
    }

    @media screen and (max-width:640px) {
        .menu-container{
            display: flex;
            justify-content: center;
            position: absolute;
            top: 1.4rem;
            right: 2rem; 
        }
        .links{
            display: none;
            flex-direction: column;
            margin-top: 0.5rem;
        }
        .isVisible{
            display: flex;
            gap: 0.5rem;
        }
        .menu-icon {
            animation: move 1s ease; 
        }
        .isVisible .link {
            animation: slow 1s ease; 
        }

        @keyframes move {
        0% {
            transform: translateX(250%); 
        }
        100% {
            transform: translateX(0%); 
        }
        }

        @keyframes slow {
        0% {
            transform: translateX(100%); 
        }
        100% {
            transform: translateX(0%); 
        }
        }


    }
    @media screen and (max-width:425px) {
        
    }
    @media screen and (max-width:375px) {
        
    }
</style>