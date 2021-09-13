import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function Sidebar() {
  return (
    <div className="md:w-2/5 xl:w-1/5 bg-gray-800">
      <div className="p-6">
        <p className="uppercase text-white text-2xl tracking-wide text-center font-bold">RestauranteApp</p>
        <p className="mt-3 text-gray-600 ">Administra tu restaurante en las siguientes opciones</p>
        <nav>
          <NavLink to="/" className="text-yellow-500 block hover:bg-yellow-500 hover:text-gray-900 " exact>Ordenes</NavLink>
          <NavLink to="/menu" className="text-yellow-500 block hover:bg-yellow-500 hover:text-gray-900" exact>Menu</NavLink>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar;