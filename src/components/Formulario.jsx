import React, { useState } from 'react';
import Error from './Error';
import shortid from 'shortid';
import PropTypes from 'prop-types';
const Formulario = ({guardarGasto, guardarCrearGasto}) => {

    const [nombre, guardarNombre] = useState('');
    const [cantidad, guardarCantidad] = useState(0);
    const [error, guardarError] = useState(false);
    const saveNombre = e => {
        guardarNombre(e.target.value)
    }

    const saveCantidad = e => {
        guardarCantidad(parseInt(e.target.value));
    }

    const addGasto = e => {
        e.preventDefault();

        if(cantidad < 1 || isNaN(cantidad) || nombre.trim() === ''){
            guardarError(true);
            return;
        }
        guardarError(false);
        const gasto = {
            nombre,
            cantidad,
            id:shortid.generate()
        }
        guardarGasto(gasto);
        guardarNombre('');
        guardarCantidad(0);
        guardarCrearGasto(true);
    }
    return (
        <form 
            action=""
            onSubmit={addGasto}
        >
            <h2>Agrega tus gastos aqui</h2>
            {error? <Error mensaje="Ambos campos son obligatorios o presupuesto incorrecto"/> : null}
            <div className="campo">
                <label htmlFor="">Nombre Gasto</label>
                <input 
                    type="text"
                    className="u-full-width"
                    placeholder="Ej. Transporte"  
                    value={nombre}
                    onChange={saveNombre}
                />
            </div>
            <div className="campo">
                <label htmlFor="">Cantidad Gasto</label>
                <input 
                    type="number"
                    className="u-full-width"
                    placeholder="Ej. 300"
                    value={cantidad}
                    onChange={saveCantidad}
                />
            </div>

            <input 
                type="submit"
                className="button-primary u-full-width"
                value="Agregar Gasto"
            />
        </form>
    );
}

Formulario.propTypes = {
    guardarGasto: PropTypes.func.isRequired,
    guardarCrearGasto: PropTypes.func.isRequired,
}
 
export default Formulario;