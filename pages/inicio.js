import React, { useEffect, useState } from "react";
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
} from "@chakra-ui/react";
import Tabla from "react-data-table-component";
const Inicio = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalConceptos, setModalConceptos] = useState(false);
  const [modalCursos, setModalCursos] = useState(false);

  const [nombreConcepto, setNombreConcepto] = useState("");
  const [descripcionConcepto, setDescripcionConcepto] = useState("");
  const [fechaConcepto, setFechaConcepto] = useState("");

  const columnasConceptos = [
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
    {
      name: "",
      cell: (row) => (
        <Button
          colorScheme="orange"
          size="sm"
          onClick={() => {
            setModalCursos(true);
          }}
        >
          Agregar curso
        </Button>
      ),
    },
  ];
  const columnasCursos = [
    {
      name: "NOMBRE ",
      selector: (row) => row.nombre,
    },
    {
      name: "DESCRIPCION",
      selector: (row) => row.descripcion,
    },
  ];

  const datosConceptos = [];

  const datosCursos = [
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
  ];

  datosCursos.push({
    id: 4,
    nombre: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    descripcion: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    fecha: "10/02/2022",
  });

  console.log(datosCursos);

  return (
    <>
      <Box mt={3} w="80%" mx="auto" border="solid 1px" p={3}>
        <Tabla mt={2} columns={columnasConceptos} data={datosConceptos} />

        <Box>
          <Button
            onClick={() => {
              setModalConceptos(true);
            }}
            colorScheme="green"
            mt={3}
            size="sm"
          >
            Agregar concepto
          </Button>
        </Box>

        <Tabla columns={columnasCursos} data={datosCursos} />
      </Box>

      <Modal
        isOpen={modalCursos}
        onClose={() => {
          setModalCursos(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <p>prueba cursos</p>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={modalConceptos}
        onClose={() => {
          setModalConceptos(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Grupo conceptos/eventos</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={2}>
              <FormLabel>Nombre</FormLabel>
              <Input
                size="sm"
                name="nombreConcepto"
                value={nombreConcepto}
                onChange={(e) => {
                  setNombreConcepto(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Descripcion</FormLabel>
              <Input
                size="sm"
                id="descripcionConcepto"
                onChange={(e) => {
                  setDescripcionConcepto(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Fecha</FormLabel>
              <Input
                size="sm"
                type="date"
                name="fechaConcepto"
                onChange={(e) => {
                  setFechaConcepto(e.target.value);
                }}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                setModalConceptos(!modalConceptos);
              }}
            >
              Cerrar
            </Button>
            <Button
              colorScheme="green"
              onClick={() => {
                datosConceptos.push({
                  nombre: "nombreConcepto",
                  descripcion: "descripcionConcepto",
                  fecha: " fechaConcepto",
                });

                console.log("datos", datosConceptos);
              }}
            >
              guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Inicio;
