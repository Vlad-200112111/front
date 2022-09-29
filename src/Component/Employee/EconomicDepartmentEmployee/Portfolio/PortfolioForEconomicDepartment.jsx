import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import api from "../../../../Services/api";
import useStylesMain from "../../../../Styles/MainStyles";
import {Grid, ToggleButton, ToggleButtonGroup} from "@mui/material";
import Typography from "@mui/material/Typography";
import Cookies from "js-cookie";
import ItemPortfolio from "../../../Student/Portfolio/ItemPortfolio";
import FilterListIcon from "@mui/icons-material/FilterList";
import PortfolioLineView from './PortfolioLineView'
import ClickAwayButton from "../../../UI/СlickAwayButton/ClickAwayButton";
import CustomDesktopDatePicker from "../../../UI/CustomDesktopDatePicker/CustomDesktopDatePicker";
import Button from "@mui/material/Button";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import GridViewIcon from "@mui/icons-material/GridView";
import CustomSelect from "../../../UI/CustomSelect/CustomSelect";
import MenuItem from "@mui/material/MenuItem";

function PortfolioForEconomicDepartment(props) {
    const params = useParams()
    const classesMain = useStylesMain()
    const studentId = params.studentId
    const [listUser, setListUser] = useState()
    const [achievements, setAchievements] = useState()
    const [canUpdate, setCanUpdate] = useState(false)
    const [canDelete, setCanDelete] = useState(false)
    const [createdDateStart, setCreatedDateStart] = useState()
    const [createdDateEnd, setCreatedDateEnd] = useState()
    const [updatedDateStart, setUpdatedDateStart] = useState()
    const [updatedDateEnd, setUpdatedDateEnd] = useState()
    const [tempAchievements, setTempAchievements] = useState()
    const [view, setView] = useState('list')

    const handleChangeView = (event, newValue) => {
        if (newValue === 'list')
        setView(newValue)
        if(newValue === 'grid')
            setView(newValue)
    }
    async function getStudentName() {
        const {data: Student} = await api.educationalProcess.getStudentFullName(studentId)
        return Student
    }

    async function getStudentDocuments({studentId, page, count, categoryId, periodCreated, periodUpdated}) {
        const {data: Student} = await api.portfolio.getListAchievementsByStudentId(studentId, page, count, categoryId, periodCreated, periodUpdated)
        return Student
    }

    const setFilter = () => {
         let createdStart = createdDateStart?.toLocaleDateString().replaceAll('.','-')
         let createdEnd  = createdDateEnd?.toLocaleDateString().replaceAll('.','-')
        let updatedStart  = updatedDateStart?.toLocaleDateString().replaceAll('.','-')
        let updatedEnd = updatedDateEnd?.toLocaleDateString().replaceAll('.','-')
        let createdPeriod = createdDateStart?.toLocaleDateString().replaceAll('.','-') +'&'+createdDateEnd?.toLocaleDateString().replaceAll('.','-')
        let updatedPeriod = updatedDateStart?.toLocaleDateString().replaceAll('.','-')+'&'+updatedDateEnd?.toLocaleDateString().replaceAll('.','-')
        if(createdDateStart === null || createdDateStart === undefined || createdDateEnd === null || createdDateEnd === undefined){
            if(createdDateStart === null || createdDateStart === undefined){
                createdStart = ''

            }
            if(createdDateEnd === null || createdDateEnd === undefined){
                createdEnd =''

            }
            createdPeriod = createdStart +'&'+ createdEnd
            if(createdPeriod === '&'){
                createdPeriod = undefined
            }
        }
        if(updatedDateStart === null || updatedDateStart === undefined || updatedDateEnd === null || updatedDateEnd === undefined){
            if(updatedDateStart === null || updatedDateStart === undefined){
                console.log(tempAchievements)
                updatedStart = ''
            }
            if(updatedDateEnd === null || updatedDateEnd === undefined) {
                updatedEnd = ''
                console.log(updatedStart,updatedEnd)
            }
            updatedPeriod = updatedStart +'&'+updatedEnd
            if(updatedPeriod === '&'){
                updatedPeriod =undefined
            }
            }

        getStudentDocuments({studentId: studentId, periodCreated: createdPeriod,periodUpdated:updatedPeriod}).then(Documents => {
            setAchievements(Documents)
            console.log(createdPeriod,'\n',updatedPeriod)

        })


    }
    const resetFilter = () => {
        setAchievements(tempAchievements)
    }
    useEffect(() => {
        getStudentName().then(Student => {
            setListUser(Student)
        })
        getStudentDocuments({studentId: studentId}).then(Documents => {
            setAchievements(Documents)
            setTempAchievements(Documents)


        })
    }, [studentId])
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography style={{textAlign: 'center'}} className={classesMain.Title}>
                    Портфолио
                </Typography>
                <Typography className={classesMain.Text}>
                    студент: {listUser?.lastname + ' ' + listUser?.name + ' ' + listUser?.patronymic}
                </Typography>
            </Grid>
            <Grid item
                  style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', flexWrap: 'wrap-reverse'}}
                  xs={12}>


                <ClickAwayButton title={
                    <>

                        <FilterListIcon className={classesMain.Text}/>
                        <Typography className={classesMain.Text}>Фильтр</Typography>
                    </>
                }>
                    
                    <Typography>
                        Период даты загрузки
                    </Typography>
                    <CustomDesktopDatePicker
                        label={"От"}
                        minDate={'any'}
                        value={createdDateStart}
                        setValue={setCreatedDateStart}
                    />
                    <CustomDesktopDatePicker
                        label={"До"}
                        minDate={'any'}
                        value={createdDateEnd}
                        setValue={setCreatedDateEnd}
                    />
                    <Typography>
                        Период даты изменения
                    </Typography>
                    <CustomDesktopDatePicker
                        label={"От"}
                        minDate={'any'}
                        value={updatedDateStart}
                        setValue={setUpdatedDateStart}
                    />
                    <CustomDesktopDatePicker
                        label={"До"}
                        minDate={'any'}
                        value={updatedDateEnd}
                        setValue={setUpdatedDateEnd}
                    />
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Button onClick={resetFilter} className={classesMain.button}>
                            Сбросить фильтр
                        </Button>
                        <Button  onClick={setFilter} className={classesMain.button}>
                            Фильтр
                        </Button>
                    </div>

                </ClickAwayButton>
                <ToggleButtonGroup
                    style={{marginLeft:'10px'}}

                    color="primary"
                    value={view}
                    size={'small'}
                    exclusive
                    onChange={handleChangeView}
                >
                    <ToggleButton value="list"><ViewHeadlineIcon style={{fontSize: '20px'}}/></ToggleButton>
                    <ToggleButton value="grid"><GridViewIcon style={{fontSize: '20px'}}/></ToggleButton>
                </ToggleButtonGroup>

            </Grid>
            {
                view === 'grid'?
                    <Grid xs={12} style={{margin: '10px'}} container spacing={3} display={'flex'} flexWrap={'wrap'}
                          justifyContent={'center'}>
                        {
                            achievements?.map((item, index) =>
                                <ItemPortfolio
                                    key={item.id + 'itemPortfolio'}
                                    grow={true}
                                    timeout={index * 200}
                                    canUpdate={canUpdate}
                                    canDelete={canDelete}
                                    itemAchievements={item}
                                    token={Cookies.get('auth-token')}
                                    setAchievements={setAchievements}
                                    achievements={achievements}
                                    userId={studentId}
                                />
                            )

                        }
                    </Grid>
                    : view === 'list'?
                    achievements?.map((item,index) =>
                        <Grid item xs={12} style={{paddingBottom:'0', paddingTop:'0'}}>
                        <PortfolioLineView
                            key={item.id + 'itemPortfolio'}
                            grow={true}
                            timeout={index * 200}
                            itemAchievements={item}
                        />
                        </Grid>
                    ) :''
            }

        </Grid>
    );
}

export default PortfolioForEconomicDepartment;