import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { Card, CardBody } from '@nextui-org/react'

export default function Dashboard () {
  return (
    <AuthenticatedLayout
      header={
        <h2 className='text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200'>
          Dashboard
        </h2>
            }
    >
      <Head title='Dashboard' />

      <div className='py-12'>
        <div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
          <Card>
            <CardBody>
              You're logged in!
            </CardBody>
          </Card>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
