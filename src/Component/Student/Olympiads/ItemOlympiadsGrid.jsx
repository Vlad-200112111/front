import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import image from '../../../Assets/Image/pages/mainBackground.jpg'
import defaultImage from '../../../Assets/Image/Olympiads/default_olympiad_image.svg'
import useStylesMain from "../../../Styles/MainStyles";
import useStylesOlympiads from "../../../Styles/OlympiadsStyles";
import {Link} from "react-router-dom";


function ItemOlympiadsGrid({item}) {
    const classesOlympiads = useStylesOlympiads()
    const classesMain = useStylesMain()


    return (
        <Card  className={classesOlympiads.card} >
            <CardActionArea>
                <CardMedia
                    component='img'
                    height='140'
                    style={{objectFit:'cover', }}
                    image={defaultImage}
                />

            </CardActionArea>
            <CardContent className={classesOlympiads.cardContent}>
                <Typography gutterBottom variant="overline" component="div" style={{textAlign:'left', fontSize:'1rem'}} className={classesMain.Text}>
                    {item.name}
                </Typography>
                <Typography noWrap variant="body2" color="text.secondary" style={{textOverflow: 'ellipsis !important'}}>
                    {item.datestart} - {item.datestart}
                </Typography>
                <Typography  variant="body2" color="text.secondary" style={{overflowWrap:'break-word',textOverflow: 'ellipsis !important' }}>
                    {item.description.length>100?
                        item.description.slice(0,100)+'...'
                        :
                        item.description
                    }
                </Typography>
            </CardContent>
            <CardActions className={[classesOlympiads.button, classesOlympiads.cardActions].join(' ')}>
                <Link to={`/olympiad-details/${item.id}`} style={{textDecoration:'none', cursor:'pointer', width:'100%'}}>
                    <Button  style={{width:'100%'}} size="small" className={classesMain.TextWhite}>
                        ??????????????
                    </Button>
                </Link>

            </CardActions>
        </Card>
    );
}

export default ItemOlympiadsGrid;