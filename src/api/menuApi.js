
import axios from "axios";

const connect = {};
if (location.hostname === "localhost" || location.hostname === "127.0.0.1"){
    connect.api = "http://127.0.0.1:8000/api/"
    // connect.api = "https://facilbak.cl/admin/api/"
}else{
    connect.api = "https://facilbak.cl/admin/api/"
} 

const menuApi = axios.create({
    baseURL: connect.api
})

export default menuApi