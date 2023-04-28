import { idSucursal, ruc } from "../config/config";
import { Documento, DocumentoDB } from "../types/serviceDoc";
import { CrearCuota } from "./crearCuota";
import ObtnerTipoDoc from "./obtenerTipoDoc";
import ObtnerTipoDocCliente from "./obtnerTipoDocCliente";

export const GenerarEstructuraDocumentos = (documentosDB: DocumentoDB[]): Documento[] => {
    const documentos: Documento[] = []
    documentosDB.map(documento => {

        documentos.push({
            CORRELATIV: `${documento.SERIE_DOC}-${documento.Correlativo}`,
            ruc: ruc,
            idSucursal: idSucursal,
            TipoDocCliente: ObtnerTipoDocCliente(documento.NRO_DOC).toString(),
            NroDocCliente: documento.NRO_DOC,
            cliente: documento.NCliente,
            DirCliente: documento.DCliente,
            TipoDoc: ObtnerTipoDoc(documento.TipoDoc),
            CodVenta: `${documento.SERIE_DOC}-${documento.Correlativo}`,
            Serie: documento.SERIE_DOC,
            Correlativo: documento.Correlativo,
            FechaEmision: new Date(documento.FECHA_DOCUMENTO).toISOString().substring(0, 10),
            HoraEmision: '00:00:00',
            FechaVencimiento: new Date(documento.FECHA_VENCIMIENTO).toISOString().substring(0, 10),
            Moneda: documento.MonedaDes,
            FormaPago: documento.FORMA_PAGO.split(' ')[0],
            Base: documento.SUBTOTAL_CON_DSCTO,
            Igv: documento.IMPUESTO,
            MontoExcento: 0,
            MontoGratuito: 0,
            Descuento: documento.DESCUENTO,
            TotalDocumento: documento.TOTAL,
            Porcentaje: 18,
            NGuia: 0,
            TipoCambio: documento.TIPO_CAMBIO,
            FechaReferencia: null,
            HoraReferencia: null,
            TipoReferencia: documento.ID_TIPO_DOC_REF,
            DocumentoReferencia: documento.NRO_DOC_REF,
            CodMotivo: documento.ID_MOTIVO,
            Motivo: documento.DESCRIPCION,
            otros: documento.OBSERVACION,
            Detraccion: 0,
            PorcDetraccion: 0,
            MontoDetraccion: 0,
            RegimenPercepcion: 0,
            TasaPercepcion: 0,
            MontoPercepcion: 0,
            items: [],
            cuotas: CrearCuota(
                documento.FORMA_PAGO,
                new Date(documento.FECHA_VENCIMIENTO).toISOString().substring(0, 10),
                documento.TOTAL.toString()
            ),
            Estado: 1,
            ID_TIPO_DOC: documento.ID_TIPO_DOC,
            placa: null,
        })
    })

    return documentos;
}