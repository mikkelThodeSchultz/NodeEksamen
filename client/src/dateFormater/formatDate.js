export function formatDate(date){
    const dateFromString = new Date(date);
    const dateToHoursAndMinutes = dateFromString.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit", hour12: false})
    return dateToHoursAndMinutes;
}