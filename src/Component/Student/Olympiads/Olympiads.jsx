import React, {useState} from 'react';
import {Grid, ToggleButton, ToggleButtonGroup} from "@mui/material";
import ItemOlympiadsGrid from "./ItemOlympiadsGrid";
import {MenuItem, Typography} from "@material-ui/core";
import useStylesMain from "../../../Styles/MainStyles";
import CustomSelect from "../../UI/CustomSelect/CustomSelect";
import ClickAwayButton from "../../UI/СlickAwayButton/ClickAwayButton";
import FilterListIcon from "@mui/icons-material/FilterList";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import GridViewIcon from "@mui/icons-material/GridView";
import useStylesOlympiads from "../../../Styles/OlympiadsStyles";
import defaultImage from '../../../Assets/Image/Olympiads/default_olympiad_image.svg'
import ItemOlympiadsLine from "./ItemOlympiadsLine";


function Olympiads(props) {
    const classesMain = useStylesMain()
    const classesOlympiads = useStylesOlympiads()


    const olympiads = [
        {
            id: 1,
            name: 'Олимпиада 1',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled',
            datestart: '2022-01-01',
            document: 'document',
            format: 'очно',
            place: 'место',
            leevl: 'Международный'
        },
        {
            id: 2,
            name: 'Олимпиада 2',
            description: 'description',
            datestart: '2022-01-01',
            document: 'document',
            format: 'очно',
            place: 'место',
            leevl: 'Международный'
        },
        {
            id: 3,
            name: 'Олимпиада 3',
            description: 'description',
            datestart: '2022-01-01',
            document: 'document',
            format: 'очно',
            place: 'место',
            leevl: 'Международный'
        },
        {
            id: 4,
            name: 'Олимпиада 4',
            description: 'description',
            datestart: '2022-01-01',
            document: 'document',
            format: 'очно',
            place: 'место',
            leevl: 'Международный'
        },
        {
            id: 5,
            name: 'Олимпиада 5',
            description: 'description',
            datestart: '2022-01-01',
            document: 'document',
            format: 'очно',
            place: 'место',
            leevl: 'Международный'
        }
    ]


    const sortByList = [{name: 'названию', key: 'name'}, {name: 'дате создания', key: 'date'}]
    const [view, setView] = useState('grid')
    const [sortBy, setSortBy] = useState('')

    const handleChangeView = (event, newValue) => {
        setView(newValue)
    }


    const sortByKey = (key) => {
        olympiads.sort(function (a, b) {
            if (key === 'date') {
                let dateA = new Date(a.datestart), dateB = new Date(b.datestart)
                return dateA - dateB
            }
            let nameA = a[key].toLowerCase(), nameB = b[key].toLowerCase()
            if (nameA < nameB) //сортируем строки по возрастанию
                return -1
            if (nameA > nameB) return 1
            return 0 // Никакой сортировки
        })
    }



    return (
        <Grid  container spacing={3}>
            <Grid item xs={12}>
                <Typography className={classesMain.Title}>Олимпиады</Typography>
            </Grid>
            <Grid item style={{display: 'flex', justifyContent: 'flex-end', alignItems:'center', flexWrap:'wrap-reverse'}} xs={12} md={12}>
                <Grid item xs={12} md={3} xl={2}>
                    <CustomSelect
                        valueSelect={sortBy}
                        setValueSelect={(e) => {
                            setSortBy(e.target.value)
                            sortByKey(sortByList.filter(el => e.target.value === el.name)[0].key)

                        }}
                        contentCustomSelect={'Сортировка по...'}
                    >
                        {sortByList.map(item =>
                            <MenuItem key={item.name} value={item.name}>
                                <Typography style={{color: '#000'}}>{item.name}</Typography>
                            </MenuItem>
                        )
                        }
                    </CustomSelect>
                </Grid>


                    <ClickAwayButton title={
                        <>
                            <FilterListIcon className={classesMain.Text}/>
                            <Typography className={classesMain.Text}>Фильтр</Typography>
                        </>
                    }>
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

            {view === 'grid'?
                olympiads.map(item=>
                    <Grid key={item.id} item xs={12} md={6} xl={4}>
                        <ItemOlympiadsGrid key={item.id} item={item}/>
                    </Grid>
                )
                :
                olympiads.map(item=>
                    <Grid key={item.id} item xs={12}>
                        <ItemOlympiadsLine item={item} image={defaultImage}/>
                    </Grid>
                )
            }
        </Grid>
    );
}

export default Olympiads;