import { Fragment, useEffect, useState } from "react";
import Formulario from "./components/Formulario";
import Header from "./components/Header";
import ListadoNoticias from "./components/ListadoNoticias";

function App() {

  const [categoria, guardarCategoria] = useState('');
  const [noticias, guardarNoticias] = useState([]);

  useEffect(() => {
    const consultarApi = async () => {
      const url = `https://api.mediastack.com/v1/news?access_key=8b8cc2f222f179936aa3844944c2bf63&countries=us&languages=en&categories=${categoria}`;
      const respuesta = await fetch(url, {
        'headers': {
          'Content-Security-Policy': 'upgrade-insecure-requests',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    }
      })
      const noticias = await respuesta.json();
      guardarNoticias(noticias.data);
    }
    consultarApi();
  }, [categoria])

  return (
    <Fragment>
      <Header titulo="Buscador de noticias" />
      <div className="container white">
        <Formulario guardarCategoria={guardarCategoria} />
        <ListadoNoticias
          noticias={noticias}
        />
      </div>
    </Fragment>

  );
}

export default App;
