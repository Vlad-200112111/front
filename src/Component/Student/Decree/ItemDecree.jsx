import Typography from '@mui/material/Typography';
import {Stack} from "@mui/material";
import CustomAccordion from "../../UI/CustomAccordion/CustomAccordion";


const ItemDecree = ({orderData}) => {
    return (
        <>
            <CustomAccordion
                title={`№ ${orderData.numberOrder} - ${orderData.title}`}
                content={
                    <Stack spacing={1}>
                        <Typography style={{color: '#485C90'}} borderBottom>
                            Дата: {orderData.orderDate}
                        </Typography>
                        <Typography style={{color: '#485C90'}} borderBottom>
                            Дата начала: {orderData.dateStart}
                        </Typography>
                        <Typography style={{color: '#485C90'}} borderBottom>
                            Тип: {orderData.typeOrder}
                        </Typography>
                    </Stack>
                }
            />
        </>
    )
}

export default ItemDecree;