<template>
    <footer>

        <div class="row">
            <div class="col">
                <img 
                    :src="urlSite(getObjLogo.img)" 
                    :alt="getObjLogo.nombre" 
                    class="img-fluid rounded float-center logo" 
                    v-if=" getObjLogo.img " 
                    loading="lazy" />
            </div>
        </div>
        <div class="row">
            <div class="col redes">
                <button
                    type="button"
                    class="btn btn-sm btn-outline-secondary mt-3"
                    @click="showModal()">
                    NUESTRA EMPRESA
                </button>
            </div>
        </div>

    </footer>
    <EmpresaModal /> 
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters } from "vuex";
import { urlSite } from "@/modules/shared/helpers/helpers"

export default {

    props:{
    },    
    components: {
        EmpresaModal: defineAsyncComponent(() => import('../modals/EmpresaModal.vue'))
    },
    computed:{        
        ...mapGetters('home',['getObjLogo'])
    },
    data(){
        return{
        }
    },
    created(){
    },
    methods: {
        urlSite,
        showModal(){
            this.$store.commit('home/setOpenModalEmpresa', true);
        },
    }

}
</script>

<style scoped>
    footer{
        background-color: var(--dark);
        margin: 0;
        padding: 15px;
    }
    footer img.logo{
        max-height: 100px;
        max-width: 100px;
        margin: 0 0;
    }
</style>