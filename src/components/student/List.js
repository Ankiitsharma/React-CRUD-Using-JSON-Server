import { Typography, Box, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton, Tooltip } from "@mui/material";

import { orange } from "@mui/material/colors";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';


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


const List = () => {
    const classes = useStyles();
    const [students, setStudents] = useState([]);
    useEffect(() => {

        async function getAllStudent() {
            try {
                const students = await axios.get(" http://localhost:3004/students")
                // console.log(students.data);
                setStudents(students.data);
            } catch (error) {
                console.log('error hai kuch');
            }
        }

        getAllStudent()

    }, [])

    const handleDeelete = async id => {
        await axios.delete(`http://localhost:3004/students/${id}`);
        var newStudent = students.filter((item) => {
            return item.id !== id;
        })
        setStudents(newStudent);
    }

    return (
        <>
            <Box textAlign="center" p={2} className={classes.stuListColor} mb={1}>
                <Typography variant="h4">Student List</Typography>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow style={{ backgroundColor: "#616161" }}>
                            <TableCell align="center" className={classes.tableHeadCell}>No</TableCell>
                            <TableCell align="center" className={classes.tableHeadCell}>Name</TableCell>
                            <TableCell align="center" className={classes.tableHeadCell}>Email</TableCell>
                            <TableCell align="center" className={classes.tableHeadCell}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            students.map((student, i) => {
                                return (
                                    <TableRow key={i}>
                                        <TableCell align='center'>{i + 1}</TableCell>
                                        <TableCell align='center'>{student.stuname}</TableCell>
                                        <TableCell align='center'>{student.email}</TableCell>
                                        <TableCell align='center'>
                                            <Tooltip title='View'>
                                                <IconButton><Link to={`/view/${student.id}`}><VisibilityIcon color='primary' /></Link></IconButton>
                                            </Tooltip>
                                            <Tooltip title='Edit'>
                                                <IconButton><Link to={`/edit/${student.id}`}><EditIcon /></Link></IconButton>
                                            </Tooltip>
                                            <Tooltip title='Delete'>
                                                <IconButton onClick={() => handleDeelete(student.id)}><DeleteIcon color='secondary' /></IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>


                                )
                            })
                        }

                    </TableBody>
                </Table>
            </TableContainer>

        </>
    )
}

export default List








