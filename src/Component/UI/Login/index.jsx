import {useForm, Controller} from "react-hook-form";
import {
    TextField,
    Grid,
    Container,
    Button,
    Typography, Box,
    InputLabel,
    FormControl,
    FilledInput,
    InputAdornment,
    IconButton
} from "@material-ui/core";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {yupResolver} from "@hookform/resolvers/yup";
import validationSchema from "./validation";
import api from "../../../Services/api";
import useAuth from "../../../Hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import Cookies from "js-cookie";
import useStylesMain from "../../../Styles/MainStyles";
import useStylesForLogin from "../../../Styles/LoginStyles";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import logo from '../../../Assets/Image/logo.svg'
import {Stack} from "@mui/material";
import CustomFullScreenDialog from "../CustomFullScreenDialog/CustomFullScreenDialog";
import CustomInput from "../CustomInput/CustomInput";

function Login() {
    const classesForLogin = useStylesForLogin();
    const classesMain = useStylesMain();

    const [isLoading, setIsLoading] = useState(false);
    const [rolesManager, setRolesManager] = useState(false)
    const [loginDataRoles, setLoginDataRoles] = useState([])
    const [token, setToken] = useState('')
    const [openCustomFullScreenDialog, setOpenCustomFullScreenDialog] = useState(false)
    const [email, setEmail] = useState('')
    const [helperText, setHelperText] = useState('')

    const auth = useAuth();
    const navigate = useNavigate();
    const [values, setValues] = useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });
    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    };
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const {
        control,
        handleSubmit,
        formState: {errors},
        setError,
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (data) => {

        setIsLoading(true);
        const {data: loginData} = await api.auth.login(data);
        if (loginData.token.length !== 0 && loginData.token !== "Неверный логин или пароль") {
            setHelperText('')
            Cookies.set("auth-token", loginData.token);
            setLoginDataRoles(loginData.role)
            setToken(loginData.token)
            if (loginData.role.length > 1) {
                setRolesManager(true)
            } else {
                await api.auth.assigningRole(
                    {
                        token: loginData.token,
                        role: loginData.role[0]
                    }
                )
                navigate("/")
            }
        } else {
            setHelperText('Неверный логин или пароль!')
        }

    };

    const switchingRoles = async (item) => {
        const object = new Object()
        object.token = token
        object.role = item

        await api.auth.assigningRole(object)
        navigate('/');
    }

    async function resetPassword(event) {
        event.preventDefault()
        const formData = new FormData(event.target)
        await api.auth.resetPassword(formData.get('email'))
        setOpenCustomFullScreenDialog(false)
    }

    return (

        <>
            <Container className={classesForLogin.root}>
                <CustomFullScreenDialog
                    fullWidthScreenDialog={true}
                    fullScreenDialog={false}
                    titleCustomFullScreenDialog='Сброс пароля'
                    setOpenCustomFullScreenDialog={setOpenCustomFullScreenDialog}
                    openCustomFullScreenDialog={openCustomFullScreenDialog}
                    scrollType='body'>
                    <Box sx={{m: 4}}>
                        <form onSubmit={resetPassword}>
                            <Grid
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <CustomInput
                                    label={'Адрес электронной почты'}
                                    xs={10}
                                    type={'email'}
                                    name='email'
                                    helperText={'Введите Ваш адрес электоронной почты!'}
                                    customValueInput={email}
                                    setCustomValueInput={(event) => setEmail(event.target.value)}
                                />
                                <Grid
                                    item
                                    xs={10}
                                    style={{width: '100%'}}>
                                    <Button
                                        type={"submit"}
                                        variant="contained"
                                        style={{width: '100%'}}
                                        className={classesMain.button}>
                                        Восстановить пароль
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </CustomFullScreenDialog>
                {
                    rolesManager === false ?
                        <form
                            onSubmit={handleSubmit(onSubmit)}>
                            <Grid
                                container
                                spacing={4}
                                direction="column"
                                alignItems="center"
                                justifyContent="center"
                                style={{minHeight: '94vh'}}>
                                <Box className={classesForLogin.formAuthorization}>
                                    <Box sx={{m: 1}}>
                                        <Grid
                                            container
                                            spacing={0}
                                            direction="column"
                                            alignItems="center"
                                        >
                                            <Box
                                                component="img"
                                                className={classesForLogin.logo}
                                                src={logo}
                                            />
                                        </Grid>
                                        <Box style={{
                                            width: '100%',
                                            display: 'flex',
                                            justifyContent: "center"
                                        }}>
                                            <Typography
                                                variant="h6"
                                                component="span"
                                                color="textPrimary">
                                                Войти в личный кабинет
                                            </Typography>
                                        </Box>
                                    </Box>


                                    <Box sx={{m: 1}}>
                                        <Controller
                                            name="login"
                                            control={control}
                                            defaultValue=""
                                            render={({field}) => (
                                                <TextField
                                                    color="primary"
                                                    {...field}
                                                    error={Boolean(errors.email?.message)}
                                                    fullWidth={true}
                                                    type="email"
                                                    label="Введите логин"
                                                    variant="filled"
                                                />
                                            )}
                                        />
                                    </Box>
                                    <Box sx={{m: 1}}>
                                        <Controller
                                            name="password"
                                            control={control}
                                            defaultValue=""
                                            render={({field}) => (
                                                <FormControl
                                                    sx={{m: 1, width: '25ch'}}
                                                    variant="filled">
                                                    <InputLabel
                                                        htmlFor="filled-adornment-password">
                                                        Введите пароль
                                                    </InputLabel>
                                                    <FilledInput
                                                        {...field}
                                                        id="filled-adornment-password"
                                                        type={values.showPassword ? 'text' : 'password'}
                                                        fullWidth={true}
                                                        label="Введите пароль"
                                                        variant="filled"
                                                        className={classesMain.input}
                                                        error={Boolean(errors.password?.message)}
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    className={classesForLogin.iconButton}
                                                                    aria-label="toggle password visibility"
                                                                    onClick={handleClickShowPassword}
                                                                    onMouseDown={handleMouseDownPassword}
                                                                    edge="end"
                                                                >
                                                                    {
                                                                        values.showPassword ?
                                                                            <VisibilityOff/> : <Visibility/>
                                                                    }
                                                                </IconButton>
                                                            </InputAdornment>
                                                        }
                                                    />
                                                </FormControl>
                                            )}
                                        />
                                    </Box>
                                    <Typography
                                        style={{
                                            color: '#F00',
                                            textAlign: 'center'
                                        }}>
                                        {helperText}
                                    </Typography>
                                    <Stack>
                                        <Button
                                            style={{width: '100%'}}
                                            variant="contained"
                                            className={classesMain.button}
                                            type="submit">
                                            Войти
                                        </Button>
                                        <Button
                                            onClick={() => setOpenCustomFullScreenDialog(true)}
                                            variant="contained"
                                            style={{width: '100%'}}
                                            className={classesMain.button}>
                                            Восстановить пароль
                                        </Button>
                                    </Stack>
                                </Box>


                            </Grid>
                        </form>
                        :
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            style={{minHeight: '90vh'}}
                        >

                            <Box
                                className={classesMain.backgroundMain}
                                sx={{p: 3}}>
                                <Box sx={{m: 3}}>
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="center">
                                        <Typography color="textPrimary" variant="h5">Выберите роль:</Typography>
                                    </Grid>
                                </Box>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center">
                                    {loginDataRoles?.map((item) =>
                                        <div key={item.toString()}>
                                            <Grid item>
                                                <Box sx={{m: 1}}>
                                                    <Button
                                                        onClick={() => switchingRoles(item)}
                                                        startIcon={<AdminPanelSettingsIcon/>}
                                                        data-role={item}
                                                        variant="outlined">
                                                        {item}
                                                    </Button>
                                                </Box>
                                            </Grid>
                                        </div>
                                    )}
                                </Grid>
                            </Box>
                        </Grid>

                }

            </Container>
        </>

    )
        ;
}

export default Login;
