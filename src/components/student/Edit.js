import { Typography, Box, Grid, TextField, Button } from "@mui/material";
import { deepPurple, green } from "@mui/material/colors";
import { makeStyles } from '@mui/styles';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

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

const Edit = () => {
    const classes = useStyles();
    const { id } = useParams();
    const history = useNavigate();
    const [student, setStudent] = useState({
        stuname: "",
        email: ""


    });


    useEffect(() => {
        async function getStudent() {
            try {
                const student = await axios.get(`http://localhost:3004/students/${id}`)
                // console.log(student.data);
                setStudent(student.data);

            } catch (error) {
                console.log('error hai kuch');
            }
        }
        getStudent();

    }, [id]);

    function onTextFieldChange(e) {
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        })
        // console.log(student);
    }



    async function onFormSubmit(e) {
        e.preventDefault()
        try {
            await axios.put(`http://localhost:3004/students/${id}`, student)
            history("/")

        } catch (error) {
            console.log('error hai kuch');
        }

    }

    function handleClick() {
        history("/")
    }



    return (
        <>
            <Box textAlign="center" className={classes.headingColor} p={2} mb={2}>
                <Typography variant="h2">
                    React CRUD with API
                </Typography>
            </Box>

            <Grid container ml={40} justify='center' textAlign="center" >
                <Grid item md={6} xs={12} justify='center' textAlign="center" >
                    <Box textAlign="center" p={2} className={classes.addStucolor} mb={2}>
                        <Typography variant="h4">
                            Edit Student
                        </Typography>
                    </Box>
                    <form >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>

                                <TextField autoComplete='id' name='id' variant='outlined' required fullWidth id='id' label='ID' autoFocus value={` ${id}`} disabled />
                            </Grid>

                            <Grid item xs={12} sm={6}>

                                <TextField autoComplete='stuname' name='stuname' variant='outlined' required fullWidth id='stuname' label='Name' value={student.stuname} onChange={e => onTextFieldChange(e)} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField autoComplete='email' name='email' variant='outlined' required fullWidth id='email' label='Email Address' value={student.email} onChange={e => onTextFieldChange(e)} />
                            </Grid>
                        </Grid>

                        <Box m={3}>
                            <Button type='button' variant="contained" color='primary' fullWidth onClick={e => onFormSubmit(e)}>Update</Button>
                        </Box>
                    </form>
                    <Box m={3} textAlign='center'>
                        <Button variant="contained" color='primary' onClick={handleClick}>Back to home</Button>
                    </Box>
                </Grid >

            </Grid>
        </>
    )
}

export default Edit
