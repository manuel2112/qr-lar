<template v-if="getOpenModalEmpresa">

    <div 
        class="modal fade" 
        id="empresaModal" 
        data-backdrop="static" 
        tabindex="-1" 
        role="dialog" 
        aria-labelledby="staticBackdropLabel" 
        aria-hidden="true">

        <div class="modal-dialog" role="document">
            <div class="modal-content">
                
                <div class="modal-header">
                    <h5 class="modal-title">{{ getEmpresa.empresa }}</h5>
                    <button type="button" class="btn-close" @click=" onHidden "></button>
                </div>

                <div class="modal-body">

                    <div class="row">
                        <div class="col">
                            <img 
                                :src="urlSite(getEmpresa.logotipo)" 
                                :alt="getEmpresa.empresa" 
                                class="img-fluid rounded float-center logo" 
                                v-if=" getEmpresa.logotipo " 
                                loading="lazy" />
                        </div>
                    </div>

                    <div class="row">
                        <div class="col">
                            <p class="descripcion" v-html="nl2br(getEmpresa.descripcion)"></p>
                        </div>
                    </div>

                    <RedesPage estilo="mdl-empresa" />

                    <div class="row" id="direccion" v-if="getEmpresa.direccion">
                        <div class="col">
                            {{ getEmpresa.direccion ? `${getEmpresa.direccion}, ` : '' }}
                            {{ getEmpresa.name }}
                        </div>
                    </div>
                    

                </div><!-- FIN MODAL BODY -->

            </div>
        </div>
    </div>
  
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters } from "vuex";
import { urlSite, formatDinero, nl2br } from "@/modules/shared/helpers/helpers"

  export default {

    props: {
    },
    components: {
        RedesPage: defineAsyncComponent(() => import('../components/RedesPage.vue'))
    },
    data() {
      return {
        title: '',
      }
    },
    watch: {
        getOpenModalEmpresa(newVal,oldVal){
            if( newVal ){
                $('#empresaModal').modal({backdrop:'static', keyboard:false});
                $('#empresaModal').modal('show');
            }
        }
    },
    computed:{        
        ...mapGetters('home',['getEmpresa','getOpenModalEmpresa'])
    },
    methods: {
        urlSite,
        formatDinero,
        nl2br,
        onHidden(){
            this.$store.commit('home/setOpenModalEmpresa', false);
            $('#empresaModal').modal('hide');
        },
    }

  };
</script>

<style scoped lang="scss">
    img.logo{
        max-height: 100px;
        max-width: 100px;
        margin: 0 0;
    }
    p.descripcion{
        font-size: 1.0rem;
        text-align: justify;
        margin: 0 0 0;
    }
</style>