import React, { useEffect, useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { withRouter } from 'umi';
import styles from './index.less';
import io from 'socket.io-client';
import { Msg } from 'react-weui';
import 'weui';
import 'react-weui/build/packages/react-weui.css';

const ANIMATION_MAP = {
  PUSH: 'forward',
  POP: 'back',
  REPLACE: '',
};

export default withRouter(({ location, children, history }) => {
  const [connected, setConnected] = useState(false);
  useEffect(() => {
    const socket = io('http://localhost:3004');
    socket.on('connect', () => {
      setConnected(true);
      console.log('connect');
    });
    socket.on('disconnect', () => {
      setConnected(false);
      socket.open();
    });
    socket.open();
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <TransitionGroup
      childFactory={child =>
        React.cloneElement(child, { classNames: ANIMATION_MAP[history.action] })
      }
    >
      <CSSTransition key={location.pathname} timeout={200}>
        <div className={styles.container}>
          {connected ? (
            children
          ) : (
            <Msg
              className={styles.msg}
              type="loading"
              title="Connecting to server..."
            />
          )}
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
});
