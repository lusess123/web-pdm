import { useState, useCallback } from 'react';
// import { FieldConfig } from './../type/config'
// import { Field } from '../type/field'
export const useFields = () => {
    const [fields, setFields] = useState();
    const initFields = useCallback(data => {
        ///
        setFields(data);
    }, []);
    return {
        initFields,
        fields
    };
};
