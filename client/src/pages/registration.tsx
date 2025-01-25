import {
  Box,
  Button,
  Card,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axiosInstance from '../helpers/requestor';
import { IUserInput } from '../models/user.model';
import AdminLayout from './admin-dashboard/layout';

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  width: '100%',
  maxWidth: 500,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  backgroundColor: '#fff', // Light background
  color: '#333', // Dark text for light mode
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    color: '#333', // Dark text
    backgroundColor: '#f5f5f5', // Light input background
    borderRadius: theme.shape.borderRadius,
  },
  '& .MuiInputLabel-root': {
    color: '#777',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: theme.palette.primary.main,
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#ddd', // Light border
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#bbb',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  '& .MuiInputBase-root': {
    color: '#333', // Dark text
    backgroundColor: '#f5f5f5', // Light background
    borderRadius: theme.shape.borderRadius,
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#ddd', // Light border
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#bbb',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: 'uppercase',
  fontWeight: 'bold',
  color: '#fff', // White text
  backgroundColor: theme.palette.primary.main, // Primary color
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const Registration = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IUserInput>();

  const addUser = async (data: IUserInput) => {
    try {
      await axiosInstance.post('http://localhost:3000/user', data);
      toast('User Added Successfully!..', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } catch (error) {
      console.log(error);
      toast.error('User Not Added. Please try again later!..', {
        theme: 'light',
      });
    } finally {
      setValue('name', '');
      setValue('email', '');
      setValue('password', '');
      setValue('role', 'user');
    }
  };

  const editUser = async (data: IUserInput) => {
    try {
      await axiosInstance.patch(`http://localhost:3000/user/${userId}`, data);
      toast('User Edited Successfully!..', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      setTimeout(() => {
        navigate('/admin');
      }, 2500);
    } catch (error) {
      console.log(error);
      toast.error('User Not Edited. Please try again later!..', {
        theme: 'light',
      });
    } finally {
      setValue('name', '');
      setValue('email', '');
      setValue('password', '');
      setValue('role', 'user');
    }
  };

  const fetchUserById = async () => {
    try {
      const { data } = await axiosInstance.get(
        `http://localhost:3000/user/${userId}`
      );
      setValue('name', data?.data.name);
      setValue('email', data?.data.email);
      setValue('password', data?.data.password);
      setValue('role', data?.data.role);
    } catch (error) {
      console.log(error);
    }
  };

  useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUserById(),
    enabled: !!userId,
  });

  return (
    <AdminLayout>
      <Box display='flex' justifyContent='center' alignItems='center'>
        <StyledCard>
          <Typography
            variant='h4'
            component='h1'
            align='center'
            gutterBottom
            sx={{ fontWeight: 'bold' }}
          >
            {userId ? 'Edit User' : 'Add User'}
          </Typography>
          <form onSubmit={handleSubmit(userId ? editUser : addUser)}>
            <Stack spacing={3}>
              <StyledTextField
                {...register('name', {
                  required: 'Name is required',
                  minLength: {
                    value: 3,
                    message: 'Name must be at least 3 characters',
                  },
                  maxLength: {
                    value: 50,
                    message: 'Name must be less than 50 characters',
                  },
                })}
                label='Name'
                variant='outlined'
                error={!!errors.name}
                helperText={errors.name?.message}
                fullWidth
                value={watch('name') || ''}
                onChange={(e) => setValue('name', e.target.value)}
              />

              <StyledTextField
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Enter a valid email address',
                  },
                })}
                label='Email'
                type='email'
                variant='outlined'
                error={!!errors.email}
                helperText={errors.email?.message}
                fullWidth
                value={watch('email') || ''}
                onChange={(e) => setValue('email', e.target.value)}
              />

              <StyledTextField
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Password must be less than 20 characters',
                  },
                })}
                label='Password'
                type='password'
                variant='outlined'
                error={!!errors.password}
                helperText={errors.password?.message}
                fullWidth
                value={watch('password') || ''}
                onChange={(e) => setValue('password', e.target.value)}
              />

              <StyledSelect
                {...register('role', { required: 'Role is required' })}
                fullWidth
                value={watch('role') || ''}
                displayEmpty
              >
                <MenuItem value='' disabled>
                  --Select a Role--
                </MenuItem>
                <MenuItem value='user'>User</MenuItem>
                <MenuItem value='admin'>Admin</MenuItem>
              </StyledSelect>

              <StyledButton
                type='submit'
                variant='contained'
                size='large'
                fullWidth
              >
                {userId ? 'Edit' : 'Add'}
              </StyledButton>
            </Stack>
          </form>
        </StyledCard>
        <ToastContainer position='bottom-right' autoClose={5000} />
      </Box>
    </AdminLayout>
  );
};

export default Registration;
