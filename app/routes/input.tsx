import {useNavigate} from '@remix-run/react';
import {useState} from 'react';
import {css} from 'styled-system/css';
import {Button} from '~/components/base';
import {useSocket} from '~/context';

export default function Input() {
  const socket = useSocket();
  const navigate = useNavigate();
  const [countA, setCountA] = useState<number>(0);
  const [countB, setCountB] = useState<number>(0);

  return (
    <div className={divStyle}>
      <h1 className={h1Style}>ユーザ操作画面</h1>
      <div className={buttonAlignStyle}>
        <Button
          onClick={() => {
            setCountA(prev => prev + 1);
            socket?.emit('event from A', 'Send from A');
            console.log(`Push To A count ${countA + 1}
          `);
          }}>
          {`Input A ${countA}回`}
        </Button>
        <Button
          onClick={() => {
            setCountB(prev => prev + 1);
            socket?.emit('event from B', 'Send from B');
            console.log(`Push To B count ${countB + 1}`);
          }}>
          {`Input B ${countB}回`}
        </Button>
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
