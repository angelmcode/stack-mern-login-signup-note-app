import { createContext, useEffect, useState } from 'react'
import { BrowserRouter, Link, useNavigate, Route, Routes, Navigate, Await } from 'react-router-dom'
import './App.css'
import Home from './pages/home'
import SignUp from './pages/signup'
import LogIn from './pages/login'
import Settings from './pages/settings'
export const Context = createContext()

function App() {
  // const [count, setCount] = useState("context from app")
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState([]);
  const [information, setInformation] = useState([]);
  const [deleteAcountToF, setDeleteAcountToF] = useState(false);
  const [updatePasswordToF, setUpdatePasswordToF] = useState(false);

  const [checkPasswordSingUp, setCheckPasswordSingUp] = useState(false);
  const [checkEmailSingUp, setCheckEmailSingUp] = useState(false);
  const [fieldsRequiredSingUp, setFieldsRequiredSingUp] = useState("");

  const [passwordRequiredLogIn, setPasswordRequiredLogIn] = useState("");
  const [emailRequiredLogIn, setEmailRequiredLogIn] = useState("");
  const [eOPIncorrectLogIn, setEOPIncorrectLogIn] = useState("");

  const [noteDOC, setNoteDOC] = useState("");

  const signup = (e) => {
    e.preventDefault();
    let form = document.getElementById("form");
    let data = new FormData(form)

    console.log(data.get("email"))
    console.log(data.get("user")) 
    // console.log(data.get("password"))
    // console.log(data.get("passwordConfirm"))
    if (data.get("email") === "" || data.get("user") === "" || data.get("password") === "" || data.get("passwordConfirm") === "") {
      setFieldsRequiredSingUp("all fields are required")
      setTimeout(() => {
        setFieldsRequiredSingUp("")
      }, 4000);
    } else if (data.get("password") === data.get("passwordConfirm") && checkPasswordSingUp === true && checkEmailSingUp === true) {
      fetch("http://localhost:3000/api/db-users/users/signup",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: data.get("email"),
            user: data.get("user"), 
            password: data.get("password")
        })
      })
      .then(res => res.json())
      .then(response => {
        console.log(response)
        // setUserInfo(response)
        if (response.hi === "user created") {
          navigate("/login")
          form.reset();
        }
      })
      .catch(err => console.log(err)) 
    } else {
      console.log("password doesnt match")
    }
  };

  const login = (e) => {
    e.preventDefault();
    let form = document.getElementById("form");
    let data = new FormData(form)

    console.log(data.get("email")) 
    console.log(data.get("password"))
    // console.log(data.get("cmpw"))

    if (data.get("email") === "" && data.get("password") === "") {
      console.log("email required");
      setEmailRequiredLogIn("email required")
      console.log("password required");
      setPasswordRequiredLogIn("password required")
      setEOPIncorrectLogIn("")
    } else if (data.get("email") === "") {
      console.log("email required");
      setEmailRequiredLogIn("email required")
      setPasswordRequiredLogIn("")
      setEOPIncorrectLogIn("")
    } else if (data.get("password") === "") {
      console.log("password required");
      setPasswordRequiredLogIn("password required")
      setEmailRequiredLogIn("")
      setEOPIncorrectLogIn("")
    } else {
      fetch("http://localhost:3000/api/db-users/users/login",{
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: data.get("email"), 
            password: data.get("password")
        })
      })
      .then(res => res.json())
      .then(response => {
        console.log(response)
        setInformation(response)
        // localStorage.setItem("logingin", "true")
        if (response.update === "user match") {
          navigate("/")
          // document.cookie = "logingin=true; max-age=15"
          getInformation()
        } else if (response.update === "email or password is incorrect" || response.update === "wrong details") {
          console.log("email or password is incorrect");
          setEOPIncorrectLogIn("email or password is incorrect")
          setEmailRequiredLogIn("")
          setPasswordRequiredLogIn("")
        }
      })
      .catch(err => console.log(err))
      form.reset();
    }
  };

  const addNote = (e) => {
    e.preventDefault();
    let form = document.getElementById("form");
    let data = new FormData(form);

    console.log(data.get("note"));
    const userNote = data.get("note");

    fetch("http://localhost:3000/api/db-users/notes/notecreated",{
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user: userInfo.user, 
            note: data.get("note")
        })
    })
    .then(res => res.json())
    .then(response => {
        console.log(response)
        if (response.data === "token is not valid") {
          reStartToken(userNote)
          console.log("userNote" + userNote)  
          // window.location.reload();
        } else if (response.data !== "token is not valid" || response.data !== "no authenticated") {
          getInformation();
          setNoteDOC("Note created")
          setTimeout(() => {
            setNoteDOC("")
          }, 2000);
          // document.getElementById("tablehome").scrollTop = document.getElementById("tablehome").scrollHeight;
          // console.log(document.getElementById("tablehome").scrollHeight + 500);
        }
    })
    .catch(err => console.log(err));

    form.reset();
  };

  async function reStartToken(userNote) {
    await refreshToken()
    console.log("reStarted")
      fetch("http://localhost:3000/api/db-users/notes/notecreated",{
          method: "POST",
          credentials: "include",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              user: userInfo.user, 
              note: userNote
          })
      })
      .then(res => res.json())
      .then(response => {
          console.log(response)
          if (response.data === "token is not valid") {
            navigate("/login")  
          }
          getInformation();
      })
      .catch(err => console.log(err));
  };

  const logout = (e) => {
    e.preventDefault();
    // console.log("logout")
    fetch("http://localhost:3000/api/db-users/users/logout",{
        method: "DELETE",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(response => {
      document.cookie = "logingin=true; max-age=0"
      console.log(response)
      navigate("/login")
    })
    .catch(err => console.log(err))
  }

  const refreshToken = async (e) => {
    await fetch("http://localhost:3000/api/db-users/users/refreshtoken",{
      method: "GET",
      credentials: "include",
      headers: {
          "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(response => {
      console.log(response)
      if (response.data == "unauthenticated") {
        console.log("hi refresh")
        navigate("/login")
      } else if (response.data === "no authenticated 2") {
        window.location.reload();
      }
      // if (response.dataToken == "refreshed") {
      //   return true;
      // }
    })
    .catch(err => console.log(err));
  };

  const getInformation = async() => {
    // document.cookie = "logingin=true; max-age=15"
    await fetch("http://localhost:3000/api/db-users/notes/informationusernotes",{
      method: "GET",
      credentials: "include",
      headers: {
          "Content-Type": "application/json",
          "authorization": "Bearer " + userInfo.token,
          "user": userInfo.user
      }
    })
    .then(res => res.json())
    .then(response => {
      
      console.log(response)
      if (response.data === "token is not valid") {
        refreshToken()
        // navigate("/login")
      }
      // setInformation(response)
      
      setUserInfo(response.reverse())
      getUser()
      document.getElementById("tablehome").scrollTop = 0
      // return true;
    })
    .catch(err => console.log(err))

    console.log(information)
  };

  const getUser = () => {
    // document.cookie = "logingin=true; max-age=15"
    fetch("http://localhost:3000/api/db-users/users/getinfouser",{
      method: "GET",
      credentials: "include",
      headers: {
          "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(response => {
      console.log(response)
      setInformation(response)
    })
    .catch(err => console.log(err))
  };

  useEffect(() => {
    console.log("use effect")
    let loginin = localStorage.getItem("logingin") 
    const cookies = document.cookie.split('; ');

    const cookieObject = {};

    for (const cookie of cookies) {
        const name = cookie.split('=')[0];
        const value = cookie.split('=')[1];

        cookieObject[name] = value;
    }
    console.log(cookieObject.logingin)
    console.log(loginin)
    if (cookieObject.logingin === "true") {
     console.log("yikesbefore" + userInfo)
     getInformation()
    //  getUser()
    }
  }, [])

  const renderHomeOrLogin = () => {
    const cookies = document.cookie.split('; ');

    const cookieObject = {};

    for (const cookie of cookies) {
        const name = cookie.split('=')[0];
        const value = cookie.split('=')[1];

        cookieObject[name] = value;
    }
    console.log(cookieObject.logingin)
    if (cookieObject.logingin === "true") {
      return <Home />
    } else {
      return <LogIn />
    }
  }

  const deleteNote = (id) => {
    console.log("delete note")
    console.log(id)
    const userId = id;
    fetch(`http://localhost:3000/api/db-users/notes/notedelete/${id}`,{
        method: "DELETE",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(response => {
      console.log(response)
      if (response.data === "token is not valid") {
        reStartTokenAndDelte(userId)
        console.log("userId" + userId)
      } else {
        getInformation();
        setNoteDOC("Note deleted")
          setTimeout(() => {
            setNoteDOC("")
          }, 2000);
      }
    })
    .catch(err => console.log(err))
  };

  async function reStartTokenAndDelte(userId) {
    await refreshToken()
    console.log("reStarted")
    fetch(`http://localhost:3000/api/db-users/notes/notedelete/${userId}`,{
      method: "DELETE",
      credentials: "include",
      headers: {
          "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(response => {
      console.log(response)
      if (response.data === "token is not valid") {
        navigate("/login")  
      }
      getInformation();
    })
    .catch(err => console.log(err))
  };

  const renderLSLorLSD = () => {
    const cookies = document.cookie.split('; ');

    const cookieObject = {};

    for (const cookie of cookies) {
        const name = cookie.split('=')[0];
        const value = cookie.split('=')[1];

        cookieObject[name] = value;
    }
    console.log(cookieObject.logingin)
    if (cookieObject.logingin === "true") {
      return (
        <nav className=' w-1/4 pl-2'>
          <ul className='flex flex-row gap-5 h-full items-center justify-end pr-6'>
            <li className=' border-r pr-5'>
              <Link className=' text-lg' to="/settings">Settings</Link>
            </li>
            <li>
              <a className=' text-lg' href="" onClick={logout}>Logout</a>
            </li>
          </ul>
        </nav>
      )
    } else {
      return (
        <nav className=' w-1/3 pl-2 mr-4'>
          <ul className='flex flex-row gap-5 h-full items-center justify-end pr-6'>
            <li className=' border-r pr-5'>
              <Link className=' text-lg' to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link className=' text-lg' to="/login">Log In</Link>
            </li>
            {/* <li>
              <a className=' text-lg' href="" onClick={logout}>Logout</a>
            </li> */}
          </ul>
        </nav>
      )
    }
  }

  const updatePassword = async(e) => {
    e.preventDefault();
    await refreshToken();
    console.log("update password");
    let form = document.getElementById("formUpdatePassword");
    let data = new FormData(form)

    console.log(data.get("formerPassword"))
    console.log(data.get("newPassword"))
    console.log(information.user);
    let user = information.user;

    fetch("http://localhost:3000/api/db-users/users/updatePassword",{
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user: user,
            formerPassword: data.get("formerPassword"),
            newPassword: data.get("newPassword")
        })
    })
    .then(res => res.json())
    .then(response => {
        console.log(response)
        if (response.update === "password updated") {
          console.log("update password");
          setUpdatePasswordToF(true)
          setTimeout(() => {
            setUpdatePasswordToF(false)
          }, 4000);
        }
    })
    .catch(err => console.log(err))
    form.reset();
  }

  const deleteAcount = async(e) => {
    e.preventDefault();
    await refreshToken();
    let form = document.getElementById("formDeleteAcount");
    let data = new FormData(form)

    console.log(data.get("password"))
    console.log(information.user);
    let user = information.user;

    fetch("http://localhost:3000/api/db-users/users/deleteAcount",{
        method: "DELETE",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user: user,
            password: data.get("password")
        })
    })
    .then(res => res.json())
    .then(response => {
        console.log(response)
        if (response.update === "deleted Acount") {
          console.log("delete acount");
          deleteAcountNotes(user)
          setDeleteAcountToF(true)
          setTimeout(() => {
            setDeleteAcountToF(false)
            document.cookie = "logingin=true; max-age=0"
            navigate("/login")
          }, 4000);
        }
    })
    .catch(err => console.log(err))
    form.reset();
  }

  const deleteAcountNotes = (user) => {
    fetch("http://localhost:3000/api/db-users/notes/deleteAcountNotes",{
        method: "DELETE",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user: user
        })
    })
    .then(res => res.json())
    .then(response => {
        console.log(response)
        console.log("delete acount notes");
    })
    .catch(err => console.log(err))
  }

  return (
    <>
      <Context.Provider value={ [signup, login, userInfo, addNote, refreshToken, getInformation, information, deleteNote, updatePassword, deleteAcount, deleteAcountToF, setDeleteAcountToF, updatePasswordToF, setUpdatePasswordToF, setCheckPasswordSingUp, setCheckEmailSingUp, emailRequiredLogIn, passwordRequiredLogIn, eOPIncorrectLogIn, setEmailRequiredLogIn, setPasswordRequiredLogIn, setEOPIncorrectLogIn, fieldsRequiredSingUp, setFieldsRequiredSingUp, noteDOC] }>
        <div className='flex flex-row border-b justify-end h-14'>
          <div className='w-full flex flex-row items-center pl-6 text-3xl hover:text-blue-100'>
            <Link to="/">Note App</Link>
          </div>
          {renderLSLorLSD()}
        </div>
        <Routes>
          <Route path='/' element={renderHomeOrLogin()} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </Context.Provider>
    </>
  )
}

export default App