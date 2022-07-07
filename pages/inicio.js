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
} from "@chakra-ui/react";
import Tabla from "react-data-table-component";
const Inicio = () => {
  const [modalConceptos, setModalConceptos] = useState(false);
  const [modalCursos, setModalCursos] = useState(false);
  const [nombreConcepto, setNombreConcepto] = useState("");
  const [descripcionConcepto, setDescripcionConcepto] = useState("");
  const [fechaConcepto, setFechaConcepto] = useState("");
  const [datosConceptos, setDatosConceptos] = useState([]);

  const [datosCursos, setDatosCursos] = useState([]);
  const [codigo, setCodigo] = useState("");
  const [nombreCurso, setNombreCurso] = useState("");
  const [nombreSecCurso, setNombreSecCurso] = useState("");
  const [cupoMaximo, setCupoMaximo] = useState(0);
  const [emailResp, setEmailResp] = useState("");
  const [error, setError] = useState(false);
  const columnasConceptos = [
    {
      name: "Nombre ",
      selector: (row) => row.nombre,
    },
    {
      name: "Descripcion",
      selector: (row) => row.descripcion,
    },
    {
      name: "Fecha de inicio",
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
      name: "Código",
      selector: (row) => row.codigo,
    },
    {
      name: "Nombre Curso ",
      selector: (row) => row.nombreCurso,
    },
    {
      name: "Nombre Secundario",
      selector: (row) => row.nombreSecCurso,
    },
    {
      name: "Cupo Maximo",
      selector: (row) => row.cupoMaximo,
    },
    {
      name: "Email  Responsable",
      selector: (row) => row.emailResp,
    },
  ];

  const agregarConcepto = () => {
    if ([nombreConcepto, descripcionConcepto, fechaConcepto].includes("")) {
      setError(true);
    } else {
      setModalConceptos(false);
      setError(false);
      const objetoConceptos = {
        nombre: nombreConcepto,
        descripcion: descripcionConcepto,
        fecha: fechaConcepto,
      };
      setDatosConceptos([...datosConceptos, objetoConceptos]);
    }
  };

  const agregarCurso = () => {
    console.log("Ingreso a la funcion");
    if (
      [codigo, nombreCurso, nombreSecCurso, cupoMaximo, emailResp].includes("")
    ) {
      setError(true);
      console.log("Hay un error");
    } else {
      console.log("No hay error");
      setModalCursos(false);
      setError(false);
      const objetoCursos = {
        codigo: codigo,
        nombreCurso: nombreCurso,
        nombreSecCurso: nombreSecCurso,
        cupoMaximo: cupoMaximo,
        emailResp: emailResp,
      };
      setDatosCursos([...datosCursos, objetoCursos]);
    }
  };
  return (
    <>
      <Box mt={3} w="80%" mx="auto" border="solid 1px" p={3}>
        <Tabla
          highlightOnHover
          pointerOnHover
          mt={2}
          title="Conceptos"
          columns={columnasConceptos}
          data={datosConceptos}
        />

        <Box>
          <Button
            mt={2}
            mb={2}
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
        <Tabla
          highlightOnHover
          pointerOnHover
          title="Cursos"
          columns={columnasCursos}
          data={datosCursos}
        />
      </Box>

      <Modal
        isOpen={modalCursos}
        onClose={() => {
          setModalCursos(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Concepto/Curso</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Código</FormLabel>
              <Input
                size="sm"
                name="codigo"
                value={codigo}
                onChange={(e) => {
                  setCodigo(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Nombre Principal</FormLabel>
              <Input
                size="sm"
                name="nombreCurso"
                value={nombreCurso}
                onChange={(e) => {
                  setNombreCurso(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Nombre Secundario</FormLabel>
              <Input
                size="sm"
                name="nombreSecCurso"
                value={nombreSecCurso}
                onChange={(e) => {
                  setNombreSecCurso(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Cupo Máximo</FormLabel>
              <Input
                size="sm"
                name="cupoMaximo"
                value={cupoMaximo}
                onChange={(e) => {
                  setCupoMaximo(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>E-mail responsable</FormLabel>
              <Input
                size="sm"
                name="emailResp"
                value={emailResp}
                onChange={(e) => {
                  setEmailResp(e.target.value);
                }}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                setModalCursos(!modalCursos);
              }}
            >
              Cerrar
            </Button>
            <Button
              colorScheme="green"
              onClick={() => {
                agregarCurso();
              }}
            >
              guardar
            </Button>
          </ModalFooter>
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
            {error && <Box bg="red.300">TODOS LOS CAMPOS SON OBLIGATORIOS</Box>}
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
                value={descripcionConcepto}
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
                value={fechaConcepto}
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
                agregarConcepto();
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
