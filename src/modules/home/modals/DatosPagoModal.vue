<template v-if="getOpenModalDatosPago">

  <div class="modal fade" id="showModalDatosPago" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
          
        <div class="modal-header">
          <h5 class="modal-title">DATOS DE COMPRA</h5>
          <button type="button" class="btn-close" @click=" onHidden "></button>
        </div>

        <div class="modal-body">

            <div class="row">

                <div class="col-12 mb-5">
                    <h6>TUS DATOS</h6>

                    <div class="form-floating mb-2">
                        <input 
                            type="text" 
                            class="form-control" 
                            placeholder="NOMBRE"
                            v-model.trim="datos.nombre"
                            @input="validateNombre">
                        <label for="floatingInput">*NOMBRE</label>
                    </div>
                    <div class="form-floating mb-2">
                        <input 
                            type="number" 
                            class="form-control" 
                            placeholder="CELULAR"
                            v-model.trim="datos.celular"
                            @input="validateCel">
                        <label for="floatingInput">*CELULAR <small class="text-danger" v-if="error.celular">NO VÁLIDO</small></label>
                    </div>
                    <div class="form-floating mb-2">
                        <input 
                            type="email" 
                            class="form-control" 
                            placeholder="EMAIL"
                            v-model.trim="datos.email"
                            @input="validateEmail">
                        <label for="floatingInput">*EMAIL <small class="text-danger" v-if="error.email">NO VÁLIDO</small></label>
                    </div>
                    <div class="form-floating mb-2" v-if=" isDireccion ">
                        <input
                            type="text" 
                            class="form-control" 
                            placeholder="DIRECCIÓN"
                            v-model.trim="datos.direccion"
                            @input=" validateDireccion "
                            >
                        <label for="floatingInput">*DIRECCIÓN</label>
                    </div>
                    <div class="form-floating mb-2">
                        <textarea 
                            class="form-control" 
                            placeholder="COMENTARIO"
                            v-model.trim="datos.comentario">
                        </textarea>
                        <label for="floatingTextarea">COMENTARIO</label>
                    </div>
                </div>

                <div class="col-12">
                    <div class="btn-group w-100">
                        <button 
                            type="button" 
                            class="btn btn-primary text-white"
                            @click="back">
                            <i class="fa fa-arrow-left"></i> VOLVER
                        </button>
                        <button 
                            type="button" 
                            class="btn btn-primary text-white"
                            @click="finalizar"
                            v-html=" btnEnd.txt "
                            :disabled=" btnEnd.disabled ">
                        </button>
                    </div>
                </div>

            </div>

        </div><!-- FIN MODAL BODY -->

      </div>
    </div>
  </div>
  
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  import { urlSite, formatDinero, nl2br, isCel, isEmail } from "@/modules/shared/helpers/helpers"

  export default {
    
    data() {
      return {
        datos: {},
        validate: {},
        error: {},
        btnEnd: {
            txt: 'FINALIZAR',
            disabled: true
        },
        dataApi: {},
        isDireccion: false
      };
    },
    watch: {
        getOpenModalDatosPago(newVal,oldVal){
            if( newVal ){
                $('#showModalDatosPago').modal({backdrop:'static', keyboard:false});
                $('#showModalDatosPago').modal('show');

                if( this.getTipoDetalle.entrega.id == 1 ){
                    this.isDireccion = true;
                    if( this.datos.direccion ){
                        this.validateDireccion();
                    }else{
                        this.validate.direccion = false;                        
                        this.validateDatos();
                    }
                    
                }else{
                    this.validate.direccion = true;
                    this.isDireccion = false;
                    this.validateDatos();
                }
                
            }
        }
    },
    computed:{
        ...mapGetters('home',['getOpenModalDatosPago','getTipoDetalle','getShop']),
    },
    methods: {
        urlSite,
        formatDinero,
        nl2br,
        isCel,
        isEmail,
        ...mapActions('home',['insertPedidoApi']),
        onHidden(){
            $('#showModalDatosPago').modal('hide');
            this.$store.commit('home/setOpenModalDatosPago', false);
        },
        back(){
            this.onHidden();
            this.$store.commit('home/setOpenModalTipoPago', true);
        },
        validateDatos(){
            if( this.validate.nombre && 
                this.validate.celular &&
                this.validate.email &&
                this.validate.direccion ){
                    this.btnEnd.disabled = false;
            }else{
                this.btnEnd.disabled = true;
            }
        },
        validateNombre(){
            this.datos.nombre = this.datos.nombre.toUpperCase();
            if( this.datos.nombre ){
                this.validate.nombre = true;
            }else{
                this.validate.nombre = false;
            }
            this.validateDatos();
        },
        validateCel(){
            if( this.datos.celular ){
                if( this.isCel(this.datos.celular) ){
                    this.error.celular = false;
                    this.validate.celular = true;
                }else{
                    this.error.celular = true;
                    this.validate.celular = false;
                }
            }else{
                this.validate.celular = false;
            }
            this.validateDatos();
        },
        validateEmail(){
            if( this.datos.email ){
                if( this.isEmail(this.datos.email) ){
                    this.error.email = false;
                    this.validate.email = true;
                }else{
                    this.error.email = true;
                    this.validate.email = false;
                }
            }else{
                this.validate.email = false;
            }
            this.validateDatos();
        },
        validateDireccion(){
            this.datos.direccion = this.datos.direccion.toUpperCase();
            if( this.datos.direccion ){
                this.validate.direccion = true;
            }else{
                this.validate.direccion = false;
            }
            this.validateDatos();
        },
        finalizar(){
            this.dataApi.persona = this.datos;
            this.dataApi.shop    = this.getShop;
            this.dataApi.detalle = this.getTipoDetalle;
            this.insertPedidoApi(this.dataApi);
        }
    }

  };
</script>

<style scoped lang="scss">
    #showModalShop{
    padding-top: 0%;
    }
    .modal-content{
    background-color: #eceded;
    -webkit-box-shadow: 5px 5px 49px 5px #000000; 
    box-shadow: 5px 5px 49px 5px #000000;
    }
    h5.modal-title{
        color: var(--texto);
    }
    .modal-title button i{
        font-size: 3rem;
    }
</style>