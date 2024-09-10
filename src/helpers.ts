export const formatDurationDisplay = (duration: number) => {
  const min = isNaN(Math.floor(duration / 60)) ? 0 : Math.floor(duration / 60);
  const sec = isNaN(Math.floor(duration - min * 60))
    ? 0
    : Math.floor(duration - min * 60);

  const formatted = [min, sec].map((n) => (n < 10 ? "0" + n : n)).join(":"); // format - mm:ss

  return formatted;
};

export const extractDateTime = (dateTimeString: string) => {
  // Parse the date and time string
  const [date, time] = dateTimeString.split("T");

  // Extract year, month, and day from the date
  const [year, month, day] = date.split("-");

  // Define an array of month names
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Convert month number to month name
  const formattedMonth = monthNames[parseInt(month, 10) - 1]; // Convert month to zero-based index

  // Format the date as "dd MMM yyyy"
  const formattedDate = `${day} ${formattedMonth} ${year}`;

  // Convert time to 12-hour format with AM/PM
  // eslint-disable-next-line prefer-const
  let [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert to 12-hour format and handle midnight (0)

  // Format the time as "hh:mm AM/PM"
  const formattedTime = `${hours}:${minutes
    .toString()
    .padStart(2, "0")} ${period}`;

  // Return the formatted date and time
  return {
    date: formattedDate, // '06 Aug 2024'
    time: formattedTime, // '9:06 PM'
  };
};

export const convertToTimestamptzAtGMT8 = (utcTimestamp: string) => {
  // Create a Date object from the UTC timestamp
  const date = new Date(utcTimestamp);

  // Convert to ISO string in UTC format (this will always have a 'Z' at the end)
  const isoString = date.toISOString(); // Example output: "2024-09-10T12:00:00.000Z"

  // Return the timestamptz format with the adjusted timezone offset for GMT+8
  return isoString.replace("Z", "+08:00");
};

// Example usage
// const utcTimestamp = "2024-09-10T12:00:00"; // UTC timestamp
// const timestamptzAtGMT8 = convertToTimestamptzAtGMT8(utcTimestamp);
// console.log(timestamptzAtGMT8); // Output: "2024-09-10T12:00:00.000+08:00"
