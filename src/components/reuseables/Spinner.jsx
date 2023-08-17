import { FadeLoader } from 'react-spinners';

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <FadeLoader color="#3C50E0" loading />
    </div>
  );
};

export default LoadingSpinner;