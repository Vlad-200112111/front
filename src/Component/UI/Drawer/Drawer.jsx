import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {Link, useNavigate} from "react-router-dom";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Grid} from "@material-ui/core";
import Cookies from "js-cookie";
import {useEffect, useMemo, useState} from "react";
import NotificationsIcon from '@mui/icons-material/Notifications';
import logo from '../../../Assets/Image/SideBar/logo.svg'
import useStylesDrawer from "../../../Styles/DrawerStyles";
import useStylesMain from "../../../Styles/MainStyles";
import api from "../../../Services/api";
import {Skeleton, Stack} from "@mui/material";
import CustomItemsMenu from "../CustomItemsMenu/CustomItemsMenu";
import Week from "../Week/Week";
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import HomeIcon from '@mui/icons-material/Home';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import DescriptionIcon from '@mui/icons-material/Description';
import SchoolIcon from '@mui/icons-material/School';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import BookIcon from '@mui/icons-material/Book';
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import ArticleIcon from '@mui/icons-material/Article';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GroupsIcon from '@mui/icons-material/Groups';
import DnsIcon from '@mui/icons-material/Dns';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TodayIcon from '@mui/icons-material/Today';
import DateRangeIcon from '@mui/icons-material/DateRange';
import getSubrolesByUser from "../../Modules/Functions/getSubrolesByUser";


const drawerWidth = 240;


const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft(props) {
    const theme = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [anchorElUser, setAnchorElUser] = useState('');
    const [anchorElAlerts, setAnchorElAlerts] = useState('');
    const [links, setLinks] = useState({})
    const [showInformationAboutIndividual, setShowInformationAboutIndividual] = useState(true)
    const [studentId, setStudentId] = useState()
    const [stuffId, setStuffId] = useState()
    const [informationAboutIndividual, setInformationAboutIndividual] = useState({})
    const [avatar, setAvatar] = useState('')
    const token = Cookies.get("auth-token");
    const userId = Cookies.get("userId");
    const [role, setRole] = useState('')


    useEffect(async () => {

        const {data: Result} = await api.auth.getAssigningRole({token: token})
        setRole(Result.role)


        if (Result.role === 'Сотрудник') {

            const Subroles = await getSubrolesByUser()
            const {data: StuffId} = await api.staff.getStuffId()

            let Links = {
                list: [
                    {name: 'Главная', link: '/', icon: <HomeIcon/>},
                    {name: 'Профиль', link: `/profile-for-employee/${StuffId.employeeId}`, icon: <AccountBoxIcon/>}
                ],
                dropDownList: []
            }

            for (const subroleElement of Subroles) {
                for (const link of subroleElement.links) {
                    var found = Links.list.some(function (el) {
                        return el.name === link.namePage;
                    });
                    var foundDropList = Links.dropDownList.some(function (el) {

                        return el.content.some(function (elem) {
                            return elem.name === link.namePage
                        })
                    });
                    if (!found && link.read && link.nameGroupLinkPage === 'Боковое меню' && link.namePage === 'Рабочие программы') {
                        Links.list.push({
                            name: 'Рабочие программы',
                            link: '/work-programs',
                            icon: <CardMembershipIcon/>
                        })

                    }
                    if (!found && link.read && link.nameGroupLinkPage === 'Боковое меню' && link.namePage === 'Работа со студентами') {
                        Links.list.push({
                            name: 'Работа со студентами',
                            link: '/work-with-students',
                            icon: <GroupsIcon/>
                        })

                    }
                    if (!found && link.read && link.nameGroupLinkPage === 'Боковое меню' && link.namePage === 'Работа со всеми студентами') {
                        Links.list.push({
                            name: 'Работа со всеми студентами',
                            link: '/work-with-all-students',
                            icon: <GroupsIcon/>
                        })

                    }
                    if (!found && link.read && link.nameGroupLinkPage === 'Боковое меню' && link.namePage === 'Календарный учебный график') {
                        Links.list.push({
                            name: 'Календарный учебный график',
                            link: '/general-study-schedule',
                            icon: <CalendarMonthIcon/>
                        })

                    }
                    if (!found && link.read && link.nameGroupLinkPage === 'Боковое меню' && link.namePage === 'Расписание звонков') {
                        Links.list.push({
                            name: 'Расписание звонков',
                            link: '/call-schedule',
                            icon: <CalendarMonthIcon/>
                        })

                    }
                    if (!foundDropList && link.read && link.nameGroupLinkPage === 'Расписание') {
                        Links.dropDownList.push({
                            mainName: 'Расписание',
                            icon: <TodayIcon/>,
                            content: []
                        })
                        if (link.namePage === 'Создать расписание') {
                            Links.dropDownList = Links.dropDownList.map(item =>
                                item.mainName === 'Расписание' ?
                                    {
                                        ...item,
                                        content: [...item.content, {
                                            name: 'Создать расписание',
                                            link: '/create-schedule'
                                        }]
                                    } :
                                    item
                            )
                        }
                    }
                    if (!foundDropList && link.read && link.nameGroupLinkPage === 'Заказ справок') {
                        if (!Links.dropDownList.filter(el => el.mainName === 'Заказ справок').length > 0) {
                            Links.dropDownList.push({
                                mainName: 'Заказ справок',
                                icon: <DescriptionIcon/>,
                                content: []
                            })
                        }

                        if (link.namePage === 'Справки') {
                            Links.dropDownList = Links.dropDownList.map(item =>
                                item.mainName === 'Заказ справок' ?
                                    {...item, content: [...item.content, {name: 'Справки', link: '/documents'}]} :
                                    item
                            )
                        }
                        if (link.namePage === 'Архив справок') {
                            Links.dropDownList = Links.dropDownList.map(item =>
                                item.mainName === 'Заказ справок' ?
                                    {
                                        ...item,
                                        content: [...item.content, {name: 'Архив справок', link: '/documents/archive'}]
                                    } :
                                    item
                            )
                        }

                    }
                    if (!foundDropList && link.read && link.nameGroupLinkPage === 'Дистанционное обучение') {
                        if (!Links.dropDownList.filter(el => el.mainName === 'Дистанционное обучение').length > 0) {
                            Links.dropDownList.push({
                                mainName: 'Дистанционное обучение',
                                icon: <LaptopChromebookIcon/>,
                                content: []
                            })
                        }
                        // if (link.namePage === 'Курсы по рабочим программам') {
                        //     Links.dropDownList = Links.dropDownList.map(item =>
                        //         item.mainName === 'Дистанционное обучение' ?
                        //             {
                        //                 ...item,
                        //                 content: [...item.content, {
                        //                     name: 'Курсы по рабочим программам',
                        //                     link: '/employee-courses'
                        //                 }]
                        //             } :
                        //             item
                        //     )
                        // }
                        if (link.namePage === 'Курсы Зав. Кафедры') {
                            Links.dropDownList = Links.dropDownList.map(item =>
                                item.mainName === 'Дистанционное обучение' ?
                                    {
                                        ...item,
                                        content: [...item.content, {
                                            name: 'Курсы кафедры',
                                            link: '/courses-zav-caf'
                                        }]
                                    } :
                                    item
                            )
                        }
                        if (link.namePage === 'Курсы сотрудника') {
                            Links.dropDownList = Links.dropDownList.map(item =>
                                item.mainName === 'Дистанционное обучение' ?
                                    {
                                        ...item,
                                        content: [...item.content, {
                                            name: 'Мои курсы',
                                            link: '/employee-my-courses'
                                        }]
                                    } :
                                    item
                            )
                        }
                    }
                    if (!foundDropList && link.read && link.nameGroupLinkPage === 'Вики') {
                        if (!Links.dropDownList.filter(el => el.mainName === 'Справочная информация').length > 0) {
                            Links.dropDownList.push({
                                mainName: 'Справочная информация',
                                icon: <ArticleIcon/>,
                                content: []
                            })
                        }
                        if (link.namePage === 'Мои посты') {
                            Links.dropDownList = Links.dropDownList.map(item =>
                                item.mainName === 'Справочная информация' ?
                                    {
                                        ...item,
                                        content: [...item.content, {
                                            name: 'Информация',
                                            link: '/wiki'
                                        }]
                                    } :
                                    item
                            )
                        }
                        if (link.namePage === 'Создать пост') {
                            Links.dropDownList = Links.dropDownList.map(item =>
                                item.mainName === 'Справочная информация' ?
                                    {
                                        ...item,
                                        content: [...item.content, {name: 'Создать справочную информацию', link: '/wiki/create-post'}]
                                    } :
                                    item
                            )
                        }
                    }
                }
            }

            setLinks(Links)
            setStuffId(StuffId.employeeId)
            // setLinks({
            //     list: [
            //         {name: 'Главная', link: '/', icon: <HomeIcon/>},
            //         {name: 'Профиль', link: `/profile-for-employee/${StuffId.employeeId}`, icon: <AccountBoxIcon/>},
            //        // {name: 'Заказ справок', link: '/documents', icon: <DescriptionIcon/>},
            //
            //         {name: 'Работа со студентами', link: '/work-with-students', icon: <GroupsIcon/>},
            //         {name:'Календарный учебный график',link: '/general-study-schedule',icon:<CalendarMonthIcon/>},
            //
            //
            //         {name: 'Рабочие программы', link: '/work-programs', icon: <CardMembershipIcon/>},
            //     ],
            //     dropDownList: [
            //         {
            //             mainName: 'Расписание',
            //             icon: <LaptopChromebookIcon/>,
            //             content: [
            //                 {name: 'Создать расписание', link: '/create-schedule'},
            //             ]
            //         },
            //         // {
            //         //     mainName: 'Олимпиады',
            //         //     icon: <WorkspacePremiumIcon/>,
            //         //     content: [
            //         //         {name: 'Создать олимпиаду', link: '/create-olympiad'},
            //         //         {name: 'Список олимпиад', link: '/olympiads'}
            //         //     ]
            //         // },
            //
            //         {
            //             mainName: 'Заказ справок',
            //             icon: <DescriptionIcon/>,
            //             content: [
            //                 {name: 'Справки', link: '/documents'},
            //                 {name: 'Архив справок', link: '/documents/archive'},
            //             ]
            //         },
            //         {
            //             mainName: 'Дистанционное обучение',
            //             icon: <LaptopChromebookIcon/>,
            //             content: [
            //                 {name: 'Курсы по рабочим программам', link: '/employee-courses'},
            //                 // {name: 'Дополнительные курсы', link: '/additional-courses'},
            //             ]
            //         }
            //     ],
            // })
            await api.profile.GetUserProfileIdByStuff(StuffId.employeeId).then(async (UserProfile) => {
                const {data: userPhoto} = await api.profile.GetUserPhoto(UserProfile.data)
                setAvatar(userPhoto)
            }).catch(function (error) {
                if (error.response) {
                    if (error.response.data === 'Incorrect external id') {

                    }
                }
            })
        } else if (Result.role === 'Студент') {
            const {data: StudentId} = await api.educationalProcess.getStudentId()
            setStudentId(StudentId)
            setLinks({
                list: [
                    {name: 'Главная', link: '/', icon: <HomeIcon/>},
                    {name: 'Профиль', link: `/student-profile/${StudentId}`, icon: <AccountBoxIcon/>},
                    {name: 'Портфолио', link: `/portfolio/${StudentId}`, icon: <EmojiEventsIcon/>},

                    {name: 'Успеваемость', link: '/academic-performance', icon: <SignalCellularAltIcon/>},
                    {name: 'Приказы', link: '/decree', icon: <ListAltIcon/>},
                    {name: 'Диплом', link: '/diplom', icon: <SchoolIcon/>},
                    {name: 'Дисциплины по выбору', link: '/elective-disciplines', icon: <BookIcon/>},
                    {name: 'Календарный учебный график', link: '/general-study-schedule', icon: <CalendarMonthIcon/>},
                    // {name: 'Заказ справок', link: '/documents', icon: <DescriptionIcon/>},
                    {name: 'Рабочие программы', link: '/work-programs', icon: <CardMembershipIcon/>},
                    // {name: 'Олимпиады', link: '/olympiads', icon: <WorkspacePremiumIcon/>},
                ],
                dropDownList: [
                    {
                        mainName: 'Заказ справок',
                        icon: <DescriptionIcon/>,
                        content: [
                            {name: 'Справки', link: '/documents'},
                            {name: 'Архив справок', link: '/documents/archive'},
                        ]
                    },
                    {
                        mainName: 'Дистанционное обучение',
                        icon: <LaptopChromebookIcon/>,
                        content: [
                            {name: 'Курсы по учебному плану', link: '/courses-uch-plan'},
                            // {name: 'Дополнительные курсы', link: '/additional-courses'},
                        ]
                    },
                ],
            })

            await api.profile.GetUserProfileIdByStudent(StudentId).then(async (UserProfile) => {
                const {data: userPhoto} = await api.profile.GetUserPhoto(UserProfile.data)
                setAvatar(userPhoto)
            }).catch(function (error) {
                if (error.response) {
                    if (error.response.data === 'Incorrect external id') {
                        
                    }
                }
            })
        } else if (Result.role === 'Администратор') {
            const {data: StuffId} = await api.staff.getStuffId()
            await api.profile.GetUserProfileIdByStuff(StuffId.employeeId).then(async (UserProfile) => {
                const {data: userPhoto} = await api.profile.GetUserPhoto(UserProfile.data)
                setAvatar(userPhoto)
            }).catch(function (error) {
                if (error.response) {
                    if (error.response.data === 'Incorrect external id') {
                        
                    }
                }
            })
            setStuffId(StuffId.employeeId)
            setLinks({
                list: [
                    {name: 'Главная', link: '/', icon: <HomeIcon/>},
                    {name: 'Профиль', link: `/profile-for-employee/${StuffId.employeeId}`, icon: <AccountBoxIcon/>},
                    {name: 'Рабочие программы', link: '/work-programs', icon: <CardMembershipIcon/>},
                    {name: 'Создание расписания', link: '/create-schedule', icon: <CardMembershipIcon/>},
                    {name: 'ГИС СЦОС', link: '/modern-digital-educational-environment', icon: <DnsIcon/>},
                    {
                        name: 'Настройки календарного учебного графика',
                        link: '/general-schedule-settings',
                        icon: <DnsIcon/>
                    },
                ],
                dropDownList: [
                    {
                        mainName: 'Вики',
                        icon: <ArticleIcon/>,
                        content: [
                            {name: 'Мои посты', link: '/wiki'},
                            {name: 'Создать пост', link: '/wiki/create-post'},
                        ],
                    },
                    {
                        mainName: 'Администрирование',
                        icon: <AdminPanelSettingsIcon/>,
                        content: [
                            {name: 'Социальные сети', link: '/social-medias'},
                            {name: 'Управление субролями', link: '/sub-roles-settings'},
                            {name: 'Управление привилегиями', link: '/privilege-management'},
                            {name: 'Заказ справок', link: '/editing-document-settings'},
                            {name: 'Название корпусов', link: '/name-buildings'},
                            {name: 'Панель инструментов', link: '/toolbar'},
                        ],
                    }
                ],

            })
        } else {
            setLinks([])
        }


        const {data: InformationAboutIndividual} = await api.auth.getInformationAboutIndividual()
        setInformationAboutIndividual(InformationAboutIndividual)

        setOpen(true)
        if (Result.role !== null) {

            if (window.innerWidth < 992) {
                setOpen(false)
            }
        }
    }, [])

    useEffect(() => {
        setCurrentLink(window.location.pathname)
        if (window.innerWidth < 480) {
            setShowInformationAboutIndividual(false)
        }

    }, [window.innerWidth])

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);

    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
        setAnchorElAlerts(null)
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenAlertsMenu = (event) => {
        setAnchorElAlerts(event.currentTarget);
        setAnchorElUser(null);
    };

    const handleCloseAlertsMenu = () => {
        setAnchorElAlerts(null);
    };

    const onLogOut = async () => {
        await api.auth.logOut(Cookies.get("auth-token"))
        Cookies.remove("auth-token");
        Cookies.remove("userId");
        navigate("/login")
    }
    const changeRole = async (role) => {
        const object = {}
        object.token = token
        object.role = role
        await api.auth.assigningRole(object).then(() => {
            window.location.reload()
        })
    }

    const classesDrawer = useStylesDrawer()
    const classesMain = useStylesMain()
    const [currentLink, setCurrentLink] = useState('')

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar
                className={classesDrawer.AppBar}
                position="fixed"
                open={open}
            >
                <Toolbar sx={{justifyContent: 'end'}}>

                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{mr: 2, color: '#485C90', ...(open && {display: 'none'})}}
                    >
                        <MenuIcon/>
                    </IconButton>


                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                    >
                        <Box
                            sx={{
                                flexGrow: 0,
                                alignItems: 'center',
                                display: 'flex'
                            }}
                        >
                            <Typography
                                style={{marginRight: 20, marginBottom: 2}}
                                className={classesMain.Text}
                                variant="h6"
                                component="span"
                            >
                                {
                                    <Week/>
                                }
                            </Typography>
                            <IconButton sx={{margin: 2}} onClick={handleOpenAlertsMenu}>
                                <NotificationsIcon sx={{color: '#485C90'}}/>
                            </IconButton>
                            {informationAboutIndividual.lastname && informationAboutIndividual.name && informationAboutIndividual.patronymic ?
                                <Box sx={{pt: 0.5}} style={{display: 'flex', flexWrap: 'nowrap'}}>
                                    {
                                        showInformationAboutIndividual ?
                                            <Typography
                                                onClick={handleOpenUserMenu}
                                                className={classesMain.Text}
                                                key={informationAboutIndividual.userID}
                                                sx={{color: '#485C90', mr: 2, cursor: 'pointer'}}
                                                variant="h6"
                                                component="span"
                                            >
                                                {informationAboutIndividual.lastname} {informationAboutIndividual.name} {informationAboutIndividual.patronymic}
                                            </Typography>
                                            : ''
                                    }

                                    <Tooltip title="Открыть меню профиля">
                                        <IconButton
                                            onClick={handleOpenUserMenu}
                                            sx={{p: 0}}
                                        >
                                            <Avatar
                                                style={{borderRadius: '50%', border: 'solid 3px rgb(90, 125, 205)'}}
                                                alt="Remy Sharp"
                                                src={avatar.length > 0 ? avatar : require('../../../Assets/Image/Profile/profile.png')}
                                            />
                                        </IconButton>
                                    </Tooltip>
                                </Box> :
                                <Box sx={{pt: 0.5, display: 'flex'}}>
                                    <Skeleton sx={{mr: 1}} width={300}/>
                                    <Skeleton variant="circular" width={40} height={40}/>
                                </Box>
                            }

                            <Menu
                                sx={{mt: '45px'}}
                                id="menu-appbar1"
                                anchorEl={anchorElAlerts}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElAlerts)}
                                onClose={handleCloseAlertsMenu}
                            >
                                <MenuItem onClick={() => changeRole('Студент')}>
                                    <Typography
                                        style={{color: '#485C90'}}
                                        textAlign="center"
                                    >
                                        Студент
                                    </Typography>
                                </MenuItem>
                                <MenuItem onClick={() => changeRole('Сотрудник')}>
                                    <Typography
                                        style={{color: '#485C90'}}
                                        textAlign="center"
                                    >
                                        Сотрудник
                                    </Typography>
                                </MenuItem>
                                <MenuItem onClick={() => changeRole('Администратор')}>
                                    <Typography
                                        style={{color: '#485C90'}}
                                        textAlign="center"
                                    >
                                        Сотрудник
                                    </Typography>
                                </MenuItem>
                                <MenuItem onClick={handleCloseAlertsMenu}>
                                    <Typography
                                        style={{color: '#485C90'}}
                                        textAlign="center"
                                    >
                                        Оповещение 3
                                    </Typography>
                                </MenuItem>
                                <MenuItem onClick={handleCloseAlertsMenu}>
                                    <Typography
                                        style={{color: '#485C90'}}
                                        textAlign="center"
                                    >
                                        Оповещение 4
                                    </Typography>
                                </MenuItem>
                                <MenuItem onClick={handleCloseAlertsMenu}>
                                    <Typography
                                        style={{color: '#485C90'}}
                                        textAlign="center"
                                    >
                                        Оповещение 5
                                    </Typography>
                                </MenuItem>
                            </Menu>

                            <Menu
                                sx={{mt: '45px'}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <Link style={{textDecoration: 'none'}}
                                      to={role === 'Студент' ? `/student-profile/${studentId}` : `/profile-for-employee/${stuffId}`}>
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Typography
                                            style={{color: '#485C90'}}
                                            textAlign="center"
                                        >
                                            Профиль
                                        </Typography>
                                    </MenuItem>
                                </Link>


                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography
                                        style={{color: '#485C90'}}
                                        onClick={onLogOut}
                                        textAlign="center"
                                    >
                                        Выйти из личного кабинета
                                    </Typography>
                                </MenuItem>
                            </Menu>


                        </Box>
                    </Grid>
                </Toolbar>
            </AppBar>

            <Drawer

                className={classesDrawer.Drawer}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <div
                        className={classesDrawer.DrawerHeader}
                    >
                        <img
                            style={{marginLeft: '40px'}}
                            src={logo}
                        />
                    </div>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon sx={{color: '#485C90'}}/> :
                            <ChevronRightIcon sx={{color: '#485C90'}}/>}
                    </IconButton>

                </DrawerHeader>
                <List style={{overflowY: 'auto', marginTop: '20px'}} className={classesMain.Text}>
                    {
                        links.list?.map(item =>
                            <ListItem className={[classesDrawer.ListItem].join(' ')} disablePadding key={item.name}>
                                <ListItemButton component={Link} to={item.link}>
                                    {item.icon}
                                    <ListItemText
                                        sx={{ml: 1}}
                                        className={[classesDrawer.ListItemText].join(' ')}
                                        primary={item.name}/>
                                </ListItemButton>
                            </ListItem>
                        )
                    }
                    {
                        links.dropDownList?.map(item =>
                            <CustomItemsMenu key={item.mainName} titleCustomItemsMenu={item.mainName} icon={item.icon}>
                                {
                                    item.content.map(contentItem =>
                                        <ListItemButton key={contentItem.name} component={Link} to={contentItem.link}>
                                            <ListItemText
                                                style={{margin: '0 !important'}}
                                                className={classesDrawer.ListItemText}
                                                primary={contentItem.name}/>
                                        </ListItemButton>
                                    )
                                }
                            </CustomItemsMenu>
                        )
                    }
                </List>
            </Drawer>

            <Main open={open}>
                <DrawerHeader/>
                {props.children}
            </Main>
        </Box>
    );
}