export default function ObtnerTipoDoc(tipoDocumento: string) {
    let tipoDoc: string = '';

    switch (tipoDocumento) {
        case 'BOLETA':
            tipoDoc = '03';
            break;
        case 'FACTURA':
            tipoDoc = '01';
            break;
        case 'NOTA DE CREDITO':
            tipoDoc = '07';
            break;
        case 'NOTA DE DEBITO':
            tipoDoc = '08';
            break;
        default:
            break;
    }

    return tipoDoc;
}