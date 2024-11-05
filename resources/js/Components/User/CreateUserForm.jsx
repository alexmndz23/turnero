import { useForm } from '@inertiajs/react'
import { Button, Input } from '@nextui-org/react'
import React from 'react'

export default function CreateUserForm ({ onClose }) {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  function submit (e) {
    e.preventDefault()
    post('/user', {
      data,
      onSuccess: onClose
    })
  }

  return (
    <form onSubmit={submit}>
      <div className='flex flex-col gap-4'>
        <div>
          <Input
            type='text'
            label='Name'
            placeholder='Enter user name'
            value={data.name}
            variant='underlined'
            autoComplete='off'
            onChange={e => setData('name', e.target.value)}
          />
          {errors.name && <span className='text-red-500 text-sm'>{errors.name}</span>}
        </div>
        <div>
          <Input
            type='text'
            label='Email'
            placeholder='Enter user email'
            value={data.email}
            variant='underlined'
            autoComplete='off'
            onChange={e => setData('email', e.target.value)}
          />
          {errors.email && <span className='text-red-500 text-sm'>{errors.email}</span>}
        </div>
        <div>
          <Input
            type='password'
            label='Password'
            placeholder='Enter user password'
            value={data.password}
            variant='underlined'
            autoComplete='off'
            onChange={e => setData('password', e.target.value)}
          />
          {errors.password && <span className='text-red-500 text-sm'>{errors.password}</span>}
        </div>
        <div>
          <Input
            type='password'
            label='Password confirmation'
            placeholder='Enter user password confirmation'
            value={data.password_confirmation}
            variant='underlined'
            autoComplete='off'
            onChange={e => setData('password_confirmation', e.target.value)}
          />
          {errors.password_confirmation && <span className='text-red-500 text-sm'>{errors.password_confirmation}</span>}
        </div>
        <div className='flex gap-3 justify-end py-3'>
          <Button onClick={onClose}>Cancel</Button>
          <Button color='primary' type='submit' disabled={processing}>Save & close</Button>
        </div>
      </div>
    </form>
  )
}
