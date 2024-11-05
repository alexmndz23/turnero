import React from 'react'
import { useForm } from '@inertiajs/react'
import { Button, Input } from '@nextui-org/react'

export default function EditInfoForm ({ user }) {
  const { data, setData, patch, processing, errors } = useForm({
    name: user.name,
    email: user.email
  })

  function submit (e) {
    e.preventDefault()
    patch(`/user/update-info/${user.id}`, data)
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
            onChange={e => setData('email', e.target.value)}
          />
          {errors.email && <span className='text-red-500 text-sm'>{errors.email}</span>}
        </div>
        <div className='flex gap-3 justify-end py-3'>
          <Button color='primary' type='submit' disabled={processing}>Save changes</Button>
        </div>
      </div>
    </form>
  )
}
