
import menuApi from "@/api/menuApi";
import Swal from 'sweetalert2';

export const getMenuApi = async ({ commit }, data) => {

    const start = Date.now();

    const resp = await menuApi.post('empresa',{
                    slug: data
                });

    commit('setMenu',resp.data);

    if(!resp.data.ERROR){
        //INSTANCIAR REDES Y OPCIONES
        commit('setOptions', resp.data.INFO.OPTIONS);
        commit('setRedes');

        //INSERT VISTA    
        let timeLoad = Date.now() - start;
        timeLoad /= 1000;
        timeLoad = timeLoad.toFixed(2);
        
        await fetch('https://ipapi.co/json/').then(function(response) { return response.json(); })
        .then(function(data) {
            menuApi.post('vista',{
                idEmpresa: resp.data.INFO.EMPRESA.user_id,
                timeLoad,
                data
            });
        });
    }

}

export const insertPedidoApi = async ({ commit }, value) => {

    new Swal({
        title: "Espere por favor",
        allowOutsideClick: false
    });
    Swal.showLoading();

    try {
        const resp = await menuApi.post('pedido',{ value });
        
        if( !resp.data.ERROR ){
            commit('setResetPedido');
            Swal.fire('Enviado', 'Tu pedido ha sido realizado con éxito. Pronto te contactaremos', 'success');
        }else{
            Swal.fire('Error', 'Se ha producido un error, favor volver a intentar', 'error');
        }

    }catch (error) {
        Swal.fire('Error', 'Se ha producido un error, favor volver a intentar', 'error');
    }

}

export const insertProductoViewApi = async ({ commit }, idProducto ) => {

    try {
            await menuApi.post('vista-producto',{ idProducto });
    }catch (error) {
        console.log(error);
    }

}