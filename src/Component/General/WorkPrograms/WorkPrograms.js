import MainStyles from "../../../Styles/MainStyles";
import WorkProgramsStyles from "../../../Styles/WorkProgramsStyles";
import {useState, useEffect} from "react";
import {Box, Grid, Typography} from "@material-ui/core";
import api from "../../../Services/api";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {Link} from "react-router-dom";
import CustomIconButton from "../../UI/CustomIconButton/CustomIconButton";
import PreviewIcon from "@mui/icons-material/Preview";
import CustomAlert from "../../UI/CustomAlert/CustomAlert";
import {Stack} from "@mui/material";
import FilePresentIcon from '@mui/icons-material/FilePresent';

function WorkPrograms(props) {
    const classesMain = MainStyles()
    const classesWorkPrograms = WorkProgramsStyles()

    const [allYears, setAllYears] = useState([])
    const [allSpecialities, setAllSpecialities] = useState([])
    const [allProfiles, setAllProfiles] = useState([])
    const [allEduForms, setEduForms] = useState([])
    const [allWorkPrograms, setAllWorkPrograms] = useState([])

    const [yearId, setYearId] = useState()
    const [specialityId, setSpecialityId] = useState()
    const [profileId, setProfileId] = useState()
    const [eduFormId, setEduFormId] = useState()

    const [yearLabel, setYearLabel] = useState('')
    const [specialityLabel, setSpecialityLabel] = useState('')
    const [profileLabel, setProfileLabel] = useState('')
    const [eduFormLabel, setEduFormLabel] = useState('')

    const [specialityLabelDisabled, setSpecialityLabelDisabled] = useState(true)
    const [profileLabelDisabled, setProfileLabelDisabled] = useState(true)
    const [eduFormLabelDisabled, setEduFormLabelDisabled] = useState(true)

    useEffect(async () => {
        const {data: AllYears} = await api.workPrograms.getYears()
        setAllYears(Object.values(AllYears))
    }, []);


    async function getSpecialities(event, newValue) {
        setSpecialityLabel('')
        setEduFormLabel('')
        setProfileLabel('')
        setYearId(newValue.id)
        setYearLabel(newValue.label)
        const {data: AllSpecialities} = await api.workPrograms.getSpecialities(newValue.id)
        setAllSpecialities(Object.values(AllSpecialities))
        setSpecialityId(Object.values(AllSpecialities)[0].label)
        setSpecialityLabelDisabled(false)
    }

    async function getProfiles(event, newValue) {
        setEduFormLabel('')
        setProfileLabel('')
        setSpecialityId(newValue.id)
        setSpecialityLabel(newValue.label)
        const {data: AllProfiles} = await api.workPrograms.getProfiles(yearId, newValue.id)
        setAllProfiles(Object.values(AllProfiles))
        setProfileId(Object.values(AllProfiles)[0].label)
        setProfileLabelDisabled(false)
    }

    async function getEduForms(event, newValue) {
        setEduFormLabel('')
        setProfileId(newValue.id)
        setProfileLabel(newValue.label)
        const {data: AllEduForms} = await api.workPrograms.getEducationalForms(yearId, specialityId, newValue.id)
        setEduForms(Object.values(AllEduForms))
        setEduFormId(Object.values(AllEduForms)[0].label)
        setEduFormLabelDisabled(false)
    }

    async function getWorkPrograms(event, newValue) {
        setEduFormId(newValue.id)
        setEduFormLabel(newValue.label)
        const {data: AllWorkPrograms} = await api.workPrograms.getWorkPrograms(yearId, specialityId, profileId, newValue.id)
        setAllWorkPrograms(Object.values(AllWorkPrograms))
    }

    return (
        <>
            <Grid className={classesMain.backgroundMain}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography className={classesMain.Title} variant="h1">Рабочие программы</Typography>
                    </Grid>
                </Grid>
                <Box
                    sx={{
                        width: '90%', typography: 'body1', ml: 'auto', mr: 'auto'
                    }}>
                    <Grid container
                          spacing={6}
                          direction="column"
                          justifyContent="center"
                          alignItems="stretch"
                    >
                        <Grid item xs={12} xl={6} md={6}>
                            <Autocomplete
                                defaultValue={yearLabel}
                                value={yearLabel}
                                onChange={getSpecialities}
                                disablePortal
                                options={allYears}
                                renderInput={(params) =>
                                    <TextField
                                        variant='filled'
                                        className={classesMain.Input}
                                        {...params}
                                        label="Выберите год:"/>}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} xl={6}>
                            <Autocomplete
                                defaultValue={specialityLabel}
                                value={specialityLabel || ''}
                                disablePortal
                                disabled={specialityLabelDisabled}
                                options={allSpecialities}
                                onChange={getProfiles}
                                renderInput={(params) =>
                                    <TextField
                                        variant='filled'
                                        className={classesMain.Input}
                                        {...params}
                                        label="Выберите специальность:"/>}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} xl={6}>
                            <Autocomplete
                                defaultValue={profileLabel}
                                value={profileLabel || ''}
                                disablePortal
                                disabled={profileLabelDisabled}
                                options={allProfiles}
                                onChange={getEduForms}
                                renderInput={(params) =>
                                    <TextField
                                        variant='filled'
                                        className={classesMain.Input}
                                        {...params}
                                        label="Выберите профиль:"/>}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} xl={6}>
                            <Autocomplete
                                defaultValue={eduFormLabel}
                                value={eduFormLabel || ''}
                                disablePortal
                                disabled={eduFormLabelDisabled}
                                options={allEduForms}
                                onChange={getWorkPrograms}
                                renderInput={(params) =>
                                    <TextField
                                        variant='filled'
                                        className={classesMain.Input}
                                        {...params}
                                        label="Выберите форму обучения:"/>}
                            />
                        </Grid>
                    </Grid>
                    <Box
                        sx={{mt: 6}}>
                        {
                            allWorkPrograms.length !== 0 && eduFormLabel !== '' ?
                                allWorkPrograms?.map(workProgram =>
                                    <Box sx={{width: '100%', marginTop: 10}} className={classesMain.MainBox}>
                                        <Grid container
                                              direction="row"
                                              justifyContent="space-between"
                                              alignItems="center"
                                              xs={12}
                                              spacing={2}>
                                            <Grid item xs={11}>
                                                <Typography variant="subtitle1" sx={{color: '#fff'}}>
                                                    {
                                                        workProgram.label
                                                    }
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <Stack spacing={2}>
                                                    <a target="_blank" rel="noopener noreferrer"
                                                       href={workProgram.fos_link}
                                                       style={{textDecoration: 'none', color: '#fff'}}>
                                                        <CustomIconButton
                                                            icon={<FilePresentIcon/>}
                                                            caption={'Нажмите для того, чтобы просмотреть "Фонд оценочных средств"!'}
                                                        />
                                                    </a>
                                                    <Link target="_blank" rel="noopener noreferrer"
                                                          to={`/work-programs/${workProgram.id}`}
                                                          style={{textDecoration: 'none', color: '#fff'}}>
                                                        <CustomIconButton
                                                            icon={<PreviewIcon/>}
                                                            caption={'Нажмите для того, чтобы просмотреть "Рабочую программу"!'}
                                                        />
                                                    </Link>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                ) :
                                <CustomAlert
                                    severity="info"
                                    title='Информация!'
                                    content='Не было найдено рабочих программ!'
                                    activeAlert={true}
                                />
                        }
                    </Box>
                </Box>
            </Grid>
        </>
    )
}

export default WorkPrograms