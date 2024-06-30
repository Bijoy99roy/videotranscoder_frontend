export function CountDays(date: string): string {
    const date1 = new Date(date);  
    const date2 = new Date();  

    const time_difference = date2.getTime() - date1.getTime();  

    return DaysTransformer(time_difference);
}

function DaysTransformer(milliseconds: number): string {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    let time: string;

    if (seconds < 60) {
        time = `${seconds} seconds`;
    } else if (minutes < 60) {
        time = `${minutes} minutes`;
    } else if (hours < 24) {
        time = `${hours} hours`;
    } else if (days < 30) {
        time = `${days} days`;
    } else if (months < 12) {
        time = `${months} months`;
    } else {
        time = `${years} years`;
    }

    return time;
}