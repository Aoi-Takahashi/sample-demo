import Fireworks, {FireworksHandlers} from '@fireworks-js/react';
import {useNavigate} from '@remix-run/react';
import {Agowan_1} from 'image';
import {useEffect, useRef, useState} from 'react';
import {css} from 'styled-system/css';
import {VStack} from 'styled-system/jsx';
import {Button} from '~/components/base';
import {Progress} from '~/components/base/progress';
import {useSocket} from '~/context';

export default function Output() {
  const socket = useSocket();
  const navigate = useNavigate();
  const [percent, setPercent] = useState<number>(0);
  const ref = useRef<FireworksHandlers>(null);

  useEffect(() => {
    const currentRef = ref.current;
    return () => {
      if (currentRef?.isRunning) {
        currentRef.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on('event-explosion', data => {
      console.log(data);
      setPercent(prev => prev + data.increment * 0.5);
      ref.current?.launch(10);
    });
  }, [socket]);

  useEffect(() => {
    if (!socket) return;
    socket.on('event-clear', data => {
      console.log(data);
      setPercent(data.increment);
    });
  }, [socket]);

  return (
    <div className={divStyle}>
      <h1 className={h1Style}>コンテンツ画面</h1>
      <VStack className={css({alignItems: 'center', gap: 5})}>
        <VStack
          className={css({
            justifyContent: 'center',
            gap: 5,
            position: 'absolute',
            width: 'full',
          })}>
          <p className={css({fontWeight: 600, fontSize: 'xl'})}>
            祭り盛り上がりゲージ
          </p>
          <Progress value={percent} className={css({width: '500px'})} />
          <img
            src={Agowan_1}
            alt="image"
            className={css({
              width: `100%`,
              height: `500px`,
              bgColor: 'transparent',
              mx: 'auto',
              transition: 'width 0.3s ease, height 0.3s ease',
            })}
          />
          <Button w="full" onClick={() => navigate(-1)}>
            Back To Home
          </Button>
        </VStack>
        <Fireworks
          ref={ref}
          zoptions={{opacity: 0.5, rocketsPoint: {min: 10, max: 50}}}
          autostart={false}
          style={{
            top: 60,
            width: '100%',
            height: '500px',
            position: 'relative',
            background: 'transparent',
          }}
        />
      </VStack>
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
