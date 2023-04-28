export type Item = {
    CodigoItem: string
    Descripcion: string
    Cantidad: number
    Unidad: string
    Igv: number
    Precio: number
    SubTotal: number
    Total: number
    Descuento: number
    Lote: string | null
    FechaVcto: string | null
    Labora: string | null
    Pastilla: null | string
    Palote: null | string
}

export type Cuota = {
    MontoCuota: string,
    FechaCuota: string,
    NroCuota: string
}

export type Documento = {
    CORRELATIV: string
    VentaId?: number
    items: Item[]
    cuotas: Cuota[]
    cliente: string
    NroDocCliente: string
    TipoDocCliente: string
    DirCliente: string
    TipoDoc: string
    CodVenta: string
    Serie: string
    Correlativo: string
    FechaEmision: string
    HoraEmision: string
    FechaVencimiento: string
    Moneda: string
    FormaPago: string
    Base: number
    Igv: number
    MontoExcento: number
    MontoGratuito: number
    Descuento: number
    TotalDocumento: number
    Porcentaje: number
    NGuia: number
    TipoCambio: number
    FechaReferencia: null | string
    TipoReferencia: null | string | number
    DocumentoReferencia: null | string | number
    CodMotivo: null | string | number
    Motivo: null | string | number
    otros: string | null | number
    Detraccion: number
    PorcDetraccion: number
    MontoDetraccion: number
    RegimenPercepcion: number
    TasaPercepcion: number
    MontoPercepcion: number
    ruc: string
    idSucursal: number
    Estado: number
    archivoPath?: string
    archivo?: string
    placa?: null | string
    HoraReferencia: string | number | null
    ID_TIPO_DOC?: string
}

export type RespuestaServicio = {
    estatus: number
    Message: string
    documento: string
}

export type DocumentoDB = {
    NIT: string;
    Empresa: string;
    DIRECCION: string;
    E_MAIL: string;
    FONO1: string;
    NRO_DOC: string;
    NCliente: string;
    DCliente: string;
    UC: string;
    SERIE_DOC: string;
    Correlativo: string;
    ID_TIPO_DOC: string;
    TipoDoc: string;
    SUBTOTAL_CON_DSCTO: number;
    DESCUENTO: number;
    IMPUESTO: number;
    TOTAL: number;
    TIPO_CAMBIO: number;
    Moneda: string;
    MonedaDes: string;
    FORMA_PAGO: string;
    FECHA_DOCUMENTO: Date;
    FECHA_VENCIMIENTO: Date;
    ID_TIPO_DOC_REF: null | string | number;
    SERIE_DOC_REF: null | string | number;
    NRO_DOC_REF: null | string | number;
    ID_MOTIVO: null | string | number;
    DESCRIPCION: null | string | number;
    OBSERVACION: string | string | number;
}

export type ItemsDB = {
    ID_TIPO_DOC: string;
    SERIE_DOC: string;
    NRO_DOC: string;
    ID_ARTICULO: string;
    DES_ARTICULO: string;
    CANTIDAD: number;
    PSinIgv: number;
    PIgv: number;
    SUBTOTAL_CON_DSCTO: number;
    IMPUESTO: number;
    TOTAL: number;
    DESCUENTO: number;
}