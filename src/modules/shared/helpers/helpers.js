
import CONSTANTS from "../constants/constants";

export function urlSite(arg) {
  return `${CONSTANTS.URLBACK}${arg}`;
}

export function formatDinero(value) {
  let val = (value / 1).toFixed(0).replace('.', ',')
  let numeroFormateado = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  return `$${ numeroFormateado }`
}

export function nl2br(str) {
  if( str ){
    return str.replace(/(?:\r\n|\r|\n)/g, '<br>');
  }
  return '';  
}

export function codePhone(str, isPhone) {
  if( isPhone ){
    return `+56${str}`;
  }
  return `56${str}`;  
}

export function isEmail(email) {

  let bool = false;
  const match = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if( email.match(match) ){
      bool = true;
  }
  
  return bool;
}


export function isCel(cel){

  let bool = false;
  const match = /^(\+?56)?(\s?)(0?9)(\s?)[98765432]\d{7}$/;

  if( cel.match(match) ){
      bool = true;
  }
  
  return bool;
}

