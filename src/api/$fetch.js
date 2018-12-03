import fetch from '@/config/fetch';

export const $fetch = obj => {
  if(!obj){obj={}}
  fetch(obj.url)
};
