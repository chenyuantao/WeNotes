import React from 'react';
import { IRouteComponentProps } from 'umi';
import 'weui';
import 'react-weui/build/packages/react-weui.css';

export default (props: IRouteComponentProps) => {
  return props.children;
};
