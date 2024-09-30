import React, {useState} from "react";

import {useAuth} from "./Authentication";
import {Navigate} from "react-router";
import {fetcher} from '../fetcher'

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [showWarning, setShowWarning] = useState(false);

  const {login, isLoggedIn} = useAuth();

  if(isLoggedIn) {
    return (
        <Navigate to='/' />
    )
  }

  function handleChange(e) {
    const {name, value} = e.target;

    setFormData((prevData) => ({
      ...prevData, 
      [name]: value
    }))
  }

  return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          {showWarning && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex">
                <p>Login failed. Please check your credentials and try again.</p>
                <span
                    className="float-right cursor-pointer"
                    onClick={() => setShowWarning(false)}
                >
              &times;
            </span>
              </div>
          )}
        <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label htmlFor='username' className="block text-gray-700 text-sm font-bold mb-2">
              Username:
            </label>
            <input type='text' name='username' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.username}
                   onChange={handleChange}
                   required
            />
          </div>

          <div className="mb-4">
            <label htmlFor='password' className="block text-gray-700 text-sm font-bold mb-2">
              Password:
            </label>
            <input type='password' name='password' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.password}
                   onChange={handleChange}
                   required
            />
          </div>

          <div className="flex items-center justify-center">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Login
            </button>
          </div>
        </form>
        </div>
      </div>
  )

  async function handleLogin(e) {
    e.preventDefault();
    console.log(formData);

    try {
      await fetcher.get('/admin/login', formData, {
        headers: {
          "Content-Type": "application/json"
        }
        })
          .then(res => {
            
           console.log(res);
          });
    }catch(err) {
      console.log(err);
      clearData();
      setShowWarning(true);
    }
  }

  function clearData() {
    setFormData({
      username: "",
      password: ""
    })
  }
};
export {Login};