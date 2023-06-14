import { React, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { recipesDetils } from "../../redux/actions/index";
import defaul from "../../assets/img/juse.jpg";
import "./detalle.css";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Details() {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(recipesDetils(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  let data = useSelector((state) => state.details);
  console.log(data);

  return (
    <div>
      {data.map((el) => (
        <div className="detalle" key={el.id}>
          <Link to="/home">
            <div className="d__back">
              <p>
                <FaArrowLeft />
              </p>
            </div>
          </Link>
          {/* Contenedor izquierdo */}
          <div className="detalle__left">
            <div className="detalle_name">
              <h1 className="detalle_nameTitle">{el.name}</h1>
              <img
                className="d_image"
                src={el.image}
                alt=" Not Fount"
                onError={(e) => {
                  e.target.src = defaul;
                }}
              />
              <div className="d_itens">
                <span>
                  <p className="d_intensParrafo">Score</p>
                </span>
                <div className="d__range">
                  {<input type="range" defaultValue={el.healthScore} />}
                  <span>{el.healthScore}</span>
                </div>
                <p className="d_intensParrafo">Diests</p>
                <div className="d__diets">
                  {el.diets.map((d) => (
                    <div className="d__parrafo" key={d}>
                      <p>{d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contenedor derecho */}
          <div className="detalle__right">
            <div className="d__desc">
              <h1 className="detalle_sumary">Summary</h1>
              <div className="d__summary">
                <p
                  className="d_parrafo"
                  dangerouslySetInnerHTML={{ __html: el?.summary }}
                ></p>
              </div>
            </div>
            {!el.stepbyStep ? (
              ""
            ) : (
              <h1 className="detalle_Step">Step by Step </h1>
            )}
            <div className="d__pasos">
              <div className="d__stepbystep">
                <p
                  className="d_parrafo"
                  dangerouslySetInnerHTML={{ __html: el?.stepbyStep }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
