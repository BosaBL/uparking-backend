import { createFileRoute } from '@tanstack/react-router';

import Vigilantes from '../../components/admin/vigilantes/Vigilantes';
import { VigilanteT } from '../../components/admin/vigilantes/vigilantes';
import { APIS } from '../../constants';
import axios from '../../libs/axiosBaseBearer';

export const Route = createFileRoute('/_admin/admin/vigilantes')({
  loader: async (): Promise<VigilanteT[]> => {
    const url = new URL('vigilantes/', APIS.admin).toString();

    const data = await axios.get(url);
    return data.data;
  },
  component: Vigilantes,
  shouldReload: true,
});
