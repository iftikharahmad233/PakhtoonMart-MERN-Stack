import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegUserCircle } from "react-icons/fa";
import { FiCamera, FiMail, FiPhone, FiUser } from "react-icons/fi";
import UserProfileAvatarEdit from '../components/UserProfileAvatarEdit';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';
import { setUserDetails } from '../store/userSlice';


const Profile = () => {
    const user = useSelector(state => state.user)
    const [openProfileAvatarEdit,setProfileAvatarEdit] = useState(false)
    const [userData,setUserData] = useState({
        name : user.name,
        email : user.email,
        mobile : user.mobile,
    })
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(()=>{
        setUserData({
            name : user.name,
            email : user.email,
            mobile : user.mobile,
        })
    },[user])

    const handleOnChange  = (e)=>{
        const { name, value} = e.target 

        setUserData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.updateUserDetails,
                data : userData
            })

            const { data : responseData } = response

            if(responseData.success){
                dispatch(setUserDetails(responseData.data))
                setUserData({
                    name : responseData.data.name,
                    email : responseData.data.email,
                    mobile : responseData.data.mobile,
                })
                toast.success(responseData.message)
            } else {
                toast.error(responseData.message || 'Could not update your profile')
            }

        } catch (error) {
            AxiosToastError(error)
        } finally{
            setLoading(false)
        }

    }
  return (
      <div className='space-y-6'>
          <header>
              <p className='text-sm font-semibold uppercase tracking-[0.16em] text-green-700'>Account</p>
              <h1 className='mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl'>Profile settings</h1>
              <p className='mt-2 text-sm text-slate-500'>Manage your personal information and how we can reach you.</p>
          </header>

          <section className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7'>
              <div className='flex flex-col gap-5 sm:flex-row sm:items-center'>
                  <div className='flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-green-50 text-green-700 ring-4 ring-green-50'>
                      {user.avatar ? (
                          <img
                              alt={user.name || 'Profile'}
                              src={user.avatar}
                              className='h-full w-full object-cover'
                          />
                      ) : (
                          <FaRegUserCircle size={52}/>
                      )}
                  </div>
                  <div className='min-w-0 flex-1'>
                      <h2 className='text-lg font-semibold text-slate-900'>{user.name || 'Your account'}</h2>
                      <p className='mt-1 truncate text-sm text-slate-500'>{user.email || 'Add an email address'}</p>
                  </div>
                  <button
                      type='button'
                      onClick={()=>setProfileAvatarEdit(true)}
                      className='inline-flex w-fit items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-800'
                  >
                      <FiCamera size={16}/>
                      Change photo
                  </button>
              </div>
          </section>

          {openProfileAvatarEdit && (
              <UserProfileAvatarEdit close={()=>setProfileAvatarEdit(false)}/>
          )}

          <section className='rounded-2xl border border-slate-200 bg-white shadow-sm'>
              <div className='border-b border-slate-100 px-5 py-5 sm:px-7'>
                  <h2 className='font-semibold text-slate-900'>Personal information</h2>
                  <p className='mt-1 text-sm text-slate-500'>Keep your contact details up to date.</p>
              </div>
              <form className='space-y-5 p-5 sm:p-7' onSubmit={handleSubmit}>
                  <div className='grid gap-5 md:grid-cols-2'>
                      <div className='space-y-2'>
                          <label htmlFor='name' className='text-sm font-medium text-slate-700'>Full name</label>
                          <div className='relative'>
                              <FiUser className='pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400' size={17}/>
                              <input
                                  type='text'
                                  id='name'
                                  placeholder='Enter your name'
                                  className='w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-600/10'
                                  value={userData.name}
                                  name='name'
                                  onChange={handleOnChange}
                                  required
                              />
                          </div>
                      </div>
                      <div className='space-y-2'>
                          <label htmlFor='email' className='text-sm font-medium text-slate-700'>Email address</label>
                          <div className='relative'>
                              <FiMail className='pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400' size={17}/>
                              <input
                                  type='email'
                                  id='email'
                                  placeholder='Enter your email'
                                  className='w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-600/10'
                                  value={userData.email}
                                  name='email'
                                  onChange={handleOnChange}
                                  required
                              />
                          </div>
                      </div>
                      <div className='space-y-2 md:col-span-2'>
                          <label htmlFor='mobile' className='text-sm font-medium text-slate-700'>Mobile number</label>
                          <div className='relative'>
                              <FiPhone className='pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400' size={17}/>
                              <input
                                  type='text'
                                  id='mobile'
                                  placeholder='Enter your mobile number'
                                  className='w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-600/10'
                                  value={userData.mobile}
                                  name='mobile'
                                  onChange={handleOnChange}
                                  required
                              />
                          </div>
                      </div>
                  </div>
                  <div className='flex justify-end border-t border-slate-100 pt-5'>
                      <button
                          type='submit'
                          disabled={loading}
                          className='inline-flex min-w-36 items-center justify-center rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-700/20 disabled:cursor-not-allowed disabled:opacity-60'
                      >
                          {loading ? 'Saving...' : 'Save changes'}
                      </button>
                  </div>
              </form>
          </section>
      </div>
  )
}

export default Profile