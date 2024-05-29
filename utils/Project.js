
  export function formatDate(dateString) {
    const date = new Date(dateString);
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year
    let daySuffix;
    if (day === 1 || day === 21 || day === 31) {
      daySuffix = "st";
    } else if (day === 2 || day === 22) {
      daySuffix = "nd";
    } else if (day === 3 || day === 23) {
      daySuffix = "rd";
    } else {
      daySuffix = "th";
    }
    const formattedDate = `${day}${daySuffix} ${months[monthIndex]} ${year}`;
    return formattedDate;
  }

  export const progressCalculator = (total, completed) => {
    let value = 0;
    if(completed === 0) {
      value = 0
    }else {
      value = (total-completed/total)*100
    }
    return value
  }
