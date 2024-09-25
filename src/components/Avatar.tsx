
const Avatar = ({src}) => {
  return (
    <div className="w-[50px] h-[50px] flex justify-center items-center rounded-full shadow-lg">
      <img className="w-full h-full rounded-full" src={src} alt="image"/>
    </div>
  )
}

export default Avatar
