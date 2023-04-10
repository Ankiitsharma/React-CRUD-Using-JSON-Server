import { Typography, Box, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button } from "@mui/material";

import { orange } from "@mui/material/colors";
import { makeStyles } from '@mui/styles';
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const useStyles = makeStyles({
    stuListColor: {
        backgroundColor: orange[400],
        color: 'white'
    },
    tableHeadCell: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16

    }
});

const View = () => {
    const classes = useStyles();
    const { id } = useParams();
    const [student, setStudent] = useState([]);
    const history = useNavigate();
    // console.log(id);

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

    }, [id])


    function handleClick() {
        history("/")
    }
    return (
        <>
            <Box textAlign="center" p={2} className={classes.stuListColor} mb={1}>
                <Typography variant="h4">Student Details</Typography>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow style={{ backgroundColor: "#616161" }}>
                            <TableCell align="center" className={classes.tableHeadCell}>ID</TableCell>
                            <TableCell align="center" className={classes.tableHeadCell}>Name</TableCell>
                            <TableCell align="center" className={classes.tableHeadCell}>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell align='center'>{student.id}</TableCell>
                            <TableCell align='center'>{student.stuname}</TableCell>
                            <TableCell align='center'>{student.email}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <Box m={3} textAlign='center'>
                <Button variant="contained" color='primary' onClick={handleClick}>Back to home</Button>
            </Box>

        </>
    )
}

export default View
