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
  HStack,
  Center,
  VStack,
  SimpleGrid,
} from "@chakra-ui/react";
import Tabla from "react-data-table-component";
import clienteAxios from "../config/axios";
import Moment from "moment";
import {
  FaRegSave,
  FaRegCheckCircle,
  FaInfoCircle,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import moment from "moment";

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
  const [eventoSeleccionado, setEventoSeleccionado] = useState(0);
  const [codigoBuscar, setCodigoBuscar] = useState("");
  //CURSOS
  const [nombreCurso, setNombreCurso] = useState("");
  const [nombreSecCurso, setNombreSecCurso] = useState("");
  const [codigo, setCodigo] = useState("");
  const [idGrupoCurso, setIdGrupoCurso] = useState("");
  const [fechaInicioCurso, setFechaInicioCurso] = useState("");
  const [fechaFinCurso, setFechaFinCurso] = useState("");
  const [cupoMaximo, setCupoMaximo] = useState(0);
  const [habilitadoCurso, setHabilitadoCurso] = useState(true);
  const [resaltar, setResaltar] = useState(false);
  const [codUnidadAcademica, setCodUnidadAcademica] = useState(null);
  const [idPrograma, setIdPrograma] = useState(null);
  const [idPlanEstudio] = useState(null);
  const [idObligacion, setIdObligacion] = useState(null);
  const [emailResp, setEmailResp] = useState("");
  const [domicilioRefCurso, setDomicilioRefCurso] = useState("");
  const [nombreContactoCurso, setNombreContactoCurso] = useState("");
  const [urlUbicacionCurso, setUrlUbicacionCurso] = useState("");
  const [reqEmailCurso, setReqEmailCurso] = useState(true);
  const [datosCursos, setDatosCursos] = useState([]);

  const [infoCurso, setInfoCurso] = useState([]);

  //ARANCELES
  const [modalAranceles, setModalAranceles] = useState(false);
  const [datosAranceles, setDatosAranceles] = useState([]);
  const [fechaDesdeAranceles, setFechaDesdeAranceles] = useState("");
  const [fechaHastaAranceles, setFechaHastaAranceles] = useState("");
  const [precioAranceles, setPrecioAranceles] = useState(0);
  const [cantidadUnidadesMinima, setCantidadUnidadesMinima] = useState(0);

  //OTROS
  const [modalConfirmacion, setModalConfirmacion] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [error, setError] = useState(false);
  const [errorFechas, setErrorFechas] = useState(false);
  const [eventoActual, setEventoActual] = useState("");
  const [cursoActual, setCursoActual] = useState("");
  const [mostrarCargaArancel, setMostrarCargaArancel] = useState(false);
  const [descripcionError, setDescripcionError] = useState("");

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
      width: "110px",
    },
    {
      name: "Nombre Curso ",
      selector: (row) => row.nombre1,
      width: "300px",
      wrap: true,
    },
    {
      name: "Nombre Secundario",
      selector: (row) => row.nombre2,
      width: "250px",
      wrap: true,
    },
    /*{
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
    },*/
    {
      name: "",
      cell: (row) => (
        <Icon
          as={FaMoneyCheckAlt}
          color="green.200"
          w={6}
          h={6}
          cursor="pointer"
          onClick={() => {
            traerAranceles(row.idCurso);
            setModalAranceles(true);
            setCursoActual(row.idCurso);
          }}
        />
      ),
      width: "50px",
      center: "true",
    },
  ];

  const columnasAranceles = [
    {
      name: "Desde",
      selector: (row) => (
        <div>{Moment(row.FechaDesde).format("DD-MM-YYYY")}</div>
      ),
      width: "100px",
      center: "true",
    },
    {
      name: "Hasta",
      selector: (row) => (
        <div>{Moment(row.FechaHasta).format("DD-MM-YYYY")}</div>
      ),
      width: "100px",
      center: "true",
    },
    {
      name: "Precio",
      selector: (row) => row.Precio,
      width: "80px",
      center: "true",
    },
    {
      name: "Cant. U MIn",
      selector: (row) => row.CantidadUnidadesMinima,
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
        codigo: codigoEvento,
        Nombre: nombreConcepto,
        descripcion: descripcionConcepto,
        habilitadoEvento: habilitadoEvento,
        RequiereValidacionEmail: reqEmailEvento,
      };
      // setDatosConceptos([...datosConceptos, objetoConceptos]);

      clienteAxios(`/nuevoevento`, { method: "post", data: objetoConceptos })
        .then((respuesta) => {
          traerEventos();
          setModalConfirmacion(true);
          console.log("Esta es la repsuesta:", respuesta);
        })
        .catch((error) => {
          console.log("Este es el error:", error);
        });
    }
  };

  const validarFechaCurso = () => {
    if (
      [codigo, nombreCurso, nombreSecCurso, cupoMaximo, emailResp].includes("")
    ) {
      setError(true);
      return false;
    } else {
      setError(false);
      return true;
    }
  };

  const validarVacioCurso = () => {
    if (fechaInicioCurso > fechaFinCurso) {
      setErrorFechas(true);
      return false;
    } else {
      setErrorFechas(false);
      return true;
    }
  };
  const agregarCurso = () => {
    if (validarFechaCurso() && validarVacioCurso) {
      console.log("No hay error");
      setModalCursos(false);
      setError(false);
      const objetoCursos = {
        nombre1: nombreCurso,
        nombre2: nombreSecCurso,
        codigo: codigo,
        idGrupoCurso: idGrupoCurso,
        fechaInicio: new Date(fechaInicioCurso),
        fechaFin: new Date(fechaFinCurso),
        cupoMaximo: cupoMaximo,
        habilitado: habilitadoCurso,
        resaltar: resaltar,
        codUnidadAcademica: codUnidadAcademica,
        idPrograma: idPrograma,
        idPlanEstudio: idPlanEstudio,
        idObligacion: idObligacion,
        mailReferencia: emailResp,
        domicilioReferencia: domicilioRefCurso,
        NombreContactoReferencia: nombreContactoCurso,
        urlUbicacion: urlUbicacionCurso,
        RequiereValidacionEmail: reqEmailCurso,
      };
      //setDatosCursos([...datosCursos, objetoCursos]);

      console.log("ESTE ES EL CURSO A MANDAR:::::::::::", objetoCursos);

      clienteAxios(`/nuevocurso`, { method: "post", data: objetoCursos })
        .then((respuesta) => {
          traerCursos(eventoSeleccionado);
          setModalConfirmacion(true);
          console.log("Esta es la repsuesta:", respuesta);
        })
        .catch((error) => {
          console.log("Este es el error:", error);
        });
    }
  };

  const clickear = (row) => {
    traerCursos(row.idGrupo);
    traerAranceles(0);
    traerInformacion(0);
    setEventoSeleccionado(row.idGrupo);
    setIdGrupoCurso(row.idGrupo);
    console.log("ESTE ES EL ID GRUPO:", row.idGrupo);
  };

  const clikearCursos = (row) => {
    traerInformacion(row.idCurso);
    traerAranceles(row.idCurso);
    console.log("id del curso:::", row.idCurso);
  };

  const traerEventos = () => {
    clienteAxios
      .get("/grupocurso")
      .then((respuesta) => {
        console.log(respuesta.data);
        setDatosConceptos(respuesta.data);
        console.log(respuesta.data);
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
  const traerCursos = (idGrupo) => {
    clienteAxios
      .get(`/cursosxevento/${idGrupo}`)
      .then((respuesta) => {
        console.log("funciono", respuesta.data);
        setDatosCursos(respuesta.data);
      })
      .catch(() => {});
  };

  const traerAranceles = (idCurso) => {
    clienteAxios
      .get(`/arancelesxcurso/${idCurso}`)
      .then((respuesta) => {
        console.log("Aranceles", respuesta.data);
        setDatosAranceles(respuesta.data);
      })
      .catch(() => {});
  };
  const agregarArancel = () => {
    const objetoArancel = {
      IdCurso: cursoActual,
      FechaDesde: new Date(fechaDesdeAranceles),
      FechaHasta: new Date(fechaHastaAranceles),
      Precio: precioAranceles,
      CantidadUnidadesMinima: parseInt(cantidadUnidadesMinima),
    };

    // setDatosAranceles([...datosAranceles, objetoArancel]);
    clienteAxios(`/nuevoarancel`, {
      method: "post",
      // headers: { Authorization: AuthStr },
      data: objetoArancel,
    })
      .then((respuesta) => {
        setModalAranceles(false);
        setModalConfirmacion(true);
        limpiarAranceles();
        traerAranceles(cursoActual);
        console.log("SE REALIZO EL ALTA", respuesta);
      })
      .catch((error) => {
        setModalError(true);
        setDescripcionError(error.response.data.message);
        console.log(error.response.data.message);
      });
  };

  const limpiarAranceles = () => {
    setFechaDesdeAranceles("");
    setFechaHastaAranceles("");
    setPrecioAranceles("");
    setCantidadUnidadesMinima("");
  };

  const traerInformacion = (idCurso) => {
    console.log("ENTRO A TRAER LA INFORMACION");

    clienteAxios
      .get(`/cursoxid/${idCurso}`)
      .then((respuesta) => {
        console.log("Informacion", respuesta.data);
        setInfoCurso(respuesta.data);
      })
      .catch(() => {});
  };

  const buscarEvento = () => {
    console.log("ENTRO A BUSCAR EVENTO");
    clienteAxios
      .get(`/buscarevento/${codigoBuscar}`)
      .then((respuesta) => {
        console.log("eventos", respuesta.data);
        setDatosConceptos(respuesta.data);
        traerAranceles(0);
        traerCursos(0);
        traerInformacion(0);
      })
      .catch(() => {});
  };
  return (
    <>
      <Box mt={3} w="80%" mx="auto" p={3}>
        <Box border="solid 1px #F5F4F3" p={4} mb={2}>
          <Center mb={4}>
            <strong>EVENTOS</strong>
          </Center>
          <SimpleGrid columns={2} w="300px">
            <Input
              size="xs"
              placeholder="Codigo"
              name="codigoBuscar"
              value={codigoBuscar}
              onChange={(e) => {
                setCodigoBuscar(e.target.value.toUpperCase());
              }}
            />
            <Button
              ml={2}
              size="xs"
              colorScheme="orange"
              onClick={buscarEvento}
            >
              Buscar evento
            </Button>
          </SimpleGrid>

          <Tabla
            highlightOnHover
            pointerOnHover
            mt={2}
            columns={columnasConceptos}
            data={datosConceptos}
            onRowClicked={clickear}
            customStyles={estiloTablas}
            noDataComponent="No hay eventos"
          />

          <Button
            mt={5}
            onClick={() => {
              setModalConceptos(true);
            }}
            colorScheme="green"
            size="xs"
          >
            Agregar evento
          </Button>
        </Box>
        <SimpleGrid columns={2} spacing={2}>
          <Box height="auto" p={4} border="solid 1px #F5F4F3">
            <Center mb={4}>
              <strong>CURSOS</strong>
            </Center>
            <Tabla
              highlightOnHover
              pointerOnHover
              columns={columnasCursos}
              data={datosCursos}
              customStyles={estiloTablas}
              onRowClicked={clikearCursos}
              noDataComponent="No hay cursos"
            />

            <Box mt={5}>
              <Button
                colorScheme="orange"
                size="xs"
                onClick={() => {
                  console.log("ESTE ES EL EVENTO : ", eventoActual);
                  setModalCursos(true);
                }}
              >
                Agregar curso
              </Button>
            </Box>
          </Box>
          <Box p={4} border="solid 1px #F5F4F3">
            <Center mb={4}>
              <strong>INFORMACION</strong>
            </Center>
            {infoCurso[0] !== undefined ? (
              <Box>
                <SimpleGrid columns={2}>
                  <Box>
                    <FormControl>
                      <FormLabel fontSize={12}>
                        <strong> Fecha Inicio : </strong>
                        {moment(infoCurso[0].fechaInicio).format("DD-MM-YYYY")}
                      </FormLabel>
                    </FormControl>
                    <FormControl>
                      <FormLabel fontSize={12}>
                        <strong>Fecha Fin : </strong>
                        {moment(infoCurso[0].fechaFin).format("DD-MM-YYYY")}
                      </FormLabel>
                    </FormControl>
                    <FormControl>
                      <FormLabel fontSize={12}>
                        <strong> Cupo Maximo : </strong>
                        {infoCurso[0].cupoMaximo}
                      </FormLabel>
                    </FormControl>
                  </Box>

                  <Box>
                    <FormControl>
                      <FormLabel fontSize={12}>
                        <strong> E-mail : </strong>
                        {infoCurso[0].mailReferencia}
                      </FormLabel>
                    </FormControl>
                    <FormControl>
                      <FormLabel fontSize={12}>
                        <strong> Domicilio : </strong>
                        {infoCurso[0].domicilioReferencia}
                      </FormLabel>
                    </FormControl>
                    <FormControl>
                      <FormLabel fontSize={12}>
                        <strong> Contacto : </strong>
                        {infoCurso[0].NombreContactoReferencia}
                      </FormLabel>
                    </FormControl>
                  </Box>
                </SimpleGrid>
              </Box>
            ) : null}
            {console.log("este es info curso", infoCurso)}{" "}
            <Tabla
              columns={columnasAranceles}
              data={datosAranceles}
              customStyles={estiloTablas}
              noDataComponent="No hay aranceles"
            />
          </Box>
        </SimpleGrid>
      </Box>

      <Modal
        isOpen={modalCursos}
        onClose={() => {
          setModalCursos(false);
        }}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={14}>
            Nuevo curso para el evento : {eventoSeleccionado}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {error && (
              <Box bg="red.500">
                <Center color="white">TODOS LOS CAMPOS SON OBLIGATORIOS</Center>
              </Box>
            )}
            {errorFechas && (
              <Box bg="red.500">
                <Center color="white">FECHAS INVALIDAS</Center>
              </Box>
            )}

            <FormControl mb={2}>
              <FormLabel fontSize={12}>Código</FormLabel>
              <Input
                maxLength={10}
                size="xs"
                name="codigo"
                value={codigo}
                onChange={(e) => {
                  setCodigo(e.target.value.toUpperCase());
                }}
              />
            </FormControl>
            <FormControl mb={2}>
              <FormLabel fontSize={12}>Nombre Principal</FormLabel>
              <Input
                size="xs"
                name="nombreCurso"
                value={nombreCurso}
                onChange={(e) => {
                  setNombreCurso(e.target.value);
                }}
              />
            </FormControl>
            <FormControl mb={2}>
              <FormLabel fontSize={12}>Nombre Secundario</FormLabel>
              <Input
                size="xs"
                name="nombreSecCurso"
                value={nombreSecCurso}
                onChange={(e) => {
                  setNombreSecCurso(e.target.value);
                }}
              />
            </FormControl>
            <FormControl mb={2}>
              <FormLabel fontSize={12}>Fecha de Inicio</FormLabel>
              <Input
                size="xs"
                name="fechaInicioCurso"
                value={fechaInicioCurso}
                type="datetime-local"
                onChange={(e) => {
                  setFechaInicioCurso(e.target.value);
                }}
              />
            </FormControl>
            <FormControl mb={2}>
              <FormLabel fontSize={12}>Fecha de Fin</FormLabel>
              <Input
                size="xs"
                name="fechaFinCurso"
                value={fechaFinCurso}
                type="datetime-local"
                onChange={(e) => {
                  setFechaFinCurso(e.target.value);
                }}
              />
            </FormControl>
            <FormControl mb={2}>
              <FormLabel fontSize={12}>Cupo Máximo</FormLabel>
              <Input
                size="xs"
                name="cupoMaximo"
                value={cupoMaximo}
                onChange={(e) => {
                  setCupoMaximo(e.target.value);
                }}
              />
            </FormControl>
            <FormControl mb={2}>
              <FormLabel fontSize={12}>E-mail responsable</FormLabel>
              <Input
                size="xs"
                name="emailResp"
                value={emailResp}
                onChange={(e) => {
                  setEmailResp(e.target.value);
                }}
              />
            </FormControl>

            <FormControl mb={2}>
              <FormLabel fontSize={12}>Domicilio responsable</FormLabel>
              <Input
                size="xs"
                value={domicilioRefCurso}
                onChange={(e) => {
                  setDomicilioRefCurso(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize={12}>Nombre contacto</FormLabel>
              <Input
                size="xs"
                value={nombreContactoCurso}
                onChange={(e) => {
                  setNombreContactoCurso(e.target.value);
                }}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              size="xs"
              colorScheme="blue"
              mr={3}
              onClick={() => {
                setModalCursos(!modalCursos);
              }}
            >
              Cerrar
            </Button>
            <Button
              size="xs"
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
          setError(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={14}>Grupo conceptos / Evento</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {error && (
              <Box bg="red.500">
                <Center color="white">TODOS LOS CAMPOS SON OBLIGATORIOS</Center>
              </Box>
            )}
            <FormControl mb={2}>
              <FormLabel fontSize={12}> Codigo</FormLabel>
              <Input
                maxLength={20}
                size="xs"
                name="codigoEvento"
                value={codigoEvento}
                onChange={(e) => {
                  setCodigoEvento(e.target.value.toUpperCase());
                }}
              />
            </FormControl>
            <FormControl mb={2}>
              <FormLabel fontSize={12}>Nombre</FormLabel>
              <Input
                size="xs"
                name="nombreConcepto"
                value={nombreConcepto}
                onChange={(e) => {
                  setNombreConcepto(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize={12}>Descripcion</FormLabel>
              <Input
                size="xs"
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
              size="xs"
              colorScheme="blue"
              mr={3}
              onClick={() => {
                setModalConceptos(!modalConceptos);
              }}
            >
              Cerrar
            </Button>
            <Button
              size="xs"
              colorScheme="green"
              onClick={() => {
                agregarConcepto();
              }}
            >
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={modalAranceles}
        onClose={() => {
          setModalAranceles(false);
          setMostrarCargaArancel(false);
        }}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text>Aranceles {cursoActual}</Text>
          </ModalHeader>
          <ModalBody>
            <Tabla
              columns={columnasAranceles}
              data={datosAranceles}
              customStyles={estiloTablas}
            />
            {mostrarCargaArancel && (
              <HStack mt={4}>
                <FormControl>
                  <FormLabel mb={0} fontSize={10}>
                    Desde
                  </FormLabel>
                  <Input
                    type="datetime-local"
                    size="xs"
                    name="fechaDesdeAranceles"
                    value={fechaDesdeAranceles}
                    onChange={(e) => {
                      setFechaDesdeAranceles(e.target.value);
                    }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel mb={0} fontSize={10}>
                    Hasta
                  </FormLabel>
                  <Input
                    type="datetime-local"
                    size="xs"
                    name="fechaHastaAranceles"
                    value={fechaHastaAranceles}
                    onChange={(e) => {
                      setFechaHastaAranceles(e.target.value);
                    }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel mb={0} fontSize={10}>
                    Precio
                  </FormLabel>
                  <Input
                    type="number"
                    size="xs"
                    name="precioAranceles"
                    value={precioAranceles}
                    onChange={(e) => {
                      setPrecioAranceles(e.target.value);
                    }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel mb={0} fontSize={10}>
                    C.U.Mín
                  </FormLabel>
                  <Input
                    type="number"
                    size="xs"
                    name="cantidadUnidadesMinima"
                    value={cantidadUnidadesMinima}
                    onChange={(e) => {
                      setCantidadUnidadesMinima(e.target.value);
                    }}
                  />
                </FormControl>

                <FormControl mb={0}>
                  <Icon
                    as={FaRegSave}
                    w={6}
                    h={6}
                    mt={3}
                    color="blue.400"
                    cursor="pointer"
                    onClick={() => {
                      agregarArancel();
                    }}
                  />
                </FormControl>
              </HStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              size="xs"
              colorScheme="green"
              onClick={() => {
                setMostrarCargaArancel(true);
              }}
            >
              Nuevo Arancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={modalConfirmacion}
        onClose={() => {
          setModalConfirmacion(false);
        }}
      >
        <ModalOverlay />
        <ModalContent bg="white">
          <ModalBody>
            <Center>
              <VStack>
                <Icon w={20} h={20} color="green" as={FaRegCheckCircle} />
                <Text>Datos guardados.</Text>
              </VStack>
            </Center>
          </ModalBody>
          <ModalFooter>
            <Button
              w="100%"
              colorScheme="green"
              onClick={() => {
                setModalConfirmacion(false);
              }}
            >
              Aceptar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={modalError}
        onClose={() => {
          setModalError(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody bg="red.200">
            <p>Error</p>
            {descripcionError}
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                setModalError(false);
              }}
            >
              Aceptar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Inicio;
