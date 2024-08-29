export const formatDurationDisplay = (duration: number) => {
  const min = Math.floor(duration / 60);
  const sec = Math.floor(duration - min * 60);

  const formatted = [min, sec].map((n) => (n < 10 ? "0" + n : n)).join(":"); // format - mm:ss

  return formatted;
};

export const extractDateTime = (dateTimeString: string) => {
  // Parse the date and time string
  const [date, time] = dateTimeString.split("T");

  // Return the extracted date and time
  return {
    date, // '2024-08-06'
    time, // '21:06'
  };
};
