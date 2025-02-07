export const saveEventsToLocalStorage = (events) => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
};

export const getEventsFromLocalStorage = () => {
    const storedEvents = localStorage.getItem("calendarEvents");
    return storedEvents ? JSON.parse(storedEvents) : [];
};

