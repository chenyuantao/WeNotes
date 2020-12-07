import React, { useEffect, useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { withRouter } from 'umi';
import styles from './index.less';
import 'weui';
import 'react-weui/build/packages/react-weui.css';

const ANIMATION_MAP = {
  PUSH: 'forward',
  POP: 'back',
  REPLACE: '',
};

export default withRouter(({ location, children, history }) => {
  return (
    <TransitionGroup
      childFactory={child =>
        React.cloneElement(child, { classNames: ANIMATION_MAP[history.action] })
      }
    >
      <CSSTransition key={location.pathname} timeout={200}>
        <div className={styles.container}>{children}</div>
      </CSSTransition>
    </TransitionGroup>
  );
});
