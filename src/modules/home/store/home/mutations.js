
// export const myMutations = ( state ) => {
    
// }

export const setMenu = ( state, data ) => {

    if( !data.ERROR){
        document.title      = data.INFO.EMPRESA.empresa;
        state.empresa       = data.INFO.EMPRESA;
        state.usuario       = data.INFO.USUARIO;
        state.menu          = data.INFO.MENU;
        state.tipoPago      = data.INFO.TIPO_PAGO;
        state.tipoEntrega   = data.INFO.TIPO_ENTREGA;
        state.validate.menu = true;
        
        //OBJ LOGO
        state.logo.img      = state.empresa.logotipo;
        state.logo.nombre   = state.empresa.empresa;
    }else{
        state.validate.existe  = data.INFO.EXISTE;
        state.validate.limite  = data.INFO.LIMITE;
    }
    
}
export const setRedes = ( state ) => {
    state.dataRedes.fono         = state.empresa.fono;
    state.dataRedes.whatsapp     = state.empresa.whatsapp;
    state.dataRedes.email        = state.usuario.email;
    state.dataRedes.web          = state.empresa.web;
    state.dataRedes.facebook     = state.empresa.facebook;
    state.dataRedes.instagram    = state.empresa.instagram;    
}
export const setOptions = ( state, data ) => {
    state.options.cantidad  = data.cantidad == 1 ? true : false;
    state.options.pago      = data.pago == 1 ? true : false;
    state.options.pedido    = data.pedido == 1 ? true : false;
    state.options.stock     = data.stock == 1 ? true : false;
}
export const setProducto = ( state, value ) => {
    state.producto = value;
}
export const setOpenModalEmpresa = ( state, value ) => {
    state.openModalEmpresa = value;
}
export const setOpenModalProducto = ( state, value ) => {
    state.openModalProducto = value;
}
export const setOpenModalAddShop = ( state, value ) => {
    state.openModalAddShop = value;
    if( !value ){
        state.vvSelected = {};
    }
}
export const setOpenModalShop = ( state, value ) => {
    state.openModalShop = value;
}
export const setOpenModalTipoPago = ( state, value ) => {
    state.openModalTipoPago = value;
}
export const setOpenModalDatosPago = ( state, value ) => {
    state.openModalDatosPago = value;
}
export const setVVSelected = ( state, value ) => {
    state.vvSelected = value;
}
export const setIsTipoData = ( state, value ) => {
    state.isTipoData = value;
}
export const setAddShop = ( state, value ) => {
    state.shop      = value;
    state.isShop    = true;
    state.isClean   = false;
}
export const setCleanShop = ( state ) => {
    state.shop      = [];
    state.isShop    = false;
    state.isClean   = true;
}
export const setTipoDetalle = ( state, value ) => {
    state.tipoDetalle.entrega  		= value.entrega;
    state.tipoDetalle.pago     		= value.pago;
    state.tipoDetalle.idEmpresa     = state.usuario.id;
}
export const setTotal = ( state, value ) => {
    state.tipoDetalle.total  = value;
}
export const setEditBool = ( state, value ) => {
    state.editBool  = value;
}
export const setResetPedido = ( state ) => {
    state.tipoDetalle           = {};
    state.shop                  = [];
    state.openModalDatosPago    = false;
    state.isShop                = false;
    state.isTipoData            = false;
    state.isClean               = true;
    $('#showModalDatosPago').modal('hide');
}