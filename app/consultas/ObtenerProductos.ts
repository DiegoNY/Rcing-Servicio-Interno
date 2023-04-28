import { Request } from "mssql";
import { Item } from "../types/serviceDoc";
import { GenerarEstructuraProductos } from "../helpers/generarEstructuraProductos";

export const ObtnerProductos = (sql: Request, correlativo: string, tipo: string | undefined, serie: string): Promise<Item[]> => {
    console.log(correlativo, tipo, serie)
    // console.log(numero_documento);
    const ObtnerProductosQuery = ` 
    SELECT ID_TIPO_DOC,SERIE_DOC,NRO_DOC,ID_ARTICULO,DES_ARTICULO + ' ' + DES_LARGA_ARTICULO as DES_ARTICULO  , CANTIDAD ,PRECIO as PSinIgv, TOTAL / CANTIDAD AS PIgv ,SUBTOTAL_CON_DSCTO
    ,IMPUESTO,TOTAL,DESCUENTO
    FROM DOCUMENTO_CC_DETALLE 
    WHERE CIA = '01' AND SERIE_DOC ='${serie}' AND NRO_DOC='${correlativo}' AND ID_TIPO_DOC='${tipo}'
   `;

    console.log(ObtnerProductosQuery);
    return new Promise((resolve, reject) => {

        sql.query(ObtnerProductosQuery, (err: any, result: any) => {
            if (err) {
                console.error('Error al ejecutar la consulta productos: ', err);
                reject(err);
            }

            const productosDB = result?.recordset;
            const productos = GenerarEstructuraProductos(productosDB)
            resolve(productos);
        });

    })

}