import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { retrieveFiscalias } from "../store/actions/fiscalias";
const FiscaliasList = () => {
  const fiscalias = useSelector((state) => state.fiscalias);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveFiscalias());
  }, [dispatch]);

  const columns = [
    {
      field: "agencia",
      headerName: "Agencia",
      sortable: true,
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "codigo",
      headerName: "Codigo",
      sortable: true,
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "tipo",
      headerName: "Tipo fiscalía",
      sortable: true,
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "departamento",
      headerName: "Departamento",
      sortable: true,
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "municipio",
      headerName: "Municipio",
      sortable: true,
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "telefono",
      headerName: "Teléfono",
      sortable: true,
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "datetime",
      headerName: "Fecha ingreso",
      sortable: true,
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "action",
      headerAlign: "center",
      headerName: "Acciones",
      renderCell: (params) => {
        return (
          <Link
            to={"/fiscalias/" + params?.row?.id_fiscalia}
            className="btn btn-warning btn-sm"
          >
            Editar
          </Link>
        );
      },
      align: "center",
    },
  ];

  return (
    <div>
      <div className="col-md-12">
        <h4>Listado de fiscalias</h4>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={fiscalias || []}
            columns={columns || []}
            disableSelectionOnClick
            getRowId={(row) => row.id_fiscalia}
            components={{
              NoRowsOverlay: () => (
                <Stack
                  height="100%"
                  alignItems="center"
                  justifyContent="center"
                >
                  Sin resultados
                </Stack>
              ),
              NoResultsOverlay: () => (
                <Stack
                  height="100%"
                  alignItems="center"
                  justifyContent="center"
                >
                  Sin resultados
                </Stack>
              ),
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default FiscaliasList;
