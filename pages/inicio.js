import React from "react";
import { Box, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import Tabla from "react-data-table-component";
const Inicio = () => {
  const columns = [
    {
      name: "NOMBRE PRINCIPAL",
      selector: (row) => row.nombre,
    },
    {
      name: "NOMBRE SECUNDARIO",
      selector: (row) => row.nombreSec,
    },
  ];

  const data = [
    {
      id: 1,
      nombre: "Estadistica aplicada a la genética forense PUBLICO-GENERAL",
      nombreSec: "1988",
    },
    {
      id: 2,
      nombre: "Estadistica aplicada a la genética forense DOCENTES",
      nombreSec: "1984",
    },
    {
      id: 3,
      nombre: "Estadistica aplicada a la genética forense DOCENTES",
      nombreSec: "1984",
    },
  ];
  return (
    <>
      <Box w="80%" mx="auto">
        <p>Grupo conceptos/eventos</p>
        <Box w="50%" mx="auto">
          <FormControl mb={2}>
            <FormLabel>Nombre</FormLabel>
            <Input size="sm" id="nombre" />
          </FormControl>
          <FormControl>
            <FormLabel>Descripcion</FormLabel>
            <Input size="sm" id="descripcion" />
          </FormControl>
          <Button mt={2} size="sm" w="100%" colorScheme="green">
            Agregar curso
          </Button>
          <Tabla mt="" columns={columns} data={data} />
        </Box>
      </Box>
    </>
  );
};

export default Inicio;
