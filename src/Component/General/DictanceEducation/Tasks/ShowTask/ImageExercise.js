import React from 'react';
import useStylesMain from "../../../../../Styles/MainStyles";
import Box from "@mui/material/Box";
import CloseIcon from '@mui/icons-material/Close';
import CustomIconButton from "../../../../UI/CustomIconButton/CustomIconButton";
import pdfSvg from "../../../../../Assets/Image/Portfolio/BigPdf.svg"

function ImageExercise({files, item, setFiles}) {
    const classesMain = useStylesMain()

    function deleteFile() {
        setFiles(
            files.filter(el => el.id !== item.id)
        )
    }


    return (
        <Box>
            <div style={{position: "relative"}}>
                <div style={{
                    position: "absolute",
                    right: 0
                }}>
                    <CustomIconButton
                        icon={<CloseIcon/>}
                        caption={'Удалить файл из списка загружаемых'}
                        inputFunction={deleteFile}
                    />
                </div>
                <img src={item.ico === 'pdf' || item.ico === 'doc' || item.ico === 'docx' ? pdfSvg : item.path} width={100} height={100}/>

            </div>
        </Box>
    );
}

export default ImageExercise;