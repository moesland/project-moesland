export function getUsableDatesAndTimes(dateTimeString) {
    // Create a new Date object from the ISO 8601 string
    const date = new Date(dateTimeString);

    // Get the date component as a string in "YYYY-MM-DD" format
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = date.getUTCDate().toString().padStart(2, "0");
    const dateStr = `${year}-${month}-${day}`;

    // Get the time component as a string in "HH:MM" format
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const timeStr = `${hours}:${minutes}`;

    // Return an object with the date and time strings
    return {
        date: dateStr,
        time: timeStr
    };
}
