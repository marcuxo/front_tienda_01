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
    const [ValCalculate, setValCalculate] = useState({
        valor_prodct: 0,
        precio_bordado:0,
        precio_prodBord: 0,
        precio_ganab: 0,
        precio_total: 0
    })
    const [SelectData, setSelectData] = useState({
        producto: '',
        bordado: '',
    })
    
    const FormatnumberPrice = (number) => {
        let numitm = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(number)
        return numitm
    }

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

    const CalculatePrices = async () => {
        if(SelectData.producto !== ''){
            let producto_ = AllItems.find(itm=>itm.ITEM === SelectData.producto)
            // console.log(producto_.VALOR)
            setValCalculate({...ValCalculate,['valor_prodct']:producto_.VALOR})
        }
        if(SelectData.bordado !== ''){
            let producto_ = AllBordados.find(itm=>itm.ITEM === SelectData.bordado)
            // console.log(producto_.CANT_PUNTADAS*ValPuntada[0].VALOR)
            setValCalculate({...ValCalculate,['precio_bordado']:producto_.CANT_PUNTADAS*ValPuntada[0].VALOR})
        }
        
    }

    useEffect(() => {
        GetAllItems()
        GetValorPuntadaF()
        GetAllBordados()
    }, [])

    useEffect(() => {
      CalculatePrices()
    }, [SelectData])

    useEffect(() => {
        if(ValCalculate.precio_bordado !==0 && ValCalculate.valor_prodct !== 0){
            setValCalculate({...ValCalculate, ['precio_prodBord']:ValCalculate.precio_bordado + ValCalculate.valor_prodct})
        }
    }, [ValCalculate.precio_bordado,ValCalculate.valor_prodct])

    useEffect(() => {
        let porGang = 2
        if(ValCalculate.precio_prodBord !==0){
            setValCalculate({
                ...ValCalculate,
                ['precio_ganab']:ValCalculate.precio_bordado * porGang,
                ['precio_total']:ValCalculate.precio_prodBord + (ValCalculate.precio_bordado * porGang),
            })
        }
    }, [ValCalculate.precio_prodBord])
    
    
    
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
                    <div className='col-12'>
                        <span><b>Producto:</b> {SelectData.producto}</span><br/>
                        <span><b>Bordado:</b> {SelectData.bordado}</span><br/>
                        <span><b>Valor Producto:</b> {FormatnumberPrice(ValCalculate.valor_prodct)}</span><br/>
                        <span><b>Valor Bordado:</b> {FormatnumberPrice(ValCalculate.precio_bordado)}</span><br/>
                        <span><b>Valor Producto Bordado:</b> {FormatnumberPrice(ValCalculate.precio_prodBord)}</span><br/>
                        <span><b>Valor Ganancia(1.8%):</b> {FormatnumberPrice(ValCalculate.precio_ganab)}</span><br/>
                        <span><b>Valor Final:</b> {FormatnumberPrice(ValCalculate.precio_total)}</span><br/>
                    </div>
                    <div className='col'>
                        <button className='btn btn-success' onClick={()=>console.log(SelectData, ValCalculate)}>calcular</button>
                    </div>
                </div>
            </div>
        </>
    )
}
