import {useNavigate} from '@remix-run/react';
import {useState} from 'react';
import {css} from 'styled-system/css';
import {VStack} from 'styled-system/jsx';
import {Button} from '~/components/base';
import {Progress} from '~/components/base/progress';
import {useSocket} from '~/context';

export default function Input() {
  const socket = useSocket();
  const navigate = useNavigate();
  const [percent, setPercent] = useState<number>(0);

  const handleExplosion = () => {
    setPercent(prev => prev + 1 * 0.5);
    socket?.emit('event-explosion', 1);
  };

  const handleClear = () => {
    setPercent(0);
    socket?.emit('event-clear');
  };

  return (
    <div className={divStyle}>
      <h1 className={h1Style}>ユーザ操作画面</h1>
      <div className={buttonAlignStyle}>
        <Button onClick={handleExplosion}>打ち上げ</Button>
        <Button onClick={handleClear}>Clear</Button>
      </div>
      <VStack className={css({alignItems: 'center', gap: 5})}>
        <VStack justifyContent="center" gap={5}>
          <p className={css({fontWeight: 600, fontSize: 'xl'})}>
            祭り盛り上がりゲージ
          </p>
          <Progress value={percent} className={css({width: '500px'})} />
        </VStack>
      </VStack>
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
