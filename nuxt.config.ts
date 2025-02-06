// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css:["@/assets/css/custom.css"],
  app:{
    head:{
      link:[
        {
          rel: 'stylesheet',href: 'https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&display=swap'
        }
      ]
    }
  }
})
