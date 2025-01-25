import AppleIcon from '@mui/icons-material/Apple';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Cookies from 'js-cookie';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../features/LoginLogout';
import { StyledNavLink } from '../style';

const pages = [
  { text: 'Home', url: '/' },
  { text: 'Rankings', url: '/rankings' },
];

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userdetails = useSelector((state) => (state as any).user.value);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position='static'
      color='primary'
      sx={{ backgroundColor: '#121212' }}
    >
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <AppleIcon
            sx={{
              display: { xs: 'none', md: 'flex' },
              mr: 1,
              color: '#90caf9',
            }}
          />
          <Typography
            variant='h6'
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#90caf9',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/')}
          >
            BaNaNa
          </Typography>

          {/* Mobile Menu Button */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='open menu'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.url} onClick={handleCloseNavMenu}>
                  <Typography
                    sx={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      color: '#000',
                    }}
                  >
                    {page.text}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <AppleIcon
            sx={{
              display: { xs: 'flex', md: 'none' },
              mr: 1,
              color: '#90caf9',
            }}
          />
          <Typography
            variant='h5'
            noWrap
            component='a'
            href='#app-bar-with-responsive-menu'
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#90caf9',
              textDecoration: 'none',
            }}
          >
            BaNaNa
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <StyledNavLink
                key={page.url}
                to={page.url}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  mx: 2,
                  color: '#e0e0e0',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  textDecoration: 'none',
                  display: 'block',
                  '&:hover': {
                    color: '#90caf9',
                    textDecoration: 'underline',
                  },
                }}
              >
                {page.text}
              </StyledNavLink>
            ))}
          </Box>

          {userdetails ? (
            <Button
              color='info'
              onClick={() => {
                Cookies.remove('accesstoken');
                dispatch(logout());
                navigate('/login');
              }}
            >
              Logout
            </Button>
          ) : (
            <Button color='info'>
              <NavLink to={'/login'}> Login</NavLink>
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
