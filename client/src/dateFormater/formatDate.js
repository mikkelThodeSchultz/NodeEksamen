export function formatDate(date){
    const dateFromString = new Date(date);
    const dateToHoursAndMinutes = dateFromString.toLocaleTimeString([], {
        hour: "2-digit", 
        minute: "2-digit", 
        hour12: false})
    const dateToDaysMonthsYears = dateFromString.toLocaleDateString([], {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit"});
    return `${dateToDaysMonthsYears} - ${dateToHoursAndMinutes}`;
}