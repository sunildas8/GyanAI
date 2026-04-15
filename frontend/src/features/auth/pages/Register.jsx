import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Alert, AlertDescription } from '../../../components/ui'
import { Input } from '../../../components/ui'
import { Button } from '../../../components/ui'
import { Label } from '../../../components/ui'
import { PasswordInput } from '../../../components/ui'
import { useAuth } from '../hook/useAuth'
import { useDispatch, useSelector } from 'react-redux'
import { setError } from '../auth.slice'

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { handleRegister } = useAuth()
  const { error, loading } = useSelector((state) => state.auth)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    // Clear error when user is navigating away
    return () => {
      dispatch(setError(null))
    }
  }, [dispatch])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.username) {
      newErrors.username = 'Username is required'
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters'
    }

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
    // Clear global error when user starts typing
    if (error) {
      dispatch(setError(null))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSuccessMessage('')

    // Validate form
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setSubmitting(true)
    try {
      await handleRegister({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })
      
      setSuccessMessage('Registration successful! Verify your email and login.')
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      })
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (error) {
      // Error is already handled in useAuth hook
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className='min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4 dark'>
      <div className=' w-full max-w-md'>
        {/* Background gradient decoration */}
        <div className='absolute inset-0 bg-linear-to-r from-[#60A6AF]/10 to-cyan-500/10 rounded-3xl blur-3xl -z-10' />

        <div className='page-transition relative bg-slate-900/80 backdrop-blur-xl border border-cyan-500/20 rounded-2xl shadow-2xl p-8'>
          {/* Header */}
          <div className='mb-8 text-center'>
            <h1 className='text-3xl font-bold bg-linear-to-r from-[#60A6AF] to-cyan-400 bg-clip-text text-transparent mb-2'>
              Create Account
            </h1>
            <p className='text-slate-400 text-sm'>Join us to get started</p>
          </div>

            {/* Success Message */}
          {successMessage && (
            <Alert className='mb-6 border-green-500/50 bg-green-50/10'>
              <AlertDescription className='text-green-400'>
                {successMessage}
              </AlertDescription>
            </Alert>
          )}

          {/* Error Message */}
          {error && (
            <Alert variant='destructive' className='mb-6 border-red-500/50 bg-red-50/10'>
              <AlertDescription className='text-red-400'>
                {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-5'>
            {/* Username Field */}
            <div className='space-y-2'>
              <Label htmlFor='username' className='text-slate-200'>
                Username
              </Label>
              <Input
                id='username'
                type='text'
                name='username'
                placeholder='Choose a username'
                value={formData.username}
                onChange={handleChange}
                disabled={submitting}
                className={`${errors.username ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : ''}`}
              />
              {errors.username && (
                <Alert variant='destructive' className='mt-2'>
                  <AlertDescription className='text-red-400 text-xs'>
                    {errors.username}
                  </AlertDescription>
                </Alert>
              )}
            </div>

            {/* Email Field */}
            <div className='space-y-2'>
              <Label htmlFor='email' className='text-slate-200'>
                Email Address
              </Label>
              <Input
                id='email'
                type='email'
                name='email'
                placeholder='Enter your email'
                value={formData.email}
                onChange={handleChange}
                disabled={submitting}
                className={`${errors.email ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : ''}`}
              />
              {errors.email && (
                <Alert variant='destructive' className='mt-2'>
                  <AlertDescription className='text-red-400 text-xs'>
                    {errors.email}
                  </AlertDescription>
                </Alert>
              )}
            </div>

            {/* Password Field */}
            <div className='space-y-2'>
              <Label htmlFor='password' className='text-slate-200'>
                Password
              </Label>
              <PasswordInput
                id='password'
                name='password'
                placeholder='Create a password'
                value={formData.password}
                onChange={handleChange}
                disabled={submitting}
                className={`${errors.password ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : ''}`}
              />
              {errors.password && (
                <Alert variant='destructive' className='mt-2'>
                  <AlertDescription className='text-red-400 text-xs'>
                    {errors.password}
                  </AlertDescription>
                </Alert>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className='space-y-2'>
              <Label htmlFor='confirmPassword' className='text-slate-200'>
                Confirm Password
              </Label>
              <PasswordInput
                id='confirmPassword'
                name='confirmPassword'
                placeholder='Confirm your password'
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={submitting}
                className={`${errors.confirmPassword ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : ''}`}
              />
              {errors.confirmPassword && (
                <Alert variant='destructive' className='mt-2'>
                  <AlertDescription className='text-red-400 text-xs'>
                    {errors.confirmPassword}
                  </AlertDescription>
                </Alert>
              )}
            </div>

            {/* General Error moved to above */}

            {/* Submit Button */}
            <Button
              type='submit'
              disabled={submitting}
              className='w-full h-11 text-base font-semibold rounded-lg cursor-pointer'
            >
              {submitting ? 'Creating account...' : 'Sign Up'}
            </Button>
          </form>

          {/* Footer */}
          <div className='mt-6 text-center text-sm text-slate-400'>
            Already have an account?{' '}
            <button
              type='button'
              onClick={() => navigate('/login')}
              className='text-[#60A6AF] hover:text-cyan-400 font-medium transition-colors cursor-pointer border-none bg-none p-0'
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register