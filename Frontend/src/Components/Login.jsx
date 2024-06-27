import React, { useState } from 'react'
import back from "./back.jpg"
import axios from "axios"
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setLoggedinUser } from '../redux/userSlice.js'

function Login() {
  const [page, toggle] = useState('login')
  const [registeruser, setRegisterUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [loginuser, setLoginUser] = useState({
    email: "",
    password: ""
  })

  const togglepage = () => {
    page === 'register' ? toggle('login') : toggle('register')
  }
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const SignupSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:9000/api/users/register', registeruser, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      if (res.data.success) {
        toggle('login')
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error)
    }
    setRegisterUser({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: ""
    })
  }
  const LoginSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:9000/api/users/login', loginuser, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      console.log(res)
      if (res.data.success) {
        navigate("/dashboard")
        dispatch(setLoggedinUser(res.data))
        toast.success(`Welcome ${res.data.firstName} ${res.data.lastName}`, {
          icon: '👋'
        })
      }
    } catch (error) {
      if (error.response)
        toast.error(error.response.data.message)
      else
        toast.error("Something went wrong!!")
    }
    setLoginUser({
      email: "",
      password: ""
    })
  }

  return (
    <div className='relative flex items-center h-screen m-0 bg-repeat'>
      <div className=' max-md:hidden'>
        <img src={back} className='h-screen w-[60vw]' />
      </div>
      {
        page === 'login' ?
          <div>
            <div className='bg-gray-300 w-[40vw] h-screen items-center relative z-30 flex flex-col content-center justify-center text-black bg-no-repeat border shadow-lg p-14 gap-9 max-md:w-screen '>
              <div className='h-14'>
                <h1 className='text-5xl font-bold text-center'>
                  Sign In
                </h1>
              </div>
              <div>
                <form action="" onSubmit={LoginSubmitHandler} className='flex flex-col gap-5'>
                  <div className='flex justify-around gap-11'>
                    <label className="flex items-center gap-2 bg-white input input-bordered w-96 max-[1030px]:w-72 max-[768px]:w-96 border-80">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-4 h-4 opacity-70">
                        <path
                          d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path
                          d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                      </svg>
                      <input type="text" className="grow" placeholder="Email" value={loginuser.email} onChange={(e) => setLoginUser({ ...loginuser, email: e.target.value })} />
                    </label>
                  </div>
                  <div className='flex justify-around gap-11'>
                    <label className="flex items-center gap-2 bg-white input input-bordered w-96 max-[1030px]:w-72 max-[768px]:w-96">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-4 h-4 opacity-70">
                        <path
                          fillRule="evenodd"
                          d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                          clipRule="evenodd" />
                      </svg>
                      <input type="password" className="grow" placeholder="Password" value={loginuser.password} onChange={(e) => setLoginUser({ ...loginuser, password: e.target.value })} />
                    </label>
                  </div>

                  <div className='text-center underline cursor-pointer' onClick={() => togglepage()}>
                    Don't have an account? Signup
                  </div>
                  <div className='flex justify-center'>
                    <button type="submit" className="text-white btn btn-success">Login</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          :
          <div>
            <div className='bg-gray-300 w-[40vw] h-screen items-center relative z-30 flex flex-col content-center justify-center text-black bg-no-repeat border shadow-lg p-14 gap-9 '>
              <div className='h-14'>
                <h1 className='text-5xl font-bold text-center'>
                  Sign Up
                </h1>
              </div>
              <div>
                <form action="" onSubmit={SignupSubmitHandler} className='flex flex-col gap-5'>
                  <div className='flex justify-around gap-11 max-[1030px]:w-72 max-[768px]:w-96'>
                    <label className="flex items-center gap-2 bg-white input input-bordered w-96">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-4 h-4 opacity-70">
                        <path
                          d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                      </svg>
                      <input type="text" className="grow" placeholder="Enter First Name" value={registeruser.firstName} onChange={(e) => setRegisterUser({ ...registeruser, firstName: e.target.value })} />
                    </label>
                  </div>
                  <div className='flex justify-around gap-11 max-[1030px]:w-72 max-[768px]:w-96'>
                    <label className="flex items-center gap-2 bg-white input input-bordered w-96">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-4 h-4 opacity-70">
                        <path
                          d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                      </svg>
                      <input type="text" className="grow" placeholder="Enter Last Name" value={registeruser.lastName} onChange={(e) => setRegisterUser({ ...registeruser, lastName: e.target.value })} />
                    </label>
                  </div>
                  <div className='flex justify-around gap-11 max-[1030px]:w-72 max-[768px]:w-96'>
                    <label className="flex items-center gap-2 bg-white input input-bordered w-96">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-4 h-4 opacity-70">
                        <path
                          d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path
                          d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                      </svg>
                      <input type="text" className="grow" placeholder="Email" value={registeruser.email} onChange={(e) => setRegisterUser({ ...registeruser, email: e.target.value })} />
                    </label>
                  </div>
                  <div className='flex justify-around gap-11 max-[1030px]:w-72 max-[768px]:w-96'>
                    <label className="flex items-center gap-2 bg-white input input-bordered w-96">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-4 h-4 opacity-70">
                        <path
                          fillRule="evenodd"
                          d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                          clipRule="evenodd" />
                      </svg>
                      <input type="password" className="grow" placeholder="Create a Password" value={registeruser.password} onChange={(e) => setRegisterUser({ ...registeruser, password: e.target.value })} />
                    </label>
                  </div>
                  <div className='flex justify-around gap-11 max-[1030px]:w-72 max-[768px]:w-96'>
                    <label className="flex items-center gap-2 bg-white input input-bordered w-96">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-4 h-4 opacity-70">
                        <path
                          fillRule="evenodd"
                          d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                          clipRule="evenodd" />
                      </svg>
                      <input type="password" className="grow" placeholder="Confirm Password" value={registeruser.confirmPassword} onChange={(e) => setRegisterUser({ ...registeruser, confirmPassword: e.target.value })} />
                    </label>
                  </div>


                  <div className='text-center underline cursor-pointer' onClick={() => togglepage()}>
                    Already have an Account? Sign in
                  </div>
                  <div className='flex justify-center'>
                    <button type="submit" className="text-white btn btn-success">Register</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
      }
    </div>
  )
}

export default Login

