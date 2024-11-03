import { useForm } from '@inertiajs/react'
import { Button, Input } from '@nextui-org/react'
import React from 'react'

export default function EditAreaForm ({ area, onClose }) {
  const { data, setData, patch, processing, errors } = useForm({
    name: area.name,
    display_name: area.display_name
  })

  function submit (e) {
    e.preventDefault()
    patch(`/area/${area.id}`, {
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
            placeholder='Enter area name'
            value={data.name}
            onChange={e => setData('name', e.target.value)}
          />
          {errors.name && <span className='text-red-500 text-sm'>{errors.name}</span>}
        </div>
        <div>
          <Input
            type='text'
            label='Display name'
            placeholder='Enter area display name'
            value={data.display_name}
            onChange={e => setData('display_name', e.target.value)}
          />
          {errors.display_name && <span className='text-red-500 text-sm'>{errors.display_name}</span>}
        </div>
        <div className='flex gap-3 justify-end py-3'>
          <Button onClick={onClose}>Cancel</Button>
          <Button color='primary' type='submit' disabled={processing}>Save & close</Button>
        </div>
      </div>
    </form>
  )
}
