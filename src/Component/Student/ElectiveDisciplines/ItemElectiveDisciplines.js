import {Grid} from "@material-ui/core";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import useStylesElectiveDisciplines from "../../../Styles/ElectiveDisciplinesStyles";
import {useEffect, useState} from "react";
import useStylesMain from "../../../Styles/MainStyles";
import api from "../../../Services/api";
import Cookies from "js-cookie";
import {useSnackbar} from 'notistack';
import {Grow, Stack} from "@mui/material";


const ItemElectiveDisciplines = (props) => {
    const {enqueueSnackbar} = useSnackbar();
    const classesElectiveDisciplines = useStylesElectiveDisciplines()
    const classesMain = useStylesMain()
    const [alignment, setAlignment] = useState()
    const [disabled, setDisabled] = useState(false)
    const [update, setUpdate] = useState(false)
    const token = Cookies.get("auth-token");
    const [priorityFirst, setPriorityFirst] = useState('')
    const [prioritySecond, setPrioritySecond] = useState('')

    useEffect(() => {
        if (new Date(props.itemListDiscipline.prohibitionOfChanges) < new Date()) setDisabled(true)

        if (props.itemListDiscipline.idChoise !== 0) setUpdate(true)

        if (props.itemListDiscipline.choiseDisciplineOne) {
            setPriorityFirst(props.itemListDiscipline.nameDisciplineOne)
            setPrioritySecond(props.itemListDiscipline.nameDisciplineTwo)
        } else {
            setPriorityFirst(props.itemListDiscipline.nameDisciplineTwo)
            setPrioritySecond(props.itemListDiscipline.nameDisciplineOne)
        }

        if (props.itemListDiscipline.choiseDisciplineOne === true) {
            setAlignment(1)
        } else if (props.itemListDiscipline.choiseDisciplineTwo === true) {
            setAlignment(2)
        } else {
            setAlignment()
        }
    }, []);

    async function selectDiscipline(event) {
        enqueueSnackbar(`Дисциплина на данный семестр сохранена!`, {autoHideDuration: 3500, variant: 'info'});

        setAlignment(event.target.value)
        const object = new Object()
        object.token = token
        object.disciplineOne = event.target.value === '1'
        object.disciplineTwo = event.target.value === '2'
        object.idStudent = Number(props.studentId)

        if (event.target.value === '1') {
            setPriorityFirst(props.itemListDiscipline.nameDisciplineOne)
            setPrioritySecond(props.itemListDiscipline.nameDisciplineTwo)
        } else {
            setPriorityFirst(props.itemListDiscipline.nameDisciplineTwo)
            setPrioritySecond(props.itemListDiscipline.nameDisciplineOne)
        }
        // console.log(props.itemListDiscipline.idElectiveDiscipline)
        if (Array.isArray(props.itemListDiscipline.idElectiveDiscipline.length)) {
            for (let i = 0; i < props.itemListDiscipline.idElectiveDiscipline.length; i++) {
                if (update) {
                    object.idChoise = props.itemListDiscipline.idChoise[i]
                    await api.electiveDisciplines.updateDisciplines(object)
                } else {
                    object.idElectiveDiscipline = props.itemListDiscipline.idElectiveDiscipline[i]
                    await api.electiveDisciplines.sendDisciplines(object)
                }
            }
        } else {
            object.idElectiveDiscipline = props.itemListDiscipline.idElectiveDiscipline

            if (update) {
                object.idChoise = props.itemListDiscipline.idChoise
                await api.electiveDisciplines.updateDisciplines(object)
            } else {
                object.idElectiveDiscipline = props.itemListDiscipline.idElectiveDiscipline
                await api.electiveDisciplines.sendDisciplines(object)
            }
        }
    }


    return (
        <>
            <Grow in={props.grow}
                  style={{transformOrigin: '0 0 0'}}
                  {...(props.grow ? {timeout: props.timeout} : {})}
            >
                <Grid item style={{width: '100%'}} xs={12} md={12} xl={12}>
                    <Card className={classesElectiveDisciplines.card}>
                        <CardContent>
                            <Typography variant="overline" display="block" gutterBottom>
                                {`${props.itemListDiscipline.nameSemestr} - ${props.itemListDiscipline.prohibitionOfChanges}`}
                            </Typography>

                            {
                                disabled ?
                                    <Typography fontSize={'.9rem'} color='darkgrey'>
                                        Истёк срок выбора!
                                    </Typography>
                                    :
                                    <>
                                        <Stack spacing={1}>
                                            <Typography fontSize={'.9rem'} color='darkgrey'>
                                                Приоритет первый: {priorityFirst}
                                            </Typography>
                                            <Typography fontSize={'.9rem'} color='darkgrey'>
                                                Приоритет второй: {prioritySecond}
                                            </Typography>
                                        </Stack>
                                    </>

                            }

                        </CardContent>
                        <CardActions>
                            <ToggleButtonGroup
                                style={{width: '100%'}}
                                value={Number(alignment)}
                                exclusive
                                onChange={selectDiscipline}
                            >
                                <ToggleButton
                                    disabled={disabled}
                                    className={`${classesMain.toggleButton} ${classesElectiveDisciplines.itemToggleButton} ${classesMain.buttonFontSizeMobile}`}
                                    value={1}>
                                    {props.itemListDiscipline.nameDisciplineOne}
                                </ToggleButton>
                                <ToggleButton
                                    disabled={disabled}
                                    className={`${classesMain.toggleButton} ${classesMain.buttonFontSizeMobile}`}
                                    value={2}>
                                    {props.itemListDiscipline.nameDisciplineTwo}
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </CardActions>
                    </Card>
                </Grid>
            </Grow>
        </>
    )
}
export default ItemElectiveDisciplines