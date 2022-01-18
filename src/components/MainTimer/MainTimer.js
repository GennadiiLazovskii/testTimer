import { useState, useEffect } from 'react';

import { Container, Button } from 'react-bootstrap';


const MainTimer = () => {

    const [time, setTime] = useState(0);
    const [status, setStatus] = useState(false);

    useEffect(() => {
        let interval = null;

        if (status) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 100);
            }, 100);
        } else if (!status) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [status]);


    return (
        <Container>
            <span>{new Date(time).toISOString().slice(11, 19)}</span>
            <br />
            <Button onClick={() => setStatus(true)} variant="outline-secondary">START</Button>{' '}
            <Button onClick={() => setStatus(false)} variant="outline-secondary">STOP</Button>{' '}
            <Button onClick={() => setStatus(false)} variant="outline-secondary">WAIT</Button>{' '}
            <Button onClick={() => setTime(0)} variant="outline-secondary">RESET</Button>{' '}
        </Container>
        
    );
}

export default MainTimer;