import React, {useState} from 'react';
import {
    Checkbox,
    FormControlLabel,
    FormGroup,
} from "@material-ui/core";

const Checkboxes = ({ config = [], onChange, defaultValues = {} }) => {
    const [values, setValues] = useState(defaultValues);

    const onUpdate = ({ target }) => {
        const name = target.name, checked = target.checked;
        let updatedValues = { ...values, [name]: checked }

        setValues(updatedValues);
        onChange && onChange(updatedValues)

    }
    return (
        <FormGroup>
            {config.map((checkConfig) => {
                return (
                    <FormControlLabel
                        control={<Checkbox name={checkConfig.name} checked={values[checkConfig.name] || checkConfig.defaultChecked || false} onChange={onUpdate} />}
                        label={checkConfig.label}
                    />
                )
            })}
        </FormGroup>
    )
        }

    export default Checkboxes;