import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Container } from "@mui/system";
import SearchBar from "./SearchBar";
import { Link, Navigate } from 'react-router-dom';
import LoginForm from "./LoginForm";
import { useNavigate } from 'react-router-dom';
import { SignalCellularNullOutlined } from "@mui/icons-material";
import { IconButton, Badge } from "@mui/material";
import MailIcon from '@mui/icons-material/Mail';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import login from '../stores/LoginStore';

const windowInnerWidth = document.documentElement.clientWidth;
const minWidth = 1200;
const logged = login.isLogged();


function NonLog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const toReg = () => {
    const thisUrl = window.location.href;
    navigate('/register', { state: thisUrl });/*{
      pathname: '/register',
      data: thisUrl
    })*/
  };
  return(
    <>
      <Box mr={3}>
      <Button onClick={handleClickOpen} color = "inherit" variant="outlined">Вход</Button>

        <LoginForm 
          open={open}
          onClose={handleClose}
          toReg={toReg}
        />

      </Box>
      <Button onClick={toReg} color = "secondary" variant="contained">Регистрация</Button>
    </>
  )
}

function Logged() {
  const nickname = login.getNick();
  //console.log()
  //const nickname = '1';
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    //handleMobileMenuClose();
  };
  const handleLogout = () => {
    login.logout();
    window.location.reload();
  }
  const isMenuOpen = Boolean(anchorEl);
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>{nickname}</MenuItem>
      <MenuItem onClick={handleLogout}>Выйти</MenuItem>
    </Menu>
  );


  return(
    <>
      <IconButton size="large" aria-label="show 4 new mails" color="inherit">
        <Badge>
          <MailIcon />
        </Badge>
      </IconButton>
      <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            {renderMenu}
    </>
  )
}

function Header() {
  let pos="sticky";
  if (windowInnerWidth < minWidth) {
    pos="static";
  }


  return(
    <>
    <AppBar position={pos}>
      <Container fixed>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={[
              {
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              },
              (theme) => ({
                '&:hover': {
                  color: '#66bb6a',
                }
              })
          ]
        }
          >
            RAZBOR
          </Typography>
          {windowInnerWidth >= minWidth &&
          <SearchBar />
          }
          <Box sx={{ flexGrow: 1 }} />
          {logged?<Logged />:<NonLog />}
        </Toolbar>
      </Container>
    </AppBar>
    
    {windowInnerWidth < minWidth &&
          <AppBar position="sticky">
            <Box display="flex"
                justifyContent="center"
            >
            <Toolbar>
              <SearchBar />
            </Toolbar>
            </Box>
          </AppBar>
          }
    </>
  );
}

export default Header;