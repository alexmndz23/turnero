import { useForm } from '@inertiajs/react'
import { Button } from '@nextui-org/react'
import React from 'react'

export default function DeleteModuleForm ({ module, onClose }) {
  const { delete: destroy, processing } = useForm()

  function submit (e) {
    e.preventDefault()
    destroy(`/module/${module.id}`, {
      onSuccess: onClose
    })
  }

  return (
    <form onSubmit={submit}>
      <div className='flex flex-col gap-4'>
        <div>
          Are you sure to delete the "{module.name}" module?
        </div>
        <div className='flex gap-3 justify-end py-3'>
          <Button onClick={onClose}>Cancel</Button>
          <Button color='danger' type='submit' disabled={processing}>Delete & close</Button>
        </div>
      </div>
    </form>
  )
}
