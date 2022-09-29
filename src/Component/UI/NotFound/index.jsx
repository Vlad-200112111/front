import { Grid, makeStyles, Container, Typography } from "@material-ui/core";
import Button from '@mui/material/Button';
import {Link} from "react-router-dom";
import logo from '../../../Assets/Image/404/logo.svg'
import React from "react";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}));

function NotFound() {
  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Grid container spacing={3}>

        <Grid item xs={12}>
          <Button
              component={Link}
              to="/"
              variant='contained'
              sx={{background:'rgb(255 152 69)', borderRadius:'0'}}
          >Назад</Button>
          <div style={{ width:'100%', display:'flex', justifyContent:'center', marginBottom:'20px', marginTop:'50px'}}><img  width='128px' src={logo} alt='image'/></div>

          <Typography style={{fontWeight:'700', margin:'0', color:'#004481'}}  align='center' variant="h2" gutterBottom>
            ОШИБКА 404
          </Typography>
          <Typography style={{color:'#004481'}} align='center' variant="h4" gutterBottom>
            Запрашиваемая страница не найдена.
          </Typography>
        </Grid>
        
      </Grid>
    </Container>
  );
}

export default NotFound;
