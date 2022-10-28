import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';

function App() {

  const dataPersonas = [
    { id: 1, nombre: "Jenaro", apellido: "Jimenez" },
    { id: 2, nombre: "Luna", apellido: "Caro" },
    { id: 3, nombre: "Ximena", apellido: "Sanchez" },
    { id: 4, nombre: "Lorena", apellido: "Bedoya" },
    { id: 5, nombre: "Johana", apellido: "Benitez" },
    
  ];

  const [data, setData] = useState(dataPersonas);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);

  const [personaSeleccionada, setPersonaSeleccionada] = useState({
    id: '',
    nombre: '',
    apellido: ''
  });

  const seleccionarPersona=(elemento, caso)=>{
setPersonaSeleccionada(elemento);
(caso==='Editar')?setModalEditar(true):setModalEliminar(true)
  }

  const handleChange=e=>{
    const {name, value}=e.target;
    setPersonaSeleccionada((prevState)=>({
      ...prevState,
      [name]: value
    }));
  }

  const editar=()=>{
    var dataNueva=data;
    dataNueva.map(persona=>{
      if(persona.id===personaSeleccionada.id){
        persona.apellido=personaSeleccionada.apellido;
        persona.nombre=personaSeleccionada.nombre;
      }
    });
    setData(dataNueva);
    setModalEditar(false);
  }

  const eliminar =()=>{
    setData(data.filter(persona=>persona.id!==personaSeleccionada.id));
    setModalEliminar(false);
  }

  const abrirModalInsertar=()=>{
    setPersonaSeleccionada(null);
    setModalInsertar(true);
  }

  const insertar =()=>{
    var valorInsertar=personaSeleccionada;
    valorInsertar.id=data[data.length-1].id+1;
    var dataNueva = data;
    dataNueva.push(valorInsertar);
    setData(dataNueva);
    setModalInsertar(false);
  }

  return (
    <div className="App">
      <header>
        <h2>Lista de Usuarios</h2>
      </header>
      <br />
      <button className="btn btn-success" onClick={()=>abrirModalInsertar()}>Insertar</button>
      <br /><br />
      <div id="main-container">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map(elemento=>(
              <tr>
                <td>{elemento.id}</td>
                <td>{elemento.nombre}</td>
                <td>{elemento.apellido}</td>
                <td><button className="btn btn-warning" onClick={()=>seleccionarPersona(elemento, 'Editar')}>Editar</button> {"   "}
                <button className="btn btn-danger" onClick={()=>seleccionarPersona(elemento, 'Eliminar')}>Eliminar</button></td>
              </tr>
            ))
            }
          </tbody>
        </table>
      </div>

      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar Usuarios</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={personaSeleccionada && personaSeleccionada.id}
            />
            <br />

            <label>Usuario</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={personaSeleccionada && personaSeleccionada.nombre}
              onChange={handleChange}
            />
            <br />

            <label>Apellido</label>
            <input
              className="form-control"
              type="text"
              name="apellido"
              value={personaSeleccionada && personaSeleccionada.apellido}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-warning" onClick={()=>editar()}>
            Actualizar
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalEditar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>


      <Modal isOpen={modalEliminar}>
        <ModalBody>
          Estás Seguro que Deseas Eliminar a este usuario {personaSeleccionada && personaSeleccionada.nombre}
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>eliminar()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={()=>setModalEliminar(false)}
          >
            No
          </button>
        </ModalFooter>
      </Modal>


        <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Insertar Usuario</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={data[data.length-1].id+1}
            />
            <br />

            <label>Usuario</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={personaSeleccionada ? personaSeleccionada.nombre: ''}
              onChange={handleChange}
            />
            <br />

            <label>Apellido</label>
            <input
              className="form-control"
              type="text"
              name="apellido"
              value={personaSeleccionada ? personaSeleccionada.apellido: ''}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-warning"
          onClick={()=>insertar()}>
            Insertar
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalInsertar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
