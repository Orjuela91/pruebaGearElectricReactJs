import React from 'react';
import './App.css';
import axios from 'axios';
import { MDBContainer } from 'mdbreact';
import Asistentes from './Asistentes';
import Formulario from './Formulario';

function App() {

  const [asistentes, setAsistentes] = React.useState(null);
  const [errorAxios, setErrorAxios] = React.useState(null);

  const [asistentesPhp, setAsistentesPhp] = React.useState(null);

  const getAsistentes = () => {
    axios.get("http://localhost:46665/api/Asistentes/GetAsistentes")
      .then((response) => {
        const asistentesApi = response.data;
        setAsistentes(asistentesApi);
      })
      .catch((error) => {
        setErrorAxios(error);
      });

  }

  const getAsistentesPhp = () => {
    axios.get("http://127.0.0.1:8000/api/asistentes/getAsistentes")
      .then((response) => {
        const asistentesApi = response.data;
        setAsistentesPhp(asistentesApi);
      })
      .catch((error) => {
        setErrorAxios(error);
      });

  }

  React.useEffect(() => {
    getAsistentes();
    getAsistentesPhp();
  }, []);

  return (
    <div className="App">
      <MDBContainer>
        <h1>Back .Net</h1>
        <Formulario back={"net"} />
        <Asistentes asistentes={asistentes}></Asistentes>
        <h1>Back PHP</h1>
        <Formulario back={"php"} />
        <Asistentes asistentes={asistentesPhp}></Asistentes>
      </MDBContainer>
    </div>
  );
}

export default App;
