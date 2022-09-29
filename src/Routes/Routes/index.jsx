import {Routes, Route, Navigate} from "react-router-dom";
import Home from "./../../Component/UI/Home";
import Login from "./../../Component/UI/Login";
import NotFound from "./../../Component/UI/NotFound";
import PrivateRoute from "./../components/PrivateRoute";
import GuestRoute from "./../components/GuestRoute";
import StudentRoute from "./../components/StudentRoute";
import EmployeeDeanRoute from "./../components/EmployeeRoute/EmployeeDeanRoute";
import Portfolio from "./../../Component/Student/Portfolio/Portfolio";
import AcademicPerformance from "../../Component/Student/AcademicPerformance/AcademicPerformance";
import Documents from "../../Component/Student/Documents/Documents"
import DocumentsForEmployee from "../../Component/Employee/Documents/Documents";
import Decree from "./../../Component/Student/Decree/Decree";
import Profile from "./../../Component/Student/Profile/Profile";
import Drawer from "./../../Component/UI/Drawer/Drawer";
import AdminRoute from "./../../Routes/components/AdminRoute/AdminRoute";
import Wiki from "./../../Component/Admin/Wiki/Wiki";
import CreatePost from "./../../Component/Admin/Wiki/CreatePost/CreatePost";
import PostById from "./../../Component/Admin/Wiki/PostById";
import ProfileForEmployeeDean from "../../Component/Employee/Profile/ProfileForEmployeeDean";
import EditPost from "../../Component/Admin/Wiki/EditPost/EditPost";
import WorkWithStudents from "../../Component/Employee/WorkWithStudents/WorkWithStudents";
import SocialMedias from "../../Component/Admin/SocialMedias/SocialMedias";
import React from 'react'
import WorkPrograms from "../../Component/General/WorkPrograms/WorkPrograms";
import WorkProgramsById from "../../Component/General/WorkPrograms/WorkProgramsById";
import SubRolesSettings from "../../Component/Admin/EmployeePrivileges/SubRolesSettings/SubRolesSettings";
import SubRolesSwitches from "../../Component/Admin/EmployeePrivileges/SubRolesSwitches/SubRolesSwitches";
import ElectiveDisciplines from "../../Component/Student/ElectiveDisciplines/ElectiveDisciplines";
import DocumentById from "../../Component/General/Document/Document/DocumentById";
import Olympiads from "../../Component/Student/Olympiads/Olympiads";
import OlympiadDetails from "../../Component/Student/Olympiads/OlympiadDetails";
import CreateSchedule from "../../Component/Employee/Schedule/CreateSchedule/CreateSchedule";
import CreateOlympiad from "../../Component/Employee/Olympiads/CreateOlympiad";
import MobileHome from "../../Component/UI/MobileHome/MobileHome";
import ArchiveById from "../../Component/General/Document/Archive/ArchiveById";
import ArchiveEmployee from "./../../Component/Employee/Documents/Archive/Archive";
import Archive from "./../../Component/Student/Documents/Archive/Archive";
import CreateTask from "../../Component/General/DictanceEducation/Tasks/CreateTask/CreateTask";
import ModernDigitalEducationalEnvironment
    from "../../Component/Admin/ModernDigitalEducationalEnvironment/ModernDigitalEducationalEnvironment";
import ListStudent from "../../Component/Admin/ModernDigitalEducationalEnvironment/ListStudent/ListStudent";
import ListContingentMovements
    from "../../Component/Admin/ModernDigitalEducationalEnvironment/ListContingentMovements/ListContingentMovements";
import ListMarks from "../../Component/Admin/ModernDigitalEducationalEnvironment/ListMarks/ListMarks";
import ListDisciplines from "../../Component/Admin/ModernDigitalEducationalEnvironment/ListDisciplines/ListDisciplines";
import ListCurricula from "../../Component/Admin/ModernDigitalEducationalEnvironment/ListCurricula/ListCurricula";
import ListEducationalPrograms
    from "../../Component/Admin/ModernDigitalEducationalEnvironment/ListEducationalPrograms/ListEducationalPrograms";
import Diplom from "../../Component/Student/Diplom/Diplom";
import EditingDocumentSettings from "../../Component/Admin/EditingDocumentSettings/EditingDocumentSettings";
import RolesManager from "../../Component/UI/RolesMenager/RolesManager";
import CalendarStudySchedule from "../../Component/General/CalendarStudySchedule/CalendarStudySchedule";
import CreateCalendarStudySchedule from "../../Component/Employee/CalendarStudySchedule/CreateCalendarStudySchedule";
import CallSchedule from "../../Component/Employee/CallSchedule/CallSchedule";
import NameBuildings from "../../Component/Admin/NameBuildings/NameBuildings";
import CalendarStudyScheduleSettings
    from "../../Component/Admin/CalendarStudyScheduleSettings/CalendarStudyScheduleSettings";
import EditCalendarStudySchedule from "../../Component/Employee/CalendarStudySchedule/EditCalendarStudySchedule";
import CreateCallSchedule from "../../Component/Employee/CallSchedule/CreateCallSchedule/CreateCallSchedule";
import EditCallSchedule from "../../Component/Employee/CallSchedule/EditCallSchedule/EditCallSchedule";
import PortfolioForEconomicDepartment
    from "../../Component/Employee/EconomicDepartmentEmployee/Portfolio/PortfolioForEconomicDepartment";
import ShowCallSchedule from "../../Component/Employee/CallSchedule/ShowCallSchedule/ShowCallSchedule";
import WorkWithAllStudents from "../../Component/Employee/WorkWithAllStudents/WorkWithAllStudents";
import MyCourses
    from "../../Component/Employee/DictanceEducation/Courses/MyCourses";
import Courses
    from "../../Component/Student/DictanceEducation/Courses";
import CoursesForHeadOfDepartment
    from "../../Component/Employee/DictanceEducation/HeadOfDepartment/CoursesForHeadOfDepartment";
import Toolbar from "../../Component/Admin/Toolbar/Toolbar";
import ShowTask from "../../Component/General/DictanceEducation/Tasks/ShowTask/ShowTask";


export const context = React.createContext()

function AppRoutes() {

    return (

        <Routes>

            <Route
                path="/general-study-schedule"
                element={
                    <PrivateRoute>
                        <Drawer>
                            <EmployeeDeanRoute>
                                <CalendarStudySchedule/>
                            </EmployeeDeanRoute>
                            <StudentRoute>
                                <CalendarStudySchedule/>
                            </StudentRoute>
                        </Drawer>
                    </PrivateRoute>
                }
            />
            <Route
                path="/general-schedule-settings"
                element={
                    <PrivateRoute>
                        <Drawer>
                            <AdminRoute>
                                <CalendarStudyScheduleSettings/>
                            </AdminRoute>
                        </Drawer>
                    </PrivateRoute>
                }
            />
            <Route
                path="/create-general-schedule"
                element={
                    <PrivateRoute>
                        <Drawer>
                            <EmployeeDeanRoute>
                                <CreateCalendarStudySchedule/>
                            </EmployeeDeanRoute>
                        </Drawer>
                    </PrivateRoute>
                }
            />
            <Route
                path="/edit-general-schedule/:idCalendar"
                element={
                    <PrivateRoute>
                        <Drawer>
                            <EmployeeDeanRoute>
                                <EditCalendarStudySchedule/>
                            </EmployeeDeanRoute>
                        </Drawer>
                    </PrivateRoute>
                }
            />
            <Route
                    path="/create-task/:idTopic"
                    element={
                        <PrivateRoute>
                            <Drawer>
                                <EmployeeDeanRoute>
                                    <CreateTask/>
                                </EmployeeDeanRoute>
                            </Drawer>
                        </PrivateRoute>
                    }
                />
            <Route
                path="/show-task/:idTopic"
                element={
                    <PrivateRoute>
                        <Drawer>
                            <StudentRoute>
                                <ShowTask/>
                            </StudentRoute>
                            <EmployeeDeanRoute>
                                <ShowTask/>
                            </EmployeeDeanRoute>
                        </Drawer>
                    </PrivateRoute>
                }
            />
            
            {/*<Route*/}
            {/*    path="/student-courses"*/}
            {/*    element={*/}
            {/*        <PrivateRoute>*/}
            {/*            <Drawer>*/}
            {/*                <StudentRoute>*/}
            {/*                    <Courses/>*/}
            {/*                </StudentRoute>*/}
            {/*            </Drawer>*/}
            {/*        </PrivateRoute>*/}
            {/*    }*/}
            {/*/>*/}
            {/*<Route*/}
            {/*    path="/employee-courses"*/}
            {/*    element={*/}
            {/*        <PrivateRoute>*/}
            {/*            <Drawer>*/}
            {/*                <EmployeeDeanRoute>*/}
            {/*                    <CoursesForEmployee/>*/}
            {/*                </EmployeeDeanRoute>*/}
            {/*            </Drawer>*/}
            {/*        </PrivateRoute>*/}
            {/*    }*/}
            {/*/>*/}
            <Route
                path="/employee-my-courses"
                element={
                    <PrivateRoute>
                        <Drawer>
                            <EmployeeDeanRoute>
                                <MyCourses/>
                            </EmployeeDeanRoute>
                        </Drawer>
                    </PrivateRoute>
                }
            />
            <Route
                path="/courses-uch-plan"
                element={
                    <PrivateRoute>
                        <Drawer>
                            <StudentRoute>
                                <Courses/>
                            </StudentRoute>
                        </Drawer>
                    </PrivateRoute>
                }
            />
            <Route
                path="/courses-zav-caf"
                element={
                    <PrivateRoute>
                        <Drawer>
                            <EmployeeDeanRoute>
                                <CoursesForHeadOfDepartment/>
                            </EmployeeDeanRoute>
                        </Drawer>
                    </PrivateRoute>
                }
            />
            {/*<Route*/}
            {/*    path="/employee-my-courses"*/}
            {/*    element={*/}
            {/*        <PrivateRoute>*/}
            {/*            <Drawer>*/}
            {/*                <EmployeeDeanRoute>*/}
            {/*                    <MyCourses/>*/}
            {/*                </EmployeeDeanRoute>*/}
            {/*            </Drawer>*/}
            {/*        </PrivateRoute>*/}
            {/*    }*/}
            {/*/>*/}
            <Route
                path="/call-schedule"
                element={
                    <PrivateRoute>
                        <Drawer>
                            <EmployeeDeanRoute>
                                <CallSchedule/>
                            </EmployeeDeanRoute>
                        </Drawer>
                    </PrivateRoute>
                }
            />
            <Route
                path="/call-schedule/show-call-schedule/:scheduleId"
                element={
                    <PrivateRoute>
                        <Drawer>
                            <EmployeeDeanRoute>
                                <ShowCallSchedule/>
                            </EmployeeDeanRoute>
                        </Drawer>
                    </PrivateRoute>
                }
            />
            <Route
                path="/call-schedule/create-call-schedule"
                element={
                    <PrivateRoute>
                        <Drawer>
                            <EmployeeDeanRoute>
                                <CreateCallSchedule/>
                            </EmployeeDeanRoute>
                        </Drawer>
                    </PrivateRoute>
                }
            />
            <Route
                path="/call-schedule/edit-call-schedule/:scheduleId"
                element={
                    <PrivateRoute>
                        <Drawer>
                            <EmployeeDeanRoute>
                                <EditCallSchedule/>
                            </EmployeeDeanRoute>
                        </Drawer>
                    </PrivateRoute>
                }
            />
            <Route
                path="/portfolio/:studentId"
                element={
                    <PrivateRoute>
                        <Drawer>
                            <StudentRoute>
                                <Portfolio/>
                            </StudentRoute>
                            <EmployeeDeanRoute>
                                <Portfolio/>
                            </EmployeeDeanRoute>
                            <AdminRoute>
                                <Portfolio/>
                            </AdminRoute>
                        </Drawer>
                    </PrivateRoute>
                }
            />
            <Route
                path="/portfolio-economic-department/:studentId"
                element={
                    <PrivateRoute>
                        <Drawer>

                            <EmployeeDeanRoute>
                                <PortfolioForEconomicDepartment/>
                            </EmployeeDeanRoute>
                            <AdminRoute>
                                <PortfolioForEconomicDepartment/>
                            </AdminRoute>
                        </Drawer>
                    </PrivateRoute>
                }
            />
            <Route
                path="/modern-digital-educational-environment"
                element={
                    <PrivateRoute>
                        <Drawer>
                            <AdminRoute>
                                <ModernDigitalEducationalEnvironment/>
                            </AdminRoute>
                        </Drawer>
                    </PrivateRoute>
                }
            />
            <Route
                path="/name-buildings"
                element={
                    <PrivateRoute>
                        <Drawer>
                            <AdminRoute>
                                <NameBuildings/>
                            </AdminRoute>
                        </Drawer>
                    </PrivateRoute>
                }
            />
            <Route
                path="/modern-digital-educational-environment/list-student"
                element={
                    <PrivateRoute>
                        <Drawer>
                            <AdminRoute>
                                <ListStudent/>
                            </AdminRoute>
                        </Drawer>
                    </PrivateRoute>
                }
            />
            <Route
                path="/toolbar"
                element={
                    <PrivateRoute>
                        <Drawer>
                            <AdminRoute>
                                <Toolbar/>
                            </AdminRoute>
                        </Drawer>
                    </PrivateRoute>
                }
            />




            <Route
                path="/modern-digital-educational-environment/list-contingent-movements/:StudentId"
                element={
                    <PrivateRoute>
                        <Drawer>
                            <AdminRoute>
                                <ListContingentMovements/>
                            </AdminRoute>
                        </Drawer>
                    </PrivateRoute>
                }
            />
            <Route
                path="/modern-digital-educational-environment/list-marks/:StudentId"
                element={
                    <PrivateRoute>
                        <Drawer>
                            <AdminRoute>
                                <ListMarks/>
                            </AdminRoute>
                        </Drawer>
                    </PrivateRoute>
                }
            />
            <Route
                path="/modern-digital-educational-environment/list-disciplines"
                element={
                    <PrivateRoute>
                        <Drawer>
                            <AdminRoute>
                                <ListDisciplines/>
                            </AdminRoute>
                        </Drawer>
                    </PrivateRoute>
                }
            />
            <Route
                path="/modern-digital-educational-environment/list-curricula/:StudentId"
                element={
                    <PrivateRoute>
                        <Drawer>
                            <AdminRoute>
                                <ListCurricula/>
                            </AdminRoute>
                        </Drawer>
                    </PrivateRoute>
                }
            />
            <Route
                path="/modern-digital-educational-environment/list-educational-programs"
                element={
                    <PrivateRoute>
                        <Drawer>
                            <AdminRoute>
                                <ListEducationalPrograms/>
                            </AdminRoute>
                        </Drawer>
                    </PrivateRoute>
                }
            />



            <Route
                path="/create-schedule"
                element={
                    <PrivateRoute>
                        <Drawer>
                            <AdminRoute>
                                <CreateSchedule/>
                            </AdminRoute>
                            <EmployeeDeanRoute>
                                <CreateSchedule/>
                            </EmployeeDeanRoute>
                        </Drawer>
                    </PrivateRoute>
                }
            />
            <Route
                path="/student-profile/:personId"
                element={
                    <PrivateRoute>
                        <Drawer>
                            <EmployeeDeanRoute>
                                <Profile/>
                            </EmployeeDeanRoute>
                            <StudentRoute>
                                <Profile/>
                            </StudentRoute>
                            <AdminRoute>
                                <Profile/>
                            </AdminRoute>
                        </Drawer>
                    </PrivateRoute>
                }
            />
            <Route
                path="/profile-for-employee/:personId"
                element={
                    <PrivateRoute>
                        <Drawer>
                            <EmployeeDeanRoute>
                                <ProfileForEmployeeDean/>
                            </EmployeeDeanRoute>
                            <StudentRoute>
                                <ProfileForEmployeeDean/>
                            </StudentRoute>
                            <AdminRoute>
                                <ProfileForEmployeeDean/>
                            </AdminRoute>
                        </Drawer>
                    </PrivateRoute>
                }
            />

            <>
                {
                    /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i
                        .test(navigator.userAgent) || window.innerWidth<992 ?

                        <Route
                            path="/"
                            element={
                                <PrivateRoute>
                                    <Drawer>
                                        <EmployeeDeanRoute>
                                            <MobileHome/>
                                        </EmployeeDeanRoute>
                                        <StudentRoute>
                                            <MobileHome/>
                                        </StudentRoute>
                                    </Drawer>
                                </PrivateRoute>
                            }
                        />
                        :
                        <Route
                            path="/"
                            element={
                                <PrivateRoute>
                                    <Drawer>
                                        <EmployeeDeanRoute>
                                            <Home/>
                                        </EmployeeDeanRoute>
                                        <StudentRoute>
                                            <Home/>
                                        </StudentRoute>
                                    </Drawer>
                                </PrivateRoute>
                            }
                        />

                }
            </>


            <Route
                path="/decree"
                element={
                    <PrivateRoute>
                        <Drawer>
                            <StudentRoute>
                                <Decree/>
                            </StudentRoute>
                        </Drawer>
                    </PrivateRoute>
                }
            />
            <Route
                path="/documents"
                element={
                    <PrivateRoute>
                        <Drawer>
                            <EmployeeDeanRoute>
                                <DocumentsForEmployee/>
                            </EmployeeDeanRoute>
                            <StudentRoute>
                                <Documents/>
                            </StudentRoute>
                        </Drawer>
                    </PrivateRoute>
                }
            />
            <Route path="/documents/:idDocument" element={
                <PrivateRoute>
                    <Drawer>
                        <StudentRoute>
                            <DocumentById/>
                        </StudentRoute>
                        <EmployeeDeanRoute>
                            <DocumentById/>
                        </EmployeeDeanRoute>
                    </Drawer>
                </PrivateRoute>}
            />
            <Route path="/documents/archive" element={
                <PrivateRoute>
                    <Drawer>
                        <StudentRoute>
                            <Archive/>
                        </StudentRoute>
                        <EmployeeDeanRoute>
                            <ArchiveEmployee/>
                        </EmployeeDeanRoute>
                    </Drawer>
                </PrivateRoute>}
            />
            <Route path="/documents/archive/:idArchive" element={
                <PrivateRoute>
                    <Drawer>
                        <StudentRoute>
                            <ArchiveById/>
                        </StudentRoute>
                        <EmployeeDeanRoute>
                            <ArchiveById/>
                        </EmployeeDeanRoute>
                    </Drawer>
                </PrivateRoute>}
            />
            <Route
                path="/elective-disciplines"
                element={
                    <PrivateRoute>
                        <Drawer>
                            <StudentRoute>
                                <ElectiveDisciplines/>
                            </StudentRoute>
                        </Drawer>
                    </PrivateRoute>
                }
            />
            <Route
                path="/login"
                element={
                    <GuestRoute>
                        <Login/>
                    </GuestRoute>
                }
            />
            <Route
                path="/roles-manager"
                element={
                <Drawer>
                    <GuestRoute>
                        <RolesManager/>
                    </GuestRoute>
                </Drawer>
                }
            />
            <Route
                path="/academic-performance"
                element={
                    <PrivateRoute>
                        <Drawer>
                            <StudentRoute>

                                <AcademicPerformance/>

                            </StudentRoute>
                        </Drawer>
                    </PrivateRoute>
                }
            />
            <Route
                path="/olympiads"
                element={
                    <PrivateRoute>
                        <Drawer>
                            <EmployeeDeanRoute>
                                <Olympiads/>
                            </EmployeeDeanRoute>
                            <StudentRoute>
                                <Olympiads/>
                            </StudentRoute>
                        </Drawer>
                    </PrivateRoute>
                }
            />
            <Route
                path="/olympiad-details/:idOlympiad"
                element={
                    <PrivateRoute>
                        <Drawer>
                            <EmployeeDeanRoute>
                                <OlympiadDetails/>
                            </EmployeeDeanRoute>
                            <StudentRoute>
                                <OlympiadDetails/>
                            </StudentRoute>
                        </Drawer>
                    </PrivateRoute>
                }
            />
            <Route
                path="/create-olympiad"
                element={
                    <PrivateRoute>
                        <Drawer>
                            <EmployeeDeanRoute>

                                <CreateOlympiad/>

                            </EmployeeDeanRoute>
                        </Drawer>
                    </PrivateRoute>
                }
            />
            <Route path="/wiki" element={
                <PrivateRoute>
                    <Drawer>
                        <AdminRoute>
                            <Wiki/>
                        </AdminRoute>
                        <EmployeeDeanRoute>
                            <Wiki/>
                        </EmployeeDeanRoute>
                    </Drawer>
                </PrivateRoute>}
            />
            <Route path="/wiki/:idPost" element={
                <PrivateRoute>
                    <Drawer>
                        <AdminRoute>
                            <PostById/>
                        </AdminRoute>
                        <EmployeeDeanRoute>
                            <PostById/>
                        </EmployeeDeanRoute>
                    </Drawer>
                </PrivateRoute>}
            />
            <Route path="/wiki/edit-post/:idPost" element={
                <PrivateRoute>
                    <Drawer>
                        <AdminRoute>
                            <EditPost/>
                        </AdminRoute>
                        <EmployeeDeanRoute>
                            <EditPost/>
                        </EmployeeDeanRoute>
                    </Drawer>
                </PrivateRoute>}
            />
            <Route path="/editing-document-settings" element={
                <PrivateRoute>
                    <Drawer>
                        <AdminRoute>
                            <EditingDocumentSettings/>
                        </AdminRoute>
                    </Drawer>
                </PrivateRoute>}
            />
            <Route
                path="/wiki/create-post"
                element={
                    <PrivateRoute>
                        <Drawer>
                            <AdminRoute>
                                <CreatePost/>
                            </AdminRoute>
                            <EmployeeDeanRoute>
                                <CreatePost/>
                            </EmployeeDeanRoute>
                        </Drawer>
                    </PrivateRoute>
                }
            />
            <Route
                path="social-medias"
                element={
                    <PrivateRoute>
                        <Drawer>
                            <AdminRoute>
                                <SocialMedias/>
                            </AdminRoute>
                        </Drawer>
                    </PrivateRoute>
                }
            />
            <Route
                path="work-with-students"
                element={
                    <PrivateRoute>
                        <Drawer>
                            <EmployeeDeanRoute>
                                <WorkWithStudents/>
                            </EmployeeDeanRoute>
                        </Drawer>
                    </PrivateRoute>
                }
            />
            <Route
                path="work-with-all-students"
                element={
                    <PrivateRoute>
                        <Drawer>
                            <EmployeeDeanRoute>
                                <WorkWithAllStudents/>
                            </EmployeeDeanRoute>
                        </Drawer>
                    </PrivateRoute>
                }
            />
            <Route
                path="sub-roles-settings"
                element={
                    <PrivateRoute>
                        <Drawer>
                            <AdminRoute>
                                <SubRolesSettings/>
                            </AdminRoute>
                        </Drawer>
                    </PrivateRoute>
                }
            />
            <Route
                path="/privilege-management"
                element={
                    <PrivateRoute>
                        <Drawer>
                            <AdminRoute>
                                <SubRolesSwitches/>
                            </AdminRoute>
                        </Drawer>
                    </PrivateRoute>
                }
            />
            <Route
                path="/diplom"
                element={
                    <PrivateRoute>
                        <Drawer>
                            <StudentRoute>
                                <Diplom/>
                            </StudentRoute>
                        </Drawer>
                    </PrivateRoute>
                }
            />
            <Route
                path="/work-programs"
                element={
                    <PrivateRoute>
                        <Drawer>
                            <WorkPrograms/>
                        </Drawer>
                    </PrivateRoute>
                }
            />
            <Route path="/work-programs/:idWorkProgram" element={
                <PrivateRoute>
                    <WorkProgramsById/>
                </PrivateRoute>
            }
            />
            <Route path="/not-found-404" element={<NotFound/>}/>
            <Route path="*" element={<Navigate to="/not-found-404"/>}/>

        </Routes>

    )
    // return auth.isLoaded ? (


    // )
    //     : (
    //     <Container maxWidth="md" className={classes.root}>
    //         <Grid container spacing={3} alignItems="center" justifyContent="center">
    //             <Grid item>
    //                 <CircularProgress color="inherit"/>
    //             </Grid>
    //         </Grid>
    //     </Container>
    // );
}

export default AppRoutes;
