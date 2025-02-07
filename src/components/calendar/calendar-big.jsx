import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { saveEventsToLocalStorage, getEventsFromLocalStorage } from "../../utils/localStorageUtils"; // Import hàm lưu trữ

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "8px",
    boxShadow: 24,
    p: 4,
};

const localizer = momentLocalizer(moment);


const CalendarBig = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const storedEvents = getEventsFromLocalStorage();
        setEvents(storedEvents);
        console.log(">>> check data:",)
    }, []);

    const [showForm, setShowForm] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [title, setTitle] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const handleSelectSlot = (slotInfo) => {
        setSelectedDate(slotInfo.start);
        setShowForm(true);
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (!title) return;

    //     const newEvent = {
    //         title,
    //         start: selectedDate,
    //         end: moment(selectedDate).add(1, "hours").toDate(),
    //     };

    //     const updatedEvents = [...events, newEvent];
    //     setEvents(updatedEvents);
    //     saveEventsToLocalStorage(updatedEvents); // Lưu vào localStorage

    //     setShowForm(false);
    //     setTitle("");
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !startTime || !endTime) return;

        // Chuyển selectedDate sang moment để dễ xử lý
        const dateMoment = moment(selectedDate);

        // Ghép ngày và giờ thành thời gian cụ thể
        const startDateTime = dateMoment.clone().set({
            hour: moment(startTime, "HH:mm").hour(),
            minute: moment(startTime, "HH:mm").minute(),
        }).toDate();

        const endDateTime = dateMoment.clone().set({
            hour: moment(endTime, "HH:mm").hour(),
            minute: moment(endTime, "HH:mm").minute(),
        }).toDate();

        // Tạo sự kiện mới với thời gian chính xác
        const newEvent = {
            title,
            start: startDateTime,
            end: endDateTime,
        };

        // Cập nhật danh sách sự kiện
        const updatedEvents = [...events, newEvent];
        setEvents(updatedEvents);
        saveEventsToLocalStorage(updatedEvents); // Lưu vào localStorage

        // Đóng modal và reset form
        setShowForm(false);
        setTitle("");
        setStartTime("");
        setEndTime("");
        window.location.reload();
    };


    return (
        <div style={{ border: '1px solid #eee', padding: '20px', borderRadius: '20px', height: 'auto', background: '#fff' }}>
            <Calendar
                localizer={localizer}
                events={[...events]}
                selectable
                onSelectSlot={handleSelectSlot}
                startAccessor="start"
                endAccessor="end"
                views={['month']}
                style={{ height: 900 }}
            />

            <Modal
                open={showForm}
                onClose={() => setShowForm(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
                        Thêm sự kiện mới
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Ngày"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={selectedDate ? moment(selectedDate).format("YYYY-MM-DD HH:mm") : ""}
                            InputProps={{ readOnly: true }}
                        />
                        <TextField
                            label="Thời gian bắt đầu"
                            type="time"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            required
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            label="Thời gian kết thúc"
                            type="time"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            required
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            label="Tiêu đề"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <Box display="flex" justifyContent="space-between" mt={2}>
                            <Button variant="contained" color="success" type="submit">
                                Lưu
                            </Button>
                            <Button variant="contained" color="error" onClick={() => setShowForm(false)}>
                                Hủy
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default CalendarBig;
