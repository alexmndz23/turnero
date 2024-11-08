import React from 'react'
import { useForm } from '@inertiajs/react'
import { Button, Input } from '@nextui-org/react'

export default function EditTurnStationForm ({ turnStation, onClose }) {
  const { data, setData, patch, processing, errors } = useForm({
    name: turnStation.name,
    description: turnStation.description,
    location: turnStation.location
  })

  function submit (e) {
    e.preventDefault()
    patch(`/turn-station/${turnStation.id}`, {
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
            placeholder='Enter new turn station name'
            value={data.name}
            variant='underlined'
            onChange={e => setData('name', e.target.value)}
          />
          {errors.name && <span className='text-red-500 text-sm'>{errors.name}</span>}
        </div>
        <div>
          <Input
            type='text'
            label='Description'
            placeholder='Enter new turn station description'
            value={data.description}
            variant='underlined'
            onChange={e => setData('description', e.target.value)}
          />
          {errors.description && <span className='text-red-500 text-sm'>{errors.description}</span>}
        </div>
        <div>
          <Input
            type='text'
            label='Location'
            placeholder='Enter new turn station location'
            value={data.location}
            variant='underlined'
            onChange={e => setData('location', e.target.value)}
          />
          {errors.location && <span className='text-red-500 text-sm'>{errors.location}</span>}
        </div>
        <div className='flex gap-3 justify-end py-3'>
          <Button onClick={onClose}>Cancel</Button>
          <Button color='primary' type='submit' disabled={processing}>Save & close</Button>
        </div>
      </div>
    </form>
  )
}
