import { Cuota } from "../types/serviceDoc"

export const CrearCuota = (forma_pago: string, fecha_cuota: string, monto_cuota: string): Cuota[] => {
    if (forma_pago.includes('CREDITO')) {
        return ([
            {
                FechaCuota: fecha_cuota,
                MontoCuota: monto_cuota,
                NroCuota: '1'
            }
        ])
    } else {
        []
    }
    return []

}
