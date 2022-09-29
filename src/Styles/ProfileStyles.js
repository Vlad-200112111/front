import {makeStyles} from "@material-ui/core";


const useStylesProfile = makeStyles(() => ({
            FullName:{
                textAlign:'left',
                '@media(max-width:992px)':{
                    textAlign:'center'
                }
            },
            ShowCase:{
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                '@media (max-width: 992px)':{
                    justifyContent: 'center',
                    flexDirection:'column'
                },
            },
            showCaseItem:{
                marginBottom:'25px',
                '@media(max-width: 992px)':{
                    margin:0,
                    marginBottom:'25px',
                    width:'100%'
                }
            },
            showCaseBorder:{
                border: '3px solid rgb(90, 125, 205)',
                padding: '40px 20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                
            },
            Text:{
                textAlign:'left !important',
                

            },
            socialMedia:{
                display:'flex !important',
                justifyContent:'space-between !important',
                alignItems:'center !important'
            },
        socialMediaLink:{
                marginLeft:'10px'
        },
        UserPhoto:{
            width: '140px',
            height: '140px',
            marginRight: '10px',
            marginTop: '10px',
            borderRadius: '50%',
            border: 'solid 5px rgb(90, 125, 205)',
            backgroundSize:'cover',
            '@media(max-width:992px)':{
                marginRight:'0'
            }
        },
        delUserPhoto:{
            position: 'absolute',
            right: '0',
            transition: 'all 0.3s ease'
        },
        userInfoGrid:{
            margin:'20px',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column'
        },
        aboutMe:{
            width: '100%',
            background: 'rgb(90,125,205)',
            padding: '20px',
            marginTop: '20px'
        },
        aboutMeTextMobile:{
         color:'#fff',
         '@media (max-width: 768px)':{
             maxWidth:'600px'
         },
        '@media (max-width: 480px)':{
            maxWidth:'230px'
        }
        },
        formForAdd:{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        tabPanel:{
            '@media (max-width: 480px)':{
                padding:'0 !important'
            }
        }
        }
    )
);

export default useStylesProfile;
