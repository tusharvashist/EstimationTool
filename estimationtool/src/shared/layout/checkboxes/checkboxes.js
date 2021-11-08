import React, { useState } from 'react';
import {
    Checkbox,
    FormControlLabel,
    FormGroup,
} from "@material-ui/core";

const Checkboxes = ({ config = [], onChange, defaultValues = {}, customComponent, onChangeField }) => {
    const [values, setValues] = useState(defaultValues);

    const onUpdate = ({checkConfig}) => ({ target }) => {
        const name = target.name, checked = target.checked;
        let updatedValues = { ...values, [name]: checked }

        setValues(updatedValues);
        console.log("updatedValues", updatedValues)
        onChange && onChange(updatedValues)
        onChangeField && onChangeField({checkConfig, data: {name, checked}}) ;

    } 
  
    console.log("values", values)
    return (
        <FormGroup>
            {config.map((checkConfig) => {
                return (
                    <FormControlLabel
                        control={<>
                            <Checkbox name={checkConfig.name} checked={values[checkConfig.name] || false} onChange={onUpdate({checkConfig})} />
                            {customComponent && customComponent({data:checkConfig})}
                            </>}
                        label={checkConfig.label}
                    />
                )
            })}
        </FormGroup>
    )
}

export default Checkboxes;