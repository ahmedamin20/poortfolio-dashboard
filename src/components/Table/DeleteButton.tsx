import { RiDeleteBin2Fill } from 'react-icons/ri';
import { useState } from 'react';
import CustomAlert from '../CustomAlert';

const DeleteItem = ({ handleDelete = () => {} }) => {
  const [showAlert, setShowAlert] = useState(false);
  const handleDeleteClick = () => {
    setShowAlert(true);
  };
  const handleConfirm = () => {
    handleDelete();
    setShowAlert(false);
  };
  return (
    <>
      <button
        onClick={handleDeleteClick}
        type="button"
        color="transparent"
        className="p-2 rounded-lg text-center mx-2 border bg-meta-1 text-white hover:border-meta-1 hover:bg-white hover:text-meta-1 transition-all duration-[0.5s]"
      >
        <RiDeleteBin2Fill className="font-medium-2" />
      </button>
      {showAlert && (
        <CustomAlert
          message="Are you sure you want to delete this item?"
          onConfirm={handleConfirm}
          onCancel={() => setShowAlert(false)}
        />
      )}
    </>
  );
};

export default DeleteItem;
