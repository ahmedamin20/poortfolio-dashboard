const CustomFIleInput = ({ label, value, name, onChange }) => {
  const changeFile = (file) => {
    if (file instanceof File) {
      // Ensure that `file` is a File object before calling URL.createObjectURL
      return URL.createObjectURL(file);
    }
    return '';
  };
  return (
    <div>
      <label className="mb-3 block text-black dark:text-white">{label}</label>
      <input
        name={name}
        onChange={onChange}
        type="file"
        className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
      />
      {typeof value === 'string' && value ? (
        <img
          className="mx-auto my-2 max-w-[150px] max-h-[100px] rounded-md"
          src={value}
          alt="Edit Image"
        />
      ) : (
        <img
          className="mx-auto my-2 max-w-[150px] max-h-[100px] rounded-md"
          src={changeFile(value)}
          alt=""
        />
      )}
    </div>
  );
};

export default CustomFIleInput;
