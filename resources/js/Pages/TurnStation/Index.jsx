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
import CreateTurnStationForm from '@/Components/TurnStation/CreateTurnStationForm'
import EditTurnStationForm from '@/Components/TurnStation/EditTurnStationForm'
import DeleteTurnStationForm from '@/Components/TurnStation/DeleteTurnStationForm'
import toast from 'react-hot-toast'

export default function Index ({ turnStations }) {
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
      title: 'Create area',
      body: <CreateTurnStationForm onClose={onClose} />
    })
    onOpen()
  }

  function showEditModal (turnStation) {
    setModalContent({
      title: 'Edit area',
      body: <EditTurnStationForm turnStation={turnStation} onClose={onClose} />
    })
    onOpen()
  }

  function showDeleteModal (turnStation) {
    setModalContent({
      title: 'Delete area',
      body: <DeleteTurnStationForm turnStation={turnStation} onClose={onClose} />
    })
    onOpen()
  }

  return (
    <AuthenticatedLayout
      header={
        <h2 className='text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200'>
          Turn stations
        </h2>
            }
    >
      <Head title='Turn stations' />

      <div className='py-12'>
        <div className='mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8 flex flex-col'>
          <div className='flex justify-between items-center'>
            <h2>Turn stations</h2>
            <Button onClick={showCreateModal}>
              Create turn station
            </Button>
          </div>
          <Table isCompact isStriped>
            <TableHeader>
              <TableColumn>NAME</TableColumn>
              <TableColumn width={300}>DESCRIPTION</TableColumn>
              <TableColumn width={400}>LOCATION</TableColumn>
              <TableColumn width={50} align='center'>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody items={turnStations}>
              {(turnStation) => (
                <TableRow key={turnStation.id}>
                  <TableCell>{turnStation.name}</TableCell>
                  <TableCell>{turnStation.description}</TableCell>
                  <TableCell>{turnStation.location}</TableCell>
                  <TableCell>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button isIconOnly size='sm' variant='light'>
                          <PiDotsThreeVerticalBold size={20} />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu>
                        <DropdownItem
                          key='edit-turn-station'
                          startContent={<PiPencilSimpleLine size={20} />}
                          onClick={() => showEditModal(turnStation)}
                        >
                          Edit turn station
                        </DropdownItem>
                        <DropdownItem
                          key='delete-turn-station'
                          color='danger'
                          className='text-danger'
                          startContent={<PiTrash size={20} />}
                          onClick={() => showDeleteModal(turnStation)}
                        >
                          Delete turn station
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
