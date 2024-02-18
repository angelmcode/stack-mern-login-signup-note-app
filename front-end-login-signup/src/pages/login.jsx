import { useContext } from "react"
import { Link } from "react-router-dom"
import { Context } from "../App"

function LogIn() {
  const [signup, login, userInfo, addNote, refreshToken, getInformation, information, deleteNote, updatePassword, deleteAcount, deleteAcountToF, setDeleteAcountToF, updatePasswordToF, setUpdatePasswordToF, setCheckPasswordSingUp, setCheckEmailSingUp, emailRequiredLogIn, passwordRequiredLogIn, eOPIncorrectLogIn, setEmailRequiredLogIn, setPasswordRequiredLogIn, setEOPIncorrectLogIn]  = useContext(Context)
  
    const handleChangeEmail = (e) => {
      console.log(e.target.value);
      setEmailRequiredLogIn("")
      setEOPIncorrectLogIn("")
    }

    const handleChangePassword = (e) => {
      console.log(e.target.value);
      setPasswordRequiredLogIn("")
      setEOPIncorrectLogIn("")
    }

    return (
      <>
        <div className=" flex flex-col items-center">
          <div className=" border mt-6 w-96 max-sm:w-11/12 rounded pb-4 bg-violet-950">
            <h1 className=" text-center text-3xl mt-2">Log In</h1>
            <form id="form" className=" flex flex-col m-4 mb-2 gap-4">
                <div>
                    <label className=" text-xl">Email</label><br/><input className=" text-black pl-1 w-full h-8 mt-1" onChange={handleChangeEmail} name="email" type="email" />
                    <div className=" text-yellow-500">{emailRequiredLogIn}</div>
                </div>
                <div>
                    <label className=" text-xl">PassWord</label><br/><input className=" text-black pl-1 w-full h-8 mt-1" onChange={handleChangePassword} name="password" type="password" />
                    <div className=" text-yellow-500">{passwordRequiredLogIn}</div>
                </div>
                <div>
                  <button className="border p-2 text-xl rounded w-full bg-green-700 hover:bg-green-800 hover:shadow-sm hover:shadow-slate-600 mt-3" onClick={login}>Log In</button>
                  <div className=" text-yellow-500 text-center pt-1">{eOPIncorrectLogIn}</div>
                </div>
            </form>
          </div>
          <p className=" text-lg max-sm:w-11/12 max-sm:text-center mt-4">You don't have an account, <Link className=" text-xl underline text-cyan-400" to="/signup">Sign Up</Link></p>
        </div>
      </>
    )
  }
  
  export default LogIn