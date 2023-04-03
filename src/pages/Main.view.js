import React, { useEffect, useState } from 'react'
import { GetItems } from '../api/GetItems.api'

export const Main = () => {
    
    const [AllItems, setAllItems] = useState([]);
    const [ValorTotal, setValorTotal] = useState({
        val_neto: 0,
        val_venta: 0,
        val_gang: 0,
        tt_stock: 0
    });

    const GetAllItems = async () => {
        const itemsList = await GetItems()
        await setAllItems(itemsList)
        // console.log(itemsList)
    }

    const FormatnumberPrice = (number) => {
        let numitm = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(number)
        return numitm
    }

    const CalculateTotals = async () => {
        let valNeto = 0
        let valVenta = 0
        let valGang = 0
        let stock = 0

        for (let itms = 0; itms < AllItems.length; itms++) {
            const itms_ = AllItems[itms];
            stock = stock + itms_.STOCK
            valNeto = valNeto + itms_.VALOR
            valVenta = valVenta + itms_.VALOR*1.5
            valGang = valGang + (itms_.VALOR*1.5)-itms_.VALOR
        }
        
        await setValorTotal({
            val_neto: valNeto,
            val_venta: valVenta,
            val_gang: valGang,
            tt_stock: stock
        })
    }

    useEffect(() => {
      GetAllItems()
    }, [])

    useEffect(() => {
        CalculateTotals()
    }, [AllItems])
    
    
    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col'>
                        <span className='lead'>Lista De Items</span>
                    </div>
                </div>
            </div>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col'>
                        <table class="table table-sm table-hover table-bordered table-dark">
                            <thead>
                                <tr>
                                <th scope="col">CODIGO</th>
                                <th scope="col">ITEM</th>
                                <th scope="col">STOCK</th>
                                <th scope="col">VALOR NETO</th>
                                <th scope="col">VALOR VENTA</th>
                                <th scope="col">VALOR GANANCIA</th>
                                <th scope="col">DESCRIPCION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    AllItems.map((itm)=>
                                        <tr>
                                            <td>{itm.CODIGO}</td>
                                            <td>{itm.ITEM}</td>
                                            <td>{itm.STOCK}</td>
                                            <td>{FormatnumberPrice(itm.VALOR)} c/u</td>
                                            <td>{FormatnumberPrice(itm.VALOR*1.5)} c/u</td>
                                            <td>{FormatnumberPrice((itm.VALOR*1.5)-itm.VALOR)} c/u</td>
                                            <td>{itm.DESCRIPCION}</td>
                                        </tr>
                                    )
                                }
                                <tr>
                                    <td></td>
                                    <td>TOTALES</td>
                                    <td>{ValorTotal.tt_stock}</td>
                                    <td>{FormatnumberPrice(ValorTotal.val_neto)}</td>
                                    <td>{FormatnumberPrice(ValorTotal.val_venta)}</td>
                                    <td>{FormatnumberPrice(ValorTotal.val_gang)}</td>
                                    <td></td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
