import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import { useLocation, useNavigate } from 'react-router-dom';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../state/authentication/Action';





const settings = ['Profile', 'Activity', 'Logout'];


const NavBar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleAddCartPage = () => {
    if (auth?.selectedUser) {
      navigate("/cart");
    }
  }

  const handleMenuClick = (setting) => {
    handleCloseUserMenu();

    switch (setting) {
      case "Profile":
        navigate("/profile");
        break;
      case "Activity":
        navigate("/dashboard");
        break;
      case "Logout":
        dispatch(logoutUser(navigate));
        break;
      default:
        break;
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#A47864' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ width: '100%' }}>
          {/* Left: BOOKTOWN */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            BOOKTOWN
          </Typography>

         
         
          {/* Right: Always show user/cart section */}
          <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
            {auth?.selectedUser ? (
              <>
                <Box sx={{ paddingRight: 2 }}>
                <IconButton onClick={() => handleAddCartPage()}>
                    <ShoppingCartRoundedIcon sx={{ width: 40, height: 40, color:'white' }}  />
                </IconButton>
                </Box>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={auth.selectedUser.name?.toUpperCase()} src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  keepMounted
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={() => handleMenuClick(setting)}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <NoAccountsIcon style={{ height: 40, width: 40 }} onClick={handleLogin} />
            )}
          </Box>
        </Toolbar>

      </Container>
    </AppBar>
  );
}


export default NavBar;