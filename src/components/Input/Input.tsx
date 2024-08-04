import React from 'react';
import * as InputProps from './Input.types';

const Input: React.FC<InputProps.component> = (props) => {
    return <>{props.children}</>;
};

export default Input;
