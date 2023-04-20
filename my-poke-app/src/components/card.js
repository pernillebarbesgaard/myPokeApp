import { Link } from "react-router-dom";

function Card(props) {
    return (
      <div className="card col-4 d-flex justify-content-center">
        <img src={props.src} className="card-img-top" alt="..." />
        <div className="card-body">
        <Link to={{ pathname: `/about/${props.id}`, state: { id: props.id } }}>
           <h5 className="card-title">{props.title}</h5>
          </Link>
        </div>
      </div>
    );
  }

  export default Card;

