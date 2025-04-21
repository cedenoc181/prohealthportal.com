// mm/dd/yy
export const formatDate = (rawDate) => {
    if (!rawDate) return "";
    const [year, month, day] = rawDate.split("-");
    return `${month}/${day}/${year.slice(2)}`;
  };
  
// Apr 26, 3:30 PM
  export const formatDateTime = (rawDateTime) => {
    if (!rawDateTime) return "";
    const date = new Date(rawDateTime);
    const options = {
    timeZone: 'America/New_York',
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleString(undefined, options); 
  };
  