import {
    Grid,
    Typography,
    Box, Button
} from "@material-ui/core";
import useStylesMain from "../../../Styles/MainStyles";
import Cookies from "js-cookie";
import {Link, useParams} from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import React, {useEffect, useState} from "react";
import api from "../../../Services/api";


function MainPortfolio(props) {
    const classesMain = useStylesMain()

    const params = useParams()
    const studentId = params.studentId
    const [role,setRole] = useState()
    const [student,setStudent] = useState({})
    const [myId, setMyId] = useState()

    async function getStudentName() {
        const{data:student} = await api.educationalProcess.getStudentFullName(studentId)
            return student
    }

    useEffect(async()=>{
        const {data: MyStudentId} = await api.educationalProcess.getStudentId()
        setMyId(MyStudentId)
        const {data:result} = await api.auth.getAssigningRole({token:Cookies.get('auth-token')})
        setRole(result.role)
        getStudentName().then(Student=>{
            setStudent(Student)
        })
    },[studentId])

    return(
        <div>
            {role !== 'Студент'?
                Number(studentId) !== Number(myId)?
                    <>
                    <Grid item xs={3}>
                        <Link to={`/work-with-students`}>
                            <Button className={classesMain.button}><ChevronLeftIcon/>
                                <span>Вернуться</span></Button>
                        </Link>
                    </Grid>
                        <Grid item xs={12}>
                            <Typography className={classesMain.Text} align={'center'}>Студент: {student.lastname} {student.name} {student.patronymic}</Typography>
                        </Grid>
                    </>
                    :''
                :''
            }

            <div className="pageBack"></div>
            <Grid className={classesMain.backgroundMain}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography className={classesMain.Title} variant="h1">Портфолио</Typography>
                    </Grid>
                    <Box style={{width:'100%'}}>
                        {props.children}
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}
export default  MainPortfolio