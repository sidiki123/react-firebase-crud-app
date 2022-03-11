import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, makeStyles } from '@material-ui/core';
import { AccoubtCircle } from '@material-ui/icons';

import React from 'react';

const NavBar = (props) => {
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClose = () => {
        localStorage.removeItem('user');
        props.setUserState();
        setAnchorEl(null);
    }
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }

    
    return ( 
        <div className = { classes.root } >
            <AppBar positio = "static" className = { classes.menubackground } >
                <Toolbar>
                     <Typography variant = "h6" className = { classes.title } >
                         CRUD APP with authentification 
                    </Typography> {
                        auth && ( 
                            <div>
                                <IconButton 
                                    aria-label = "Compte de l'utlisateur courant"
                                    aria-controls = "menu-appbar"
                                    aria-haspopup = "true"
                                    onClick = { handleMenu }
                                    color = "inherit" 
                                >
                                </IconButton>

                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical:'top',
                                        horizontal:'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical:'top',
                                        horizontal:'right',
                                    }}
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <MenuItem>Profile</MenuItem>
                                    <MenuItem onclick={handleClose}>Se déconnecter</MenuItem>
                                </Menu>
                            </div>
                        )}       
                </Toolbar> 
        </AppBar> 
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menubackground: {
        backgroud: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    },
    title: {
        flexGrow: 1
    },
}));

export default NavBar