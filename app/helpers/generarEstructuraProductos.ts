import { Item, ItemsDB } from "../types/serviceDoc";

export const GenerarEstructuraProductos = (items: ItemsDB[]): Item[] => {
    const Items: Item[] = [];

    items.map(item => {
        Items.push({
            CodigoItem: item.ID_ARTICULO,
            Cantidad: item.CANTIDAD,
            Descripcion: item.DES_ARTICULO,
            Precio: item.PIgv,
            SubTotal: item.SUBTOTAL_CON_DSCTO,
            Igv: item.IMPUESTO,
            Descuento: item.DESCUENTO,
            Total: item.TOTAL,
            Lote: null,
            FechaVcto: null,
            Labora: null,
            Palote: null,
            Pastilla: null,
            Unidad: 'NIU',
        })
    })

    return Items
}
