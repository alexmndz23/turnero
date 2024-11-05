import EditInfoForm from '@/Components/User/EditInfoForm'
import EditPasswordForm from '@/Components/User/EditPasswordForm'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, usePage } from '@inertiajs/react'
import { Card, CardBody, Input } from '@nextui-org/react'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'

export default function Edit ({ user }) {
  const { flash } = usePage().props

  useEffect(() => {
    if (flash.success) {
      toast.success(flash.success)
    }
    if (flash.error) {
      toast.error(flash.error)
    }
  }, [flash])

  return (
    <AuthenticatedLayout
      header={
        <h2 className='text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200'>
          Profile
        </h2>
      }
    >
      <Head title='Profile' />

      <div className='py-12'>
        <div className='mx-auto max-w-xl space-y-6 sm:px-6 lg:px-8 flex flex-col'>
          <div className='flex flex-col gap-3'>
            <h2 className='text-lg'>Information</h2>
            <Card>
              <CardBody>
                <EditInfoForm user={user} />
              </CardBody>
            </Card>
          </div>
          <div className='flex flex-col gap-3'>
            <h2 className='text-lg'>Module</h2>
            <Card>
              <CardBody>
                {user.module?.name ?? 'No module assigned'}
              </CardBody>
            </Card>
          </div>
          <div className='flex flex-col gap-3'>
            <h2 className='text-lg'>Area</h2>
            <Card>
              <CardBody>
                {user.module?.area?.name ?? 'No area assigned'}
              </CardBody>
            </Card>
          </div>
          <div className='flex flex-col gap-3'>
            <h2 className='text-lg'>Password</h2>
            <Card>
              <CardBody>
                <EditPasswordForm user={user} />
              </CardBody>
            </Card>
          </div>
        </div>
      </div>

    </AuthenticatedLayout>

  )
}
