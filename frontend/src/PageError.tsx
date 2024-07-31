import { useRouteError } from "react-router-dom";

const PageError = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <div className="flex justify-center py-8 sm:m-auto">
        <div className="text-center ">
          <h1 className="text-4xl font-bold">Oops!</h1>
          <p className="my-8 text-lg sm:my-14">
            Sorry, an unexpected error has occurred.
          </p>
          <p className="text-lg text-zinc-500">
            <i>{error.statusText || error.message}</i>
          </p>
        </div>
      </div>
    </>
  );
};

export default PageError;
