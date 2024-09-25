
const Avatar = ({src}) => {
  return (
    <div className="w-[80px] h-[80px] flex justify-center items-center rounded-full shadow-lg">
      <img className="w-[80px] h-[80px] rounded-full" src={src} alt="image"/>
    </div>
  )
}

export default Avatar
