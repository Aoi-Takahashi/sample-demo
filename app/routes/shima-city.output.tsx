import Fireworks, {FireworksHandlers} from '@fireworks-js/react';
import {useNavigate} from '@remix-run/react';
import {Garbage, Umilabo_1} from 'image';
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

  const garbageImages = [
    {bottom: 60, left: 20, opacityThreshold: 10},
    {bottom: 60, left: 0, opacityThreshold: 20},
    {bottom: 60, left: 10, opacityThreshold: 30},
  ];

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
      <VStack
        className={css({
          justifyContent: 'center',
          gap: 5,
          width: 'full',
        })}>
        <Progress value={percent} className={css({width: '500px'})} />
        <img
          src={Umilabo_1}
          alt="image"
          className={css({
            width: `100%`,
            height: `500px`,
            mx: 'auto',
            position: 'relative',
          })}
        />
        {garbageImages.map((image, index) => (
          <img
            key={index}
            src={Garbage}
            alt="image"
            className={css({
              opacity: percent < image.opacityThreshold ? 1 : 0,
              transition: 'opacity 5s ease',
              width: `100px`,
              height: `100px`,
              position: 'absolute',
              top: 'auto',
              bottom: image.bottom,
              left: image.left,
            })}
          />
        ))}
        <Fireworks
          ref={ref}
          zoptions={{opacity: 0.5, rocketsPoint: {min: 5, max: 15}}}
          autostart={false}
          style={{
            top: 270,
            width: '100%',
            height: '500px',
            position: 'absolute',
            background: 'transparent',
          }}
        />
        <Button w="full" onClick={() => navigate(-1)}>
          Back To Home
        </Button>
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
