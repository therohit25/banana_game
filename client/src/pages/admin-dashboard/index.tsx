import { CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { fetchPlayers } from '../../api/get-players';
import DataTable from '../../components/table';
import axiosInstance from '../../helpers/requestor';
import AdminLayout from './layout';

const AdminPanel = () => {
  const navigate = useNavigate();

  const {
    data: players,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['players'],
    queryFn: fetchPlayers,
  });

  const handleEditUser = (id: string) => {
    navigate(`/editUsers/${id}`);
  };

  const handleDeleteUser = async (userId: string) => {
    await axiosInstance.delete(`http://localhost:3000/user/${userId}`);
    refetch();
  };

  return (
    <AdminLayout>
      {isLoading ? (
        <CircularProgress size={'25px'} sx={{ marginInline: 'auto' }} />
      ) : (
        <DataTable
          columns={Object.keys(players?.[0] || {}).filter(
            (column) =>
              column.toLowerCase() !== '_id' &&
              column.toLowerCase() !== 'userid'
          )}
          rows={players}
          onEditUser={handleEditUser}
          onDeleteUser={handleDeleteUser}
        />
      )}
    </AdminLayout>
  );
};

export default AdminPanel;
