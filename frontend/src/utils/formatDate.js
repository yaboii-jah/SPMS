export function formatDate (date) {
    console.log(date)
    const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sept","Oct","Nov","Dc"
    ];

    const currentDate = new Date(`${date}`);

    const formatted = `${months[currentDate.getMonth()]} ${String(currentDate.getDate()).padStart(2, "0")}, ${currentDate.getFullYear()}`;

    return formatted
}