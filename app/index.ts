import express from 'express'
import { ObtnerDocumentos } from './consultas/ObtenerDocumentos';
import { pool } from './libs/sql.libs';
import { Cuota, Documento, Item } from './types/serviceDoc';
import { Declarar } from './Declarar';
import { puerto, tiempo } from './config/config';
import { ObtenerInformacionAdicionalDocumentos } from './ObtnerInformacionAdicionalDocumentos';

const app = express();

let documentos: Documento[] = []
let items: Item[] = []
let cuotas: Cuota[] = []
const documentosError: Documento[] = []

pool.connect((err) => {
    if (err) {
        return console.error('Error de conexión: ', err);
    }
    console.log('Conectado a la base de datos!');
});

setInterval(async () => {
    try {
        const request = pool.request();
        //Obteniendo documentos y armando estructura 🔨👷‍♂️ 
        const documentosBD = await ObtnerDocumentos(request)
        const documentosDeclarar = await ObtenerInformacionAdicionalDocumentos(documentosBD, request)

        Declarar(documentosDeclarar)
            .then((rta: any) => {
                const { data } = rta;
                console.log(data);
            })
            .catch(error => console.log(error))
        documentos = documentosDeclarar;

    } catch (error) {
        console.log(error)
    }

}, tiempo)

app.get('/', (req, res) => {
    res.send({ productos: true, docs: documentos, cuot: cuotas, items: items })
})

app.listen(puerto, () => {
    console.log("server iniciado")
})


