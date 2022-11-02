import React from "react";

const Tarea = (props) => {
    const borrarTarea = () => {
        props.borrar(props.id);
    }
    return(
<div>
    <div className="tarea">
        <span>{props.tarea}</span><span onClick={borrarTarea}>eliminar</span>
    </div>
</div>
    )
}
export default Tarea;