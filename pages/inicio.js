import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import Tabla from "react-data-table-component";
const Inicio = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const columns = [
    {
      name: "NOMBRE ",
      selector: (row) => row.nombre,
    },
    {
      name: "DESCRIPCION",
      selector: (row) => row.descripcion,
    },
    {
      name: "FECHA",
      selector: (row) => row.fecha,
    },
  ];

  const data = [
    {
      id: 1,
      nombre: "Estadistica aplicada a la genética forense PUBLICO-GENERAL",
      descripcion: "Destinado a medicos, biólogos y publico en general",
      fecha: "10/02/2022",
    },
    {
      id: 2,
      nombre: "Estadistica aplicada a la genética forense DOCENTES",
      descripcion: "dedicado solo a docentes",
      fecha: "14/05/2022",
    },
    {
      id: 3,
      nombre: "Estadistica aplicada a la genética forense ALUMNOS",
      descripcion: "Dedicado solo a alumnos",
      fecha: "19/07/2022",
    },
  ];
  return (
    <>
      <Box w="80%" mx="auto">
        <Tabla mt="" columns={columns} data={data} />
        <Button onClick={onOpen} colorScheme="green" mt={3} size="sm">
          Agregar concepto
        </Button>

        <Flex>
          <Box></Box>
          <Spacer />
          <Box></Box>
        </Flex>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Grupo conceptos/eventos</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={2}>
              <FormLabel>Nombre</FormLabel>
              <Input size="sm" id="nombre" />
            </FormControl>
            <FormControl>
              <FormLabel>Descripcion</FormLabel>
              <Input size="sm" id="descripcion" />
            </FormControl>
            <FormControl>
              <FormLabel>Fecha</FormLabel>
              <Input size="sm" type="date" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cerrar
            </Button>
            <Button colorScheme="green">guardar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Inicio;
