import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import { makeStyles } from '@material-ui/core'
import { TextField } from '@material-ui/core'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  },
  btn: {
    fontSize: 20,
    backgroundColor: 'secondary.main',
    color: "white",
    '&:hover': {
      background: 'secondary.light'
    },
  },
  title: {
    color: 'secondary.main',
    textDecoration: 'underline',
    marginBottom: 20,
  }
})

export default function Create() {
  const classes = useStyles();
  const history = useHistory();

  // state of fields
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [category, setCategory] = useState('money')
  // check errors
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setdetailsError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleError(false)
    setdetailsError(false)

    if (title === '') {
      setTitleError(true);
    }

    if (details === '') {
      setdetailsError(true);
    }

    // Check if all true
    if (title && details && category) {

      // console.log(title);
      // console.log(details);
      // console.log(category);
      // console.log(JSON.stringify({ title, details, category }))
      const url = 'http://localhost:8000/notes';
      const options = {
        method: 'POST',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ title, details, category })
      };
      fetch(url, options).then(
        history.push('/')
      );

    }
  }

  return (
    <Container size="sm">
      <Typography
        className={classes.title}
        variant="h6"
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Create a New Note
      </Typography>

      <form noValidate autoComplete='off' onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          className={classes.field}
          label='Note Title'
          variant='outlined'
          color='secondary'
          fullWidth
          required
          error={titleError}
        />
        <TextField
          onChange={(e) => setDetails(e.target.value)}
          className={classes.field}
          label='Details'
          variant='outlined'
          color='secondary'
          multiline
          rows={5}
          fullWidth
          required
          error={detailsError}
        />


        <FormControl className={classes.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
            <FormControlLabel value="money" control={<Radio />} label="Money" />
            <FormControlLabel value="todos" control={<Radio />} label="Todos" />
            <FormControlLabel value="reminders" control={<Radio />} label="Reminders" />
            <FormControlLabel value="work" control={<Radio />} label="Work" />
          </RadioGroup>
        </FormControl>

        <Button
          className={classes.btn}
          onClick={() => console.log('you clicked me')}
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}>
          Submit
        </Button>
      </form>
    </Container>
  )
}
