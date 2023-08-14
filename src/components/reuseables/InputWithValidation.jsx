import PropTypes from 'prop-types';

const ValidationComponent = ({ fieldName, data, setData, actionType, type, isValid, setIsValid }) => {
  
    const validateData = (data) => {
      // Implement your validation logic here
      // For example, you might check if the data is not empty or meets certain criteria
      // Return true if data is valid, false otherwise
      // const trimmed = data.trim() !== '';
      if (actionType === 'login') {
        if (type === 'email') { return checkEmail(data); }
      }
    };
  
    const handleBlur = () => {
      const newDataIsValid = validateData(data);
      console.log("first", newDataIsValid);
      setIsValid(newDataIsValid);
    };

    const handleOnChange = (e) => {
      setData(e.target.value);
      setIsValid(true);
    };
  
    return (
      <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={fieldName}
      >
        {fieldName}
      </label>
      <input
        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={fieldName}
        type={type}
        value={data}
        onChange={handleOnChange}
        onBlur={handleBlur}
      />
      {!isValid && <p className='text-sm text-red-400'>Syötetty {fieldName} ei ole kelvollinen.</p>}
    </div>
    );
  };

  ValidationComponent.propTypes = {
    fieldName: PropTypes.string,
    actionType: PropTypes.string,
    data: PropTypes.string,
    setData: PropTypes.func,
    type: PropTypes.string,
    isValid: PropTypes.bool,
    setIsValid: PropTypes.func
  };

  const checkEmail = (email) => {
    const emailRegex = /^[\w.-]+@[\w.-]+\.\w+$/;
    if (!email) { return false; }
    else {
      console.log("regex:", emailRegex.test(email))
      return emailRegex.test(email);
    }
  }

export default ValidationComponent;
  
  
  
  
  