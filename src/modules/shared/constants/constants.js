let connect = '';
if (location.hostname === "localhost" || location.hostname === "127.0.0.1"){
    connect = "http://127.0.0.1:8000/"
}else{
    connect = "https://www.facilbak.cl/admin/"
} 

const URLBACK = connect;
    
export default {
    URLBACK
}