import { Request } from "mssql";
import { Documento, DocumentoDB } from "../types/serviceDoc";
import { GenerarEstructuraDocumentos } from "../helpers/generarEstructuraDocumento";

export const ObtnerDocumentos = (sql: Request): Promise<Documento[]> => {

    const ObtnerDocumentosQuery = `
    SELECT TOP 2 C.NIT,C.DESCRIPCION as Empresa,C.DIRECCION,C.E_MAIL,C.FONO1, A.NRO_DOC, A.DESCRIPCION AS NCliente, A.DIRECCION AS DCliente , D.UC , D.SERIE_DOC
    ,D.NRO_DOC as Correlativo ,D.ID_TIPO_DOC
    , CASE D.ID_TIPO_DOC WHEN '01' THEN 'FACTURA' WHEN '02' THEN 'BOLETA' WHEN '03' THEN 'NOTA DE CREDITO' WHEN '04' THEN 'NOTA DE DEBITO' END AS TipoDoc
    , D.SUBTOTAL_CON_DSCTO,D.DESCUENTO,D.IMPUESTO,D.TOTAL,D.TIPO_CAMBIO, UPPER(M.CODIGO_SUNAT) AS Moneda , UPPER(M.DESCRIPCION) AS MonedaDes ,CP.DESCRIPCION as FORMA_PAGO, D.FECHA_DOCUMENTO,D.FECHA_VENCIMIENTO
    , D.ID_TIPO_DOC_REF,D.SERIE_DOC_REF, D.NRO_DOC_REF, D.ID_MOTIVO, MN.DESCRIPCION,D.OBSERVACION 
    FROM DOCUMENTO_CC D
    INNER JOIN COMPANIA C ON D.CIA = C.CIA
    INNER JOIN CONDICION_PAGO CP ON D.ID_CONDICION_PAGO = CP.ID_CONDICION_PAGO AND D.CIA = CP.CIA
    INNER JOIN MONEDA M ON M.ID_MONEDA = D.ID_MONEDA AND D.CIA = M.CIA
    INNER JOIN ANALITICA A ON LTRIM(D.ID_CLIENTE) = A.NRO_DOC AND D.CIA = A.CIA
    LEFT JOIN MOTIVO_NOTA MN ON MN.ID_MOTIVO = D.ID_MOTIVO 
    WHERE D.CIA = '01' 
    AND D.ID_TIPO_DOC IN ('01','02','03','04') 
    AND SERIE_DOC NOT LIKE '00%' 
    AND (EstatusNube IN(0,2) OR EstatusNube = 1 )
    GROUP BY  C.NIT,C.DESCRIPCION,C.DIRECCION,C.E_MAIL,C.FONO1, A.NRO_DOC, A.DESCRIPCION, A.DIRECCION, D.UC , D.SERIE_DOC
    ,D.NRO_DOC,D.ID_TIPO_DOC
    , D.SUBTOTAL_CON_DSCTO,D.DESCUENTO,D.IMPUESTO,D.TOTAL, M.DESCRIPCION,M.CODIGO_SUNAT,CP.DESCRIPCION, D.FECHA_DOCUMENTO,D.FECHA_VENCIMIENTO
    , D.ID_TIPO_DOC_REF,D.SERIE_DOC_REF, D.NRO_DOC_REF, D.ID_MOTIVO, MN.DESCRIPCION ,D.OBSERVACION ,D.TIPO_CAMBIO
    ORDER BY SERIE_DOC,D.NRO_DOC  
    `;

    /**Prueba AND CP.DESCRIPCION <> 'CONTADO'  
     * 
     * Prueba una factura :   AND D.NRO_DOC='00010740' AND D.SERIE_DOC='F001'
     */

    return new Promise((resolve, reject) => {

        sql.query(ObtnerDocumentosQuery, (err: any, result: any) => {
            if (err) {
                console.error('Error al ejecutar la consulta: ', err);
                reject(err);
                return
            }

            console.log(result);
            const documentosDB: DocumentoDB[] = result?.recordset;
            const documentos = GenerarEstructuraDocumentos(documentosDB);
            resolve(documentos);

        });
    })

}