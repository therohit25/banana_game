import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable({
  rows,
  columns,
  onEditUser,
  onDeleteUser,
}: {
  columns: any;
  rows: any;
  onEditUser?: (id: string) => void;
  onDeleteUser?: (id: string) => void;
}) {
  const enhancedColumns = [
    ...columns.map((column: string) => ({
      field: column,
      headerName: column.toUpperCase(),
      width: !onEditUser && !onDeleteUser ? 250 : 150,
      type: typeof column,
      flex: 1,
      minWidth: 100,
    })),
    ...(onDeleteUser
      ? [
          {
            field: 'delete',
            headerName: 'Delete',
            width: 150,
            sortable: false,
            renderCell: (params: any) => (
              <Button
                variant='contained'
                color='error'
                size='small'
                onClick={() => onDeleteUser(params.row.userId)}
              >
                Delete
              </Button>
            ),
          },
        ]
      : []),
    ...(onEditUser
      ? [
          {
            field: 'addUser',
            headerName: 'Edit',
            width: 150,
            sortable: false,
            renderCell: (params: any) => (
              <Button
                variant='contained'
                color='primary'
                size='small'
                onClick={() => onEditUser(params.row.userId)}
              >
                Edit
              </Button>
            ),
          },
        ]
      : []),
  ];

  return (
    <Paper sx={{ height: 400 }}>
      <DataGrid
        rows={rows}
        columns={enhancedColumns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
        getRowId={(row) => row._id}
      />
    </Paper>
  );
}
