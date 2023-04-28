import { Request } from "mssql";
import { ObtnerProductos } from "./consultas/ObtenerProductos";
import { Documento } from "./types/serviceDoc";

export const ObtenerInformacionAdicionalDocumentos = (documentosBD: Documento[], request: Request): Promise<Documento[]> => {
    const documentos: Documento[] = [];

    return new Promise((resolve, reject) => {

        documentosBD.map(async (documento: Documento) => {

            const items = await ObtnerProductos(request, documento.Correlativo, documento.ID_TIPO_DOC, documento.Serie);
            let total: number = documento.TotalDocumento;

            if (documento.Moneda.includes('DOLARES')) {
                total = documento.TotalDocumento * documento.TipoCambio;
            }

            items.map(item => {

                if (item.Descripcion.includes('SERVICIO') && total > 700) {
                    documento.Detraccion = 1;
                    documento.PorcDetraccion = 12;
                    documento.MontoDetraccion = documento.TotalDocumento * 0.12;
                }

            })

            documento.cuotas.map(cuota => {
                if (documento.Detraccion > 0) {
                    cuota.MontoCuota = `${documento.TotalDocumento - documento.MontoDetraccion}`;
                }
            })


            documentos.push({ ...documento, items: items });

            if (documentos.length == documentosBD.length) {
                console.log(documentos);
                resolve(documentos);
            }
        })

    })
}