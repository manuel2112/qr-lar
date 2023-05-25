<template>
    <div class="row mb-3">
        <div class="col-12">
            <vue-bootstrap-typeahead 
                @hit="onProductoSeleccionado" 
                v-model="busqueda" 
                :data="productos"
                :serializer="serializarValor" 
                ref="productoAutocomplete"
                placeholder="Buscar Producto" />
        </div>
    </div>
    <ProductoModal />
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapActions, mapGetters } from "vuex";
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
import { formatDinero } from "@/modules/shared/helpers/helpers"

export default {

    //https://parzibyte.me/blog/2020/06/18/autocompletado-bootstrap-vue-api/

    props:{
    },    
    components: {
        VueBootstrapTypeahead,
        ProductoModal: defineAsyncComponent(() => import('../modals/ProductoModal.vue'))
    },
    computed:{
        ...mapGetters('home',['getMenu'])
    },
    data(){
        return{
            busqueda: '',
            productos: [],
        }
    },
    created(){
        this.instanciar();
    },
    methods: {
        ...mapActions('home',['insertProductoViewApi']),
        formatDinero,
        instanciar(){            
            this.getMenu.map(x => 
                {
                    if( x.PRODUCTOS ){
                        x.PRODUCTOS.map(
                                y => {
                                    this.productos.push(y);
                                } 
                            )
                    }
                }
            );
        },
        onProductoSeleccionado(value) {
            this.insertProductoViewApi(value.PRODUCTO_ID);
			this.showModal(value);
		},
		serializarValor(articulo) {
            const unidad  = articulo.unidad;
            const nombre  = articulo.VALORES[0].nombre ?  `/ ${articulo.VALORES[0].nombre}` : '';
            const valor   = formatDinero(articulo.VALORES[0].valor);
            const detalle = articulo.unidad ? `${valor} / ${unidad}` : `${valor} ${nombre}`;
			return `${articulo.PRODUCTO_NOMBRE} - ${detalle}`;
		},
        showModal(obj){
            this.$store.commit('home/setOpenModalProducto', true);
            this.$store.commit('home/setProducto', obj);
            this.$refs.productoAutocomplete.inputValue = '';
        },
    }

}
</script>

<style scoped>
</style>