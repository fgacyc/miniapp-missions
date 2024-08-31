export const formatDurationDisplay = (duration: number) => {
  const min = Math.floor(duration / 60);
  const sec = Math.floor(duration - min * 60);

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
