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
import { PiDotsThreeVerticalBold, PiPencilSimpleLine, PiTrash } from 'react-icons/pi'
import CreateAreaForm from '@/Components/Area/CreateAreaForm'
import EditAreaForm from '@/Components/Area/EditAreaForm'
import DeleteAreaForm from '@/Components/Area/DeleteAreaForm'

export default function Index ({ areas }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [modalContent, setModalContent] = useState({})

  function showCreateModal () {
    setModalContent({
      title: 'Create area',
      body: <CreateAreaForm onClose={onClose} />
    })
    onOpen()
  }

  function showEditModal (area) {
    setModalContent({
      title: 'Edit area',
      body: <EditAreaForm area={area} onClose={onClose} />
    })
    onOpen()
  }

  function showDeleteModal (area) {
    setModalContent({
      title: 'Delete area',
      body: <DeleteAreaForm area={area} onClose={onClose} />
    })
    onOpen()
  }

  return (
    <AuthenticatedLayout
      header={
        <h2 className='text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200'>
          Areas
        </h2>
            }
    >
      <Head title='Areas' />

      <div className='py-12'>
        <div className='mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8 flex flex-col'>
          <div className='flex justify-between items-center'>
            <h2>Areas</h2>
            <Button onClick={showCreateModal}>
              Create area
            </Button>
          </div>
          <Table isCompact isStriped>
            <TableHeader>
              <TableColumn>NAME</TableColumn>
              <TableColumn width={300}>DISPLAY NAME</TableColumn>
              <TableColumn width={400}>MODULES</TableColumn>
              <TableColumn width={50} align='center'>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody items={areas}>
              {(area) => (
                <TableRow key={area.id}>
                  <TableCell>{area.name}</TableCell>
                  <TableCell>{area.display_name}</TableCell>
                  <TableCell>{area.modules?.map((module) => module.name).join(', ')}</TableCell>
                  <TableCell>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button isIconOnly size='sm' variant='light'>
                          <PiDotsThreeVerticalBold size={20} />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu>
                        <DropdownItem
                          key='edit-area'
                          startContent={<PiPencilSimpleLine size={20} />}
                          onClick={() => showEditModal(area)}
                        >
                          Edit area
                        </DropdownItem>
                        <DropdownItem
                          key='delete-area'
                          color='danger'
                          className='text-danger'
                          startContent={<PiTrash size={20} />}
                          onClick={() => showDeleteModal(area)}
                        >
                          Delete area
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
