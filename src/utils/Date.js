const styleDate = (dateString, style='long') => {
    if (!dateString || dateString === "") return null;

    return new window.Date(dateString)
    .toLocaleDateString("fr", {dateStyle: style});
}

const getMonthList = () => {
    return Array(12).fill(0).map((item, index) => {
        const date = new window.Date();

        date.setMonth(index);

        const monthString =  date.toLocaleDateString(
            'fr', {dateStyle: 'long'}).split(' ')[1];

        return `${monthString[0].toUpperCase()}${monthString.substring(1,)}`
    })
}

const getYearList = (length=50, startYear=new window.Date().getFullYear(), direction=-1) => {
    let yearList = [];
    let currentYear = startYear;

    for (let i = 0; i < length; i++) {
        yearList.unshift(currentYear);
        currentYear = currentYear + direction
    }

    return yearList;
}

export const Date = {
    styleDate,
    getMonthList,
    getYearList
}

