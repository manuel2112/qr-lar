<template v-if="getOpenModalShop">

    <div class="modal fade" id="showModalShop" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                
                <div class="modal-header">
                <h5 class="modal-title"> {{ getOptions.pedido ? 'RESÚMEN PEDIDO' : 'CARRITO DE COMPRA' }}</h5>
                <button type="button" class="btn-close" @click=" onHidden "></button>
                </div>

                <div class="modal-body">

                    <div class="row">

                        <div class="col-12">

                            <table class="table table-bordered" v-for=" s in getShop " :key="s.PRODUCTO_ID">
                                <tbody>
                                    <tr>
                                        <td colspan="4" class="bg-dark text-white">{{ s.PRODUCTO_NOMBRE }} - {{ s.PROVAR_NOMBRE}}</td>
                                    </tr>
                                    <tr v-if=" s.COMENTARIO ">
                                        <td colspan="4">{{ s.COMENTARIO }}</td>
                                    </tr>
                                    <tr>
                                        <td>{{ formatDinero(s.PROVAR_VALOR) }}</td>
                                        <td>{{ s.CANTIDAD }}</td>
                                        <td>{{ formatDinero(s.PROVAR_VALOR * s.CANTIDAD) }}</td>
                                        <td>
                                            <div class="btn-group">
                                                <button 
                                                    type="button" 
                                                    class="btn btn-sm btn-primary text-white"
                                                    @click="editShopArticulo(s)">
                                                    <i class="fa fa-file-edit"></i>
                                                </button>
                                                <button 
                                                    type="button" 
                                                    class="btn btn-sm btn-danger"
                                                    @click="deleteShopArticulo(s)">
                                                    <i class="fa fa-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table> 
                            
                            <table class="table table-bordered mt-3">
                                <tbody>
                                    <tr>
                                        <td>TOTAL</td>
                                        <td class="bg-dark text-white">{{ formatDinero(total) }}</td>
                                    </tr>
                                </tbody>
                            </table> 

                        </div>

                        <div class="col-12">
                            <div class="btn-group w-100">
                                <button 
                                    type="button" 
                                    class="btn btn-danger"
                                    @click="cleanShop">
                                    <i class="fa fa-trash"></i> LIMPIAR
                                </button>
                                <button 
                                    type="button" 
                                    class="btn btn-primary text-white"
                                    @click="goTipoPago"
                                    v-if=" !getOptions.pedido ">
                                    <i class="fa fa-shopping-cart"></i> PEDIR
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
            cantidad: 10,
            optShop: {
            cantidad: 0,
            comentario: ''
            },
            addShopRes: [],
            btnShop: {
                txt: '<i class="fa fa-shopping-cart"></i> AGREGAR',
                disabled: true
            },
        };
        },
        watch: {
            getOpenModalShop(newVal,oldVal){
                if( newVal ){
                    $('#showModalShop').modal({backdrop:'static', keyboard:false});
                    $('#showModalShop').modal('show');
                }else{
                    $('#showModalShop').modal('hide');
                }
            }
        },
        computed:{
            ...mapGetters('home',['getOpenModalShop', 'getShop', 'getOptions']),
            total(){
                let suma = 0;
                this.getShop.forEach(element => {
                    suma = (element.PROVAR_VALOR * element.CANTIDAD) + suma ;
                });
                return suma;
            }
        },
        methods: {
            urlSite,
            formatDinero,
            nl2br,
            onHidden(){
                $('#showModalShop').modal('hide');
                this.$store.commit('home/setOpenModalShop', false);
            },
            cleanShop(){
                this.onHidden();
                this.$store.commit('home/setCleanShop');
            },
            editShopArticulo(v){
                const producto = { 'CANTIDAD': v.CANTIDAD, 'STOCK': v.PRODUCTO_STOCK, 'COMENTARIO': v.COMENTARIO, 'PRODUCTO_NOMBRE': v.PRODUCTO_NOMBRE, 'PROVAR_ID': v.PROVAR_ID };
                const valor = { 'id': v.PROVAR_ID, 'nombre': v.PROVAR_NOMBRE, 'valor': v.PROVAR_VALOR };
                const value = { 'producto': producto ,'valor': valor };
                this.$store.commit('home/setOpenModalShop', false);
                this.$store.commit('home/setEditBool', true);
                this.$store.commit('home/setVVSelected', value);
                this.$store.commit('home/setOpenModalAddShop', true);
            },
            deleteShopArticulo(value){
                const idArticulo = value.PROVAR_ID;

                this.getShop.forEach((element,index) => {
                    if( element.PROVAR_ID == idArticulo ){
                        this.getShop.splice(index,1);
                        return;
                    }
                });

                if( this.getShop.length == 0 ){
                    this.cleanShop();
                }
            },
            goTipoPago(){
                this.$store.commit('home/setTotal', this.total);
                this.$store.commit('home/setOpenModalShop', false);
                this.$store.commit('home/setOpenModalTipoPago', true);
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