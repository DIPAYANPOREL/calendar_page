import React, { useState } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css"
import "./components/Components-Cal-css.css";


import defaultEvents from './components/defaultEvents';
import AddEvents from './components/addEvent/AddEvents';
// import EventModel from './components/eventmodel/eventmodel';
import Filter from "./components/filter/Filter"
import CustomToolbar from './components/customCalendar/CustomToolbar';

const DragAndDropCalendar = withDragAndDrop(Calendar)
const localizer = momentLocalizer(moment)


const Cal = () => {


    const [events, setEvents] = useState(defaultEvents)
    const [eventSelected, setEventSelected] = useState(null);
    const [eventsFiltered, setEventsFiltered] = useState(defaultEvents);


    // This is to pass the selected color to the particular activity
    const eventStyle = (event) => ({
        style: {
            backgroundColor: event.color,
        }
    });





    // Arrow function to drag and edit the event list and its time, position and its duration
    const onEventMove = (data) => {
        const { start, end } = data;
        const upDatedEvents = events.map((event) => {
            if (event.id == data.event.id) {
                return {
                    ...event,
                    start: new Date(start),
                    end: new Date(end),
                };
            }
            return event;
        });
        setEvents(upDatedEvents);
    }

    const handleEventClick = (event) => {
        setEventSelected(event);

    }

    const handleEventClose = () => {
        setEventSelected(null);
    }

    const addHandler = (newEvent) => {
        setEvents([...events, { ...newEvent, id: events.length + 1 }]);
    };


    const handleEventDelete = (eventId) => {
        const updatedEvents = events.filter((event) => event.id !== eventId)
        setEvents(updatedEvents);
        setEventSelected(null);
    };

    const handleEventUpdate = (updatedEvent) => {
        const updatedEvents = events.map((event) => {
            if (event.id === updatedEvent.id) {
                return updatedEvent;
            }
            return event;
        });
        setEvents(updatedEvents);
        setEventSelected(null);
    }

    const handleSelectedAtivities = (selectedActivity) => {
        setEventsFiltered(selectedActivity);
    }



    return (
        <div className='screen'>
            <div className="toolbar">
                <p>Tools</p>
                <AddEvents onAddEvent={addHandler} />
                <Filter activities={events} onSelectedAtivities={handleSelectedAtivities} />
            </div>
            <div className='calendar'>
                <DragAndDropCalendar
                    defaultDate={moment().toDate()}
                    defaultView='month'
                    events={eventsFiltered}
                    localizer={localizer}
                    resizable
                    onEventDrop={onEventMove}
                    onEventResize={onEventMove}
                    onSelectEvent={handleEventClick}
                    eventPropGetter={eventStyle}
                    components={{
                        toolbar: CustomToolbar,
                    }}
                />
            </div>
            {eventSelected && (
                <EventModel event={eventSelected} onClose={handleEventClose} onDelete={handleEventDelete}
                    onUpdate={handleEventUpdate} />
            )}
        </div>
    )
}


// const CustomToolbar = ({ label, onView, onNaviagte, views }) => {
//     const handleNaviagte = (action) => {
//         onNaviagte(action);
//     };
//     const [itemText, setItemText] = useState('month');
//     return (
//         <>
//             <div className="toolbar-container">
//                 <h1 className='year-month'>{label}</h1>
//                 <div className="dropdown">
//                     <button className='btn btn-secondary dropdown-toggle' type='button' id='dropdownMenuButton'
//                         data-bs-toggle='dropdown' aris-label='false'>
//                         {itemText}
//                     </button>
//                     <ul className='dropdown-menu' aris-labelledby='dropdownMenuButton'>
//                         {
//                             views.map((view, index) => (
//                                 <div key={index}>
//                                     <li>
//                                         <button className='dropdown-item' onClick={() => onView(view) + setItemText(view)}>
//                                             {view}
//                                         </button>
//                                     </li>
//                                 </div>
//                             ))}
//                     </ul>
//                 </div>
//             </div>
//         </>
//     )
// }




export default Cal