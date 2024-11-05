import { useForm } from '@inertiajs/react'
import { Button, Input } from '@nextui-org/react'
import React from 'react'

export default function EditUserForm ({ user, onClose }) {
  const { data, setData, patch, processing, errors } = useForm({
    name: user.name,
    email: user.email
  })

  function submit (e) {
    e.preventDefault()
    patch(`/user/${user.id}`, {
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
            placeholder='Enter new user name'
            value={data.name}
            variant='underlined'
            onChange={e => setData('name', e.target.value)}
          />
          {errors.name && <span className='text-red-500 text-sm'>{errors.name}</span>}
        </div>
        <div>
          <Input
            type='text'
            label='Email'
            placeholder='Enter new user email'
            value={data.email}
            variant='underlined'
            onChange={e => setData('email', e.target.value)}
          />
          {errors.email && <span className='text-red-500 text-sm'>{errors.email}</span>}
        </div>
        <div className='flex gap-3 justify-end py-3'>
          <Button onClick={onClose}>Cancel</Button>
          <Button color='primary' type='submit' disabled={processing}>Save & close</Button>
        </div>
      </div>
    </form>
  )
}
