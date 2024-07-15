import {MetaFunction} from '@remix-run/node';
import {useNavigate} from '@remix-run/react';
import {css} from 'styled-system/css';
import {Button} from '~/components/base';

export const meta: MetaFunction = () => {
  return [
    {title: 'New Remix App'},
    {name: 'description', content: 'Welcome to Remix!'},
  ];
};

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className={divStyle}>
      <h1 className={h1Style}>Welcome to Remix + Socket.io Sample Demo</h1>
      <div className={buttonAlignStyle}>
        <Button onClick={() => navigate('/input')}>ユーザ操作画面</Button>
        <Button onClick={() => navigate('/output')}>コンテンツ表示画面</Button>
      </div>
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
