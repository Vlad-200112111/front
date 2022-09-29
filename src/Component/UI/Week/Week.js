const Week = () => {

    const d0 = new Date().getTime(),
        d = new Date(new Date().getFullYear(), 0, 1),
        d1 = d.getTime(),
        dd = d.getDay(),
        re = Math.floor((d0 - d1) / 8.64e7) + (dd ? dd - 1 : 6);

    return (Math.floor(re / 7) % 2) ? 'Верхняя неделя' : 'Нижняя неделя'
}

export default Week;