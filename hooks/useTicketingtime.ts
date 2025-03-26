import { useState, useEffect } from "react";

export const useTicketingTime = (ticketingStartTime?: Date) => {
  const [now, setNow] = useState(() => new Date().getTime());
  const [isNowTicketingStarted, setIsNowTicketingStarted] = useState(false);

  useEffect(() => {
    let animationFrameId: number;

    // If ticketing has already started, no need to keep updating the current time.
    if (
      ticketingStartTime &&
      new Date().getTime() >= ticketingStartTime.valueOf()
    ) {
      setIsNowTicketingStarted(true);
      return; // Skip setting up the animation frame if the ticketing has already started
    }

    // Function to update the time
    const updateTime = () => {
      setNow(new Date().getTime()); // Update the current time
      animationFrameId = requestAnimationFrame(updateTime); // Request the next frame
    };

    // Start the animation frame loop
    animationFrameId = requestAnimationFrame(updateTime);

    // Cleanup the animation frame when the component is unmounted or ticketingStartTime changes
    return () => cancelAnimationFrame(animationFrameId);
  }, [ticketingStartTime]); // This only triggers when ticketingStartTime changes

  return { now, isNowTicketingStarted };
};
