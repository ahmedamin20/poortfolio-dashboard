import Swal from 'sweetalert2'
import '@styles/base/plugins/extensions/ext-component-sweet-alerts.scss'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

export const handleConfirmText = (handleDelete: () => void) => {
    return MySwal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, continue !',
        customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-outline-danger ms-1'
        },
        buttonsStyling: false
    }).then(function (result) {
        if (result.isConfirmed) {
            handleDelete()
        }
    })
}