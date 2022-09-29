import {makeStyles} from "@material-ui/core";
import TimesNewRoman from './../Assets/Fonts/TimesNewRoman/TimesNewRoman.ttf'

const useStylesStudyCard = makeStyles(() => ({
            MainFont: {
                fontFamily: 'Times New Roman',
                fontSize: 14,
                textAlign: 'center',
                marginBottom: '0 !important'
            }
        }
    )
);

export default useStylesStudyCard;
