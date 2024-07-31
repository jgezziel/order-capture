const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="container py-3 mt-auto border-t border-t-zinc-300">
      <div className="text-center">
        <p className="text-sm text-zinc-500">
          Desarrollado por
          <span className="font-semibold"> Jhosmar Balan (jgezziel)</span>
        </p>
        <p className="text-sm text-zinc-400">
          &copy; {year}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
