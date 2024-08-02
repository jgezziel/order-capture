import { NavLink } from "react-router-dom";

const MenuAside = () => {
  return (
    <>
      <aside className="flex flex-col p-4 overflow-y-auto bg-zinc-100">
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => {
                return isActive ? "font-bold underline" : "";
              }}
            >
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/customers"
              className={({ isActive }) => {
                return isActive ? "font-bold underline" : "";
              }}
            >
              Clientes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) => {
                return isActive ? "font-bold underline" : "";
              }}
            >
              Productos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/orders"
              className={({ isActive }) => {
                return isActive ? "font-bold underline" : "";
              }}
            >
              Pedidos
            </NavLink>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default MenuAside;
