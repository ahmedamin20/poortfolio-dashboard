import ErrorBox from './ErrorBox';

const CustomTextArea = ({
  onChange,
  onBlur,
  label,
  name,
  placeholder = '', // Optional, can be ''
  error,
  value = '', // <-- Provide a fallback value for `value`
  required = true,
}) => {
  return (
    <div>
      <label className="mb-3 block text-black dark:text-white">{label} </label>
      <textarea
        rows={6}
        placeholder={placeholder}
        name={name}
        onBlur={onBlur}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
      ></textarea>
      <ErrorBox message={error} />
    </div>
  );
};

export default CustomTextArea;
