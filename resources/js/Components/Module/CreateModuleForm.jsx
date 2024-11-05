import { useForm } from '@inertiajs/react'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import React from 'react'

export default function CreateModuleForm ({ users, areas, onClose }) {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    display_name: '',
    user_id: '',
    area_id: ''
  })

  function onSubmit (e) {
    e.preventDefault()
    post('/module', {
      data,
      onSuccess: onClose
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <div className='flex flex-col gap-4'>
        <div>
          <Input
            type='text'
            label='Name'
            placeholder='Enter module name'
            value={data.name}
            variant='underlined'
            onChange={e => setData('name', e.target.value)}
          />
          {errors.name && <span className='text-red-500 text-sm'>{errors.name}</span>}
        </div>
        <div>
          <Input
            type='text'
            label='Display name'
            placeholder='Enter module display name'
            value={data.display_name}
            variant='underlined'
            onChange={e => setData('display_name', e.target.value)}
          />
          {errors.display_name && <span className='text-red-500 text-sm'>{errors.display_name}</span>}
        </div>
        <div>
          <Select
            label='User'
            placeholder='Select module user'
            items={users}
            variant='underlined'
            onChange={e => setData('user_id', e.target.value)}
          >
            {(user) => {
              if (!user.module) {
                return <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
              }
            }}
          </Select>
          {errors.user_id && <span className='text-red-500 text-sm'>{errors.user_id}</span>}
        </div>
        <div>
          <Select
            label='Area'
            placeholder='Select module area'
            items={areas}
            variant='underlined'
            onChange={e => setData('area_id', e.target.value)}
          >
            {(area) => <SelectItem key={area.id} value={area.id}>{area.name}</SelectItem>}
          </Select>
          {errors.area_id && <span className='text-red-500 text-sm'>{errors.area_id}</span>}
        </div>
        <div className='flex gap-3 justify-end py-3'>
          <Button onClick={onClose}>Cancel</Button>
          <Button color='primary' type='submit' disabled={processing}>Save & close</Button>
        </div>
      </div>
    </form>
  )
}
