<template v-if="getOpenModalTipoPago">

  <div class="modal fade" id="showModalTipoPago" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
          
        <div class="modal-header">
          <h5 class="modal-title">DATOS DE COMPRA</h5>
          <button type="button" class="btn-close" @click=" onHidden "></button>
        </div>

        <div class="modal-body">

            <div class="row">

                <div class="col-12 mb-4">
                    <h6>SELECCIONA TIPO DE ENTREGA</h6>
                    <div class="btn-group w-100">
                        <button 
                            v-for=" (tipo,index) in getTipoEntrega " :key="tipo.id"
                            type="button" 
                            class="btn"
                            :class= " classEntrega(++index) "
                            @click="tipoEntrega(tipo, index)">
                            {{ tipo.entrega }}
                        </button>
                    </div>
                    <p class="mt-2 fw-bold" v-if=" infoTipo.entrega ">{{ infoTipo.entrega }}</p>
                </div>
                
                <div class="col-12 mb-4" v-if="idTipoEntrega">
                    <h6>SELECCIONA FORMA DE PAGO</h6>

                    <div class="btn-group-vertical w-100">
                        <button 
                            v-for=" (tipo,index) in getTipoPago " :key="tipo.TIPO_PAGO_ID"
                            type="button" 
                            class="btn"
                            :class= " classPago(++index) "
                            @click=" tipoPago(tipo, index) ">
                            {{ tipo.pago }}
                        </button>
                    </div>
                    <p class="mt-2 fw-bold" v-if=" infoTipo.pago ">{{ infoTipo.pago }}</p>
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
                            @click="goDatos"
                            v-html=" btnNext.txt "
                            :disabled=" btnNext.disabled ">
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
  import { mapGetters } from "vuex";
  import { urlSite, formatDinero, nl2br } from "@/modules/shared/helpers/helpers"

  export default {
    
    data() {
      return {
        idTipoEntrega: '',
        idTipoPago: '',
        infoTipo: {},
        tipoEntregaMdl: {},
        tipoPagoMdl: {},
        classBtnEntrega01: 'btn-outline-info',
        classBtnEntrega02: 'btn-outline-info',
        classBtnEntrega03: 'btn-outline-info',
        classBtnPago01: 'btn-outline-info',
        classBtnPago02: 'btn-outline-info',
        classBtnPago03: 'btn-outline-info',
        btnNext: {
            txt: 'SIGUIENTE <i class="fa fa-arrow-right"></i>',
            disabled: true
        },
      };
    },
    watch: {
        getOpenModalTipoPago(newVal,oldVal){
            if( newVal ){
                $('#showModalTipoPago').modal({backdrop:'static', keyboard:false});
                $('#showModalTipoPago').modal('show');
                this.resetData(this.getIsTipoData);
            }
            else{
                $('#showModalTipoPago').modal('hide');
            }
        }
    },
    computed:{
        ...mapGetters('home',['getOpenModalTipoPago', 'getTipoEntrega', 'getTipoPago', 'getIsTipoData']),
    },
    methods: {
        urlSite,
        formatDinero,
        nl2br,
        resetData(value){
            if( !value ){
                this.idTipoEntrega      = '';
                this.idTipoPago         = '';
                this.infoTipo           = {};
                this.tipoEntregaMdl     = {};
                this.tipoPagoMdl        = {};
                this.classBtnEntrega01  = 'btn-outline-info';
                this.classBtnEntrega02  = 'btn-outline-info';
                this.classBtnEntrega03  = 'btn-outline-info';
                this.classBtnPago01     = 'btn-outline-info';
                this.classBtnPago02     = 'btn-outline-info';
                this.classBtnPago03     = 'btn-outline-info';
                this.btnNext.disabled   = true;
            }            
        },
        onHidden(){
            this.infoTipo = {};
            $('#showModalTipoPago').modal('hide');
            this.$store.commit('home/setOpenModalTipoPago', false);
        },
        back(){
            this.onHidden();
            this.$store.commit('home/setOpenModalShop', true);
        },
        classEntrega(value){
            switch(value) {
                case 1:
                    return this.classBtnEntrega01;
                case 2:
                    return this.classBtnEntrega02;
                case 3:
                    return this.classBtnEntrega03;
            }
        },
        tipoEntrega( value, i ){
            this.tipoEntregaMdl     = value;
            this.idTipoEntrega      = value.id;
            this.infoTipo.entrega   = value.detalle;
            this.$store.commit('home/setIsTipoData', true);
            this.focusTipoEntrega(i);
        },
        focusTipoEntrega(value){

            this.classBtnEntrega01 = 'btn-outline-info';
            this.classBtnEntrega02 = 'btn-outline-info';
            this.classBtnEntrega03 = 'btn-outline-info';

            switch(value) {
                case 1:
                    this.classBtnEntrega01 = 'btn-info text-white';
                    break;
                case 2:
                    this.classBtnEntrega02 = 'btn-info text-white';
                    break;
                case 3:
                    this.classBtnEntrega03 = 'btn-info text-white';
                    break;
            }
        },
        classPago(value){
            switch(value) {
                case 1:
                    return this.classBtnPago01;
                case 2:
                    return this.classBtnPago02;
                case 3:
                    return this.classBtnPago03;
            }
        },
        tipoPago( value, i ){
            this.tipoPagoMdl     = value;
            this.idTipoPago      = value.TIPO_PAGO_ID;
            this.infoTipo.pago   = value.TIPO_PAGO_EMPRESA_DETALLE;
            this.focusTipoPago(i);
        },
        focusTipoPago(value){

            this.classBtnPago01 = 'btn-outline-info';
            this.classBtnPago02 = 'btn-outline-info';
            this.classBtnPago03 = 'btn-outline-info';

            switch(value) {
                case 1:
                    this.classBtnPago01 = 'btn-info text-white';
                    break;
                case 2:
                    this.classBtnPago02 = 'btn-info text-white';
                    break;
                case 3:
                    this.classBtnPago03 = 'btn-info text-white';
                    break;
            }

            this.btnNext.disabled = false;
        },
        goDatos(){
            const value = { 'entrega': this.tipoEntregaMdl ,'pago': this.tipoPagoMdl };
            this.$store.commit('home/setTipoDetalle', value);
            this.$store.commit('home/setOpenModalTipoPago', false);
            this.$store.commit('home/setOpenModalDatosPago', true);
        },
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