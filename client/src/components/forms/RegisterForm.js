import React, { useContext, useState } from "react";
import { observer } from "mobx-react";
import { Container, Box } from "@mui/system";
import { Button, Grid, Paper, TextField, Typography, Divider, ButtonGroup, ToggleButtonGroup, ToggleButton, FormControlLabel, Checkbox, touchRippleClasses } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import {isMobile} from 'react-device-detect';
import { Navigate } from "react-router";
//import {StoreContext} from "../stores";
import store from '../../stores/AuthStore';

function RegNaturalPerson(props){
    return(
        <>
            <TextField 
                error = {props.erUniq1}
                onChange={props.changeName}
                required
                id = "name"
                label = "Имя"
                helperText="Другие пользователи будут знать, как к вам обращаться"
            />
            <TextField 
                error = {props.erUniq2}
                onChange={props.changeUniq}
                id = "surnameAdr"
                label = "Фамилия(или отчество)"
            />
        </>
    )
}

function RegLegalPerson(props){
    return(
        <>
            <TextField 
                error = {props.erUniq1}
                onChange={props.changeName}
                required
                id = "name"
                label = "Название вашей компании"
                helperText="Другие пользователи будут знать, как к вам обращаться"
            />
            <TextField 
                error = {props.erUniq2}
                onChange={props.changeUniq}
                required
                id = "surnameAdr"
                label = "Адрес компании"
                helperText="Клиенты будут знать, где вас найти"
            />
        </>
    )
}


function RegisterForm(props){
    //const contextType = StoreContext;
    //const { urlBefore } = props;
    const [alignment, setAlignment] = React.useState('web');
    let widthTextField = '45ch';
    if(isMobile) {
        widthTextField = '95%';
    }
    const location = useLocation();
    const urlBefore = location.state;
    /*let but1 = "contained";
    let but2 = "primary";

    const natural = () => {
        but1 = "contained";
        but2 = "primary";
        console.log('1234');
    }
    const legal = () => {
        but1 = "contained";
        but2 = "primary";
        console.log('sdfg');
    }*/


    const [natural, setPers] = React.useState("natural");

    const changePerson = (event, newValue) => {
        setPers(newValue);
    };

    const [erPassword1, setPassEr1] = React.useState(false);
    const [erPassword2, setPassEr2] = React.useState(false);

    const [matchPass, setMatchPass] = React.useState(true);
    const checkPasswords = () => {
        setPassEr1(false);
        if (document.getElementById('checkpass').value != document.getElementById('password').value){
            setMatchPass(false);
        }
        else{
            setMatchPass(true);
        }
    };
    const oneCheckPass = () => {
        setPassEr2(false);
        if (!matchPass || document.getElementById('checkpass').value != ""){
            checkPasswords();
        }
    }


    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShow = () => {
        setShowPassword(!showPassword);
    }

    const [erNickname, setNickEr] = React.useState(false);
    const [erPhone, setPhoneEr] = React.useState(false);
    const [erUniq1, setUniqEr1] = React.useState(false);
    const [erUniq2, setUniqEr2] = React.useState(false);
    const reg = () => {
        document.location.assign(urlBefore);
    }
    const [messageServ, setMess] = React.useState('');
    const afterReg = async(e) => {
        e.preventDefault();
        console.log(123);
        const stNickname = document.getElementById('nickname').value;
        const stPhone = document.getElementById('number').value;
        const stPasword1 = document.getElementById('password').value;
        const stPasword2 = document.getElementById('password').value;
        const stName = document.getElementById('name').value;
        const surnameAdr = document.getElementById('surnameAdr').value;
        if (stNickname === ""){
            setNickEr(true);
        }
        if (stPhone === ""){
            setPhoneEr(true);
        }
        if (stPasword1 === ""){
            setPassEr1(true);
        }
        if (stPasword2 === ""){
            setPassEr2(true);
        }
        if (stName === ""){
            setUniqEr1(true);
        }
        if (surnameAdr === ""){
            setUniqEr2(true);
        }
        if(setUniqEr2||setUniqEr1||setPassEr2||setPassEr1||setPhoneEr||setNickEr){
            //return;
        }
        const role = natural === "natural" ? "1":"2";
        const surname = natural === "natural" ? surnameAdr:null;
        const address = natural === "natural" ? null:surnameAdr;
        const user = {
            nickname: stNickname, password: stPasword1, phone: stPhone,role:role,name:stName,surname:surname,address:address,darktheme:"false"
          };
        const response = await fetch('http://localhost:8080/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        });
        const result = await response.json();
        
        /*console.log('123');
        const message = await store.register(stNickname, stPasword1, stPhone, role, stName, surname, address, "false");*/
        console.log(result);
        if (result.message === '+'){
            document.location.assign(urlBefore);
        }
        else{
            setMess(result.message);
        }
        //document.location.assign(urlBefore);
    }
    
    const changeNick = () => {setNickEr(false)}
    const changePhone = () => {setPhoneEr(false)}
    const changeName = () => {setUniqEr1(false)}
    const changeUniq = () => {setUniqEr2(false)}
    return(
        //<Button onClick={afterReg}>ananas</Button>
        //!context.AuthStore.isLoggedIn ?
        <Box>
        <Container fixed>
            <Paper sx={{mt: 2}}>
                <Box
                display="flex"
                justifyContent="center"
                component="form"
                sx={{p: 2,
                    '& .MuiTextField-root': { m: 1, minWidth: widthTextField, maxWidth: widthTextField }}}
                noValidate
                autoComplete="off"
                >
                <Grid container alignItems='center' justifyContent='center' maxWidth='md' rowSpacing={2}>
                    <Grid item>   
                        <Typography align="center" variant="h4">
                            Регистрация
                        </Typography>
                        <Typography align="center" variant="h6">Заполните поля(отмеченные под * обязательные к заполнению):</Typography>
                        <Typography align="center" variant="h6">{messageServ}</Typography>
                    </Grid>
                    <Grid item>   
                        <TextField 
                        error = {erNickname}
                        required
                        id = "nickname"
                        label = "Имя аккаунта"
                        helperText="Будет использоваться при входе в систему"
                        onChange={changeNick}
                        />
                        <TextField 
                        error = {erPhone}
                        required
                        id = "number"
                        label = "Номер телефона"
                        helperText="По номеру телефона пользователи смогут связаться с вами"
                        onChange={changePhone}
                        />
                    </Grid>
                    <Grid item>   
                        <TextField 
                        error = {!matchPass||erPassword1}
                        required
                        id = "password"
                        label = "Пароль"
                        helperText="Будет использоваться при входе в систему"
                        type={!showPassword ? "password":null}
                        onChange={oneCheckPass} 
                        />
                        <TextField 
                        error = {!matchPass||erPassword2}
                        required
                        id = "checkpass"
                        label = "Повторите пароль"
                        helperText={!matchPass ? "Пароли не совпадают":null}
                        type={!showPassword ? "password":null}
                        onChange={checkPasswords}   
                        />
                    </Grid>
                    <Grid item>
                        <FormControlLabel control={<Checkbox/>} onChange={handleClickShow} label="Показывать пароли" />
                    </Grid>
                    <Box width="100%"/>
                    <Grid item> 
                        <ToggleButtonGroup
                            value={natural}
                            exclusive
                            onChange={changePerson}
                        >
                            <ToggleButton value="natural">Физическое лицо</ToggleButton>
                            <ToggleButton value="legal">Юридическое лицо</ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>
                    <Grid item> 
                        {natural === "natural" ? (
                            <RegNaturalPerson erUniq1={erUniq1} changeName={changeName}/>
                        ) : (
                            <RegLegalPerson erUniq2={erUniq2} changeUniq={changeUniq}/>
                        )}
                    </Grid>
                    <Grid item>
                    <Button onClick={afterReg}>
                        Зарегистрироваться
                    </Button>
                    </Grid>
                </Grid> 
                </Box>
            </Paper>
        </Container>
        </Box> //:
        //<Navigate to="/" replace/>
    )
}

export default observer(RegisterForm);