import { useState } from 'react'

function Form() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    dob: '',
    gender: '',
    terms: false
  })

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters'
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, number & special character'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    const phoneRegex = /^[0-9]{10}$/
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required'
    } else if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone must be 10 digits'
    }

    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required'
    } else {
      const birthDate = new Date(formData.dob)
      const today = new Date()
      let age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      if (age < 18) {
        newErrors.dob = 'You must be at least 18 years old'
      }
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required'
    }

    if (!formData.terms) {
      newErrors.terms = 'You must accept the terms and conditions'
    }

    return newErrors
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validateForm()

    if (Object.keys(newErrors).length === 0) {
      setSuccessMsg('✅ Registration successful! Your form has been submitted.')
      setSubmitted(true)
      console.log('Form Data:', formData)
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          phone: '',
          dob: '',
          gender: '',
          terms: false
        })
        setSuccessMsg('')
        setSubmitted(false)
      }, 3000)
    } else {
      setErrors(newErrors)
      setSuccessMsg('')
    }
  }

  return (
    <div className="form-wrapper">
      <h1>Register Account</h1>
      <p className="subtitle">Create your new account to get started</p>

      {successMsg && <div className="success-message">{successMsg}</div>}

      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name *</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John"
              className={errors.firstName ? 'input-error' : ''}
            />
            {errors.firstName && <span className="error">{errors.firstName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name *</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Smith"
              className={errors.lastName ? 'input-error' : ''}
            />
            {errors.lastName && <span className="error">{errors.lastName}</span>}
          </div>
        </div>

        <div className="form-row full">
          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john.smith@example.com"
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
        </div>

        <div className="form-row full">
          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="9876543210"
              className={errors.phone ? 'input-error' : ''}
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="dob">Date of Birth *</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className={errors.dob ? 'input-error' : ''}
            />
            {errors.dob && <span className="error">{errors.dob}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender *</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={errors.gender ? 'input-error' : ''}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <span className="error">{errors.gender}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && <span className="error">{errors.password}</span>}
            <small className="hint">Min 8 chars: uppercase, lowercase, number & special character</small>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password *</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className={errors.confirmPassword ? 'input-error' : ''}
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>
        </div>

        <div className="form-row full">
          <div className="form-group checkbox-group">
            <label htmlFor="terms">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
              />
              <span>I agree to the Terms and Conditions *</span>
            </label>
            {errors.terms && <span className="error">{errors.terms}</span>}
          </div>
        </div>

        <button type="submit" className="btn-submit">Create Account</button>
      </form>

      <p className="login-link">Already have an account? <a href="#">Sign in</a></p>
    </div>
  )
}

export default Form