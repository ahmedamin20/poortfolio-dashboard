const CustomSubmitButton = ({ disabled }) => {
  return (
    <button
      disabled={disabled}
      type={'submit'}
      className="flex w-full disabled:animate-ping-once justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
    >
      {disabled ? 'Submiting...' : 'Submit'}
    </button>
  );
};

export default CustomSubmitButton;
