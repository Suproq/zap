import React from "react";
import { observer } from 'mobx-react';
import login from '../../stores/LoginStore';
import ROLES from '../../stores/constants/Roles';
import { useNavigate } from 'react-router-dom';

import LoginForm from "./LoginForm";

import { Container, Box } from "@mui/system";
import { Paper, Button, Typography, Grid, Divider } from "@mui/material";

import {isMobile} from 'react-device-detect';

const logged = login.isLogged();
const isadmin = login.getRole() === ROLES.ADMIN;

function Panel(){
    const navigate = useNavigate();

    const newCar = () => {
        navigate('/admin/newcar');
    };

    const delCar = () => {
        //if (!login.isLogged())
            //navigate('/admin/delcar');
    };

    let widthTextField = '45ch';
    if(isMobile) widthTextField = '95%';

    return(
        <Box
            display="flex"
            justifyContent="center"
            component="form"
            sx={{p: 2,
                '& .MuiTextField-root': { m: 1, minWidth: widthTextField, maxWidth: widthTextField }}}
            noValidate
            autoComplete="off"
        >
            <Grid container alignItems='center' justifyContent='center' maxWidth='md' spacing={6}>
                <Grid item>   
                    <Typography variant="h4" align="center">Панель администратора</Typography>
                </Grid>
                <Grid item>
                    <Grid container justifyContent='center' spacing={2}>
                        <Grid item>   
                            <Button onClick={newCar} color = "inherit" variant="outlined">Добавить новую модель</Button>
                        </Grid>
                        <Grid item>   
                            <Button onClick={delCar} color = "inherit" variant="outlined">Отредактировать или удалить машину</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

function AdminPanel(){
    const navigate = useNavigate();

    const handleClose = () => {
        if (!login.isLogged())
            navigate('/');
      };

    if(logged && !isadmin)
        navigate('/');
    return(
        <Box>
        <Container fixed>
            <Paper sx={{mt: 2}}>
                <LoginForm 
                    open={!logged}
                    onClose={handleClose}
                    toReg={null}
                />
                {isadmin&& <Panel /> }
            </Paper>
        </Container>
        </Box> 
    )
}

export default observer(AdminPanel);