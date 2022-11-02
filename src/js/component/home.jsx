
import React, { useEffect, useState } from "react";
import TareaForm from "./tareaForm.jsx";
import Tarea from "./tarea.jsx";
//create your first component


function Home() {

  const url = 'https://assets.breatheco.de/apis/fake/todos/user/faculpda30';

  const [listaTareas, setListaTareas] = useState([])
  const [inputText, setInputText] = useState([]);
	const [inputValue, setinputValue] = useState();
  const [validacion,setValidacion]= useState(true)

  const get = () => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })

      .then(resp => { return resp.json(); })
      .then(data =>
        setInputText(data))
      .catch(error => {
        //manejo de errores
        console.log(error)

      }
      );
  }
  const newUser = () => {
    fetch(url, {
      method: "POST",
      body: JSON.stringify([]),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(respuesta => {
        if (respuesta.ok)
          get()
      })
      .catch(error =>
        console.log("No se ha podido llamar a los datos"))
  }

  useEffect(() => {
    get()
  }, []);

  const actualizarlista = (data) => {
    console.log(data)
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    })
      .then(respuesta => {
        console.log(respuesta.status)
        if (respuesta.ok){get()
          setValidacion(true);}
        else {
          setValidacion(false);
      } 
          
          
       

      })
      .catch(error =>
        console.log("no funciona hay un error")
      )
  }
  const deletelist = () => {
    fetch(url, {
      method: "DELETE",
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok)
          newUser()

      })

  }


  function borrarelemento(why) {
    const listaborrar = inputText.filter(valor => valor !== why)
    actualizarlista(listaborrar)
  }

  return (
    <div >
      <div className="form">
        <span>Anadir tarea</span>
        <input type="text" value={inputValue} onChange={(e) => setinputValue(e.target.value)}
					onKeyDown={(e) => {

						let newObj = { label: inputValue, done: false };
						let aux = [...inputText, newObj]

						let array = Array.from(e.target.value);
						let filterarray = array.filter(words => words !== " ");

						if (e.key === "Enter" && filterarray.length) {
							actualizarlista(aux)
							setInputText(aux);
							setinputValue("")
						}
					}}
          className="form"
          placeholder="añade tu tarea" aria-label="Username"
          aria-describedby="basic-addon1" />
          	<button type="button" onClick={() => deletelist()} className="btn btn-danger" value>Borrar</button>
       
				
	
      </div>
      {
            !validacion &&
            <div className="validacion">No hay tareas, añadir tareas</div>
        }
      {
        inputText.map((e, index) =>

          <div key={index} className="lista">
            <p >{e.label}</p>
            <button
              type="button"
              className="btn-close "
              onClick={() => borrarelemento(e)}></button>
          </div>
          
        )}

    </div>
  )


}

export default Home;
