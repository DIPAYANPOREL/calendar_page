import React,{useState} from 'react';
import {Modal, Button, Form, Collapse} from 'react-bootstrap';

const EventModel = ({event, onClose, onDelete, onUpdate}) =>{
    const [editedEvent, setEditedEvent] = useState({...event});
    const [collapsed, setCollapsed] = useState(true);

    const handleInputChange = (e)=>{
        const {name,value} = e.target;
        setEditedEvent({...editedEvent, [name]:value});
    }

    const handleColorChange = (e)=>{
        setEditedEvent({...editedEvent, color:e.target.value});
    }

    const handleStartDateChange = (e)=>{
        const startDate = new Date(e.target.value);
        if(startDate <= editedEvent.end){
            setEditedEvent({...editedEvent, start:startDate});
        }
    }

    const handleEndDateChange = (e)=>{
        const endDate = new Date(e.target.value);
        if(endDate >= editedEvent.start){
            setEditedEvent({...editedEvent, end:endDate});
        }
    }
    const handleDelete = () =>{
        onDelete(event.id);
    }
    const handleUpdate = () =>{
        onUpdate(editedEvent);
        onClose();
    }

    const adjustDate = (date) =>{
        const adjustedDate = new Date(date);
        adjustedDate.setHours(adjustedDate.getHours() - 3);
        return adjustedDate.toISOString().slice(0,-8);
    };


    return(
        <Modal show={true} onHide={onClose}>
            <Modal.Header>
                <Modal.Title>{editedEvent.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" name='title' value={editedEvent.title} onChange={handleInputChange}/>
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} name='description' value={editedEvent.description} onChange={handleInputChange}/>
                    </Form.Group>

                    <Collapse in={!collapsed}>
                        <div>
                        <Form.Group controlId="formStart">
                            <Form.Label>Start</Form.Label>
                            <Form.Control type="datetime-local" name='start' value={adjustDate(editedEvent.start)} onChange={handleStartDateChange}/>
                        </Form.Group>
                        
                        <Form.Group controlId="formEnd">
                            <Form.Label>End</Form.Label>
                            <Form.Control type="datetime-local" name='end' value={adjustDate(editedEvent.end)} onChange={handleEndDateChange}/>
                        </Form.Group>
                        
                        <Form.Group controlId="formColor">
                            <Form.Label>color</Form.Label>
                            <Form.Control type="color" name='color' value={editedEvent.color} onChange={handleColorChange}/>
                        </Form.Group>

                        <Form.Group controlId="formType">
                            <Form.Label>Type</Form.Label>
                            <Form.Control type="text" name='type' value={editedEvent.type} onChange={handleInputChange}/>
                        </Form.Group>
                        </div>
                    </Collapse>
                </Form>
            </Modal.Body>
            <Modal.Footer className='justify-content-between'>
                <Button variant='secondary' onClick={()=> setCollapsed(!collapsed)}>
                    {!collapsed ? 'More details' : 'More Details'}
                </Button>
                <Button variant='danger' onClick={handleDelete}>
                    Delete
                </Button>
                <Button variant='primary' onClick={handleUpdate}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EventModel;