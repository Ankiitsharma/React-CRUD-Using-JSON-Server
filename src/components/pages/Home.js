import { Typography, Box, Grid, TextField, Button } from "@mui/material";
import { deepPurple, green } from "@mui/material/colors";
import { makeStyles } from '@mui/styles';
import List from '../student/List'
import axios from "axios";
import { useState } from "react";



const useStyles = makeStyles({
    headingColor: {
        backgroundColor: deepPurple[400],
        color: "white"
    },
    addStucolor: {
        backgroundColor: green[400],
        color: 'white'
    },
});

const Home = () => {
    const classes = useStyles();
    const [student, setstudent] = useState({
        stuname: "",
        email: ""
    });

    const [status, setStatus] = useState();


    function onTextFieldChange(e) {
        setstudent({
            ...student,
            [e.target.name]: e.target.value
        })
        // console.log(student);
    }
    async function onFormSubmit(e) {
        e.preventDefault()
        try {
            await axios.post(`http://localhost:3004/students`, student)
            setStatus(true);

        } catch (error) {
            console.log('error hai kuch');
        }

    }
    if (status) {
        return <Home />
    }
    return (
        <>
            <Box textAlign="center" className={classes.headingColor} p={2} mb={2}>
                <Typography variant="h2">
                    React CRUD with API
                </Typography>
            </Box>

            <Grid container justify='center' spacing={4} >
                <Grid item md={6} xs={12}>
                    <Box textAlign="center" p={2} className={classes.addStucolor} mb={2}>
                        <Typography variant="h4">
                            Add Student
                        </Typography>
                    </Box>
                    <form noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField autoComplete='stuname' name='stuname' variant='outlined' required fullWidth id='stuname' label='Name' onChange={e => onTextFieldChange(e)} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField autoComplete='email' name='email' variant='outlined' required fullWidth id='email' label='Email Address' onChange={e => onTextFieldChange(e)} />
                            </Grid>
                        </Grid>

                        <Box m={3}>
                            <Button type='submit' variant="contained" color='primary' fullWidth onClick={e => onFormSubmit(e)}>Add</Button>
                        </Box>
                    </form>


                </Grid >

                <Grid item md={6} xs={12} mb={2}>
                    {/* imported tables item from list  */}
                    <List />
                </Grid>

            </Grid>
        </>
    )
}

export default Home
