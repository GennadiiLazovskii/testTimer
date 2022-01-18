import { useState, useEffect } from 'react';
import { Subject, interval, takeUntil } from 'rxjs';
import { Container, Button } from 'react-bootstrap';


const MainTimerRx = () => {

    const [time, setTime] = useState(0);
    const [status, setStatus] = useState(false);

    useEffect(() => {
        const timesubscribe$ = new Subject();
        interval(1000)
            .pipe(takeUntil(timesubscribe$))
            .subscribe(() => {
                if (status) {
                    setTime(val => val + 1000);
                }
            });

        return () => {
            timesubscribe$.next();
            timesubscribe$.complete();
        };
    }, [status]);


    return (
        <Container>
            <span>{new Date(time).toISOString().slice(11, 19)}</span>
            <br />
            <Button onClick={() => setStatus(true)} variant="outline-secondary">START-RX</Button>{' '}
            <Button onClick={() => setStatus(false)} variant="outline-secondary">STOP-RX</Button>{' '}
            <Button onDoubleClick={() => setStatus(false)} variant="outline-secondary">WAIT-RX</Button>{' '}
            <Button onClick={() => setTime(0)} variant="outline-secondary">RESET-RX</Button>{' '}
        </Container>
    );
}

export default MainTimerRx;