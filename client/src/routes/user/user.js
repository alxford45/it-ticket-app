import React, {useState} from 'react';

import {
    EuiPage,
    EuiPageBody,
    EuiPageContent,
    EuiPageContentBody,
    EuiPageContentHeader,
    EuiPageContentHeaderSection,
    EuiPageHeader,
    EuiPageHeaderSection,
    EuiTitle,
    EuiForm, EuiFlexItem,
    EuiFlexGroup,
    EuiFormRow, EuiButton,
    EuiDescribedFormGroup,
    EuiFlexGrid,
    EuiLink, EuiSpacer, EuiTextArea,
    EuiFieldText, EuiSelect, EuiFilePicker, EuiRange, EuiCode,

} from '@elastic/eui';
import {NavBar} from "../../components/navbar/navbar";
import {addToast} from "../../components/toast";
import {DEBUG} from "../../components/app/app";

var _ = require('lodash');

const errorMessages = [
    {error_type: 'required', error_message: 'This field is required.'}
]

const selectOptions = [
    {
        name: 'priority', options: [
            {value: 'low', text: 'Low'},
            {value: 'medium', text: 'Medium'},
            {value: 'high', text: 'High'}
        ]
    },
    {
        name: 'problem_category', options: [
            {value: 'general_help', text: "General Help"},
            {value: 'problem_2', text: 'Problem 2'}
        ]
    },
    {
        name: 'department', options: [
            {value: 'computer_science', text: 'Computer Science'},
            {value: 'petroleum_engineering', text: 'Petroleum Engineering'},
            {value: 'chemical_engineering', text: 'Chemical Engineering'}
        ]
    }
]
const fields = [
    {name: 'first_name', label: 'First Name', value: '', error: false, error_type: 'required'},
    {name: 'last_name', label: 'Last Name', value: '', error: false, error_type: 'required'},
    {name: 'lsu_id', label: 'LSU ID', value: '', error: false, error_type: 'required'},
    {
        name: 'department',
        label: 'Department/College',
        value: selectOptions.find(o => o.name === 'department').options[0],
        error: false,
        error_type: 'required'
    },

    {name: 'email', label: 'Email Address', value: '', error: false, error_type: 'required'},
    {name: 'phone_number', label: 'Phone Number', value: '', error: false, error_type: 'required'},

    {name: 'priority', label: 'Priority', value: selectOptions.find(o => o.name === 'priority').options[1].value, error: false, error_type: 'required'},

    {name: 'manufacturer', label: 'Manufacturer', value: '', error: false, error_type: 'required'},
    {name: 'model', label: 'Model', value: '', error: false, error_type: 'required'},
    {name: 'operating_system', label: 'Operating System', value: '', error: false, error_type: 'required'},
    {
        name: 'operating_system_version',
        label: 'Operating System Version',
        value: '',
        error: false,
        error_type: 'required'
    },

    {
        name: 'problem_category',
        label: 'Problem Category',
        value: selectOptions.find(o => o.name === 'problem_category').options[0].value,
        error: false,
        error_type: 'required'
    },
    {name: 'description', label: 'Description', value: '', error: false, error_type: 'required'},


]
const MySelectField = ({name, data, handleChange, handleBlur}, ...props) => {
    const item = _.find(data, ['name', name]);

    return (<EuiFormRow label={item.label}>
        <EuiSelect name={item.name}
                   id={item.name}
                   options={selectOptions.find(o => o.name === name).options}
                   value={item.value}
                   onChange={(e) => handleChange(e)}
                   onBlur={(e) => handleBlur(e)}/>
    </EuiFormRow>);
}
const MyTextField = ({name, data, handleChange, handleBlur}, ...props) => {
    const item = _.find(data, ['name', name]);
    return (<EuiFormRow label={item.label}
                        error={[_.find(errorMessages,
                            ['error_type',
                                item.error_type
                            ]).error_message]}
                        isInvalid={item.error}
    >
        <EuiFieldText name={item.name}
                      onChange={(e) => handleChange(e)}
                      onBlur={(e) => handleBlur(e)}
        />
    </EuiFormRow>)
}

export const UserRoute = (props) => {
    const [data, setData] = useState(fields);
    const [errors, setErrors] = useState(false);

    const handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        const newData = data;
        const index = newData.findIndex(o => o.name === name);

        newData[index].value = value;

        setData([...newData]
        );
    }

    const handleSubmit = (e) => {
        const errors = _.find(data, ['error', true])
        if (errors === undefined) {
            console.log(data);
            addToast({
                title: "Ticket Submitted!",
                color: "success"
            });
        } else {
            addToast({
                title: "Check Form for Errors",
                color: "danger"
            })
        }

    }

    const handleBlur = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        const newData = data;
        const index = newData.findIndex(o => o.name === name);

        if (value === '') {
            newData[index].error = true;
            newData[index].error_msg = 'required';
        } else {
            newData[index].error = false;
        }

        setData(
            [...newData]
        );
    }

    return (<>
        <NavBar location={props.location}/>
        <EuiPage>
            <EuiPageBody component="div">
                <EuiPageHeader>
                    <EuiPageHeaderSection>
                        <EuiTitle size="l">
                            <h1>Submit Ticket</h1>
                        </EuiTitle>
                    </EuiPageHeaderSection>
                </EuiPageHeader>
                <EuiPageContent>
                    {/*<EuiPageContentHeader>*/}
                    {/*    <EuiPageContentHeaderSection>*/}
                    {/*        <EuiTitle>*/}
                    {/*            <h2>Submit Ticket</h2>*/}
                    {/*        </EuiTitle>*/}
                    {/*    </EuiPageContentHeaderSection>*/}
                    {/*</EuiPageContentHeader>*/}
                    <EuiPageContentBody>
                        <EuiForm>

                            <EuiTitle size={'s'}>
                                <h3>My Information</h3>
                            </EuiTitle>
                            <EuiFlexGroup style={{maxWidth: 1000}}>

                                <EuiFlexItem>
                                    <MyTextField name={'first_name'} data={data} handleChange={handleChange}
                                                 handleBlur={handleBlur}/>
                                </EuiFlexItem>
                                <EuiFlexItem>
                                    <MyTextField name={'last_name'} data={data} handleChange={handleChange}
                                                 handleBlur={handleBlur}/>
                                </EuiFlexItem>
                                <EuiFlexItem>
                                    <MyTextField name={'lsu_id'} data={data} handleChange={handleChange}
                                                 handleBlur={handleBlur}/>
                                </EuiFlexItem>
                                <EuiFlexItem>
                                    <MyTextField name={'department'} data={data} handleChange={handleChange}
                                                 handleBlur={handleBlur}/>
                                </EuiFlexItem>

                            </EuiFlexGroup>
                            <EuiFlexGroup style={{maxWidth: 1000}}>
                                <EuiFlexItem grow={false} style={{width: 250}}>
                                    <MyTextField name={'email'} data={data} handleChange={handleChange}
                                                 handleBlur={handleBlur}/>
                                </EuiFlexItem>
                                <EuiFlexItem grow={false} style={{width: 200}}>
                                    <MyTextField name={'phone_number'} data={data} handleChange={handleChange}
                                                 handleBlur={handleBlur}/>
                                </EuiFlexItem>
                            </EuiFlexGroup>
                            <EuiSpacer/>
                            <EuiTitle size={'s'}>
                                <h3>General Information</h3>
                            </EuiTitle>
                            <EuiFlexGroup style={{maxWidth: 1000}}>
                                <EuiFlexItem grow={false} style={{width: 150}}>
                                    <MySelectField name={'priority'} data={data} handleChange={handleChange}
                                                   handleBlur={handleBlur}/>
                                </EuiFlexItem>
                            </EuiFlexGroup>
                            <EuiFlexGroup style={{maxWidth: 1000}}>
                                <EuiFlexItem>
                                    <MyTextField name={'manufacturer'} data={data} handleChange={handleChange}
                                                 handleBlur={handleBlur}/>
                                </EuiFlexItem>
                                <EuiFlexItem>
                                    <MyTextField name={'model'} data={data} handleChange={handleChange}
                                                 handleBlur={handleBlur}/>
                                </EuiFlexItem>
                                <EuiFlexItem>
                                    <MyTextField name={'operating_system'} data={data} handleChange={handleChange}
                                                 handleBlur={handleBlur}/>
                                </EuiFlexItem>
                                <EuiFlexItem>
                                    <MyTextField name={'operating_system_version'} data={data}
                                                 handleChange={handleChange} handleBlur={handleBlur}/>
                                </EuiFlexItem>
                            </EuiFlexGroup>
                            <EuiSpacer/>
                            <EuiTitle size={'s'}>
                                <h3>Issue Information</h3>
                            </EuiTitle>
                            <EuiFlexGrid>
                                <EuiFlexItem>
                                    <MySelectField name={'problem_category'} data={data} handleChange={handleChange}
                                                   handleBlur={handleBlur}/>
                                </EuiFlexItem>
                            </EuiFlexGrid>
                            <EuiFlexGroup style={{maxWidth: 1000}}>
                                <EuiFlexItem>
                                    <EuiFormRow label={_.find(data, ['name', 'description']).label}
                                                error={[_.find(errorMessages,
                                                    ['error_type',
                                                        _.find(data, ['name', 'description']).error_type
                                                    ]).error_message]}
                                                isInvalid={_.find(data, ['name', 'description']).error}
                                    >
                                        <EuiTextArea placeholder={'Computer crashes when...'}
                                                     name={_.find(data, ['name', 'description']).name}
                                                     onChange={(e) => handleChange(e)}
                                                     onBlur={(e) => handleBlur(e)}/>
                                    </EuiFormRow>
                                </EuiFlexItem>
                            </EuiFlexGroup>
                            <EuiSpacer/>
                            <EuiFlexGroup gutterSize="s" alignItems="center">
                                <EuiFlexItem grow={false}>
                                    <EuiButton type={'submit'} onClick={(e) => handleSubmit(e)}>Submit</EuiButton>
                                </EuiFlexItem>
                            </EuiFlexGroup>
                        </EuiForm>
                        <EuiSpacer/>
                        {DEBUG ? (<div style={{maxWidth: 1000}}>
                            Debug:
                            <EuiSpacer/>
                            <EuiCode language="json" isCopyable={true} color={'dark'} paddingSize={'m'}
                                     whiteSpace={'pre'} style={{maxWidth: 1000}}>
                                {JSON.stringify(data, null, 4)}
                            </EuiCode>
                        </div>) : null}
                    </EuiPageContentBody>
                </EuiPageContent>
            </EuiPageBody>
        </EuiPage>
    </>);
};