import React, { useState } from 'react'
import { Head } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import {
  Button,
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
import { PiPencilSimpleLine, PiTrash } from 'react-icons/pi'
import EditAreaForm from '@/Components/Area/EditAreaForm'
import CreateAreaForm from '@/Components/Area/CreateAreaForm'
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
              <TableColumn width={400}>DISPLAY NAME</TableColumn>
              <TableColumn width={100}>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody items={areas}>
              {(area) => (
                <TableRow key={area.id}>
                  <TableCell>{area.name}</TableCell>
                  <TableCell>{area.display_name}</TableCell>
                  <TableCell>
                    <Button isIconOnly size='sm' variant='light' onClick={() => showEditModal(area)}>
                      <PiPencilSimpleLine size={20} />
                    </Button>
                    <Button isIconOnly size='sm' variant='light' color='danger' onClick={() => showDeleteModal(area)}>
                      <PiTrash size={20} />
                    </Button>
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
