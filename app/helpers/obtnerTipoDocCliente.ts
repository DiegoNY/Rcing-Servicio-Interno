export default function ObtnerTipoDocCliente(nro_doc: string) {
    let tipoCliente = 0;
    switch (nro_doc.length) {
        case 8:
            tipoCliente = 1
            break;
        case 11:
            tipoCliente = 6
            break;
        case 1:
            tipoCliente = 0
            break;
        default:
            break;
    }

    return tipoCliente;
}