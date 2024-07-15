import {useNavigate} from '@remix-run/react';
import {useEffect, useState} from 'react';
import {css} from 'styled-system/css';
import {Button} from '~/components/base';
import {useSocket} from '~/context';

export default function Output() {
  const socket = useSocket();
  const navigate = useNavigate();
  const [countA, setCountA] = useState<number>(0);
  const [countB, setCountB] = useState<number>(0);

  useEffect(() => {
    if (!socket) return;
    socket.on('event To A', data => {
      console.log(data);
      setCountA(prev => prev + data.increment);
    });
  }, [socket]);

  useEffect(() => {
    if (!socket) return;
    socket.on('event To B', data => {
      console.log(data);
      setCountB(prev => prev + data.increment);
    });
  }, [socket]);

  return (
    <div className={divStyle}>
      <h1 className={h1Style}>コンテンツ画面</h1>
      <div className={buttonAlignStyle}>
        <p>{`Receipt from A count ${countA}`}</p>
        <p>{`Receipt from B count ${countB}`}</p>
      </div>
      <Button onClick={() => navigate(-1)}>Back To Home</Button>
    </div>
  );
}

const divStyle = css({
  display: 'flex',
  flexDirection: 'column',
  mx: 'auto',
  my: 10,
  px: 10,
  gap: 20,
});
const h1Style = css({
  fontSize: '2rem',
  fontWeight: 'bold',
  textAlign: 'center',
});
const buttonAlignStyle = css({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  gap: 40,
});
