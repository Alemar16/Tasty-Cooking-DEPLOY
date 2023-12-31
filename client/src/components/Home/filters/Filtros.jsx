import React from "react";
import { useDispatch } from "react-redux";
import { paginado, reset } from "../../../redux/actions";
import "./Filter.css";
import {
  orderByaz,
  orderByscore,
  filterBydiet,
  filtercreated,
} from "../../../redux/actions";

export default function Filtros({ diet }) {
  const dispatch = useDispatch();

  function handleOderByname(e) {
    dispatch(orderByaz(e.target.value));
    dispatch(paginado(1));
    
  }
  /* ordenar  por Score Puntuacion */

  function handleOrderScore(e) {
    console.log(handleOrderScore);
    dispatch(orderByscore(e.target.value));
    dispatch(paginado(1));
    
  }

  function handleFilterDiets(e) {
    console.log(handleFilterDiets);
    dispatch(filterBydiet(e.target.value));
    dispatch(paginado(1));
  }

  function handleFilterCreated(e) {
    dispatch(filtercreated(e.target.value));
    dispatch(paginado(1));
  }

  /* corregir handle reset filter */
  function handleClick(e) {
    /*  dispatch(getAllrecipes()); */
    // window.location.reload(false);
    dispatch(reset());
    resetValues();
  }

  const resetValues = () => {
    let select1 = document.getElementById("diet");
    let select2 = document.getElementById("orderaz");
    let select3 = document.getElementById("score");
    let select4 = document.getElementById("origen");

    select1.selectedIndex = 0;
    select2.selectedIndex = 0;
    select3.selectedIndex = 0;
    select4.selectedIndex = 0;
  };

  return (
    <div className="container__filtros">
      {/*-------------All dietas al select------------ */}
      <span>Diets</span>
      <select onChange={handleFilterDiets} name="diet" id="diet">
        <option value="defauls" disabled>
          Select...
        </option>
        <option value="all" defaultValue>
          All
        </option>
        {diet?.map((el) => (
          <option value={el.name} key={el.id}>
            {el.name}
          </option>
        ))}
      </select>
      {/* ------------Ordenar de a-z z-a------------ */}
      <span>Order</span>
      <select onChange={handleOderByname} name="orderaz" id="orderaz">
        <option value="defauls" disabled>
          Alphabetically...
        </option>
        <option value="asc">A-Z</option>
        <option value="des">Z-A</option>
      </select>

      {/* Filtrar por puntaje Score */}
      <span>HealthScore</span>
      <select onChange={handleOrderScore} name="score" id="score">
        <option value="defauls" disabled>
          Score...
        </option>
        <option value="asc" defaultValue>
          Lower
        </option>
        <option value="des">Higher</option>
      </select>

      {/* filtrar los de la base de dtaos */}
      <span>Created</span>
      <select name="ifoapidb" onChange={handleFilterCreated} id="origen">
        <option value="defauls" disabled>
          By...
        </option>
        <option value="all" defaultValue>
          All
        </option>
        <option value="api">Api</option>
        <option value="created">Created</option>
      </select>

      <button onClick={handleClick}>Reset Filter</button>
    </div>
  );
}
