import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import { useMemo } from 'react';
import CrudTable from '../../components/admin/CrudTable';
import { SedeT } from '../../components/admin/sedes/sedes';
import CreateEstacionamientoModal from '../../components/map/CreateEstacionamientoModal'; import ViewLocation from '../../components/map/ViewLocation';
import { Estacionamiento, OptEstacionamiento } from '../../components/map/types';
import { APIS } from '../../constants';
import UpdateEstacionamientoModal from '../../components/map/UpdateEstacionamientoModal';
import EstacionamientosCrudTable from '../../components/admin/EstacionamientosCrudTable';
import authApiWithBearer from '../../libs/axiosAuthBearer';


const handleDelete = async (data: OptEstacionamiento) => {
  const url = new URL('estacionamientos/', APIS.admin);

  return authApiWithBearer.delete(`${url}${data.id}/`);
};
const handleUpdate = async (data: SedeT) => {
  const url = new URL('estacionamientos/', APIS.admin);

  return authApiWithBearer.patch(`${url}${data.id}/`, data);
};

function Component() {
  const loaderData = useLoaderData({
    from: '/_admin/admin/estacionamientos',
  }) as {
    estacionamientos: Estacionamiento[];
    sedes: SedeT[];
  };

  const columns = useMemo<Array<ColumnDef<Estacionamiento> & { form: string }>>(
    () => [
      { header: 'id (código)', accessorKey: 'id', id: 'id', form: 'id' },
      { header: 'nombre', accessorKey: 'nombre', id: 'nombre', form: 'nombre' },
      {
        header: 'capacidad',
        accessorKey: 'capacidad',
        id: 'capacidad',
        form: 'Capacidad (número entero)',
      },
      {
        header: 'capacidad máx.',
        accessorKey: 'capacidad_max',
        id: 'capacidad_max',
        form: 'Capacidad máxima (número entero)',
      },
      { header: 'sede', accessorKey: 'sede', id: 'sede', form: 'sede' },
      {
        header: 'ubicación',
        accessorKey: 'area_espacio',
        id: 'area_espacio',
        cell: (info) => {
          return <ViewLocation dataArray={[info.row.original]} />;
        },
        form: 'Ubicación (dibuje un polígono)',
      },
    ],
    []
  );


  return (
    <EstacionamientosCrudTable<Estacionamiento>
      data={loaderData.estacionamientos}
      columns={columns}
      UpdateModal={UpdateEstacionamientoModal}
      addModal={
        <CreateEstacionamientoModal
          sedes={loaderData.sedes}
          dataArray={loaderData.estacionamientos}
          columns={columns}
        />
      }
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
      sedes={loaderData.sedes}
    />
  );
}

export default Component;

export const Route = createFileRoute('/_admin/admin/estacionamientos')({
  loader: async (): Promise<{
    estacionamientos: Estacionamiento[];
    sedes: SedeT[];
  }> => {
    const estacionamientosUrl = new URL(
      'estacionamientos/',
      APIS.user
    ).toString();
    const sedesUrl = new URL('sedes/', APIS.user).toString();

    const sedes = axios.get(sedesUrl);
    const estacionamientos = axios.get(estacionamientosUrl);

    const res = await Promise.all([sedes, estacionamientos]);

    return {
      sedes: res[0].data,
      estacionamientos: res[1].data,
    };
  },

  component: Component,
  shouldReload: true,
});
