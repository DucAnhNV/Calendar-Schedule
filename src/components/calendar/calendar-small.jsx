import React, { useState, useEffect } from "react";
import ReactCalendar from "react-calendar";
import { Box, IconButton, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { getEventsFromLocalStorage, saveEventsToLocalStorage } from "../../utils/localStorageUtils";
import styled from "styled-components";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const colors = ["#FFD700", "#FFA07A", "#98FB98", "#87CEFA", "#DDA0DD", "#FF69B4"];

const getColorForDate = (dateString) => {
  const date = new Date(dateString);
  const dayIndex = date.getDate() % colors.length; // Lấy màu dựa vào ngày trong tháng
  return colors[dayIndex];
};

// Styled component cho lịch
const StyledCalendar = styled(ReactCalendar)`
  .highlight-day {
    background-color: #FFE4C8 !important;
    font-weight: bold;
    border: 1px solid #eee;
  }
  .react-calendar__tile {
    transition: background-color 0.3s ease;
  }
`;


const NoteItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 8px;
  margin-bottom: 5px;
  border-radius: 5px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const NoteText = styled.span`
  flex: 1;
  font-size: 14px;
  font-weight: 500;
`;

const DeleteButton = styled(IconButton)`
  color: red !important;
`;

const normalizeDate = (date) => {
  const normalizedDate = new Date(date);
  normalizedDate.setHours(0, 0, 0, 0);
  return normalizedDate.toISOString().split("T")[0];
};

const CalendarSmall = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [notes, setNotes] = useState([]);
  const [showAllNotes, setShowAllNotes] = useState(false);
  const navigate = useNavigate(); // Điều hướng trang

  useEffect(() => {
    setEvents(getEventsFromLocalStorage());
  }, []);

  const tileClassName = ({ date }) => {
    const hasEvent = events.some((event) => normalizeDate(new Date(event.start)) === normalizeDate(date));
    return hasEvent ? "highlight-day" : null;
  };

  const handleDateClick = (date) => {
    setShowAllNotes(false);
    setSelectedDate(date);
    const selectedNotes = events.filter((event) => normalizeDate(new Date(event.start)) === normalizeDate(date));
    setNotes(selectedNotes);
  };

  const handleDeleteNote = (deletedNote) => {
    const updatedEvents = events.filter(
      (event) =>
        !(
          normalizeDate(new Date(event.start)) === normalizeDate(selectedDate) &&
          event.title === deletedNote.title &&
          event.start === deletedNote.start &&
          event.end === deletedNote.end
        )
    );

    setEvents(updatedEvents);
    saveEventsToLocalStorage(updatedEvents);
    setNotes(updatedEvents.filter((event) => normalizeDate(new Date(event.start)) === normalizeDate(selectedDate)));
    window.location.reload();
  };

  const handleViewDetail = (noteIndex) => {
    navigate(`/event/${noteIndex}`);
  };

  return (
    <Box sx={{ border: '1px solid #eee', padding: '20px', borderRadius: '20px', height: '100vh', background: '#fff' }}>
      <StyledCalendar onClickDay={handleDateClick} tileClassName={tileClassName} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Ghi chú</h3>
        <Button variant="text" color="primary" onClick={() => setShowAllNotes(true)}>
          Xem tất cả
        </Button>
      </div>

      {showAllNotes
        ? events.map((note, index) => (
          <NoteItem key={index} style={{ backgroundColor: getColorForDate(note.start), height: "70px" }} onClick={() => handleViewDetail(index)}>
            <NoteText>
              <div style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "5px" }}>{note.title}</div>
              <div style={{ color: "grey" }}>
                {new Date(note.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -{" "}
                {new Date(note.end).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
            </NoteText>

            <DeleteButton size="small" onClick={(e) => { e.stopPropagation(); handleDeleteNote(note); }}>
              <DeleteIcon fontSize="small" />
            </DeleteButton>
          </NoteItem>
        ))
        : notes.length > 0
          ? notes.map((note, index) => (
            <NoteItem key={index} style={{ backgroundColor: getColorForDate(note.start), height: "70px" }} onClick={() => handleViewDetail(index)}>
              <NoteText>
                <div style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "5px" }}>{note.title}</div>
                <div style={{ color: "grey" }}>
                  {new Date(note.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -{" "}
                  {new Date(note.end).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </NoteText>

              <DeleteButton size="small" onClick={(e) => { e.stopPropagation(); handleDeleteNote(note); }}>
                <DeleteIcon fontSize="small" />
              </DeleteButton>
            </NoteItem>
          ))
          : <p>Không có ghi chú cho ngày này</p>}
    </Box>
  );
};

export default CalendarSmall;
