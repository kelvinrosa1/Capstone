import { Link } from "react-router-dom"
import { AiOutlineUser } from "react-icons/ai";


function Navabar() {
  return (
    <>
    <div className="navbar">
      <h1 className="logo">UniversalMarket</h1>
        <Link to='/'>Home</Link>
        <Link to='/login'>Login</Link>
        <Link to='/profile'><AiOutlineUser/></Link>
    </div>
    </>
  )
}

export default Navabar