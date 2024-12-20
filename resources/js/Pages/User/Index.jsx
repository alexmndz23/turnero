import React, { useState } from 'react'
import { Head } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure
} from '@nextui-org/react'
import { PiArrowCounterClockwise, PiCheckBold, PiDotsThreeVerticalBold, PiTrash, PiXBold } from 'react-icons/pi'
import EditUserForm from '@/Components/User/EditUserForm'
import CreateUserForm from '@/Components/User/CreateUserForm'
import DeleteUserForm from '@/Components/User/DeleteUserForm'

export default function Index ({ users }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [modalContent, setModalContent] = useState({})

  function showCreateModal () {
    setModalContent({
      title: 'Create user',
      body: <CreateUserForm onClose={onClose} />
    })
    onOpen()
  }

  function showEditModal (user) {
    setModalContent({
      title: 'Edit user',
      body: <EditUserForm id={user.id} name={user.name} displayName={user.display_name} onClose={onClose} />
    })
    onOpen()
  }

  function showDeleteModal (user) {
    setModalContent({
      title: 'Delete user',
      body: <DeleteUserForm id={user.id} name={user.name} onClose={onClose} />
    })
    onOpen()
  }

  return (
    <AuthenticatedLayout
      header={
        <h2 className='text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200'>
          Users
        </h2>
      }
    >
      <Head title='Users' />

      <div className='py-12'>
        <div className='mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8 flex flex-col'>
          <div className='flex justify-between items-center'>
            <h2>Users</h2>
            <Button onClick={showCreateModal}>
              Create user
            </Button>
          </div>
          <Table isCompact isStriped>
            <TableHeader>
              <TableColumn>NAME</TableColumn>
              <TableColumn width={250}>EMAIL</TableColumn>
              <TableColumn width={200}>MODULE</TableColumn>
              <TableColumn width={200}>AREA</TableColumn>
              <TableColumn width={200}>PASSWORD CHANGED</TableColumn>
              <TableColumn width={50} align='center'>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody items={users}>
              {(user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.module?.name}</TableCell>
                  <TableCell>{user.module?.area?.name}</TableCell>
                  <TableCell>
                    {
                      user.password_changed
                        ? <PiCheckBold size={20} color='rgb(22 163 74)' />
                        : <PiXBold size={20} color='rgb(225 29 72)' />
                    }
                  </TableCell>
                  <TableCell>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button isIconOnly size='sm' variant='light'>
                          <PiDotsThreeVerticalBold size={20} />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu>
                        <DropdownItem
                          key='reset-password'
                          startContent={<PiArrowCounterClockwise size={20} />}
                          onClick={() => showEditModal(user)}
                        >
                          Reset password
                        </DropdownItem>
                        <DropdownItem
                          key='delete-user'
                          color='danger'
                          className='text-danger'
                          startContent={<PiTrash size={20} />}
                          onClick={() => showDeleteModal(user)}
                        >
                          Delete user
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={onClose} hideCloseButton>
        <ModalContent>
          <ModalHeader>{modalContent.title}</ModalHeader>
          <ModalBody>{modalContent.body}</ModalBody>
        </ModalContent>
      </Modal>
    </AuthenticatedLayout>
  )
}
