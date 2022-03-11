import React, {useEffect, useState} from 'react'
import {Container, CssBaseline, Avatar, Typography, FormControlLabel, Button, Checkbox, Grid, Link, makeStyles, Card, CardContent} from '@material-ui/core'
import {LockRounded} from '@material-ui/icons'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import fire from '../helpers/database';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = (props) => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }
    const handlePassword = (event) => {
        setPassword(event.target.value);
    }
    const handleConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    }
    const handlerSignup = () => {
        fire.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(response => {
            if(response) {
                props.toggle();
                toast.success('Utilisateur enregistré!')
            }
        }).catch((error) => {
            switch(error.code) {
                case 'auth/email-already-in-use':
                toast.error(error.message);
                break;
                case 'auth/invalid-email':
                toast.error(error.message);
                break;
                case 'auth/weak-password':
                toast.error(error.message);
                break;
            }
        })
    }

    useEffect(() => {
      ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
          if(value !== password) {
            return false;
          }
            return true;
      });
    
      return () => {
        ValidatorForm.removeValidationRule('isPasswordMatch');
    }
    }, [password])
    

    return (
        <Container component="main" maxWidth="xs">
            <Card className={classes.card}>
                <CardContent>
                    <CssBaseline/>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockRounded/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Inscription
                        </Typography>
                        <ValidatorForm 
                            onSubmit={handlerSignup}
                            onError= {errors => {
                                for(const err of errors) {
                                    console.log(err.props.errorMessages[0])
                                }
                            }}
                            className={classes.form}
                        >
                        <TextValidator 
                            variant= "outlined"
                            margin= "normal"
                            fullWidth
                            label="Email"
                            onChange={handleEmail}
                            name="email"
                            value={email}
                            validators={['required','isEmail']}
                            errorMessages={['Ce champ est réquis', 'Adresse mail invalide']}
                            autocomplete='off'
                        /> 
                        <br/> 
                        <TextValidator 
                            variant= "outlined"
                            fullWidth
                            label="Mot de passe"
                            onChange={handlePassword}
                            name="password"
                            type="password"
                            value={password}
                            validators={['required']}
                            errorMessages={['Ce champ est réquis']}
                            autocomplete='off'
                        /> 
                        <br/>
                        <TextValidator 
                            variant= "outlined"
                            fullWidth
                            label="Confirmer le mot de passe"
                            onChange={handleConfirmPassword}
                            name="confirmPassword"
                            type="password"
                            value={password}
                            validators={['isPasswordMatch','required']}
                            errorMessages={['Le mot de passe ne correspond pas','Ce champ est réquis']}
                            value={confirmPassword}
                            autocomplete='off'
                        /> 
                        <br/>
                        <Button
                            type="submit"
                            fullWidth
                            variant='contained'
                            className={classes.submit}
                        >
                            S'inscrire
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link onClick={props.toggle} className={classes.pointer} variant="body2">
                                    {"Avez vous déjà un compte ? connectez-vous ici"}
                                </Link>
                            </Grid>
                        </Grid>
                        </ValidatorForm>
                    </div>
                </CardContent>
            </Card>
        </Container>
    )
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form : {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        margin: theme.spacing(3, 0, 2),
        color: '#fff'
    },
    card: {
        marginTop: '20px',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingBottom: '20px',
    },
    pointer: {
        cursor: 'pointer',
        color: 'red'
    }
}))

export default Register