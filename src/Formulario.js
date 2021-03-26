import React from 'react';
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import Swal from 'sweetalert2';
import axios from 'axios';

function Formulario(props) {

    const [modal, setModal] = React.useState(false);

    const [tipoDocumento, setTipoDocumento] = React.useState('');
    const [documento, setDocumento] = React.useState('');
    const [nombre, setNombre] = React.useState('');
    const [telefono, setTelefono] = React.useState('');
    const [correo, setCorreo] = React.useState('');

    const toggle = () => {
        setModal(!modal);
    }

    const save = () => {
        if (tipoDocumento.length === 0 || documento.length === 0 || nombre.length === 0
            || telefono.length === 0 || correo.length === 0) {
            Swal.fire({
                title: 'Error!',
                text: 'Ningun campo puede estar vacio',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        } else {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const validateEmail = re.test(String(correo).toLowerCase());

            if (!validateEmail) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Correo invalido',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            } else {
                if (props.back === "net") {
                    axios.post("http://localhost:46665/api/Asistentes/NewAsistente", {
                        tipoDocumento, documento,
                        nombre, telefono, correo
                    })
                        .then((response) => {
                            console.log(response);
                        }).catch((error) => {
                            console.log("error:", error);
                        });
                } else {
                    axios.post("http://127.0.0.1:8000/api/asistentes/newAsistente", {
                        tipoDocumento, documento,
                        nombre, telefono, correo
                    })
                        .then((response) => {
                            console.log(response);
                        }).catch((error) => {
                            console.log("error:", error);
                        });
                }

            }

        }

    }

    return (
        <div>
            <MDBContainer >
                <button type="button" className="btn btn-primary" onClick={toggle}>Agregar Asistente</button>
                <MDBModal isOpen={modal} toggle={toggle} >
                    <MDBModalHeader toggle={toggle}>MDBModal title</MDBModalHeader>
                    <MDBModalBody>
                        <form>
                            <div className="form-group">
                                <label htmlFor="tipoDocumento">Tipo Documento</label>
                                <input type="text" className="form-control" name="tipoDocumento"
                                    onChange={(event) => setTipoDocumento(event.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="documento">Documento</label>
                                <input type="text" className="form-control" name="documento"
                                    onChange={(event) => setDocumento(event.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="nombre">Nombre</label>
                                <input type="text" className="form-control" name="nombre"
                                    onChange={(event) => setNombre(event.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="telefono">Telefono</label>
                                <input type="text" className="form-control" name="telefono"
                                    onChange={(event) => setTelefono(event.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="correo">Correo</label>
                                <input type="email" className="form-control" name="correo"
                                    onChange={(event) => setCorreo(event.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={save}>Save changes</button>
                        </form>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <button type="button" className="btn btn-secondary" onClick={toggle}>Close</button>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        </div>
    )
}

export default Formulario;
