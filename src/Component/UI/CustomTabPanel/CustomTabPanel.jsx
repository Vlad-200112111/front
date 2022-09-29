import {TabPanel} from "@mui/lab";
import {Grid} from "@mui/material";

const CustomTabPanel = ({value, children, rowSpacing, columnSpacing, alignItems, direction, justifyContent,  ...restProps}) =>{
    return(
        <TabPanel {...restProps} value={value} key={value}>
            {
                rowSpacing || columnSpacing ?
                    <Grid
                        alignItems={alignItems}
                        direction={direction}
                        justifyContent={justifyContent}
                        rowSpacing={rowSpacing}
                        columnSpacing={columnSpacing}
                        container
                        spacing={2}
                    >
                        {children}
                    </Grid>
                    :
                    <>
                        {children}
                    </>
            }

        </TabPanel>
    )
}
export default CustomTabPanel