import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FirebaseConfig from "../../firebase/context";
import PlatilloComponent from "../ui/PlatilloComponent";

function Menu() {
  const { firebase } = useContext(FirebaseConfig);
  const [platillos, setGuardarPlatillo] = useState([]);
  useEffect(() => {
    const obtenerPlatillos = () => {
      firebase.db.collection("productos").onSnapshot(handleSnapshot);
    };
    obtenerPlatillos();
  }, []);

  //SnapShot
  const handleSnapshot = (snapshot) => {
    const platillos = snapshot.docs.map((platillo) => {
      return {
        id: platillo.id,
        ...platillo.data(),
      };
    });
    setGuardarPlatillo(platillos);
  };
  return (
    <>
      <h1 className="text-3xl font-light mb-4">Menu</h1>
      <Link
        to="nuevo-platillo"
        className="bg-blue-800 hover:bg-blue-700 inline-block mb-5 p-2 text-white uppercase font-bold"
      >
        Agregar Platillo
      </Link>
      {platillos.map((platillo) => (
        <PlatilloComponent key={platillo.id} platillo={platillo} />
      ))}
    </>
  );
}

export default Menu;
