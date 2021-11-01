import React, { useState } from 'react';
import {
    Checkbox,
    FormControlLabel,
    FormGroup,
} from "@material-ui/core";

const Checkboxes = ({ config = [], onChange, defaultValues = {}, customComponent }) => {
    const [values, setValues] = useState(defaultValues);

    const onUpdate = ({ target }) => {
        const name = target.name, checked = target.checked;
        let updatedValues = { ...values, [name]: checked }

        setValues(updatedValues);
        console.log("updatedValues", updatedValues)
        onChange && onChange(updatedValues)

    } 
  
    console.log("values", values)
    return (
        <FormGroup>
            {config.map((checkConfig) => {
                return (
                    <FormControlLabel
                        control={<>
                            <Checkbox name={checkConfig.name} checked={values[checkConfig.name] || false} onChange={onUpdate} />
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