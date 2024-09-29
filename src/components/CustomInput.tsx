import ErrorBox from './ErrorBox';

const CustomInput = ({
  onChange,
  onBlur,
  label,
  name,
  placeholder = '', // Optional, can be ''
  error,
  value = '', // <-- Provide a fallback value for `value`
  invalid,
  required = true,
  type = 'text',
}) => {
  console.log('CustomInput rendered', invalid);
  return (
    <div className="w-full">
      <label className="mb-2.5 block text-black dark:text-white">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        onBlur={onBlur}
        value={value} // Ensure this is always a controlled value
        onChange={onChange}
        required={required}
        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
      <ErrorBox message={error} />
    </div>
  );
};

export default CustomInput;
