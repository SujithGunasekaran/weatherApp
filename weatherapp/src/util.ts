export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


export const getFullDate = (dateInput: number) => {
    let currentDate = new Date(dateInput * 1000);
    let date = currentDate.getDate();
    let month = currentDate.getMonth();
    let year = currentDate.getFullYear();
    return `${date} ${months[month]} ${year}`;
}
