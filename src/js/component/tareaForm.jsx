
import React, {useState} from "react";

const TareaForm = (props)=>{
    const [inputText,setinputText]= useState("");
    // const [inputValue, setinputValue] = useState(); 
    const [validacion,setValidacion]= useState(true)

    const manejarFormulario = (event) => {
        setinputText(event.target.value);
    }
    
    const submit = (event) => {
        event.preventDefault();
        if (inputText.trim() !== ""){
            props.nuevaTarea(inputText);
            setinputText("");
            setValidacion(true);

        }else {
            setValidacion(false);
        } 
        
    }

 return (
    <div>
        <form className="form">
            <span>Anadir tarea</span>
           
            <button >Añadir</button>
        </form>
        {
            !validacion &&
            <div className="validacion">No hay tareas, añadir tareas</div>
        }
    </div>
 );
};
export default TareaForm;