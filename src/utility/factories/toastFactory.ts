import toast from "react-hot-toast";

const toastFactory = {
    success: (message: string) => toast.success(message),
    error: (message: string) => toast.error(message),
    loading: (message: string) => toast.loading(message, { duration: 10000000 }),
    dismiss: () => toast.dismiss()
};

export default toastFactory;