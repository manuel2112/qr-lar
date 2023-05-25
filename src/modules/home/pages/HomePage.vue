<template>
    <div class="container">
        
        <ValidatePage />

        <button 
            class="btn btn-danger text-white shop" 
            @click="openShop"
            v-if=" getIsShop ">
            <i class="fa fa-shopping-cart"></i>
        </button>
        <button 
            class="btn btn-primary rounded-circle top" 
            @click="goGrupo('#menu-principal')">
            <i class="fa-solid fa-angle-up text-white"></i>
        </button>
        
        <div v-if=" getValidate.menu && !getValidate.limite ">

            <div class="row" v-if=" getValidate.menu ">

                <HeaderPage />

                <div class="col">

                    <div class="scrolling-wrapper" id="menu-principal">
                        <span v-for=" m in getMenu " :key="m">
                            <a 
                                href="javascript:void(0)"
                                class="box-menu rounded-pill" 
                                v-if=" m.COUNT_PRODUCTOS > 0 "
                                @click=" goGrupo(`#menu-${m.GRUPO.id}`) ">
                                {{ m.GRUPO.grupo }}                                    
                            </a>
                        </span>
                    </div>

                    <SearchPage />

                    <div v-for=" m in getMenu " :key="m">

                        <div v-if=" m.COUNT_PRODUCTOS > 0 ">
                            
                            <div class="group-header-con-img" v-if="m.GRUPO.img">
                                <img :src="urlSite(m.GRUPO.img)" :alt="m.GRUPO.grupo" loading="lazy">
                                <div class="centered">
                                    <h4 :id="`menu-${m.GRUPO.id}`">{{ m.GRUPO.grupo }}</h4>
                                </div>
                            </div>
                            <div class="group-header-sin-img" v-else>
                                <div class="centered">
                                    <h4 :id="`menu-${m.GRUPO.id}`">{{ m.GRUPO.grupo }}</h4>
                                </div>
                            </div>

                            <div class="row g-0 producto" v-for=" p in m.PRODUCTOS " :key="p" @click="showModal(p)">
                                

                                <div class="col-4">
                                    <img :src="urlSite(p.IMAGENES[0].img)" class="img-thumbnail rounded" style="width: 100%" loading="lazy" v-if="p.IMAGENES[0]">
                                    <img src="@/assets/default.png" class="img-thumbnail rounded" style="width: 100%" loading="lazy" v-else>
                                </div>

                                <div class="col-8 pleft">

                                    <h5 class="margin-title">
                                        {{ p.PRODUCTO_NOMBRE }}
                                    </h5>

                                    <p v-html="nl2br(p.PRODUCTO_DET)" v-if="p.PRODUCTO_DET"></p>
                                    <p class="title" v-else>{{ p.PRODUCTO_NOMBRE }}</p>

                                    <div class="si-mas" v-if=" p.PRODUCTO_LINKED == 1 ">
                                        <h6 v-if=" p.PRODUCTO_LINKED == 1 ">
                                            {{ formatDinero(p.BASE.valor) }}
                                            <small v-if=" p.BASE.nombre ">/ {{ p.BASE.nombre }}</small>
                                        </h6>
                                        <p :class=" p.BASE.nombre ? 'mas01' : 'mas02' ">VER MÁS...</p>
                                    </div>
                                    <div class="no-mas" v-if=" p.PRODUCTO_LINKED == 0 ">
                                        <dl>
                                            <span v-for=" ( valor ) in p.VALORES " :key="valor.id">
                                                <dt>{{ valor.nombre ? `${valor.nombre}` : '.......' }}</dt>
                                                <dd>{{ formatDinero(valor.valor) }}</dd>
                                            </span>
                                        </dl>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <FooterPage />

            </div>
            
        </div>
    </div>
    <ShopResModal />
    <ProductoModal />
    <TipoPagoModal />
    <DatosPagoModal />
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapActions, mapGetters } from "vuex";
import { urlSite, formatDinero, nl2br } from "@/modules/shared/helpers/helpers"

export default {

    props:{
        slug: {
            type: String,
            required: true
        }
    },
    components: {
        HeaderPage: defineAsyncComponent(() => import('../components/HeaderPage.vue')),
        FooterPage: defineAsyncComponent(() => import('../components/FooterPage.vue')),
        ValidatePage: defineAsyncComponent(() => import('../components/ValidatePage.vue')),
        SearchPage: defineAsyncComponent(() => import('../components/SearchPage.vue')),
        ProductoModal: defineAsyncComponent(() => import('../modals/ProductoModal.vue')),
        ShopResModal: defineAsyncComponent(() => import('../modals/ShopResModal.vue')),
        TipoPagoModal: defineAsyncComponent(() => import('../modals/TipoPagoModal.vue')),
        DatosPagoModal: defineAsyncComponent(() => import('../modals/DatosPagoModal.vue'))
    },
    computed:{
        ...mapGetters('home',['getValidate','getMenu','getIsShop'])
    },
    created(){
        this.getMenuApi(this.slug);
    },
    methods: {
        urlSite,
        formatDinero,
        nl2br,
        ...mapActions('home',['getMenuApi', 'insertProductoViewApi']),
        showModal(obj){
            if( obj.PRODUCTO_LINKED == 1 ){
                this.insertProductoViewApi(obj.PRODUCTO_ID);
                this.$store.commit('home/setOpenModalProducto', true);
                this.$store.commit('home/setProducto', obj);
            }
        },
        goGrupo(id){
            $('html, body').animate({
                scrollTop: $(id).offset().top
            }, 0);
        },
        openShop(){
            this.$store.commit('home/setOpenModalShop', true);
        },
    }

}
</script>

<style scoped lang="scss">
    .pre-formatted {
    white-space: pre;
    }
    .group-header-con-img {
    position: relative;
    height: 200px;
    overflow: hidden;
    margin-bottom: 10px;
    }
    .group-header-sin-img {
    height: auto;
    margin-bottom: 10px;
    }
    .group-header-con-img img {
        width: 100%;
    }
    .group-header-con-img .centered{
        background-color: rgba(28, 28, 28, 0.5);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    }
    .group-header-sin-img .centered {
        background-color: rgba(28, 28, 28, 0.5);
        width: 100%;
        padding: 10px 0;
    }
    .group-header-con-img .centered h4,
    .group-header-sin-img .centered h4{
        color: var(--light);
        text-align: center; 
        font-size: 1.6rem;
        margin: 8px 0;
    }
    .producto{
        background-color: #f8f8f9;
        border-bottom: 1px solid #ececec;
        padding: 20px 0 10px;
    }
    .producto .pleft{
        padding-left: 10px;
    }
    .producto .margin-title{
        margin-bottom: 15px;
    }
    .producto h5{
        font-size: 1.0rem;
        font-weight: bold;
        text-align: left;
        margin: 0;
        padding: 0;
    }
    .producto p{
        color: #9c9a9f;
        font-size: 0.8rem;
        line-height: 0.9rem;
        margin: -5px 0 0 0;
        text-align: left;
    }
    .producto p.title{
        text-transform: lowercase !important;
    }
    .producto p.title:first-letter{
        text-transform: capitalize !important;
    }
    .producto .si-mas{
        margin-top: 15px;
    }
    .producto .si-mas h6{
        font-size: 1.1rem;
        font-style: oblique;
        font-weight: bold;
        text-align: left;
        padding: 0;
    }
    .producto .si-mas h6 small{
        font-size: 0.9rem;
        font-weight: normal;
    }
    .producto .si-mas p{
        font-size: 0.8rem;
        font-style: oblique;
        text-align: right;
    }
    .producto .si-mas p.mas01{
        margin: -5px 0 0 0 !important;
    }
    .producto .si-mas p.mas02{
        margin: -25px 0 0 0 !important;
    }
    .producto .no-mas{
        margin-top: 5px;
    }
    .producto .no-mas dl {
        width: 100%;
        color: var(--texto);
        float: right;
        font-weight: normal;
        font-size: 0.9rem;
        line-height: 0.9rem;
        margin: 10px 0 0;
    }
    .producto .no-mas dt {
        float: left; 
        font-weight: normal;
        overflow: hidden; 
        white-space: nowrap;
        width: 67%; 
    }
    .producto .no-mas dd {
        font-size: 1.0rem;
        font-weight: bold;
        float: left; 
        overflow: hidden;
        text-align: right;
        width: 33%;
    }
    .producto .no-mas dt:after { 
        content: ".................................................................................." 
    }

    .scrolling-wrapper {
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    margin: 15px 0;

        a.box-menu {
            display: inline-block;
            background-color: var(--dark);
            color: var(--light);
            padding: 5px 10px;
            margin: 0 2px 0;
            text-decoration: none;
        }
    }
    .top {
        width: auto;
        font-size: 1rem;
        color: #9c9a9f;
        cursor: pointer;
        position: fixed;
        bottom: 10px;
        right: 10px;
        z-index: 15;
    }
    .shop {
        width: auto;
        font-size: 1rem;
        color: #9c9a9f;
        cursor: pointer;
        position: fixed;
        top: 28%;
        right: 0;
        z-index: 15;
    }

    @media (min-width: 500px) {
            .top {
            right: 38%;
        }    
    }
</style>