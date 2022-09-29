import React from 'react';
import MainDiplom from "../../Modules/MainDiplom/MainDiplom";
import CustomAlert from "../../UI/CustomAlert/CustomAlert";

function Diplom(props) {
    return (
        <MainDiplom>

            <CustomAlert
                severity="info"
                title='Информация!'
                content='Сервис "Диплом" находится в стадии разработки! Здесь Вы сможете посмотреть свой диплом!'
                activeAlert={true}
            />

        </MainDiplom>
    );
}

export default Diplom;