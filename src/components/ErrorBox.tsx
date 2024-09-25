const ErrorBox = ({message, ...props}) => {
    return message && typeof message === 'string' && <span {...props} className={`text-red-500 text-[14px]`}>{message}</span>
}
export default ErrorBox