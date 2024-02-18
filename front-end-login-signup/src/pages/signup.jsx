import { useContext, useState } from "react"
import { Context } from "../App"
import { Link } from "react-router-dom"

function SignUp() {
    const [signup, login, userInfo, addNote, refreshToken, getInformation, information, deleteNote, updatePassword, deleteAcount, deleteAcountToF, setDeleteAcountToF, updatePasswordToF, setUpdatePasswordToF, setCheckPasswordSingUp, setCheckEmailSingUp, emailRequiredLogIn, passwordRequiredLogIn, eOPIncorrectLogIn, setEmailRequiredLogIn, setPasswordRequiredLogIn, setEOPIncorrectLogIn, fieldsRequiredSingUp]  = useContext(Context)
    
    const [checkPassword, setCheckPassword] = useState("");
    const [checkUser, setCheckUser] = useState("");
    const [checkEmail, setCheckEmail] = useState("");

    const [password1, setpassword1] = useState("");
    const [password2, setpassword2] = useState("");

    const [passwordMatchToF, setPasswordMatchToF] = useState("");

    
    // if (checkUser === "" && checkEmail === "" && checkPassword === "" && fieldsRequiredSingUp !== "") {
    //   setCheckPassword("field required")
    //   setPasswordMatchToF("field required")
    //   setCheckUser("field required")
    //   setCheckEmail("field required")
    // }
    
    const validPassword = (e) => {
      setpassword1(e.target.value)
      let ValidRegExpUCase = /^(?=.*[A-Z]).*$/;
      let ValidRegExpLCase = /^(?=.*[a-z]).*$/;
      let ValidRegExpONumber = /^(?=.*[0-9]).*$/;
      console.log("valid password");
      let password = e.target.value;
      if (password.length < 8) {
        setCheckPassword("password must contain at least 8 characters long")
        setCheckPasswordSingUp(false)
      } else if (!ValidRegExpUCase.test(password)) {
        setCheckPassword("password must contain at least one uppercase")
        setCheckPasswordSingUp(false)
      } else if (!ValidRegExpLCase.test(password)) {
        setCheckPassword("password must contain at least one lowercase")
        setCheckPasswordSingUp(false)
      } else if (!ValidRegExpONumber.test(password)) {
        setCheckPassword("password must contain at least one number")
        setCheckPasswordSingUp(false)
      } else {
        setCheckPassword("")
        setCheckPasswordSingUp(true)
      }

      if (e.target.value !== password2) {
        setPasswordMatchToF("Password does not match with the above")
      } else {
        setPasswordMatchToF("")
      }
    }

    const validPasswordMatch = (e) => {
      setpassword2(e.target.value)
      let passwordMatch = e.target.value;
      if (password1 !== passwordMatch) {
        setPasswordMatchToF("Password does not match with the above")
      } else {
        setPasswordMatchToF("")
      }
    }

    const validUser = (e) => {
      console.log(e.target.value);
      fetch("http://localhost:3000/api/db-users/users/validuser",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user: e.target.value
        })
      })
      .then(res => res.json())
      .then(response => {
        console.log(response)
        // setUserInfo(response)
        if (response.update === "user alrady exist") {
          setCheckUser("user alrady exist")
        } else {
          setCheckUser("")
        }
      })
      .catch(err => console.log(err))
    }

    const validEmail = (e) => {
      console.log(e.target.value);
      let ValidRegExpEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      let email = e.target.value;
      

      fetch("http://localhost:3000/api/db-users/users/validemail",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: e.target.value
        })
      })
      .then(res => res.json())
      .then(response => {
        console.log(response)
        // setUserInfo(response)
        if (response.update === "email alrady registered") {
          setCheckEmail("email alrady registered")
        } else if (!ValidRegExpEmail.test(email)) {
          setCheckEmail("use this format: example@example.com")
          setCheckEmailSingUp(false)
        } else {
          setCheckEmail("")
          setCheckEmailSingUp(true)
        }
      })
      .catch(err => console.log(err))
    }

    return (
      <>
        <div className=" flex flex-col items-center">
          <div className=" border mt-6 w-96 max-sm:w-11/12 rounded pb-4 bg-violet-950">
            <h1 className=" text-center text-3xl mt-2">Sign Up</h1>
            <form id="form" className=" flex flex-col m-4 gap-4">
                <div>
                    <label className=" text-xl">Enter you Email</label><input className=" text-black pl-1 w-full h-8 mt-1" onChange={validEmail} name="email" type="email" />
                    <div className=" text-yellow-500">{checkEmail}</div>
                </div>
                <div>
                    <label className=" text-xl">Choose a UserName</label><input className=" text-black pl-1 w-full h-8 mt-1" onChange={validUser} name="user" type="text" />
                    <div className=" text-yellow-500">{checkUser}</div>
                </div>
                <div>
                    <label className=" text-xl">Choose a PassWord</label><input className=" text-black pl-1 w-full h-8 mt-1" onChange={validPassword} name="password" type="password" />
                    <div className=" text-yellow-500">{checkPassword}</div>
                </div>
                <div>
                    <label className=" text-xl">Confirm the PassWord</label><input className=" text-black pl-1 w-full h-8 mt-1" onChange={validPasswordMatch} name="passwordConfirm" type="password" />
                    <div className=" text-yellow-500">{passwordMatchToF}</div>
                </div>
                <div>
                  <button className="border p-2 text-xl rounded w-full bg-green-700 hover:bg-green-800 hover:shadow-sm hover:shadow-slate-600 mt-3" onClick={signup}>Sign Up</button>
                  <div className=" text-yellow-500 text-center pt-1">{fieldsRequiredSingUp}</div>
                </div>
            </form>
          </div>
          <p className=" text-lg max-sm:w-11/12 max-sm:text-center mt-4">You already have an account, <Link className=" text-xl underline text-cyan-400" to="/login">log in</Link></p>
        </div>
      </>
    )
  }
  
  export default SignUp