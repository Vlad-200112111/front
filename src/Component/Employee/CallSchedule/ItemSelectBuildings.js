import React, {useEffect, useState} from 'react';
import Chip from "@mui/material/Chip";
import DoneIcon from '@mui/icons-material/Done';
import Tooltip from "@mui/material/Tooltip";
import api from "../../../Services/api";
import Cookies from "js-cookie";


function ItemSelectBuildings({infoBuilding, scheduleId, active, setBuildings, setRelativeBuildings}) {

    useEffect(async ()=>{
        // if(connectionBuildingWithSchedule.indexOf(infoBuilding.id) !== -1){
        //     setActive(true)
        // } else {
        //     setActive(false)
        // }
    },[])

    async function changeStateBuilding() {
        if (active) {
            await api.scheduleCall.updateBuilding(
                {
                    token: Cookies.get("auth-token"),
                    name: infoBuilding.name,
                    shortName: infoBuilding.shortName,
                    callScheduleId: null
                }, infoBuilding.id
            )
        } else {
            await api.scheduleCall.updateBuilding(
                {
                    token: Cookies.get("auth-token"),
                    name: infoBuilding.name,
                    shortName: infoBuilding.shortName,
                    callScheduleId: scheduleId
                }, infoBuilding.id
            )
        }
        const {data: Buildings} = await api.scheduleCall.getBuildingsWithoutSchedule()
        setBuildings(Buildings)

        const {data: RelativeBuildings} = await api.scheduleCall.getRelativeBuildings(scheduleId)
        setRelativeBuildings(RelativeBuildings)
    }

    return (
        <Tooltip title={infoBuilding.name}>
            <Chip
                style={{margin: '0px 5px'}}
                icon={active ? <DoneIcon/> : ''}
                onClick={()=>changeStateBuilding(active)}
                label={infoBuilding.shortName}
                variant={active ? "" : 'outlined'}
            />
        </Tooltip>
    );
}

export default ItemSelectBuildings;