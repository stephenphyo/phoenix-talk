import { useContext, useEffect, useRef, useState } from 'react';

/* API Imports */
import Axios from 'apis/Axios';

/* Context Imports */
import ChatContext from 'contexts/ChatContext';
import DataContext from 'contexts/DataContext';

/*** Component Imports ***/
/* UI Components */
import Modal from 'components/ui/SPModal/SPModal';
import Button from 'components/ui/SPButton/SPButton';
/* Form Components */
import InputText from 'components/form/SPInputText/SPInputText';

/* Hook Imports */
import useAuth from 'hooks/useAuth';

function ChatCreateRoom() {

    /* useContext */
    const { createRoom, setCreateRoom } = useContext(ChatContext);
    const { rooms, setRooms } = useContext(DataContext);

    /* useState */
    const [room, setRoom] = useState('');

    /* useRef */
    const inputRef = useRef();

    /* Custom Hooks */
    const { auth } = useAuth();

    /* Functions */
    const create = () => {
        Axios.post(
            '/rooms/new',
            { name: room, creator: auth._id },
            { headers: { 'Content-Type': 'application/json ' } }
        )
            .then(res => {
                if (res.status === 201) {
                    Axios.get(`/users/${auth._id}/rooms`)
                        .then(res => {
                            setRooms(res.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
                        })
                        .catch(err => {
                            console.log(err.message)
                        })
                }
            })
            .catch(err => {
                console.log(err.response.data.message);
            })

        setRoom('');
    };

    /* useEffect */
    useEffect(() => {
        const listen = () => { createRoom && inputRef.current?.focus() }
        const timer = setTimeout(listen, 500);

        return () => { clearTimeout(timer) }
    }, [createRoom]);

    return (
        <Modal modal={createRoom} setModal={setCreateRoom}>
            <Modal.Header>
                Create Room
            </Modal.Header>
            <Modal.Body variant='fixed' height='100px'>
                <InputText
                    ref={inputRef}
                    placeholder='Enter Room Name'
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    onKeyPress={(e) => { e.key === 'Enter' && create() }} />
            </Modal.Body>
            <Modal.Footer>
                <Button
                    style={{ backgroundColor: 'var(--secondary-color)' }}
                    onClick={() => create()}>
                    Create Room
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ChatCreateRoom;