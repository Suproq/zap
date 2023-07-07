import React from "react";
import { observer } from 'mobx-react';
import store from '../../stores/LoginStore';
import { Button, Dialog, DialogActions,DialogContent, DialogContentText, DialogTitle, Grid, TextField, Typography, Divider } from "@mui/material";
import { Box } from "@mui/system";
import jwt from 'jwt-decode';

function LoginForm(props){
    const { onClose, open, toReg } = props;

    const handleClose = () => {
        onClose();
    };

    const handleReg = () => {
        toReg();
        onClose();
    };
    const [messageServ, setMess] = React.useState('');
    const login = async() => {
        const stNickname = document.getElementById('name').value;
        const stPassword = document.getElementById('password').value;
        const user = {
            nickname: stNickname, password: stPassword
          };
        const response = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        });
        const result = await response.json();
        if(response.status === 200){
            console.log(12);
            store.jwtDecode(result);
            onClose();
            window.location.reload();
        }
        else{
            setMess(result.message);
        }
    }
    /*const handleListItemClick = (value) => {
        onClose(value);
    };*/
    return(
        <Dialog open={open} onClose={handleClose} aria-labelledby="Login">
            <DialogTitle id="Login">Вход</DialogTitle>
            <DialogContent>
                <DialogContentText>{messageServ}</DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Имя аккаунта"
                    fullWidth
                    variant="outlined"/>
                <TextField
                    margin="dense"
                    id="password"
                    label="Пароль"
                    fullWidth
                    variant="outlined"
                    type="password"/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Отмена</Button>
                <Button onClick={login}>Войти</Button>
            </DialogActions>
            <Divider />
            {toReg!=null && <Box 
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx = {{m: 1}} >
                    <Typography>Нет аккаунта?</Typography>
                    <Button onClick={handleReg}>Регистрация</Button>
            </Box>}
                
        </Dialog>
    )
}

export default observer(LoginForm);