import { useContext, useState } from "react";
import FirebaseContext from "../../firebase/context";

function Orden({ orden }) {
  const { firebase } = useContext(FirebaseContext);
  const [entrega, setEntrega] = useState(0);
  const definirTiempo = async (id) => {
    try {
      await firebase.db.collection("ordenes").doc(id).update({
        tiempoEntrega: entrega,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const completarOrden = async (id) => {
    try {
      await firebase.db.collection("ordenes").doc(id).update({
        completado: true,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="sm:w-1/2 lg:w-1/3 px-2 mb-4">
      <div className="p-3 shadow-md bg-white">
        <h1 className="text-yellow-600 text-lg font-bold">{orden.id}</h1>
        {orden.orden.map((platillo) => (
          <p className="text-gray-600">{platillo.nombre}</p>
        ))}
        <p className="text-gray-700 font-bold">Total a pagar: ${orden.total}</p>
        {orden.tiempoEntrega === 0 && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tiempo de entrega:
            </label>
            <input
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              min="1"
              max="20"
              placeholder="20"
              value={entrega}
              onChange={(e) => setEntrega(parseInt(e.target.value))}
            />
            <button
              type="submit"
              className="mt-5 p-2 text-white uppercase font-bold  bg-gray-800 hover:bg-gray-900"
              onClick={() => definirTiempo(orden.id)}
            >
              Definir tiempo
            </button>
          </div>
        )}
        {orden.tiempoEntrega > 0 && (
          <p className="text-gray-700">
            Tiempo de entrega:
            <span className="font-bold">{orden.tiempoEntrega} minutos</span>
          </p>
        )}
        {!orden.completado && orden.tiempoEntrega > 0 && (
          <button
            type="button"
            className="bg-blue-800 hover:bg-blue-700 w-full mt-5 p-2 text-white uppercase font-bold"
            onClick={() => completarOrden(orden.id)}
          >
            Marcar lista
          </button>
        )}
      </div>
    </div>
  );
}

export default Orden;
