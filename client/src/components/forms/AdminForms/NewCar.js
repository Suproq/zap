import React from "react";
import { observer } from 'mobx-react';
//import store from '../../stores/LoginStore';
import { Paper, Button, MenuItem, Dialog, DialogActions,DialogContent, DialogContentText, DialogTitle, Grid, TextField, Typography, Divider } from "@mui/material";
import { Box , Container} from "@mui/system";
import {isMobile} from 'react-device-detect';
import { useNavigate } from 'react-router-dom';

import login from '../../../stores/LoginStore';
import ROLES from '../../../stores/constants/Roles';
import TypeEngine from "../../../stores/constants/TypesEngines";
import TypeTransmissions from "../../../stores/constants/TypeTransmissions";
import TypeDrives from "../../../stores/constants/TypeDrives";

const logged = login.isLogged();
const isadmin = login.getRole() === ROLES.ADMIN;

function NewCar(props){
    const navigate = useNavigate();
    if(!logged || !isadmin)
        navigate('/');
    
    let widthTextField = '45ch';
    if(isMobile) widthTextField = '95%';

    // const SelImage = () => {
    //     navigate('/admin/newcar');
    // };

    const [carPhoto, setImage] = React.useState(null)

    const SelImage = event => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
          }
      };

    return(
        <Box>
            <Container fixed>
                <Paper sx={{mt: 2}}>
                    <Box display="flex"
                    justifyContent="center"
                    component="form"
                    sx={{p: 2,
                        '& .MuiTextField-root': { m: 1, minWidth: widthTextField, maxWidth: widthTextField }}}
                    noValidate
                    autoComplete="off"
                    >
                        <Grid container alignItems='center' justifyContent='center' maxWidth='md' spacing={6}>
                            <Grid item>   
                                <Typography variant="h4" align="center">Добавление машины</Typography>
                            </Grid>
                            <Grid item>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="brand"
                                    label="Марка(производитель)"
                                    fullWidth
                                    variant="outlined"/>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="model"
                                    label="Модель"
                                    fullWidth
                                    variant="outlined"/>
                            </Grid>
                            <Grid item>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="startProd"
                                    label="Первый год выпуска"
                                    fullWidth
                                    variant="outlined"/>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="endProd"
                                    label="Последний год выпуска(или наст.время)"
                                    fullWidth
                                    variant="outlined"/>
                            </Grid>
                            <Grid item>
                            <input
                                accept="image/*"
                                //className={classes.input}
                                style={{ display: 'none' }}
                                id="raised-button-file"
                                multiple
                                type="file"
                                onChange={SelImage}
                                />
                                <label htmlFor="raised-button-file">
                                <Button variant="raised" component="span" //className={classes.button}>
                                >
                                    Выбрать фото автомобиля (150x250)
                                </Button>
                                </label> 
                            </Grid>
                            {carPhoto!=null && <Grid item>
                                <img alt="Выбранное фото" src={carPhoto} style={{height:150, width:250}} />
                            </Grid>}
                            <Box width="100%"/>
                            <Grid item>
                            <Grid container justifyContent='center' spacing={2}>
                                <Grid item>   
                                    <Typography variant="h6" align="center">Добавление комплектации</Typography>
                                </Grid>
                                <Grid item>
                                    <TextField
                                    autoFocus
                                    margin="dense"
                                    id="nameMode"
                                    label="Название модификации"
                                    fullWidth
                                    variant="outlined"/>

                                    <TextField
                                    autoFocus
                                    margin="dense"
                                    id="engineModel"
                                    label="Модель двигателя"
                                    fullWidth
                                    variant="outlined"/>
                                </Grid>
                                <Grid item>
                                    <TextField
                                    autoFocus
                                    margin="dense"
                                    id="engineVolume"
                                    label="Объем двигателя(л)"
                                    fullWidth
                                    variant="outlined"/>

                                    <TextField
                                    autoFocus
                                    margin="dense"
                                    id="power"
                                    label="Мощность(л.с.)"
                                    fullWidth
                                    variant="outlined"/>
                                </Grid>
                                <Grid item>
                                    <TextField
                                    autoFocus
                                    margin="dense"
                                    id="typeEngine"
                                    label="Тип двигателя"
                                    fullWidth
                                    variant="outlined"
                                    select>
                                        {TypeEngine.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                    <TextField
                                    autoFocus
                                    margin="dense"
                                    id="transmission"
                                    label="Коробка передач"
                                    fullWidth
                                    variant="outlined"
                                    select>
                                        {TypeTransmissions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item>
                                    <TextField
                                    autoFocus
                                    margin="dense"
                                    id="drive"
                                    label="Привод"
                                    fullWidth
                                    variant="outlined"
                                    select>
                                        {TypeDrives.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            </Grid>
                            </Grid>
                            <Grid item>
                                <Button>Добавить комплектацию</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Container>
        </Box> 
    )
}

export default observer(NewCar);