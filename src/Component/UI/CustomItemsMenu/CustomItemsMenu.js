import {useState} from "react";
import DrawerStyles from "../../../Styles/DrawerStyles";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import React from "react";

const CustomItemsMenu = (props) => {
    const classesDrawer = DrawerStyles()

    const [contentVisible, setContentVisible] = useState(false)

    function toggleContentVisible() {
        setContentVisible(contentVisible !== true)
    }

    return (
        <>
            <div className={classesDrawer.containerCustomItemsMenu}>
                <ListItem className={classesDrawer.ListItem} onClick={toggleContentVisible} >
                    <ListItemButton sx={{p:0}}>
                        {props.icon}
                        <div style={{marginLeft: '8px'}}>{props.titleCustomItemsMenu}</div>
                    </ListItemButton>
                </ListItem>
                <div
                    className={`${classesDrawer.customItemsMenuContent} 
                    ${contentVisible ? classesDrawer.showCustomItemsMenuContent : ""
                    }`}
                >
                    {
                        props.children
                    }
                </div>
            </div>
        </>
    )
}

export default CustomItemsMenu;