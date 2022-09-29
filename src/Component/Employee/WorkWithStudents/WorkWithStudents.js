import CustomAutocomplete from "../../UI/CustomAutocomplete/CustomAutocomplete";
import {Grid, MenuItem, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import api from '../../../Services/api'
import Cookies from "js-cookie";
import useStylesMain from "../../../Styles/MainStyles";
import CustomTable from "../../UI/CustomTable/CustomTable";
import {TableCell, TableRow} from "@mui/material";
import Button from "@mui/material/Button";
import ClickAwayButton from "../../UI/СlickAwayButton/ClickAwayButton";
import Skeleton from "@mui/material/Skeleton";
import FilterListIcon from '@mui/icons-material/FilterList';
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SortOutlinedIcon from '@mui/icons-material/SortOutlined';
import CustomInput from "../../UI/CustomInput/CustomInput";
import {Link} from "react-router-dom";
import FilterByObject from '../../Modules/Functions/Filters/FilterByObject'
import getSubrolesByUser from "../../Modules/Functions/getSubrolesByUser";
import CustomSelect from "../../UI/CustomSelect/CustomSelect";

function WorkWithStudents() {
    const classesMain = useStylesMain()

    const [listStudents, setListStudents] = useState([{}])
    const [tableRows, setTableRows] = useState([{}])
    const [listAllSpeciality, setListAllSpeciality] = useState([])
    const [listGroups, setListGroups] = useState([])
    const [filterBy, setFilterBy] = useState({fio: '', cathedra: '', facultet: '', group: ''})
    const [chosenGrageBook, setChosenGrageBook] = useState('')
    const [fio, setFio] = useState('')
    const [cathedra, setCathedra] = useState('')
    const [facultet, setFacultet] = useState('')
    const [group, setGroup] = useState('')
    const [groupId, setGroupId] = useState()
    const [loading, setLoading] = useState(false)
    const [sortedBy, setSortedBy] = useState('fio')
    const [ascDesc, setAscDesc] = useState(true)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [page, setPage] = useState(0)
    const [economicEmployee, setEconomicEmployee] = useState(false)
    const [specalitys, setSpecalitys] = useState()

    useEffect(async() => {
        setLoading(true)

        const {data: ListAllStudentBySpeciality} = await api.educationalProcess.getAllSpecialities()
        setListAllSpeciality(removeDuplicates(ListAllStudentBySpeciality))
        setSpecalitys(ListAllStudentBySpeciality[0].idSpeciality)



        const Subroles = await getSubrolesByUser()
        for (const subroleElement of Subroles) {
            if(subroleElement.subRole === 'Сотрудник экономического отдела'){
                 setEconomicEmployee(true)
            }
        }
        // async function getStudents() {
        //
        //     const {data: Students} = await api.educationalProcess.GetStudents()
        //
        //     setListStudents(Students.sort(function (a, b) {
        //         let nameA = a.fio.toLowerCase(), nameB = b.fio.toLowerCase()
        //         if (nameA < nameB)
        //             return -1
        //         if (nameA > nameB) return 1
        //         return 0
        //     }))
        //
        //     setTableRows(Students.sort(function (a, b) {
        //         let nameA = a.fio.toLowerCase(), nameB = b.fio.toLowerCase()
        //         if (nameA < nameB)
        //             return -1
        //         if (nameA > nameB) return 1
        //         return 0
        //     }))
        // }
        //
        // getStudents().then(() => {
        //     setLoading(false)
        // })
        setLoading(false)
    }, [])


    const getOptions = (key, list) => {
        let array = []
        for (const arrayElement of list) {
            if (!array.includes(arrayElement[key])) {
                array.push(arrayElement[key])
            }
        }
        return array
    }


    const filterByFio = (value) => {
        setFio(value)
        setFilterBy({...filterBy, fio: value})
    }


    const filterByCathedra = (value) => {
        setCathedra(value)
        setFilterBy({...filterBy, cathedra: value})
    }


    const filterByFacultet = (value) => {
        setFacultet(value)
        setFilterBy({...filterBy, facultet: value})
    }


    const filterByGroup = (value) => {
        setGroup(value)
        setFilterBy({...filterBy, group: value})
    }


    const resetFilter = () => {
        setFio('')
        setCathedra('')
        setFacultet('')
        setGroup('')
        setFilterBy({fio: '', cathedra: '', facultet: '', group: ''})
        setTableRows(listStudents)
    }


    const searchByGrageBook = (event) => {
        if (/\d+/.test(Number(event.target.value))) {
            resetFilter()
            setChosenGrageBook(event.target.value)
            setTableRows(listStudents.filter(el => el.grageBook.includes(event.target.value)))
        }
    }

    const sortBy = (key) => {
        if (sortedBy !== key) {
            setAscDesc(true)
            if (ascDesc) {
                setTableRows(tableRows.sort(function (a, b) {
                    let nameA = a[key].toLowerCase(), nameB = b[key].toLowerCase()
                    if (nameA < nameB) //сортируем строки по возрастанию
                        return -1
                    if (nameA > nameB) return 1
                    return 0 // Никакой сортировки
                }))
            } else {
                setTableRows(tableRows.sort(function (a, b) {
                    let nameA = a[key].toLowerCase(), nameB = b[key].toLowerCase()
                    if (nameA > nameB) //сортируем строки по возрастанию
                        return -1
                    if (nameA > nameB) return 1
                    return 0 // Никакой сортировки
                }))
            }
        } else {
            setAscDesc(!ascDesc)
            if (!ascDesc) {
                setTableRows(tableRows.sort(function (a, b) {
                    let nameA = a[key].toLowerCase(), nameB = b[key].toLowerCase()
                    if (nameA < nameB) //сортируем строки по возрастанию
                        return -1
                    if (nameA > nameB) return 1
                    return 0 // Никакой сортировки
                }))
            } else {
                setTableRows(tableRows.sort(function (a, b) {
                    let nameA = a[key].toLowerCase(), nameB = b[key].toLowerCase()
                    if (nameA > nameB) //сортируем строки по возрастанию
                        return -1
                    if (nameA > nameB) return 1
                    return 0 // Никакой сортировки
                }))
            }
        }
        setSortedBy(key)
    }

    async function changeSpecality(event){
        setSpecalitys(event.target.value)
        const {data: ListAllGroups} = await api.educationalProcess.getGroups(event.target.value)
        setListGroups(removeDuplicates(ListAllGroups))
        setGroupId(ListAllGroups[0].id)
    }

    async function changeGroup(event){
        setGroupId(event.target.value)
        const {data: ListAllStudent} = await api.educationalProcess.getStudents(event.target.value)
        setTableRows(removeDuplicates(ListAllStudent))
    }

    function removeDuplicates(arr) {

        const result = [];
        const duplicatesIndices = [];

        // Перебираем каждый элемент в исходном массиве
        arr.forEach((current, index) => {

            if (duplicatesIndices.includes(index)) return;

            result.push(current);

            // Сравниваем каждый элемент в массиве после текущего
            for (let comparisonIndex = index + 1; comparisonIndex < arr.length; comparisonIndex++) {

                const comparison = arr[comparisonIndex];
                const currentKeys = Object.keys(current);
                const comparisonKeys = Object.keys(comparison);

                // Проверяем длину массивов
                if (currentKeys.length !== comparisonKeys.length) continue;

                // Проверяем значение ключей
                const currentKeysString = currentKeys.sort().join("").toLowerCase();
                const comparisonKeysString = comparisonKeys.sort().join("").toLowerCase();
                if (currentKeysString !== comparisonKeysString) continue;

                // Проверяем индексы ключей
                let valuesEqual = true;
                for (let i = 0; i < currentKeys.length; i++) {
                    const key = currentKeys[i];
                    if ( current[key] !== comparison[key] ) {
                        valuesEqual = false;
                        break;
                    }
                }
                if (valuesEqual) duplicatesIndices.push(comparisonIndex);

            } // Конец цикла
        });
        return result;
    }


    return (
        <Grid container justifyContent={'flex-end'} spacing={2}>
            <Grid item xs={12}>
                <Typography className={classesMain.Title} variant={'h1'}>Работа со студентами по факультету</Typography>
            </Grid>
            <CustomSelect xs={6} contentCustomSelect="Специальность"
                          setValueSelect={changeSpecality}
                          valueSelect={specalitys}
            >
                {
                    listAllSpeciality.map(item =>
                        <MenuItem className={classesMain.SelectItems}
                                  value={item.idSpeciality} key={item.idSpeciality}>{item.name}</MenuItem>
                    )
                }
            </CustomSelect>
            <CustomSelect xs={6} contentCustomSelect="Группы"
                          setValueSelect={changeGroup}
                          valueSelect={groupId}
            >
                {
                    listGroups.map(item =>
                        <MenuItem className={classesMain.SelectItems}
                                  value={item.idGroup} key={item.idGroup}>{item.nameGroup}</MenuItem>
                    )
                }
            </CustomSelect>
            {/*<Grid item style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}} xs={2}>*/}
            {/*    <CustomInput*/}
            {/*        xs={9}*/}
            {/*        label={"Зачётная книжка"}*/}
            {/*        customValueInput={chosenGrageBook}*/}
            {/*        setCustomValueInput={searchByGrageBook}*/}
            {/*    />*/}
            {/*    <ClickAwayButton title={<>*/}
            {/*        <FilterListIcon className={classesMain.Text}/>*/}
            {/*        <Typography className={classesMain.Text}>Фильтр</Typography>*/}
            {/*    </>}>*/}
            {/*        {!loading ?*/}
            {/*            <CustomAutocomplete*/}
            {/*                value={fio}*/}
            {/*                onInput={(e) => filterByFio(e.target.value)}*/}
            {/*                freeSolo*/}
            {/*                options={getOptions('fio', listStudents)}*/}
            {/*                label='ФИО'*/}
            {/*                onChange={(e, value) => filterByFio(value)}*/}
            {/*            /> : <Skeleton style={{marginBottom: '20px'}} variant="rectangular" width='100%'*/}
            {/*                           height={'40px'}/>}*/}
            {/*        {!loading ?*/}
            {/*            <CustomAutocomplete*/}
            {/*                freeSolo*/}
            {/*                value={cathedra}*/}
            {/*                onInput={(e) => filterByCathedra(e.target.value)}*/}

            {/*                options={getOptions('cathedra', listStudents)}*/}
            {/*                label='Кафедра'*/}
            {/*                onChange={(e, value) => filterByCathedra(value)}*/}
            {/*            /> : <Skeleton style={{marginBottom: '20px'}} variant="rectangular" width='100%'*/}
            {/*                           height={'40px'}/>}*/}
            {/*        {!loading ?*/}
            {/*            <CustomAutocomplete*/}
            {/*                freeSolo*/}
            {/*                value={facultet}*/}
            {/*                onInput={(e) => filterByFacultet(e.target.value)}*/}

            {/*                options={getOptions('facultet', listStudents)}*/}
            {/*                label='Факультет'*/}
            {/*                onChange={(e, value) => filterByFacultet(value)}*/}
            {/*            /> : <Skeleton style={{marginBottom: '20px'}} variant="rectangular" width='100%'*/}
            {/*                           height={'40px'}/>}*/}
            {/*        {!loading ?*/}
            {/*            <CustomAutocomplete*/}
            {/*                freeSolo*/}
            {/*                value={group}*/}
            {/*                onInput={(e) => filterByGroup(e.target.value)}*/}

            {/*                options={getOptions('group', listStudents)}*/}
            {/*                label='Группа'*/}
            {/*                onChange={(e, value) => filterByGroup(value)}*/}
            {/*            /> : <Skeleton style={{marginBottom: '20px'}} variant="rectangular" width='100%'*/}
            {/*                           height={'40px'}/>*/}

            {/*        }*/}
            {/*        <Button onClick={() => setTableRows(FilterByObject(filterBy, listStudents))}*/}
            {/*                className={classesMain.button}>Фильтр</Button>*/}
            {/*        <Button onClick={resetFilter} className={classesMain.button}>Сбросить фильтр</Button>*/}
            {/*    </ClickAwayButton>*/}
            {/*</Grid>*/}
            <Grid style={{marginLeft: '20px'}} item xs={12}>
                {!loading ?
                    <CustomTable page={page} setPage={setPage} rows={tableRows} rowsPerPage={rowsPerPage}
                                         setRowsPerPage={setRowsPerPage} showFooter={true}>
                    {<TableRow key={'head1123'}>
                        <TableCell
                            onClick={() => sortBy('fio')}
                            key={"cell1"} className={classesMain.button}
                        >
                            <div style={{display: 'flex', alignItems: 'center'}}> ФИО {sortedBy === 'fio' ? ascDesc ?
                                <SortOutlinedIcon style={{transform: 'scale(1,-1)'}}/> : <SortOutlinedIcon/> : ''}</div>
                        </TableCell>
                        <TableCell
                            onClick={() => sortBy('grageBook')}
                            key={"cell4"} className={classesMain.button}
                        >
                            <div style={{display: 'flex', alignItems: 'center'}}> Зачётная
                                книжка {sortedBy === 'grageBook' ? ascDesc ?
                                    <SortOutlinedIcon style={{transform: 'scale(1,-1)'}}/> :
                                    <SortOutlinedIcon/> : ''}</div>
                        </TableCell>
                        <TableCell
                            onClick={() => sortBy('group')}
                            key={"cell5"} className={classesMain.button}>
                            <div
                                style={{display: 'flex', alignItems: 'center'}}> Группа{sortedBy === 'group' ? ascDesc ?
                                <SortOutlinedIcon style={{transform: 'scale(1,-1)'}}/> : <SortOutlinedIcon/> : ''}</div>
                        </TableCell>
                        <TableCell
                            onClick={() => sortBy('facultet')}
                            key={"cell3"}
                            className={classesMain.button}>
                            <div style={{
                                display: 'flex', alignItems: 'center'
                            }}> Факультет{sortedBy === 'facultet' ? ascDesc ?
                                <SortOutlinedIcon style={{transform: 'scale(1,-1)'}}/> : <SortOutlinedIcon/> : ''}</div>
                        </TableCell>
                        <TableCell onClick={() => sortBy('cathedra')} key={"cell2"}
                                   className={classesMain.button}>
                            <div style={{
                                display: 'flex', alignItems: 'center'
                            }}> Кафедра{sortedBy === 'cathedra' ? ascDesc ?
                                <SortOutlinedIcon style={{transform: 'scale(1,-1)'}}/> : <SortOutlinedIcon/> : ''}</div>
                        </TableCell>
                        <TableCell key={"cell6"} style={{background: 'rgb(90, 125, 205)'}}></TableCell>
                    </TableRow>}
                    {tableRows.length > 0 ? (rowsPerPage > 0 ? tableRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : tableRows).map((row) => (
                            <TableRow key={row.studentId+1}>
                                <TableCell className={classesMain.Text}>{row.fio}</TableCell>
                                <TableCell className={classesMain.Text}>{row.grageBook}</TableCell>
                                <TableCell className={classesMain.Text}>{row.group}</TableCell>
                                <TableCell className={classesMain.Text}>{row.facultet}</TableCell>
                                <TableCell className={classesMain.Text}>{row.cathedra}</TableCell>
                                <TableCell>
                                    <ClickAwayButton title={<>
                                        <SettingsIcon className={classesMain.Text} style={{width: '20px'}}/>
                                        <ArrowDropDownIcon className={classesMain.Text}/>
                                    </>}>
                                        {
                                            economicEmployee?
                                                <Link to={`/portfolio-economic-department/${row.studentId}`}
                                                      style={{textDecoration: 'none', color: '#fff'}}>
                                                    <Button className={classesMain.button}
                                                            style={{fontSize: '0.8rem', width: '100%'}}>Портфолио</Button>
                                                </Link>
                                                :
                                                <Link to={`/portfolio/${row.studentId}`} style={{textDecoration: 'none', color: '#fff'}}>
                                                    <Button className={classesMain.button}
                                                            style={{fontSize: '0.8rem', width: '100%'}}>Портфолио</Button>
                                                </Link>
                                        }

                                        <Link to={`/student-profile/${row.studentId}`}
                                              style={{textDecoration: 'none', color: '#fff'}}>
                                            <Button className={classesMain.button}
                                                    style={{fontSize: '0.8rem', width: '100%'}}>Профиль</Button>
                                        </Link>

                                    </ClickAwayButton>
                                </TableCell>
                            </TableRow>)) :
                        <Typography key={'notfound'} style={{marginLeft: '10px', color: 'grey'}}>Не найдено...</Typography>}
                </CustomTable> : <Skeleton variant="rectangular" width='100%' height={'70vh'}/>}
            </Grid>
        </Grid>)
}

export default WorkWithStudents