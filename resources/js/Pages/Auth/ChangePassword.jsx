import { Head, Link, useForm } from '@inertiajs/react'
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Input } from '@nextui-org/react'
import React from 'react'

export default function ChangePassword () {
  const { data, setData, put, processing, errors } = useForm({
    current_password: '',
    password: '',
    password_confirmation: ''
  })

  function submit (e) {
    e.preventDefault()
    put('/password-update', data)
  }

  return (
    <>
      <Head title='Change password' />

      <div className='py-12'>
        <div className='mx-auto w-[500px] space-y-6 sm:px-6 lg:px-8 flex flex-col'>
          <form onSubmit={submit}>
            <Card>
              <CardHeader>
                You need to update your password
              </CardHeader>
              <Divider />
              <CardBody>
                <div className='flex flex-col gap-4'>
                  <div>
                    <Input
                      type='password'
                      label='Current password'
                      placeholder='Enter current password'
                      value={data.current_password}
                      autoComplete='off'
                      onChange={e => setData('current_password', e.target.value)}
                    />
                    {errors.current_password && <span className='text-red-500 text-sm'>{errors.current_password}</span>}
                  </div>
                  <div>
                    <Input
                      type='password'
                      label='New password'
                      placeholder='Enter new password'
                      value={data.password}
                      autoComplete='off'
                      onChange={e => setData('password', e.target.value)}
                    />
                    {errors.password && <span className='text-red-500 text-sm'>{errors.password}</span>}
                  </div>
                  <div>
                    <Input
                      type='password'
                      label='New password confirmation'
                      placeholder='Enter new password confirmation'
                      value={data.password_confirmation}
                      autoComplete='off'
                      onChange={e => setData('password_confirmation', e.target.value)}
                    />
                    {errors.password_confirmation && <span className='text-red-500 text-sm'>{errors.password_confirmation}</span>}
                  </div>
                </div>
              </CardBody>
              <Divider />
              <CardFooter>
                <div className='w-full flex gap-3 justify-end'>
                  <Button
                    href={route('logout')}
                    method='post'
                    as={Link}
                  >
                    Logout
                  </Button>
                  <Button color='primary' type='submit' disabled={processing}>Change password</Button>
                </div>
              </CardFooter>
            </Card>
          </form>
        </div>
      </div>
    </>
  )
}
