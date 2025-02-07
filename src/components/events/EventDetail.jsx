import React from "react";
import { useParams } from "react-router-dom";
import { getEventsFromLocalStorage } from "../../utils/localStorageUtils";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const EventDetail = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const navigate = useNavigate();

    // Lấy danh sách sự kiện từ LocalStorage
    const events = getEventsFromLocalStorage();
    const event = events.find((e, index) => index.toString() === id); // Tìm sự kiện theo index

    if (!event) {
        return <Typography variant="h6">Sự kiện không tồn tại</Typography>;
    }

    return (
        <div style={{
            height: '100vh',
            width: '100%',
            backgroundImage: 'url(https://www.shutterstock.com/image-photo/timetable-calendar-page-sticky-notes-600nw-2495390637.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',

        }}>
            <Box
                sx={{
                    padding: 3,
                    border: '1px solid #ddd',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    backgroundColor: 'white',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    maxWidth: '400px',
                    textAlign: 'center',
                    paddingY: 4,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)', 
                }}
            >
                <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
                    {event.title}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    📅 Ngày: {new Date(event.start).toLocaleDateString()} <br />
                    ⏰ Bắt đầu: {new Date(event.start).toLocaleTimeString()} <br />
                    ⏳ Kết thúc: {new Date(event.end).toLocaleTimeString()}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        mt: 3,
                        px: 4,
                        py: 1,
                        borderRadius: '8px',
                        fontSize: '16px',
                        textTransform: 'none',
                    }}
                    onClick={() => navigate('/')}
                >
                    Quay lại
                </Button>
            </Box>
        </div>

    );
};

export default EventDetail;
