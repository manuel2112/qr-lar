<template v-if="getOpenModalProducto">

  <div class="modal fade" id="showModal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
          
        <div class="modal-header">
          <h5 class="modal-title">{{ getProducto.PRODUCTO_NOMBRE }}</h5>
          <button type="button" class="btn-close" @click=" onHidden "></button>
        </div>

        <div class="modal-body">
          <template v-if=" getProducto != '' ">
            
            <div class="col-12">              
              <div class="toast position-absolute top-0 start-50 translate-middle-x w-100 text-white bg-primary" style="z-index: 999" id="myToast" @click="goCarrito">
                <div class="d-flex">
                    <div class="toast-body">
                        PRODUCTO AGREGADO, IR AL CARRITO DE COMPRAS.
                    </div>
                </div>
              </div>
            </div>
              
            <div v-if=" getProducto.IMAGENES && getProducto.IMAGENES.length == 1 ">
              <div v-for=" img in getProducto.IMAGENES " :key="img.id">
                <img :src="urlSite(img.img)" class="d-block w-100 img-thumbnail rounded" alt="..." loading="lazy">
              </div>
            </div>

              <div id="carouselControls" class="carousel slide" data-bs-ride="carousel" v-if=" getProducto.IMAGENES && getProducto.IMAGENES.length > 1 ">
                  <div class="carousel-inner">
                      <div 
                          v-for=" ( img,index ) in getProducto.IMAGENES " 
                          :key="img.id" 
                          class="carousel-item" 
                          :class=" index==0 ? 'active': ''">
                          <img :src="urlSite(img.img)" class="d-block w-100" alt="..." loading="lazy">
                      </div>
                  </div>
                  <div v-if=" getProducto.IMAGENES.length > 1 ">
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselControls" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselControls" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                  </div>
              </div>

              <p class="detalle mtb-3" v-if="getProducto.STOCK">STOCK: {{ getProducto.STOCK }} UNIDADES</p>

              <p class="detalle mt-3" v-html="nl2br(getProducto.PRODUCTO_DET)"></p>
              <p class="detalle" v-html="nl2br(getProducto.PRODUCTO_DESC)"></p>

              <dl>
                <span v-for=" ( valor ) in getProducto.VALORES " :key="valor.id">
                    <dt>{{ valor.nombre ? `${valor.nombre}` : '.......' }}</dt>
                    <dd>
                      {{ formatDinero(valor.valor) }} 
                      <button
                        type="button"
                        class="btn btn-sm btn-outline-info"
                        @click="addCarrito(getProducto,valor)"
                        v-if="getOptions.pago">
                        <i class="fa fa-shopping-cart"></i>
                      </button>
                    </dd>
                </span>
              </dl>

          </template>
        </div><!-- FIN MODAL BODY -->

      </div>
    </div>
  </div>

  <AddShopModal />
  
</template>

<script>
  import { defineAsyncComponent } from 'vue'
  import { mapGetters } from "vuex";
  import { urlSite, formatDinero, nl2br } from "@/modules/shared/helpers/helpers"

  export default {
    
    components: {
        AddShopModal: defineAsyncComponent(() => import('./AddShopModal.vue'))
    },
    data() {
      return {
      };
    },
    watch: {
        getOpenModalProducto(newVal,oldVal){
            if( newVal ){
                $('#showModal').modal({backdrop:'static', keyboard:false});
                $('#showModal').modal('show');
            }
        }
    },
    computed:{        
        ...mapGetters('home',['getOpenModalProducto', 'getProducto', 'getOptions'])
    },
    methods: {
        urlSite,
        formatDinero,
        nl2br,
        onHidden(){
          this.$store.commit('home/setOpenModalProducto', false);
          $('#showModal').modal('hide');
        },
        addCarrito(producto,valor){
          const value = {'producto': producto ,'valor': valor};
          this.$store.commit('home/setEditBool', false);
          this.$store.commit('home/setVVSelected', value);
          this.$store.commit('home/setOpenModalAddShop', true);
        },
        goCarrito(){
          $("#myToast").toast("hide");
          this.onHidden();
          this.$store.commit('home/setOpenModalShop', true);
        }
    }

  };
</script>

<style scoped lang="scss">
  .modal-content{
      background-color: var(--background);
  }
  h5.modal-title{
      color: var(--texto);
  }
  .modal-title button i{
      font-size: 3rem;
  }
  p.detalle{
      color: var(--texto);
      font-size: 0.9rem;
      text-align: justify;
  }
  dl {
    width: 100%;
    color: var(--texto);
    font-weight: bold;
  }
  dt {
    float: left; 
    width: 65%; 
    overflow: hidden; 
    white-space: nowrap;
  }
  dd { 
    float: left; 
    width: 35%; 
    overflow: hidden;
    text-align: right;
  }
  dt:after { 
    content: "................................................................." 
  }
</style>