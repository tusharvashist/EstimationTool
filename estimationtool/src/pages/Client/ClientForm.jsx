import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
//import * as employeeService from "../../services/employeeService";
//import Button from '../../components/controls/Button';
import Button from '@material-ui/core/Button';


const initialFValues = {
    id: 0,
    name: '',
    website: '',
    description: ''
    
}

export default function ClientForm(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
        if ('website' in fieldValues)
            temp.website = fieldValues.website ? "" : "This field is required."    
        if ('description' in fieldValues)
            temp.description = fieldValues.description ? "" : "This field is required."    
        // if ('email' in fieldValues)
        //     temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        // if ('mobile' in fieldValues)
        //     temp.mobile = fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required."
        // if ('departmentId' in fieldValues)
        //     temp.departmentId = fieldValues.departmentId.length != 0 ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="name"
                        label="Client Name"
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
                    />
                     <Controls.Input
                        label="Client Website"
                        name="website"
                        value={values.website}
                        onChange={handleInputChange}
                        error={errors.website}
                    />
                </Grid>
                <Grid item xs={6}>                      
                   <Controls.Input
                        label="Client Description"
                        name="description"
                        value={values.description}
                        onChange={handleInputChange}
                        error={errors.description}
                    />

                    <div>
                      <Controls.Button
                            type="submit"
                            text="Submit" />
                     <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                     </div>
                </Grid>
            </Grid>
        </Form>
    )
}
