
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="text-center">
        <h1 className="display-1 fw-bold text-danger">
          404
        </h1>

        <h2>Página no encontrada</h2>

        <p className="text-muted">
          La página que buscas no existe.
        </p>

        <Link to="/" className="btn btn-primary btn-lg">
          Regresar al inicio
        </Link>
      </div>
    </div>
  );
};

export default Error;
