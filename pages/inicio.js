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
  Text,
  Icon,
  Tooltip,
} from "@chakra-ui/react";
import Tabla from "react-data-table-component";
import clienteAxios from "../config/axios";
import Moment from "moment";
import {
  FaRegCheckCircle,
  FaInfoCircle,
  FaMoneyCheckAlt,
} from "react-icons/fa";
const Inicio = () => {
  //ENEVTOS
  const [modalConceptos, setModalConceptos] = useState(false);
  const [modalCursos, setModalCursos] = useState(false);
  const [nombreConcepto, setNombreConcepto] = useState("");
  const [descripcionConcepto, setDescripcionConcepto] = useState("");
  const [datosConceptos, setDatosConceptos] = useState([]);
  const [codigoEvento, setCodigoEvento] = useState("");
  const [habilitadoEvento, setHabilitadoEvento] = useState(true);
  const [reqEmailEvento, setReqEmailEvento] = useState(true);
  const [idEvento, setIdEvento] = useState(0);
  //CURSOS
  const [datosCursos, setDatosCursos] = useState([]);
  const [codigo, setCodigo] = useState("");
  const [nombreCurso, setNombreCurso] = useState("");
  const [nombreSecCurso, setNombreSecCurso] = useState("");
  const [cupoMaximo, setCupoMaximo] = useState(0);
  const [emailResp, setEmailResp] = useState("");
  const [fechaInicioCurso, setFechaInicioCurso] = useState("");
  const [fechaFinCurso, setFechaFinCurso] = useState("");
  const [habilitadoCurso, setHabilitadoCurso] = useState(true);
  const [domicilioRefCurso, setDomicilioRefCurso] = useState("");
  const [nombreContactoCurso, setNombreContactoCurso] = useState("");
  const [urlUbicacionCurso, setUrlUbicacionCurso] = useState("");
  const [reqEmailCurso, setReqEmailCurso] = useState(true);

  //ARANCELES
  const [modalAranceles, setModalAranceles] = useState(false);

  //OTROS
  const [error, setError] = useState(false);
  const [eventoActual, setEventoActual] = useState("");
  const [cursoActual, setCursoActual] = useState("");

  const columnasConceptos = [
    {
      name: "Codigo",
      selector: (row) => row.codigo,
      width: "150px",
    },
    {
      name: "Nombre ",
      selector: (row) => row.Nombre,
      width: "400px",
      wrap: true,
    },
    {
      name: "Descripcion",
      selector: (row) => row.descripcion,
      width: "400px",
      wrap: true,
    },
  ];
  const columnasCursos = [
    {
      name: "Código",
      selector: (row) => row.codigo,
      width: "150px",
    },
    {
      name: "Nombre Curso ",
      selector: (row) => row.nombre1,
      width: "400px",
      wrap: true,
    },
    {
      name: "Nombre Secundario",
      selector: (row) => row.nombre2,
      width: "250px",
      wrap: true,
    },
    {
      name: "Cupo Maximo",
      selector: (row) => row.cupoMaximo,
      width: "100px",
      center: "true",
    },
    {
      name: "Email  Responsable",
      selector: (row) => row.mailReferencia,
      width: "250px",
    },
    {
      name: "Inicio",
      selector: (row) => (
        <div>{Moment(row.fechaInicio).format("DD-MM-YYYY ")}</div>
      ),

      width: "100px",
    },
    {
      name: "Fin",
      selector: (row) => (
        <div>{Moment(row.fechaFin).format("DD-MM-YYYY ")}</div>
      ),
      width: "100px",
    },
    {
      name: "",
      cell: (row) => (
        <Icon
          as={FaMoneyCheckAlt}
          color="green.200"
          w={6}
          h={6}
          onClick={() => {
            setModalAranceles(true);
            console.log("curso", row.idCurso);
            setCursoActual(row.idCurso);
          }}
        />
      ),
      width: "50px",
      center: "true",
    },
    {
      name: "",
      cell: () => <Icon as={FaInfoCircle} color="blue.200" w={6} h={6} />,
      width: "50px",
      center: "true",
    },
  ];
  const estiloTablas = {
    rowgroup: {
      style: {
        // override the row height
      },
    },
    rows: {
      style: {
        minHeight: "30px",
        // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        paddingTop: "0px",
        padingButton: "0px",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
  };
  const agregarConcepto = () => {
    if ([codigoEvento, nombreConcepto, descripcionConcepto].includes("")) {
      setError(true);
    } else {
      setModalConceptos(false);
      setError(false);
      const objetoConceptos = {
        codigoEvento: codigoEvento,
        nombre: nombreConcepto,
        descripcion: descripcionConcepto,
        habilitadoEvento: habilitadoEvento,
        reqEmailEvento: reqEmailEvento,
      };
      setDatosConceptos([...datosConceptos, objetoConceptos]);
    }
  };

  const agregarCurso = () => {
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
        fechaInicioCurso: fechaInicioCurso,
        fechaFinCurso: fechaFinCurso,
        habilitadoCurso: habilitadoCurso,
        domicilioRefCurso: domicilioRefCurso,
        nombreContactoCurso: nombreContactoCurso,
        urlUbicacionCurso: urlUbicacionCurso,
        reqEmailCurso: reqEmailCurso,
      };
      setDatosCursos([...datosCursos, objetoCursos]);
    }
  };

  const clickear = (row, event) => {
    console.log("AQUI VOS A CARGAR LOS CURSOS DEL EVENTO:", row.idGrupo);
    clienteAxios
      .get(`/cursosxevento/${row.idGrupo}`)
      .then((respuesta) => {
        console.log("funciono", respuesta.data);
        setDatosCursos(respuesta.data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    clienteAxios
      .get("/grupocurso")
      .then((respuesta) => {
        console.log(respuesta.data);
        setDatosConceptos(respuesta.data);
        console.log(respuesta.data);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <Box mt={3} w="80%" mx="auto" border="solid 1px" p={3}>
        <Tabla
          highlightOnHover
          pointerOnHover
          mt={2}
          title="Grupo de conceptos / Evento"
          columns={columnasConceptos}
          data={datosConceptos}
          onRowClicked={clickear}
          customStyles={estiloTablas}
        />

        <Box mt={5}>
          <Button
            mr="4"
            onClick={() => {
              setModalConceptos(true);
            }}
            colorScheme="green"
            size="sm"
          >
            Agregar evento
          </Button>
        </Box>

        <Tabla
          highlightOnHover
          pointerOnHover
          title="Cursos"
          columns={columnasCursos}
          data={datosCursos}
          customStyles={estiloTablas}
        />

        <Box mt={5}>
          <Button
            colorScheme="orange"
            size="sm"
            onClick={() => {
              console.log("ESTE ES EL EVENTO : ", eventoActual);
              setModalCursos(true);
            }}
          >
            Agregar curso
          </Button>
        </Box>
      </Box>

      <Modal
        isOpen={modalCursos}
        onClose={() => {
          setModalCursos(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nuevo Curso {eventoActual}</ModalHeader>
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
            <FormControl>
              <FormLabel>Fecha de Inicio</FormLabel>
              <Input
                size="sm"
                name="fechaInicioCurso"
                value={fechaInicioCurso}
                type="date"
                onChange={(e) => {
                  setFechaInicioCurso(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Fecha de Fin</FormLabel>
              <Input
                size="sm"
                name="fechaFinCurso"
                value={fechaFinCurso}
                type="date"
                onChange={(e) => {
                  setFechaFinCurso(e.target.value);
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
          {/*<Box bg="green.100">
            <p> *Fechas desde/hasta generan un nuevo registro??</p>
            <p>* que es cantidad de unidades minimas??</p>
            <p> * agregar boton de dar de alta arancel??</p>
            </Box>*/}
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
          <ModalHeader>Grupo conceptos / Evento</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {error && <Box bg="red.300">TODOS LOS CAMPOS SON OBLIGATORIOS</Box>}
            <FormControl mb={2}>
              <FormLabel> Codigo</FormLabel>
              <Input
                size="sm"
                name="codigoEvento"
                value={codigoEvento}
                onChange={(e) => {
                  setCodigoEvento(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
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

      <Modal
        isOpen={modalAranceles}
        onClose={() => {
          setModalAranceles(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <p>aranceles {cursoActual}</p>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Inicio;
