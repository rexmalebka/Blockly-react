import React from 'react';
import * as FieldProps from './Field.types';

const Field: React.FC<FieldProps.component> = (props) => {
    return <>{props.children}</>;
};

export default Field;
