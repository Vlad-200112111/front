import {makeStyles} from "@material-ui/core";


const useStylesPortfolio = makeStyles(() => ({
            showCaseDefault: {
                width: '320px',
                minHeight: '350px',
                border: '4px dashed #CAD5F4',
                margin: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition:'all 0.5s ease',
                "&:hover":{
                    border: '4px solid rgb(90, 125, 205)',

                },
                '@media(max-width: 1437px)':{
                    width: '20vw',
                    minHeight:'250px'
                },
                '@media(max-width: 1200px)':{
                    width: '15vw',
                    minHeight:'250px'
                },
                '@media(max-width: 992px)':{
                    width: '100%',
                    margin:'0'
                }

            },
            showCaseDefaultImage:{
                position:'relative',
                width:'105px',
                height:'105px',
                borderRadius:'7px',
                transition:'all 0.5s ease',
                "&:before":{
                    content:'""',
                    background:'#fff',
                    left:'44%',
                    top:'20%',
                    width:'14px',
                    height:'61px',
                    position:'absolute'
                },
                "&:after":{
                    content:'""',
                    background:'#fff',
                    left:'21%',
                    top:'43%',
                    width:'61px',
                    height:'14px',
                    position:'absolute'
                },
                '@media(max-width: 1400px)':{
                    width: '80px',
                    height:'80px'
                },
                '@media(max-width: 992px)':{
                    width: '100%',
                    height:'80px'
                }

            },
            MobileButton: {
                '@media(max-width:992px)': {
                    position: 'fixed',
                    bottom: 0,
                    right: 0,
                    border: '2px solid #fff'
                }
            },
            cardGridMobile: {
                justifyContent:'center',
                display:'flex',
                '@media(max-width:768px)': {
                    justifyContent: 'center'
                }
            },
            cardMobile: {
                width: '320px',
                minHeight: '350px',
                margin: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition:'all 0.5s ease',
                
                '@media(max-width: 1437px)':{
                    width: '20vw',
                    minHeight:'250px'
                },
                '@media(max-width: 1200px)':{
                    width: '15vw',
                    minHeight:'250px'
                },
                '@media(max-width: 992px)':{
                    width: '100%',
                    margin:'0'
                }
            },
            loadImage: {
                marginTop: '0px',
                width: '176px',
            },
            removeAchievement: {
                position: 'absolute !important',
                top: '0 !important',
                color: '#fff !important',
                right: '0 !important',
                flexDirection:'column',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap:'5px'
            },
            EditAchievements: {
                width: 'auto',
                minWidth: '40rem',
                background: '#fff',
                boxShadow: 24,
                display: 'flex',
                flexDirection: 'column',
                margin: '0 !important',
                alignItems: 'center',
                color: '#fff',
                '@media (max-width: 992px)':{
                    maxWidth:'30rem',
                    overflowY:'auto',
                    minWidth:'unset',
                    maxHeight:'400px',
                    minHeight:'unset'
                },
                '@media (max-width: 768px)':{
                    maxWidth:'20rem',
                    overflowY:'auto',
                    minWidth:'unset',
                    maxHeight:'300px',
                    minHeight:'unset'
                },
            },
            ShowMoreImg: {
                width:'100%',
                maxWidth: '300px',
                minWidth: '100%'
            },
            ShowMoreButton: {
                margin: '0 !important',
                width: '100%'
            },
            CardImage: {
                transition: 'transform 0.25s',
                "&:hover": {
                    transform: 'scale(1.1)'
                },
                width: '100%',
                height: '360px !important'
            },
            ShowCaseModal:{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 'auto',
                minWidth: '960px',
                minHeight:'600px',
                background: '#fff',
                boxShadow: 24,
                padding: '40px',
                '@media(max-width:992px)': {
                    minWidth: '90% !important',
                    padding: '10px !important',
                    overflowY:'scroll',
                    maxHeight:'580px',
                    minHeight:'unset'
                }
            },
            ShowCaseCardImage:{
                transition: 'transform 0.25s',
                "&:hover": {
                    transform: 'scale(1.1)'
                },
                width: '100%',
                height: '260px !important'
            },
            CardContent: {
                color: '#fff',
                height:'100%',

                background: '#5A7DCF !important',
                "&:hover": {
                    background: '#3f67c0 !important',
                },

            },
            DownloadButton: {
                "&:hover": {
                    opacity: '1'
                },
                opacity: '0.6',
                position: 'absolute',
                width: '2rem !important',
                height: '2rem !important',
                zIndex: '10',
                transition: 'all 0.3s ease'
            },
            DownloadLineViewButton:{
                "&:hover": {
                    opacity: '1'
                },
                width: '2rem !important',
                height: '2rem !important',
                zIndex: '10',
                transition: 'all 0.3s ease'
            }

        }
    )
);

export default useStylesPortfolio;
