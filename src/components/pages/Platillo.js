import { useFormik } from "formik";
import { useContext, useState } from "react";
import * as Yup from "yup";
import { FirebaseContext } from "../../firebase";
import { useHistory } from "react-router-dom";
import FileUploader from "react-firebase-file-uploader";

function Platillo() {
  const [subiendo, setSubiendo] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [urlimagen, setUrlimagen] = useState("");

  const navigate = useHistory();
  // context firebase
  const { firebase } = useContext(FirebaseContext);
  // validacion de datos
  const formik = useFormik({
    initialValues: {
      nombre: "",
      precio: "",
      categoria: "",
      imagen: "",
      descripcion: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
        .min(3, "Los platillos deben tener mas de 3 caracteres")
        .required("El nombre es obligatorio"),
      precio: Yup.number()
        .min(1, "Debes agregar un numero")
        .required("El precio es obligatorio"),
      categoria: Yup.string().required("La categoria es obligatorio"),
      descripcion: Yup.string()
        .min(10, "La descripcion debe ser mas larga")
        .required("La descripcion es obligatorio"),
    }),
    onSubmit: (platillo) => {
      try {
        platillo.existencia = true;
        platillo.imagen = urlimagen;
        firebase.db.collection("productos").add(platillo);
        navigate.push("/");
      } catch (error) {
        console.log(error);
      }
    },
  });
  const { nombre, precio, categoria, descripcion } = formik.values;
  const handleUploadStart = () => {
    setProgreso(0);
    setSubiendo(true);
  };
  const handleUploadError = (error) => {
    setSubiendo(false);
    console.log(error);
  };
  const handleUploadSuccess = async (nombre) => {
    setProgreso(100);
    setSubiendo(false);

    //Almacenar url
    const url = await firebase.storage
      .ref("productos")
      .child(nombre)
      .getDownloadURL();
    setUrlimagen(url);
  };
  const handleProgress = (progress) => {
    setProgreso(progress);
  };
  return (
    <>
      <h1 className="text-3xl font-light mb-4">Agregar Platillo</h1>
      <div className="flex justify-center mt-10">
        <div className="w-full  max-w-3xl">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nombre"
              >
                Nombre
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="nombre"
                type="text"
                placeholder="Nombre Platillo"
                value={nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.nombre && formik.errors.nombre ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
                role="alert"
              >
                <p className="font-bold">{formik.errors.nombre}</p>
              </div>
            ) : null}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="precio"
              >
                Precio
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="precio"
                type="number"
                placeholder="$20"
                min="0"
                value={precio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.precio && formik.errors.precio ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
                role="alert"
              >
                <p className="font-bold">{formik.errors.precio}</p>
              </div>
            ) : null}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="categoria"
              >
                Categoria
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="precio"
                name="categoria"
                value={categoria}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">-- Seleccione --</option>
                <option value="desayuno">Desayuno</option>
                <option value="comida">Comida</option>
                <option value="cena">Cena</option>
                <option value="bebida">Bebida</option>
                <option value="postre">Postre</option>
                <option value="ensalada">Ensalada</option>
              </select>
            </div>
            {formik.touched.categoria && formik.errors.categoria ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
                role="alert"
              >
                <p className="font-bold">{formik.errors.categoria}</p>
              </div>
            ) : null}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="imagen"
              >
                Imagen
              </label>
              <FileUploader
                accept="image/*"
                id="imagen"
                name="imagen"
                randomizeFilename
                storageRef={firebase.storage.ref("productos")}
                onUploadStart={handleUploadStart}
                onUploadError={handleUploadError}
                onUploadSuccess={handleUploadSuccess}
                onProgress={handleProgress}
              />
            </div>
            {subiendo && (
              <div className="h-12 w-full border">
                <div
                  className="bg-green-500 absolute left-8 top-0 text-white px-2 text-sm h-12 flex items-center"
                  style={{ width: `${progreso}%` }}
                ></div>
              </div>
            )}
            {urlimagen && (
              <p className="bg-green-500 text-white p-3 text-center my-5">
                La imagen se subio correctamente
              </p>
            )}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="descripcion"
              >
                Descripcion
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40"
                id="descripcion"
                type="text"
                placeholder="Descripcion del platillo"
                value={descripcion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
            </div>
            {formik.touched.descripcion && formik.errors.descripcion ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
                role="alert"
              >
                <p className="font-bold">{formik.errors.descripcion}</p>
              </div>
            ) : null}
            <input
              type="submit"
              className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold"
              value="AGREGAR PLATILLO"
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default Platillo;
