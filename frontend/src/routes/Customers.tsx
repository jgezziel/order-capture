const Customers = () => {
  return (
    <>
      <div className="pb-3 mb-6 border-b border-zinc-200">
        <h1 className="text-3xl font-bold">Clientes</h1>
      </div>
      <table className="w-full">
        <thead className="bg-zinc-800">
          <tr>
            <th className="px-4 py-2 text-white border">ID</th>
            <th className="px-4 py-2 text-white border">Nombre</th>
            <th className="px-4 py-2 text-white border">RFC</th>
            <th className="px-4 py-2 text-white border">Direccion Fiscal</th>
            <th className="px-4 py-2 text-white border">Email</th>
            <th className="px-4 py-2 text-white border">Teléfono</th>
            <th className="px-4 py-2 text-white border">Contacto</th>
            <th className="px-4 py-2 text-white border">Acciones</th>
          </tr>
        </thead>
      </table>
    </>
  );
};

export default Customers;
