import React from 'react';
import { MDBDataTableV5 } from 'mdbreact';

function Asistentes(props) {

    const [datatable, setDatatable] = React.useState({});

    const loadData = () => {

        let data = {
            columns: [
                {
                    label: 'Tipo Documento',
                    field: 'tipoDocumento',
                    width: 150,
                    attributes: {
                        'aria-controls': 'DataTable',
                        'aria-label': 'Tipo Documento',
                    },
                },
                {
                    label: 'Numero Documento',
                    field: 'documento',
                    width: 270,
                },
                {
                    label: 'Nombre',
                    field: 'nombre',
                    width: 200,
                },
                {
                    label: 'Telefono',
                    field: 'telefono',
                    width: 200,
                },
                {
                    label: 'Correo',
                    field: 'correo',
                    width: 200,
                },
            ],
            rows: [],

        }

        props.asistentes?.map((asistente) => {
            var row = {
                tipoDocumento: asistente.tipoDocumento,
                documento: asistente.documento,
                nombre: asistente.nombre,
                telefono: asistente.telefono,
                correo: asistente.correo,
            }

            data.rows.push(row);
        })

        setDatatable(data);

    }

    React.useEffect(() => {

            loadData();

    }, [props.asistentes])


    return (
        <div>
            <MDBDataTableV5 hover entriesOptions={[5, 10, 15]} entries={5} pagesAmount={4} data={datatable} />
        </div>
    );
}

export default Asistentes;
