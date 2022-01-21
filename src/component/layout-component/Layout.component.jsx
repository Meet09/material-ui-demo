import { Drawer, Typography, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, Avatar } from '@material-ui/core';
import { AddCircleOutlined, SubjectOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { format } from 'date-fns'

const drawerWidth = 240;
const customStyles = makeStyles((theme) => {
    return {
        root: {
            display: 'flex'
        },
        title: {
            padding: theme.spacing(2)
        },
        page: {
            backgroundColor: '#f9f9f9',
            width: '100%',
            padding: theme.spacing(3),
        },
        drawer: {
            width: drawerWidth
        },
        drawerPaper: {
            width: drawerWidth
        },
        activeItem: {
            backgroundColor: '#f2f2f2'
        },
        appbar: {
            width: `calc(100% - ${drawerWidth}px)`
        },
        toolbar: theme.mixins.toolbar,
        date: {
            flexGrow: 1
        },
        avatar: {
            marginLeft: theme.spacing(2)
        }
    }
});


export default function Layout(props) {
    const classes = customStyles();
    const history = useHistory();
    const location = useLocation();

    const menuItems = [
        {
            text: 'Notes',
            icon: <SubjectOutlined color='secondary' />,
            path: '/'
        },
        {
            text: 'Create Notes',
            icon: <AddCircleOutlined color='secondary' />,
            path: '/create'
        }

    ];

    return (
        <div className={classes.root}>
            {/* App-bar */}
            <AppBar
                className={classes.appbar}
                elevation={0}
            >
                <Toolbar>
                    <Typography className={classes.date}>
                        Today is the {format(new Date(), 'do MMMM Y')}
                    </Typography>
                    <Typography>
                        Flinn
                    </Typography>
                    <Avatar className={classes.avatar}>F</Avatar>
                </Toolbar>
            </AppBar>


            {/* Side-bar */}
            <Drawer
                className={classes.drawer}
                variant="permanent"
                anchor="left"
                classes={{ paper: classes.drawerPaper }}
            >
                <div className={classes.title}>
                    <Typography variant="h5">
                        ULTRON
                    </Typography>
                </div>


                {/* list-items */}
                <List>
                    {
                        menuItems.map(item => (
                            <ListItem
                                button
                                key={item.text}
                                className={location.pathname === item.path ? classes.activeItem : null}
                                onClick={() => history.push(item.path)}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))
                    }
                </List>
            </Drawer>

            <div className={classes.page}>
                <div className={classes.toolbar} />
                {props.children}
            </div>
        </div >
    );
}