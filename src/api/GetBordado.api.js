import React from 'react'
import { URL_SRV_SHOP } from '../url/Directions.url';

export const getBordado = () => {
    return new Promise(async (resolve, reject) => {
        let query = await fetch(URL_SRV_SHOP+'getbordados',{
          method: 'POST',
          headers: {
            'authorization': "paico2021",
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        let responsito = await query.json();
        // console.log(responsito)
        if(responsito.success){
          resolve(responsito.data)
        }else{
          resolve(responsito.data)
        }
      })
}
