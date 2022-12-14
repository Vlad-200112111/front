import CustomAutocomplete from "../../UI/CustomAutocomplete/CustomAutocomplete";
import {Grid, MenuItem, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import api from '../../../Services/api'
import Cookies from "js-cookie";
import useStylesMain from "../../../Styles/MainStyles";
import CustomTable from "../../UI/CustomTable/CustomTable";
import {TableCell, TableRow} from "@mui/material";
import Button from "@mui/material/Button";
import ClickAwayButton from "../../UI/–°lickAwayButton/ClickAwayButton";
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
            if(subroleElement.subRole === '–°–ĺ—ā—Ä—É–ī–Ĺ–ł–ļ —ć–ļ–ĺ–Ĺ–ĺ–ľ–ł—á–Ķ—Ā–ļ–ĺ–≥–ĺ –ĺ—ā–ī–Ķ–Ľ–į'){
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
                    if (nameA < nameB) //—Ā–ĺ—Ä—ā–ł—Ä—É–Ķ–ľ —Ā—ā—Ä–ĺ–ļ–ł –Ņ–ĺ –≤–ĺ–∑—Ä–į—Ā—ā–į–Ĺ–ł—é
                        return -1
                    if (nameA > nameB) return 1
                    return 0 // –Ě–ł–ļ–į–ļ–ĺ–Ļ —Ā–ĺ—Ä—ā–ł—Ä–ĺ–≤–ļ–ł
                }))
            } else {
                setTableRows(tableRows.sort(function (a, b) {
                    let nameA = a[key].toLowerCase(), nameB = b[key].toLowerCase()
                    if (nameA > nameB) //—Ā–ĺ—Ä—ā–ł—Ä—É–Ķ–ľ —Ā—ā—Ä–ĺ–ļ–ł –Ņ–ĺ –≤–ĺ–∑—Ä–į—Ā—ā–į–Ĺ–ł—é
                        return -1
                    if (nameA > nameB) return 1
                    return 0 // –Ě–ł–ļ–į–ļ–ĺ–Ļ —Ā–ĺ—Ä—ā–ł—Ä–ĺ–≤–ļ–ł
                }))
            }
        } else {
            setAscDesc(!ascDesc)
            if (!ascDesc) {
                setTableRows(tableRows.sort(function (a, b) {
                    let nameA = a[key].toLowerCase(), nameB = b[key].toLowerCase()
                    if (nameA < nameB) //—Ā–ĺ—Ä—ā–ł—Ä—É–Ķ–ľ —Ā—ā—Ä–ĺ–ļ–ł –Ņ–ĺ –≤–ĺ–∑—Ä–į—Ā—ā–į–Ĺ–ł—é
                        return -1
                    if (nameA > nameB) return 1
                    return 0 // –Ě–ł–ļ–į–ļ–ĺ–Ļ —Ā–ĺ—Ä—ā–ł—Ä–ĺ–≤–ļ–ł
                }))
            } else {
                setTableRows(tableRows.sort(function (a, b) {
                    let nameA = a[key].toLowerCase(), nameB = b[key].toLowerCase()
                    if (nameA > nameB) //—Ā–ĺ—Ä—ā–ł—Ä—É–Ķ–ľ —Ā—ā—Ä–ĺ–ļ–ł –Ņ–ĺ –≤–ĺ–∑—Ä–į—Ā—ā–į–Ĺ–ł—é
                        return -1
                    if (nameA > nameB) return 1
                    return 0 // –Ě–ł–ļ–į–ļ–ĺ–Ļ —Ā–ĺ—Ä—ā–ł—Ä–ĺ–≤–ļ–ł
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

        // –ü–Ķ—Ä–Ķ–Ī–ł—Ä–į–Ķ–ľ –ļ–į–∂–ī—č–Ļ —ć–Ľ–Ķ–ľ–Ķ–Ĺ—ā –≤ –ł—Ā—Ö–ĺ–ī–Ĺ–ĺ–ľ –ľ–į—Ā—Ā–ł–≤–Ķ
        arr.forEach((current, index) => {

            if (duplicatesIndices.includes(index)) return;

            result.push(current);

            // –°—Ä–į–≤–Ĺ–ł–≤–į–Ķ–ľ –ļ–į–∂–ī—č–Ļ —ć–Ľ–Ķ–ľ–Ķ–Ĺ—ā –≤ –ľ–į—Ā—Ā–ł–≤–Ķ –Ņ–ĺ—Ā–Ľ–Ķ —ā–Ķ–ļ—É—Č–Ķ–≥–ĺ
            for (let comparisonIndex = index + 1; comparisonIndex < arr.length; comparisonIndex++) {

                const comparison = arr[comparisonIndex];
                const currentKeys = Object.keys(current);
                const comparisonKeys = Object.keys(comparison);

                // –ü—Ä–ĺ–≤–Ķ—Ä—Ź–Ķ–ľ –ī–Ľ–ł–Ĺ—É –ľ–į—Ā—Ā–ł–≤–ĺ–≤
                if (currentKeys.length !== comparisonKeys.length) continue;

                // –ü—Ä–ĺ–≤–Ķ—Ä—Ź–Ķ–ľ –∑–Ĺ–į—á–Ķ–Ĺ–ł–Ķ –ļ–Ľ—é—á–Ķ–Ļ
                const currentKeysString = currentKeys.sort().join("").toLowerCase();
                const comparisonKeysString = comparisonKeys.sort().join("").toLowerCase();
                if (currentKeysString !== comparisonKeysString) continue;

                // –ü—Ä–ĺ–≤–Ķ—Ä—Ź–Ķ–ľ –ł–Ĺ–ī–Ķ–ļ—Ā—č –ļ–Ľ—é—á–Ķ–Ļ
                let valuesEqual = true;
                for (let i = 0; i < currentKeys.length; i++) {
                    const key = currentKeys[i];
                    if ( current[key] !== comparison[key] ) {
                        valuesEqual = false;
                        break;
                    }
                }
                if (valuesEqual) duplicatesIndices.push(comparisonIndex);

            } // –ö–ĺ–Ĺ–Ķ—Ü —Ü–ł–ļ–Ľ–į
        });
        return result;
    }


    return (
        <Grid container justifyContent={'flex-end'} spacing={2}>
            <Grid item xs={12}>
                <Typography className={classesMain.Title} variant={'h1'}>–†–į–Ī–ĺ—ā–į —Ā–ĺ —Ā—ā—É–ī–Ķ–Ĺ—ā–į–ľ–ł –Ņ–ĺ —Ą–į–ļ—É–Ľ—Ć—ā–Ķ—ā—É</Typography>
            </Grid>
            <CustomSelect xs={6} contentCustomSelect="–°–Ņ–Ķ—Ü–ł–į–Ľ—Ć–Ĺ–ĺ—Ā—ā—Ć"
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
            <CustomSelect xs={6} contentCustomSelect="–ď—Ä—É–Ņ–Ņ—č"
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
            {/*        label={"–ó–į—á—Ď—ā–Ĺ–į—Ź –ļ–Ĺ–ł–∂–ļ–į"}*/}
            {/*        customValueInput={chosenGrageBook}*/}
            {/*        setCustomValueInput={searchByGrageBook}*/}
            {/*    />*/}
            {/*    <ClickAwayButton title={<>*/}
            {/*        <FilterListIcon className={classesMain.Text}/>*/}
            {/*        <Typography className={classesMain.Text}>–§–ł–Ľ—Ć—ā—Ä</Typography>*/}
            {/*    </>}>*/}
            {/*        {!loading ?*/}
            {/*            <CustomAutocomplete*/}
            {/*                value={fio}*/}
            {/*                onInput={(e) => filterByFio(e.target.value)}*/}
            {/*                freeSolo*/}
            {/*                options={getOptions('fio', listStudents)}*/}
            {/*                label='–§–ė–ě'*/}
            {/*                onChange={(e, value) => filterByFio(value)}*/}
            {/*            /> : <Skeleton style={{marginBottom: '20px'}} variant="rectangular" width='100%'*/}
            {/*                           height={'40px'}/>}*/}
            {/*        {!loading ?*/}
            {/*            <CustomAutocomplete*/}
            {/*                freeSolo*/}
            {/*                value={cathedra}*/}
            {/*                onInput={(e) => filterByCathedra(e.target.value)}*/}

            {/*                options={getOptions('cathedra', listStudents)}*/}
            {/*                label='–ö–į—Ą–Ķ–ī—Ä–į'*/}
            {/*                onChange={(e, value) => filterByCathedra(value)}*/}
            {/*            /> : <Skeleton style={{marginBottom: '20px'}} variant="rectangular" width='100%'*/}
            {/*                           height={'40px'}/>}*/}
            {/*        {!loading ?*/}
            {/*            <CustomAutocomplete*/}
            {/*                freeSolo*/}
            {/*                value={facultet}*/}
            {/*                onInput={(e) => filterByFacultet(e.target.value)}*/}

            {/*                options={getOptions('facultet', listStudents)}*/}
            {/*                label='–§–į–ļ—É–Ľ—Ć—ā–Ķ—ā'*/}
            {/*                onChange={(e, value) => filterByFacultet(value)}*/}
            {/*            /> : <Skeleton style={{marginBottom: '20px'}} variant="rectangular" width='100%'*/}
            {/*                           height={'40px'}/>}*/}
            {/*        {!loading ?*/}
            {/*            <CustomAutocomplete*/}
            {/*                freeSolo*/}
            {/*                value={group}*/}
            {/*                onInput={(e) => filterByGroup(e.target.value)}*/}

            {/*                options={getOptions('group', listStudents)}*/}
            {/*                label='–ď—Ä—É–Ņ–Ņ–į'*/}
            {/*                onChange={(e, value) => filterByGroup(value)}*/}
            {/*            /> : <Skeleton style={{marginBottom: '20px'}} variant="rectangular" width='100%'*/}
            {/*                           height={'40px'}/>*/}

            {/*        }*/}
            {/*        <Button onClick={() => setTableRows(FilterByObject(filterBy, listStudents))}*/}
            {/*                className={classesMain.button}>–§–ł–Ľ—Ć—ā—Ä</Button>*/}
            {/*        <Button onClick={resetFilter} className={classesMain.button}>–°–Ī—Ä–ĺ—Ā–ł—ā—Ć —Ą–ł–Ľ—Ć—ā—Ä</Button>*/}
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
                            <div style={{display: 'flex', alignItems: 'center'}}> –§–ė–ě {sortedBy === 'fio' ? ascDesc ?
                                <SortOutlinedIcon style={{transform: 'scale(1,-1)'}}/> : <SortOutlinedIcon/> : ''}</div>
                        </TableCell>
                        <TableCell
                            onClick={() => sortBy('grageBook')}
                            key={"cell4"} className={classesMain.button}
                        >
                            <div style={{display: 'flex', alignItems: 'center'}}> –ó–į—á—Ď—ā–Ĺ–į—Ź
                                –ļ–Ĺ–ł–∂–ļ–į {sortedBy === 'grageBook' ? ascDesc ?
                                    <SortOutlinedIcon style={{transform: 'scale(1,-1)'}}/> :
                                    <SortOutlinedIcon/> : ''}</div>
                        </TableCell>
                        <TableCell
                            onClick={() => sortBy('group')}
                            key={"cell5"} className={classesMain.button}>
                            <div
                                style={{display: 'flex', alignItems: 'center'}}> –ď—Ä—É–Ņ–Ņ–į{sortedBy === 'group' ? ascDesc ?
                                <SortOutlinedIcon style={{transform: 'scale(1,-1)'}}/> : <SortOutlinedIcon/> : ''}</div>
                        </TableCell>
                        <TableCell
                            onClick={() => sortBy('facultet')}
                            key={"cell3"}
                            className={classesMain.button}>
                            <div style={{
                                display: 'flex', alignItems: 'center'
                            }}> –§–į–ļ—É–Ľ—Ć—ā–Ķ—ā{sortedBy === 'facultet' ? ascDesc ?
                                <SortOutlinedIcon style={{transform: 'scale(1,-1)'}}/> : <SortOutlinedIcon/> : ''}</div>
                        </TableCell>
                        <TableCell onClick={() => sortBy('cathedra')} key={"cell2"}
                                   className={classesMain.button}>
                            <div style={{
                                display: 'flex', alignItems: 'center'
                            }}> –ö–į—Ą–Ķ–ī—Ä–į{sortedBy === 'cathedra' ? ascDesc ?
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
                                                            style={{fontSize: '0.8rem', width: '100%'}}>–ü–ĺ—Ä—ā—Ą–ĺ–Ľ–ł–ĺ</Button>
                                                </Link>
                                                :
                                                <Link to={`/portfolio/${row.studentId}`} style={{textDecoration: 'none', color: '#fff'}}>
                                                    <Button className={classesMain.button}
                                                            style={{fontSize: '0.8rem', width: '100%'}}>–ü–ĺ—Ä—ā—Ą–ĺ–Ľ–ł–ĺ</Button>
                                                </Link>
                                        }

                                        <Link to={`/student-profile/${row.studentId}`}
                                              style={{textDecoration: 'none', color: '#fff'}}>
                                            <Button className={classesMain.button}
                                                    style={{fontSize: '0.8rem', width: '100%'}}>–ü—Ä–ĺ—Ą–ł–Ľ—Ć</Button>
                                        </Link>

                                    </ClickAwayButton>
                                </TableCell>
                            </TableRow>)) :
                        <Typography key={'notfound'} style={{marginLeft: '10px', color: 'grey'}}>–Ě–Ķ –Ĺ–į–Ļ–ī–Ķ–Ĺ–ĺ...</Typography>}
                </CustomTable> : <Skeleton variant="rectangular" width='100%' height={'70vh'}/>}
            </Grid>
        </Grid>)
}

export default WorkWithStudents