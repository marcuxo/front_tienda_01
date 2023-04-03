import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { GetValPuntada } from '../api/GetIValPuntada.api';
import { GetItems } from '../api/GetItems.api';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { getBordado } from '../api/GetBordado.api';

export const Cotizador = () => {

    const [ValPuntada, setValPuntada] = useState(0);
    const [AllItems, setAllItems] = useState([]);
    const [AllBordados, setAllBordados] = useState([]);
    const [SelectData, setSelectData] = useState({
        producto: '',
        bordado: ''
    })

    const GetValorPuntadaF = async () => {
        let valor = await GetValPuntada()
        // console.log(valor[0].VALOR)
        setValPuntada(valor)
    }

    const GetAllItems = async () => {
        const itemsList = await GetItems()
        await setAllItems(itemsList)
        // console.log(itemsList)
    }

    const GetAllBordados = async () => {
        const itemsList = await getBordado()
        await setAllBordados(itemsList)
        // console.log(itemsList)
    }

    useEffect(() => {
        GetAllItems()
        GetValorPuntadaF()
        GetAllBordados()
    }, [])
    
    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col'>
                        <span className='lead'>Gestion Compra</span>
                    </div>
                </div>
            </div>

            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-12 pb-2'>
                        <span>Valor Puntada: $ {ValPuntada!==0?ValPuntada[0].VALOR:0} <small>pesos</small></span>
                    </div>
                    <div className='col'>
                        <FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel>Producto</InputLabel>
                            <Select
                                name='producto'
                                value={SelectData['producto']}
                                // onChange={(e)=>console.log(e.target.value)}
                                onChange={(e)=>setSelectData({...SelectData,[e.target.name]:e.target.value})}
                                label="Producto"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {
                                    AllItems.map(itm=>
                                        <MenuItem value={itm.ITEM}>{itm.ITEM}</MenuItem>                                        
                                    )
                                }
                            </Select>
                        </FormControl>
                    </div>
                    <div className='col'>
                        <FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel>Bordado</InputLabel>
                            <Select
                                name='bordado'
                                value={SelectData['bordado']}
                                // onChange={(e)=>console.log(e.target.value)}
                                onChange={(e)=>setSelectData({...SelectData,[e.target.name]:e.target.value})}
                                label="Bordado"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {
                                    AllBordados.map(itm=>
                                        <MenuItem value={itm.ITEM}>{itm.ITEM}</MenuItem>                                        
                                    )
                                }
                            </Select>
                        </FormControl>
                    </div>
                    <div className='col'>
                        <button className='btn btn-success' onClick={()=>console.log(SelectData)}>calcular</button>
                    </div>
                </div>
            </div>
        </>
    )
}
