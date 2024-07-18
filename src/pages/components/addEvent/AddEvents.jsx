import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';


const AddEvents = ({ onAddEvent }) => {
    const [newEvent, setNewEvent] = useState({
        title: '',
        start: '',
        end: '',
        description: '',
        color: '',
        type: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewEvent({ ...newEvent, [name]: value });
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (newEvent.title && newEvent.start && newEvent.end) {
            const startDate = new Date(newEvent.start);
            const endDate = new Date(newEvent.end);

            if (startDate >= endDate) {
                alert('he start date must be before the end date');
                return;
            }
            onAddEvent(newEvent);
            setNewEvent({
                title: '',
                start: '',
                end: '',
                description: '',
                color: '',
                type: '',
            })
        }
    }

    return (
        <div className='add p-3 rounded border border-black' >
            <h3>
                Add a Event
            </h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='formBasicTitle' >
                    <Form.Label>
                        Event Title
                    </Form.Label>
                    <Form.Control type="text" placeholder='Enter title here' name='title'
                        value={newEvent.title} onChange={handleChange} />
                </Form.Group>
                <Row>
                    <Col xs={6}>
                        <Form.Group controlId='formBasicStart'>
                            <Form.Label>Start Date/Time</Form.Label>
                            <Form.Control type='datetime-local' name='start date'
                                value={newEvent.start} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col xs={6}>
                        <Form.Group controlId='formBasicEnd'>
                            <Form.Label>End Date/Time</Form.Label>
                            <Form.Control type='datetime-local' name='end date'
                                value={newEvent.end} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <div>
                    <div>
                        <Form.Group controlId='formBasicDesc' >
                            <Form.Label>
                                Description
                            </Form.Label>
                            <Form.Control type='text' placeholder='Description'
                                name='description' value={newEvent.description}
                                onChange={handleChange} />
                        </Form.Group>
                    </div>
                    <Row>
                        <Col xs={12}>
                            <Form.Group controlId='formBasicColor'>
                                <Form.Label>Color</Form.Label>
                                <Form.Control type='color' name='color' value={newEvent.color}
                                    onChange={handleChange} style={{ width: '100%', height: '22px' }} />
                            </Form.Group>
                        </Col>
                        <Col xs={9}>
                            <Form.Group controlId='formBasicType'>
                                <Form.Label>Type</Form.Label>
                                <Form.Control type='text' placeholder='Event type' name='type' value={newEvent.type} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>
                </div>

                <Button
                    variant='success'
                    type='submit'
                    style={{ marginTop: '10px', marginRight: '10px' }}
                    disabled={!newEvent.title || !newEvent.start || !newEvent.end}>
                    Save
                </Button>
            </Form>
        </div>
    )
}

export default AddEvents;