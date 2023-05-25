<template>

    <header>

        <div class="col">
            <img :src="urlSite(getObjLogo.img)" :alt="getObjLogo.nombre" class="img-fluid rounded float-start logo" v-if=" getObjLogo.img " />

            <h1 :class=" getObjLogo.img ? 'left' : 'center' ">{{ getObjLogo.nombre }}</h1>
            <RedesPage :estilo=" getObjLogo.img ? 'header-logo' : 'header-no-logo' " />

        </div>

    </header>
    
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters } from "vuex";
import { urlSite } from "@/modules/shared/helpers/helpers"

export default {

    props:{
    },
    components: {
        RedesPage: defineAsyncComponent(() => import('./RedesPage.vue'))
    },
    computed:{        
        ...mapGetters('home',['getObjLogo'])
    },
    methods: {
        urlSite,
    }

}
</script>

<style scoped>
    header{
        background-color: var(--dark);
        padding: 30px 0;
    }
    header img.logo{
        max-height: 100px;
        max-width: 100px;
        margin: 0 10px;
    }
    header h1{
        color: var(--light);
        font-size: 1.2rem;
        font-style: oblique;
    }
    header h1.left{
        text-align: left;
        padding: 2px 0 0;
    }
    header h1.center{
        text-align: center;
        padding: 0 0;
    }
</style>