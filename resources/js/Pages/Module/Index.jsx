import React, { useEffect, useState } from 'react'
import { Head, usePage } from '@inertiajs/react'
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
import { PiDotsThreeVerticalBold, PiPencilSimpleLine, PiTrash } from 'react-icons/pi'
import CreateModuleForm from '@/Components/Module/CreateModuleForm'
import EditModuleForm from '@/Components/Module/EditModuleForm'
import DeleteModuleForm from '@/Components/Module/DeleteModuleForm'
import toast from 'react-hot-toast'

export default function Index ({ modules, areas, users }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [modalContent, setModalContent] = useState({})

  const { flash } = usePage().props

  useEffect(() => {
    if (flash.success) {
      toast.success(flash.success)
      onClose()
    }
    if (flash.error) {
      toast.error(flash.error)
    }
  }, [flash])

  function showCreateModal () {
    setModalContent({
      title: 'Create module',
      body: <CreateModuleForm areas={areas} users={users} onClose={onClose} />
    })
    onOpen()
  }

  function showEditModal (module) {
    setModalContent({
      title: 'Edit module',
      body: <EditModuleForm module={module} areas={areas} users={users} onClose={onClose} />
    })
    onOpen()
  }

  function showDeleteModal (module) {
    setModalContent({
      title: 'Delete module',
      body: <DeleteModuleForm module={module} onClose={onClose} />
    })
    onOpen()
  }

  return (
    <AuthenticatedLayout
      header={
        <h2 className='text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200'>
          Modules
        </h2>
            }
    >
      <Head title='Modules' />

      <div className='py-12'>
        <div className='mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8 flex flex-col'>
          <div className='flex justify-between items-center'>
            <h2>Modules</h2>
            <Button onClick={showCreateModal}>
              Create module
            </Button>
          </div>
          <Table isCompact isStriped>
            <TableHeader>
              <TableColumn>NAME</TableColumn>
              <TableColumn>DISPLAY NAME</TableColumn>
              <TableColumn>AREA</TableColumn>
              <TableColumn width={50} align='center'>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody items={modules}>
              {(module) => (
                <TableRow key={module.id}>
                  <TableCell>{module.name}</TableCell>
                  <TableCell>{module.display_name}</TableCell>
                  <TableCell>{module?.area?.name}</TableCell>
                  <TableCell>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button isIconOnly size='sm' variant='light'>
                          <PiDotsThreeVerticalBold size={20} />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu>
                        <DropdownItem
                          key='edit-module'
                          startContent={<PiPencilSimpleLine size={16} />}
                          onClick={() => showEditModal(module)}
                        >
                          Edit module
                        </DropdownItem>
                        <DropdownItem
                          key='delete-module'
                          color='danger'
                          className='text-danger'
                          startContent={<PiTrash size={16} />}
                          onClick={() => showDeleteModal(module)}
                        >
                          Delete module
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
