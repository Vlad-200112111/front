import {Box, Tab} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import useStylesMain from "../../../Styles/MainStyles";
import {useState, useEffect} from "react";
import React from 'react';

const CustomTab = (props) => {
    const classesMain = useStylesMain()
    const [valueTab, setValueTab] = useState(props.firstTab);


    useEffect(()=>{
        setValueTab(props.firstTab)
    }, [props.firstTab]);

    const handleChange = (event, newValue) => {
        setValueTab(newValue);
    };
    useEffect(()=>{
        if(props.onChange){
            props?.onChange(valueTab)

        }
    },[valueTab])

    return (
        <>
            <TabContext value={valueTab}>
                <Box
                    className={classesMain.TabsItemsMobile}
                    sx={{
                        color: '#fff',
                        padding: '0 24px',
                    }}>
                    <TabList
                        variant="fullWidth"
                        TabIndicatorProps={{
                            sx: {
                                bgcolor: "rgb(255 152 69)",
                                height: '4px'
                            }
                        }}
                        textColor="inherit"
                        className={classesMain.TabsItems}
                        onChange={handleChange}
                    >
                        {props.children[0]}
                    </TabList>

                </Box>
                {props.children[1]}
                </TabContext>
        </>
    )
}

export default CustomTab;