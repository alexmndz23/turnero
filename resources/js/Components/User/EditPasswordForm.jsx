import React from 'react'
import { useForm } from '@inertiajs/react'
import { Button, Input } from '@nextui-org/react'

export default function EditPasswordForm ({ user }) {
  const { data, setData, patch, processing, errors, reset } = useForm({
    current_password: '',
    new_password: '',
    new_password_confirmation: ''
  })

  function submit (e) {
    e.preventDefault()
    patch(`/user/update-password/${user.id}`, {
      data,
      onSuccess: () => reset()
    })
  }

  return (
    <form onSubmit={submit}>
      <div className='flex flex-col gap-4'>
        <div>
          <Input
            type='password'
            label='Current password'
            placeholder='Enter current password'
            value={data.current_password}
            onChange={e => setData('current_password', e.target.value)}
          />
          {errors.current_password && <span className='text-red-500 text-sm'>{errors.current_password}</span>}
        </div>
        <div>
          <Input
            type='password'
            label='New password'
            placeholder='Enter new password'
            value={data.new_password}
            onChange={e => setData('new_password', e.target.value)}
          />
          {errors.new_password && <span className='text-red-500 text-sm'>{errors.new_password}</span>}
        </div>
        <div>
          <Input
            type='password'
            label='New password'
            placeholder='Enter new password confirmation'
            value={data.new_password_confirmation}
            onChange={e => setData('new_password_confirmation', e.target.value)}
          />
          {errors.new_password_confirmation && <span className='text-red-500 text-sm'>{errors.new_password_confirmation}</span>}
        </div>
        <div className='flex gap-3 justify-end py-3'>
          <Button color='primary' type='submit' disabled={processing}>Update password</Button>
        </div>
      </div>
    </form>
  )
}
