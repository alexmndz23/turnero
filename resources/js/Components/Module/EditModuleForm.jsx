import React from 'react'
import { useForm } from '@inertiajs/react'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'

export default function EditModuleForm ({ module, areas, users, onClose }) {
  const { data, setData, patch, processing, errors } = useForm({
    name: module.name ?? '',
    display_name: module.display_name ?? '',
    area_id: module.area_id ?? '',
    user_ids: module.users.map((user) => user.id.toString())
  })

  function onSubmit (e) {
    e.preventDefault()
    patch(`/module/${module.id}`, data)
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
            label='Area'
            placeholder='Select module area'
            items={areas}
            defaultSelectedKeys={[module?.area_id?.toString()]}
            variant='underlined'
            onChange={e => setData('area_id', e.target.value)}
          >
            {(area) => <SelectItem key={area.id} value={area.id}>{area.name}</SelectItem>}
          </Select>
          {errors.area_id && <span className='text-red-500 text-sm'>{errors.area_id}</span>}
        </div>
        <div>
          <Select
            label='Usuarios'
            placeholder='Select module users'
            items={users}
            selectedKeys={data.user_ids}
            variant='underlined'
            onSelectionChange={e => setData('user_ids', [...e.keys()])}
            selectionMode='multiple'
          >
            {(user) => <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>}
          </Select>
          {errors.user_ids && <span className='text-red-500 text-sm'>{errors.user_ids}</span>}
        </div>
        <div className='flex gap-3 justify-end py-3'>
          <Button onClick={onClose}>Cancel</Button>
          <Button color='primary' type='submit' disabled={processing}>Save & close</Button>
        </div>
      </div>
    </form>
  )
}
