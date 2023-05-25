<template v-if="getOpenModalAddShop">

  <div class="modal fade" id="showModalAddShop" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content" v-if=" getVVSelected.producto ">
          
        <div class="modal-header">
          <h5 class="modal-title">{{ this.getVVSelected.producto.PRODUCTO_NOMBRE }}<br>{{ formatDinero(getVVSelected.valor.valor) }}</h5>
          <button type="button" class="btn-close" @click=" onHidden "></button>
        </div>

        <div class="modal-body">

          <div class="row">

            <div class="col-12" v-if=" !getOptions.cantidad ">
              <div class="form-group">
                  <label>SELECCIONAR CANTIDAD</label>
                  <select 
                    class="form-control form-control-lg"
                    v-model.trim=" optShop.cantidad "
                    @change="cmbCantidad">
                  
                    <option value="0"> 0</option>
                    <option v-for=" c in cantidad " :key=" c " :value=" c ">{{ c }}</option>
                  </select>
                  <small v-if=" error ">STOCK NO SUFICIENTE</small>
              </div>
            </div>
            <div class="col-12" v-if=" getOptions.cantidad ">
              <div class="form-floating mb-2">
                  <input
                      type="number" 
                      class="form-control" 
                      placeholder="INGRESAR CANTIDAD"
                      v-model.trim=" optShop.cantidad "
                      @input=" validateCantidad "
                      >
                  <label for="floatingInput">*INGRESAR CANTIDAD</label>
                  <small v-if=" error ">STOCK NO SUFICIENTE</small>
              </div>
            </div>
            <div class="col-12 mt-1">
              <div class="form-group">
                  <label>COMENTARIO</label>
                  <textarea 
                    class="form-control form-control-lg"
                    placeholder="INGRESAR COMENTARIO ..." 
                    v-model.trim =" optShop.comentario "
                    rows="3">
                  </textarea>
              </div>
            </div>
            <div class="col-12">              
              <button 
                type="button" 
                class="btn btn-primary text-white w-100 my-3" 
                @click="addShop"
                v-html=" btnShop.txt " 
                :disabled=" btnShop.disabled ">
              </button>
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
        cantidad: 20,
        optShop: {
          cantidad: 0,
          comentario: ''
        },
        addShopRes: [],
        btnShop: {
            txt: '',
            disabled: true
        },
        error: false,
      };
    },
    watch: {
        getOpenModalAddShop(newVal,oldVal){
            if( newVal ){
              this.resetValues();
              this.instanciar();
              $('#showModalAddShop').modal({backdrop:'static', keyboard:false});
              $('#showModalAddShop').modal('show');
            }
        },
        getIsClean(newVal,oldVal){
            if( newVal ){
              this.addShopRes = [];
            }
        },
    },
    computed:{        
        ...mapGetters('home',['getOpenModalAddShop', 'getVVSelected', 'getIsClean', 'getShop', 'getEditBool', 'getOptions'])
    },
    methods: {
        urlSite,
        formatDinero,
        nl2br,
        instanciar(){
          this.getShop.forEach(element => {
            if( element.PROVAR_ID == this.getVVSelected.valor.id ){              
              this.optShop.cantidad   = element.CANTIDAD;
              this.optShop.comentario = element.COMENTARIO;
              return;
            }
          });
          this.cmbCantidad();
          if( !this.getEditBool ){
            this.optShop.cantidad = this.getOptions.cantidad ? '' : 0;
          }
          console.log(this.getVVSelected);
        },
        resetValues(){
          this.optShop.cantidad   = 0;
          this.optShop.comentario = '';
          this.btnShop.disabled   = true;
        },
        onHidden(){
          $('#showModalAddShop').modal('hide');
          this.$store.commit('home/setOpenModalAddShop', false);
          if( this.getEditBool ){
            this.$store.commit('home/setOpenModalShop', true);
          }
        },
        validateCantidad(){
          if( !isNaN(this.optShop.cantidad) ){
            this.cmbCantidad();
          }else{
            this.btnShop.disabled = true;
          }
        },
        cmbCantidad(){
          if( Number(this.optShop.cantidad) > 0 ){
            const total = Number(this.optShop.cantidad) * Number(this.getVVSelected.valor.valor);
            this.btnShop.txt = `<i class="fa fa-shopping-cart"></i> ${ this.getEditBool ? 'EDITAR' : 'AGREGAR' } ${this.formatDinero(total)}`;
            if( this.getOptions.stock ){

              if( Number(this.optShop.cantidad) > Number(this.getVVSelected.producto.STOCK) ){
                this.error = true;
                this.btnShop.disabled = true;
              }else{
                this.error = false;
                this.btnShop.disabled = false;
              }

            }else{
              this.btnShop.disabled = false;
            }
          }else{
            this.error = false;
            this.btnShop.txt = `<i class="fa fa-shopping-cart"></i> ${ this.getEditBool ? 'EDITAR' : 'AGREGAR' }`;
            this.btnShop.disabled = true;
          }
        },
        processShop(){
          this.addShopRes.forEach((element,index) => {
            if( element.PROVAR_ID == this.getVVSelected.valor.id ){
              this.addShopRes.splice(index,1);
              return;
            }
          });
          
          this.addShopRes.push(
            {
              PRODUCTO_NOMBRE: this.getVVSelected.producto.PRODUCTO_NOMBRE,
              PRODUCTO_STOCK: this.getVVSelected.producto.STOCK,
              PROVAR_ID: this.getVVSelected.valor.id,
              PROVAR_NOMBRE: this.getVVSelected.valor.nombre,
              PROVAR_VALOR: this.getVVSelected.valor.valor,
              CANTIDAD: this.optShop.cantidad,
              COMENTARIO: this.optShop.comentario 
            }
          );
        },
        addShop(){
          if( this.getEditBool ){
            this.processShop();
            this.$store.commit('home/setAddShop', this.addShopRes);
            this.onHidden();
            this.$store.commit('home/setOpenModalShop', true);
          }else{
            this.processShop();
            this.toast();
            this.$store.commit('home/setAddShop', this.addShopRes);
            this.onHidden();
          }
        },
        toast(){
          $("#myToast").toast({ delay: 3000 });
          $("#myToast").toast("show");
        },
    }

  };
</script>

<style scoped lang="scss">
  #showModalAddShop{
    padding-top: 50%;
  }
  .modal-content{
    background-color: #eceded;
    -webkit-box-shadow: 5px 5px 49px 5px #000000; 
    box-shadow: 5px 5px 49px 5px #000000;
  }
  h5.modal-title{
      color: var(--texto);
      text-align: center;
  }
  .modal-title button i{
      font-size: 3rem;
  }
  small{
    color: red;
    font-size: 0.7rem;
    text-align: left;
  }
</style>