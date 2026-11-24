import React, { useEffect, useState } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { FiUpload } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import toast from 'react-hot-toast'
import { setUserDetails } from '../store/userSlice'

const UserProfileAvatarEdit = ({ close }) => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0] || null
    setFile(selectedFile)
    setPreview(selectedFile ? URL.createObjectURL(selectedFile) : '')
  }

  const handleUpload = async (event) => {
    event.preventDefault()
    if (!file) {
      toast.error('Choose an image first')
      return
    }

    const formData = new FormData()
    formData.append('avatar', file)

    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.uploadAvatar,
        data: formData,
      })

      if (response.data.success) {
        dispatch(setUserDetails({ ...user, ...response.data.data }))
        dispatch(updatedAvatar(response.data.data.avatar))
        toast.success(response.data.message)
        close()
      } else {
        toast.error(response.data.message || 'Could not upload your photo')
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className='fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4' role='dialog' aria-modal='true' aria-labelledby='avatar-dialog-title'>
      <form onSubmit={handleUpload} className='w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl'>
        <div className='flex items-center justify-between'>
          <h2 id='avatar-dialog-title' className='text-lg font-semibold text-slate-900'>Update profile photo</h2>
          <button type='button' onClick={close} aria-label='Close' className='rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800'>
            <IoClose size={20}/>
          </button>
        </div>
        <div className='mx-auto mt-5 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-green-50 text-green-700 ring-4 ring-green-50'>
          {preview || user.avatar ? (
            <img
              alt={user.name || 'Profile'}
              src={preview || user.avatar}
              className='h-full w-full object-cover'
            />
          ) : (
            <FaRegUserCircle size={60}/>
          )}
        </div>
        <label className='mt-6 flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-green-300 hover:bg-green-50'>
          <FiUpload size={17}/>
          {file ? file.name : 'Choose an image'}
          <input
            type='file'
            accept='image/*'
            className='sr-only'
            onChange={handleFileChange}
          />
        </label>
        <button
          type='submit'
          disabled={loading || !file}
          className='mt-4 w-full rounded-lg bg-green-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50'
        >
          {loading ? 'Uploading...' : 'Upload photo'}
        </button>
      </form>
    </section>
  )
}

export default UserProfileAvatarEdit