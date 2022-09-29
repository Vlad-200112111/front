import {makeStyles} from "@material-ui/core";


const useStylesSchedule = makeStyles(() => ({
            BoxDiscipline: {
                border: '1px solid rgba(0, 0, 0, 0.12)',
                width: '100%',
                background: '#fff',
                padding: 10
            },
            Table: {
                width: '100%'
            },
            TableMainTd: {
                padding: 10,
                background: 'rgba(90, 125, 207, 0.8)',
                color: '#fff',
                textAlign: 'center'
            },
            TableTd: {
                border: '1px solid rgba(0, 0, 0, 0.12)',
                height: '400px'
            },
            CellToInsert: {
                border: '1px solid rgba(0, 0, 0, 0.12)',
                background: '#EEF6FF',
                color: '#485C90',
                height: '250px',
                cursor: "pointer"
            },
            SelectedObjectToInsert: {},
            CellInsertWeek: {
                border: '1px solid rgba(0, 0, 0, 0.12)',
                color: 'rgba(0, 0, 0, 0.6)',
                height: '250px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.5s ease'
            },
            CellInsertWeekFocus: {
                background: 'rgba(90, 125, 207, 0.8)',
                color: '#fff',
                height: '255px',
                transition: 'all 0.3s ease'
            },
            ModalClose: {
                // display: 'none !important',
                position: 'absolute',
                right: 5,
                borderRadius: '50%',
                padding: '3px',
                width: '1.5em',
                height: '1.5em',
                transition: 'all 0.3s ease !important',
                top: 5,
                color: '#485C90 !important',
                cursor: 'pointer',
                zIndex: '1',
                "&:hover": {
                    background: '#dadada8f',
                }
            },
            ModalCloseActive: {
                display: 'block !important'
            },
            BoxCell: {
                position: 'relative'
            }
        }
    )
);

export default useStylesSchedule;
