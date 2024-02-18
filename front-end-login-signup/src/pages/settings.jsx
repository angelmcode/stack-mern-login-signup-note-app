import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Context } from "../App"

function Settings() {
  const navigate = useNavigate();

  const [signup, login, userInfo, addNote, refreshToken, getInformation, information, deleteNote, updatePassword, deleteAcount, deleteAcountToF, setDeleteAcountToF, updatePasswordToF, setUpdatePasswordToF, setCheckPasswordSingUp, setCheckEmailSingUp]  = useContext(Context)
  
  const [deletetof, setDeletetof] = useState(false);

  useEffect(() => {
    console.log("use effect settings") 
    const cookies = document.cookie.split('; ');

    const cookieObject = {};

    for (const cookie of cookies) {
        const name = cookie.split('=')[0];
        const value = cookie.split('=')[1];

        cookieObject[name] = value;
    }
    console.log(cookieObject.logingin)
    if (cookieObject.logingin !== "true") {
      navigate("/login")
    }
  }, [])

  const deleteAcount1 = () => {
    setDeletetof(!deletetof)
  }

  const exitButton = (e) => {
    e.preventDefault();
    setDeletetof(false)
  }

  const okButtonUpdatePassword = () => {
    setUpdatePasswordToF(false)
  }

  const okButtonDeleteAcount = () => {
    setDeleteAcountToF(false)
    document.cookie = "logingin=true; max-age=0"
    navigate("/login")
  }

  const backToHome = () => {
    navigate("/")
  }

    return (
      <>
        <div className=" flex flex-col items-center">
          <div className=" border mt-6 w-96 max-sm:w-11/12 rounded pb-4 bg-violet-950">
            <h1 className=" text-center text-3xl mt-2">Update Password</h1>
            <form id="formUpdatePassword" className=" flex flex-col m-4 mb-2 gap-4">
                <div>
                    <label className=" text-xl">Former PassWord</label><br/><input className=" text-black pl-1 w-full h-8 mt-1" name="formerPassword" type="password" />
                </div>
                <div>
                    <label className=" text-xl">New PassWord</label><br/><input className=" text-black pl-1 w-full h-8 mt-1" name="newPassword" type="password" />
                </div>
                <div>
                  <button className="border p-2 text-xl rounded w-full bg-green-700 hover:bg-green-800 hover:shadow-sm hover:shadow-slate-600 mt-3" onClick={updatePassword}>Update PassWord</button>
                </div>
            </form>
          </div>
          <button onClick={deleteAcount1} className=" border p-2 text-xl rounded w-96 max-sm:w-11/12 bg-red-700 hover:bg-red-800 hover:shadow-sm hover:shadow-slate-600 mt-14">Delete Acount</button>
          <button onClick={backToHome} className=" border p-2 text-xl rounded w-96 max-sm:w-11/12 bg-blue-700 hover:bg-blue-800 hover:shadow-sm hover:shadow-slate-600 mt-6">Back to Home</button>

          <div className={deletetof===true?" fixed z-10 rounded top-20 w-1/2 border scale-100 max-sm:w-11/12":" fixed z-10 rounded top-1/2 w-1/2 border scale-0"}>
            <div className=" flex flex-row w-full justify-center bg-red-800 rounded-r rounded-l">
              <div className=" w-full h-11 text-center text-2xl pt-1">Warning</div><button onClick={exitButton} className=" text-center pb-2 w-12 text-2xl h-11">x</button>
            </div>
            <div className=" bg-violet-950 text-xl text-justify p-4"> You are about to delete your Acount. All information relate to Account will be delete. <br />Enter your current password and push the button "delete account" if you wish delete your account, otherwise push the button cancel.
              <form id="formDeleteAcount">
                <div className=" mt-6 mb-4">
                  <label className=" text-xl">Current PassWord</label><br/><input className=" text-black pl-1 w-full h-8 mt-1" name="password" type="password" placeholder="Enter your current password"/>
                </div>
                <div>
                  <button className="border p-2 text-xl rounded w-full bg-red-700 hover:bg-red-800 hover:shadow-sm hover:shadow-slate-600 mt-3" onClick={deleteAcount}>Delete Acount</button>
                  <button className="border p-2 text-xl rounded w-full bg-green-700 hover:bg-green-800 hover:shadow-sm hover:shadow-slate-600 mt-3" onClick={exitButton}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
          <div className={deleteAcountToF===true?" bg-violet-950 fixed z-20 rounded top-20 w-1/2 h-5/6 border max-sm:w-11/12 flex flex-col justify-center items-center scale-100":" bg-white fixed z-20 rounded top-20 w-1/2 h-5/6 border max-sm:w-11/12 flex flex-col justify-center items-center scale-0"}>
            <div className=" text-green-400 text-5xl text-center">Acount Deleted Successfuly</div>
            <button className="border p-2 text-xl rounded w-11/12 bg-green-700 hover:bg-green-800 hover:shadow-sm hover:shadow-slate-600 mt-10" onClick={okButtonDeleteAcount}>OK</button>
          </div>
          <div className={updatePasswordToF===true?" bg-violet-950 fixed z-20 rounded top-20 w-1/2 h-5/6 border max-sm:w-11/12 flex flex-col justify-center items-center scale-100":" bg-white fixed z-20 rounded top-20 w-1/2 h-5/6 border max-sm:w-11/12 flex flex-col justify-center items-center scale-0"}>
            <div className=" text-green-400 text-5xl text-center">Password Updated Successfuly</div>
            <button className="border p-2 text-xl rounded w-11/12 bg-green-700 hover:bg-green-800 hover:shadow-sm hover:shadow-slate-600 mt-10" onClick={okButtonUpdatePassword}>OK</button>
          </div>
          <div className={deletetof===true?" bg-black opacity-50 fixed top-0 left-0 right-0 bottom-0 scale-100":" bg-black opacity-50 fixed top-0 left-0 right-0 bottom-0 scale-0"}></div>
        </div>
      </>
    )
  }
  
  export default Settings