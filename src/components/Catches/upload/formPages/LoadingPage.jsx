import Spinner from "../../../reuseables/Spinner";

const LoadingPage = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <h2>Odota hetki, ladataan saalista..</h2>
      <Spinner />
    </div>
  );
};

export default LoadingPage;
