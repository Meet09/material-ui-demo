import { Avatar, Card, CardContent, CardHeader, IconButton, Typography } from "@material-ui/core";
import { blue, green, red, yellow } from "@material-ui/core/colors";
import { DeleteOutline } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import React from "react";


const customStyles = makeStyles({
    test: {
        border: (note) => {
            switch (note.category) {
                case 'work': return '1px solid #fbc02d'
                case 'todos': return '1px solid #4caf50'
                case 'reminders': return '1px solid #f44336'
                default: return '1px solid #2196f3'
            }
        }
    },
    avatar: {
        backgroundColor: (note) => {
            if (note.category === 'work') {
                return yellow[700]
            }
            if (note.category === 'todos') {
                return green[500]
            }
            if (note.category === 'reminders') {
                return red[500]
            }
            return blue[500]
        }
    }

})

const NoteCard = (props) => {
    const classes = customStyles(props.note);
    return (
        <div>
            <Card
                className={classes.test}
                elevation={0}
            >
                <CardHeader
                    avatar={
                        <Avatar className={classes.avatar}>
                            {
                                props.note.category[0].toUpperCase()
                            }
                        </Avatar>
                    }
                    action={
                        <IconButton onClick={() => props.removeNote(props.note.id)}>
                            <DeleteOutline />
                        </IconButton>
                    }
                    title={props.note.title}
                    subheader={props.note.category}
                />
                <CardContent>
                    <Typography variant="body1">
                        {props.note.details}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}
export default NoteCard;