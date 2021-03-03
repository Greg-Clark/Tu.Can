import React, { useState, useEffect, useRef } from 'react';
import Chat from './Chat';
import Sidebar from './Sidebar';
import '../styles/App.css';
import Pusher from 'pusher-js';
import axios from './axios';
import { useAuth } from '../services/Auth';
import { useHistory } from 'react-router-dom';

import Dropzone from 'react-dropzone';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { API_URL } from '../utils/constants';

// import { render } from '@testing-library/react';


const App = (props) => {
    const [messages, setMessages] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState("");
    const history = useHistory();
    const { signOut, currentUser } = useAuth();

    /////////////////////////////////////////////////////////////////////////////////////////////
    const [file, setFile] = useState(null); // state for storing actual image
    const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage
    const [state, setState] = useState({
        title: '',
        description: ''
    });
    const [errorMsg, setErrorMsg] = useState('');
    const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
    const dropRef = useRef(); // React ref for managing the hover state of droppable area
    /////////////////////////////////////////////////////////////////////////////////////////////

    // axios is just another way to handle get, post and so on
    useEffect(() => {
        axios.get('/messages/sync')
            .then(response => {
                console.log(response.data);
                setMessages(response.data);
            })
    }, []);

    // ==================makes messages in mongo real time======================
    useEffect(() => {
        const pusher = new Pusher('8cdc3d1a07077d29caf4', {
            cluster: 'us3'
        });

        const channel = pusher.subscribe('messages');
        channel.bind('inserted', (newMessage) => {
            //append new messages to current message array
            setMessages([...messages, newMessage]);
        });

        // ensures there is only 1 subscriber(listener)
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [messages]); // captures messages since it is a dependency

    // axios is just another way to handle get, post and so on
    useEffect(() => {
        axios.get('/rooms/sync')
            .then(response => {
                console.log(response.data);
                setRooms(response.data);
            })
    }, []);

    // ==================makes rooms in mongo real time======================
    useEffect(() => {
        const pusher = new Pusher('8cdc3d1a07077d29caf4', {
            cluster: 'us3'
        });

        const channel = pusher.subscribe('rooms');
        channel.bind('inserted', (newRoom) => {
            //append new rooms to current message array
            setRooms([...rooms, newRoom]);
        });

        // ensures there is only 1 subscriber(listener)
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [rooms]); // captures rooms since it is a dependency




    async function handleSignOut() {
        setError("");

        try {
            await signOut();
            history.push("/");
        }
        catch {
            setError("Cannot log out");
        }
    }

    // console.log(messages);
    return (
        <div className="app">
            <div className="app_body">
                <Sidebar
                    rooms={rooms}
                />
                <Chat
                    messages={messages}
                />

                {currentUser && <button onClick={handleSignOut}>SignOut</button>}
            </div>
        </div>
    );




    ///////////////////////////////////////////////////////////////////////////////////// 
    const handleInputChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    };

    const onDrop = (files) => {
        const [uploadedFile] = files;
        setFile(uploadedFile);

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewSrc(fileReader.result);
        };
        fileReader.readAsDataURL(uploadedFile);
        setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
        dropRef.current.style.border = '2px dashed #e9ebeb';
    };

    const updateBorder = (dragState) => {
        if (dragState === 'over') {
            dropRef.current.style.border = '2px solid #000';
        } else if (dragState === 'leave') {
            dropRef.current.style.border = '2px dashed #e9ebeb';
        }
    };

    const handleOnSubmit = async (event) => {
        event.preventDefault();

        try {
            const { title, description } = state;
            if (title.trim() !== '' && description.trim() !== '') {
                if (file) {
                    const formData = new FormData();
                    formData.append('file', file);
                    formData.append('title', title);
                    formData.append('description', description);

                    setErrorMsg('');
                    await axios.post(`${API_URL}/upload`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    props.history.push('/list');
                } else {
                    setErrorMsg('Please select a file to add.');
                }
            } else {
                setErrorMsg('Please enter all the field values.');
            }
        } catch (error) {
            error.response && setErrorMsg(error.response.data);
        }
    };

    return (
        <React.Fragment>
            <Form className="search-form" onSubmit={handleOnSubmit}>
                {errorMsg && <p className="errorMsg">{errorMsg}</p>}
                <Row>
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Control
                                type="text"
                                name="title"
                                value={state.title || ''}
                                placeholder="Enter title"
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="description">
                            <Form.Control
                                type="text"
                                name="description"
                                value={state.description || ''}
                                placeholder="Enter description"
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <div className="upload-section">
                    <Dropzone
                        onDrop={onDrop}
                        onDragEnter={() => updateBorder('over')}
                        onDragLeave={() => updateBorder('leave')}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef}>
                                <input {...getInputProps()} />
                                <p>Drag and drop a file OR click here to select a file</p>
                                {file && (
                                    <div>
                                        <strong>Selected file:</strong> {file.name}
                                    </div>
                                )}
                            </div>
                        )}
                    </Dropzone>
                    {previewSrc ? (
                        isPreviewAvailable ? (
                            <div className="image-preview">
                                <img className="preview-image" src={previewSrc} alt="Preview" />
                            </div>
                        ) : (
                                <div className="preview-message">
                                    <p>No preview available for this file</p>
                                </div>
                            )
                    ) : (
                            <div className="preview-message">
                                <p>Image preview will be shown here after selection</p>
                            </div>
                        )}
                </div>
                <Button variant="primary" type="submit">
                    Submit
        </Button>
            </Form>
        </React.Fragment>
    );
};







export default App;

