import { Box, TextField, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";


const Home = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneno, setPhoneno] = useState("");
    const [note, setNote] = useState("");
    const [allUsers, setAllUsers] = useState([]);
    const [userId, setUserId] = useState("");
    const [errors, setErrors] = useState({ email: '', name: '', phoneno: '', note: '' });
    const [message, setMessage] = useState("");
    const [err, setErr] = useState("")


    const validateName = (name) => {
        if (name.trim() === '') {
            return 'Please enter name'
        }
        if (name.length < 5) {
            return 'name must be at lease 5 charcters'
        }
        if (!/^[a-zA-Z0-9]+$/.test(name)) {
            return 'Name must be alphanumeric (letters and numbers only)';
        }
        return '';
    }
    const validateMobileNo = (mobileNo) => {
        if (mobileNo.trim() === '') {
            return 'Please enter Mobile Number'
        }
        if (mobileNo.length !== 9) {
            return 'mobile must be 9 digits'
        }
        if (!/^\d{9}$/.test(mobileNo)) {
            return 'Mobile number must contain only digits';
        }
        return '';
    }
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.trim() === '') {
            return 'Please enter your email'
        }
        if (!emailRegex.test(email)) {
            return 'Please enter valid email'
        }
        return '';
    }
    const validateNotes = (note) => {
        if (note.trim() === '') {
            return 'Please enter user short detail'
        }
        if (note.length <= 20) {
            return 'Detail must be more then 20 charac'
        }
        return '';
    }

    const registerHandler = async () => {
        setErr("");
        setMessage("");
        const emailError = validateEmail(email);
        const nameError = validateName(name);
        const mobileError = validateMobileNo(phoneno);
        const notesError = validateNotes(note)
        if (emailError || nameError || mobileError || notesError) {
            setErrors({ email: emailError, name: nameError, phoneno: mobileError, note: notesError });
            return;
        } else {
            setErrors({ email: '', name: '', phoneno: '', note: '' });
        }
        try {
            const data = { name, email, phoneno, note };
            const resp = await axios.post('http://localhost:5000/api/notes/new', data);
            getAllData();
            setName("")
            setEmail("")
            setPhoneno("")
            setNote("");
            setMessage("New User Details Added Successfully")
        } catch (error) {
            setErr("check your network connection Please")
        }

    }

    const getAllData = async () => {
        try {
            const resp = await axios.get("http://localhost:5000/api/notes/all");
            setAllUsers(resp.data.allUser);
        } catch (error) {
            setErr("check your network connection Please")
        }

    }

    const getUserDetail = async (id) => {
        setErr("");
        const data = { id }
        try {
            setMessage("");
            const resp = await axios.post("http://localhost:5000/api/user/id", data);
            const userDetail = resp.data.user;
            setName(userDetail.name);
            setEmail(userDetail.email);
            setPhoneno(userDetail.phoneno);
            setNote(userDetail.note);
            setUserId(userDetail._id);

        } catch (error) {
            setErr("check your network connection Please")
        }
    }

    const updateHander = async () => {
        setErr("");
        const emailError = validateEmail(email);
        const nameError = validateName(name);
        const mobileError = validateMobileNo(phoneno);
        const notesError = validateNotes(note)
        if (emailError || nameError || mobileError || notesError) {
            setErrors({ email: emailError, name: nameError, phoneno: mobileError, note: notesError });
            return;
        } else {
            setErrors({ email: '', name: '', phoneno: '', note: '' });
        }
        const data = { userId, name, email, phoneno, note };
        try {
            const resp = await axios.post("http://localhost:5000/api/user/update", data);
            const result = resp.data.success;
            if (result) {
                getAllData();
                setName('');
                setEmail('');
                setPhoneno('');
                setNote('');
                setUserId('');
                setMessage("User Details Updated Successfully")
            }
        } catch (error) {
            setErr("check your network connection Please")
        }
    }

    useEffect(() => {
        getAllData()
    }, [])
    return (
        <>
            <Box sx={{ background: "#e3f2fd", width: "full", minHeight: "100vh" }}>
                <Grid container alignItems={'center'} width={'full'} minHeight={'100vh'}>
                    <Grid size={{ lg: 6, xs: 12 }} justifyContent="center" container>
                        <Box sx={{ background: "white", width: "80%", borderRadius: "5px", paddingX: "30px", paddingY: "50px" }} my={'20px'}>
                            <Typography variant="h5" textAlign={'center'}>
                                {userId ? 'Update User Detail' : 'User Detail Form'}
                            </Typography>

                            <TextField fullWidth label="User Name" id='fullWidth'
                                sx={{ my: "15px" }}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {errors.name && <Typography sx={{ color: "red", fontSize: "12px" }}>{errors.name}</Typography>}
                            <TextField fullWidth label="Email" id='fullWidth'
                                sx={{ my: "10px" }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && <Typography sx={{ color: "red", fontSize: "12px" }}>{errors.email}</Typography>}
                            <TextField fullWidth label="Phone Number" id='fullWidth'
                                sx={{ my: "10px" }}
                                value={phoneno}
                                onChange={(e) => setPhoneno(e.target.value)}
                            />
                            {errors.phoneno && <Typography sx={{ color: "red", fontSize: "12px" }}>{errors.phoneno}</Typography>}
                            <TextField fullWidth label="Enter Small Detail" id='fullWidth'
                                multiline rows={4}
                                sx={{ my: "10px" }}
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            />
                            {errors.note && <Typography sx={{ color: "red", fontSize: "12px" }}>{errors.note}</Typography>}
                            {message && <Typography sx={{ color: "green", fontSize: "14px" }}>{message}</Typography>}
                            {err && <Typography sx={{ color: "red", fontSize: "14px" }}>{err}</Typography>}
                            <Button variant="contained" fullWidth sx={{ my: "15px", py: "10px" }} onClick={userId ? updateHander : registerHandler}>{userId ? 'Update User' : 'Submit'}</Button>
                        </Box>
                    </Grid>
                    <Grid size={{ lg: 6, xs: 12 }} container justifyContent="center">
                        <Box sx={{ background: "white", width: { lg: "90%", xl: "80%", xs: "80%" }, borderRadius: "5px", paddingX: "30px", paddingY: "50px", height: "600px", overflowY: "scroll", my: "20px" }}>
                            <Typography variant="h5" textAlign={'center'} pb={'10px'}>
                                User Detail Table
                            </Typography>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow sx={{ background: "#e3f2fd" }}>
                                            <TableCell >
                                                <Typography fontWeight={'bold'} variant='subtitle2'>Name</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography fontWeight={'bold'} variant='subtitle2'>Email</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography fontWeight={'bold'} variant='subtitle2'>Mobile Number</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography fontWeight={'bold'} variant='subtitle2'>User Detail</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography fontWeight={'bold'} variant='subtitle2'>Edit User</Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            allUsers.length > 0 && allUsers.map((user, index) => (
                                                <TableRow key={index}>
                                                    <TableCell sx={{ fontSize: "14px" }}>{user.name}</TableCell>
                                                    <TableCell>{user.email}</TableCell>
                                                    <TableCell>{user.phoneno}</TableCell>
                                                    <TableCell>{user.note}</TableCell>
                                                    <TableCell sx={{ fontSize: "20px", color: "blue" }}><FaEdit onClick={(e) => getUserDetail(user._id)} /></TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

        </>
    )
}

export default Home