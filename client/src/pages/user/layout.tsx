import { Stack } from '@mui/material';
import ResponsiveAppBar from '../../components/navbar';

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Stack>
      <ResponsiveAppBar />
      {children}
    </Stack>
  );
};

export default UserLayout;
