import { useContext, useState } from "react"
import { Context } from "../App"

function Home() {
  const [signup, login, userInfo, addNote, refreshToken, getInformation, information, deleteNote, updatePassword, deleteAcount, deleteAcountToF, setDeleteAcountToF, updatePasswordToF, setUpdatePasswordToF, setCheckPasswordSingUp, setCheckEmailSingUp, emailRequiredLogIn, passwordRequiredLogIn, eOPIncorrectLogIn, setEmailRequiredLogIn, setPasswordRequiredLogIn, setEOPIncorrectLogIn, fieldsRequiredSingUp, setFieldsRequiredSingUp, noteDOC] = useContext(Context)

  // const comparator = (a, b) => {
  //   const valueComparison = a[Object.keys(a)[0]].localeCompare(b[Object.keys(b)[0]]);
  //   return valueComparison * -1; // Reverse the sort order.
  // };

  // <tbody>
  //   {
  //     userInfo.sort(comparator).map((info) => {
  //       return (
  //         <tr className=" border-b" key={info._id}>
  //           <td className=' p-4 pl-4'>{info.note}</td>
  //           <td className=" p-4 w-8"><button onClick={() => deleteNote(info._id)} className=" border rounded bg-red-600 p-1">Delete</button></td>
  //         </tr>
  //       )
  //     })
  //   }
  // </tbody>
  
  // use the method reverse at catch the response
  console.log(userInfo);

    return (
      <>
        <h1 className=" text-center text-2xl mt-2">Welcome to Note App</h1>
        <h1 className=" text-center text-2xl mb-2">{information.user}</h1>
        <div className=" flex flex-col items-center">
          <div className=" border rounded mt-2 mb-5 bg-indigo-950 max-sm:w-11/12">
            <h1 className=" text-center text-xl bg-violet-950 rounded-t-lg pb-3 pt-2 border-b">This are your Notes:</h1>
            <div id="tablehome" className=" rounded rounded-tl-none rounded-tr-none w-96 max-sm:w-11/12 h-32 flex flex-row justify-center overflow-y-scroll">
              <table id="tablehome" className=" w-96 rounded-2xl rounded-tl-none rounded-tr-none">
                <thead className="border">
                </thead>
                <tbody>
                  {
                    userInfo.map((info) => {
                      return (
                        <tr className=" border-b" key={info._id}>
                          <td className=' p-4 pl-4'>{info.note}</td>
                          <td className=" p-4 w-8"><button onClick={() => deleteNote(info._id)} className=" border rounded bg-red-600 p-1">Delete</button></td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className=" flex flex-col items-center">
          <div className={noteDOC==="Note created"?" text-center w-96 max-sm:w-11/12 bg-green-500 rounded":" text-center w-96 max-sm:w-11/12 bg-red-500 rounded"}>{noteDOC}</div>
        </div>
        <form className=" text-center flex flex-row justify-center items-center gap-2 mt-2" id="form">
            <div>
              <input className=" text-black pl-1 w-60 max-sm:w-52 h-8" name="note" type="text" placeholder="Add a note"/>
            </div>
            <div>
              <button className="border p-1 rounded bg-green-700" onClick={addNote}>Add Note</button>
            </div>
        </form>
      </>
    )
  }
  
  export default Home