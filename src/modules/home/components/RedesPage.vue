<template>

    <div class="col" :class=" estilo ">
        <a 
            :href="`tel:${codePhone(getDataRedes.fono,true)}`" 
            target="_blank" 
            class="btn"
            v-if="getDataRedes.fono">
            <i class="fa-solid fa-phone"></i>
        </a>
        <a 
            :href="`https://api.whatsapp.com/send/?phone=${codePhone(getDataRedes.whatsapp,false)}`"
            target="_blank"
            class="btn"
            v-if="getDataRedes.whatsapp">
            <i class="fa-brands fa-whatsapp"></i>
        </a>
        <a 
            :href="`mailto:${getDataRedes.email}`" 
            target="_blank" 
            class="btn"
            v-if="getDataRedes.email">
            <i class="fa-solid fa-envelope"></i>
        </a>
        <a 
            :href="getDataRedes.web" 
            target="_blank" 
            class="btn"
            v-if="getDataRedes.web">
            <i class="fa-solid fa-globe"></i>
        </a>
        <a 
            :href="getDataRedes.facebook" 
            target="_blank" 
            class="btn"
            v-if="getDataRedes.facebook">
            <i class="fa-brands fa-facebook-f"></i>
        </a>
        <a 
            :href="getDataRedes.instagram" 
            target="_blank" 
            class="btn"
            v-if="getDataRedes.instagram">
            <i class="fa-brands fa-instagram"></i>
        </a>
    </div>

</template>

<script>
import { mapGetters } from "vuex";
import { codePhone } from "@/modules/shared/helpers/helpers"

export default {

    props:{
        estilo: {
            type: String,
            required: true
        }
    },
    computed:{        
        ...mapGetters('home',['getDataRedes'])
    },
    methods: {
        codePhone,
    }

}
</script>

<style scoped> 
    a{
        padding: 0;
        margin: 0;
    }
    a.btn i{
        font-size: 1.0rem;  
    }
    .header-logo{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
        align-content: stretch;
        margin: -2px 0 0;
    }
    .header-logo a{
        margin: 0 20px 0 0;
    }
    .header-logo a.btn i{
        color: var(--light); 
    }

    .header-no-logo{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        align-content: center;
    }
    .header-no-logo a{
        margin: 0 20px 0;
    }

    .header-logo a.btn i,
    .header-no-logo a.btn i{
        color: var(--light); 
    }

    .mdl-empresa{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        align-content: center;
        margin: 15px 0;
    }
    .mdl-empresa a{
        margin: 0 15px 0;
    }
    .mdl-empresa a.btn i{
        color: var(--dark);
    }
</style>