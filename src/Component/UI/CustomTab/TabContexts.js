import React from 'react';
import {TabContext, TabList} from "@mui/lab";
import {Box, Tab} from "@mui/material";
import useStylesMain from "../../../Styles/MainStyles";

function TabContexts(
    {
        Tabs,
        TabPanels,
        handleChange,
        value
    }
) {
    const classesMain = useStylesMain();
    return (
        <>
            <TabContext value={value}>
                <Box
                    className={classesMain.TabsItemsMobile}
                    sx={{
                        color: '#fff',
                        padding: '0 24px',
                    }}>
                    <TabList
                        onChange={handleChange}
                        variant="fullWidth"
                        TabIndicatorProps={{
                            sx: {
                                bgcolor: "rgb(255 152 69)",
                                height: '4px'
                            }
                        }}
                        textColor="inherit"
                        className={classesMain.TabsItems}
                    >
                        {Tabs}
                    </TabList>
                </Box>
                {TabPanels}
            </TabContext>
        </>
    );
}

export default TabContexts;