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

var _ = require('lodash');

const errorMessages = [
    {error_type: 'required', error_message: 'This field is required.'}
]


const priorityOptions = [
    {value: 'low', text: 'Low'},
    {value: 'medium', text: 'Medium'},
    {value: 'high', text: 'High'}
]

const problemCategoryOptions = [
    {value: 'general_help', text: "General Help"},
    {value: 'problem_2', text: 'Problem 2'}
]

const departmentOptions = [
    {value: 'computer_science', text: 'Computer Science'},
    {value: 'petroleum_engineering', text: 'Petroleum Engineering'},
    {value: 'chemical_engineering', text: 'Chemical Engineering'}
]

const fields = [
    {name: 'first_name', label: 'First Name', value: '', error: false, error_type: 'required'},
    {name: 'last_name', label: 'Last Name', value: '', error: false, error_type: 'required'},
    {name: 'lsu_id', label: 'LSU ID', value: '', error: false, error_type: 'required'},
    {
        name: 'department',
        label: 'Department/College',
        value: departmentOptions[0].value,
        error: false,
        error_type: 'required'
    },

    {name: 'email', label: 'Email Address', value: '', error: false, error_type: 'required'},
    {name: 'phone_number', label: 'Phone Number', value: '', error: false, error_type: 'required'},

    {name: 'priority', label: 'Priority', value: priorityOptions[1].value, error: false, error_type: 'required'},

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
        value: problemCategoryOptions[0].value,
        error: false,
        error_type: 'required'
    },
    {name: 'description', label: 'Description', value: '', error: false, error_type: 'required'},


]

export const UserRoute = (props) => {
    const [data, setData] = useState(fields);
    const [showErrors, setShowErrors] = useState(false);

    const [priority, setPriority] = useState(priorityOptions[1].value);

    const onPriorityChange = (e) => {
        setPriority(e.target.value)
        handleChange(e);
    }

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
        console.log(data);
        addToast({
            title: "Ticket Submitted!",
            color: "success"
        });
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
                                    <EuiFormRow label={_.find(data, ['name', 'first_name']).label}
                                                error={[_.find(errorMessages,
                                                    ['error_type',
                                                        _.find(data, ['name', 'first_name']).error_type
                                                    ]).error_message]}
                                                isInvalid={_.find(data, ['name', 'first_name']).error}
                                    >
                                        <EuiFieldText name={_.find(data, ['name', 'first_name']).name}
                                                      onChange={(e) => handleChange(e)}
                                                      onBlur={(e) => handleBlur(e)}
                                        />
                                    </EuiFormRow>
                                </EuiFlexItem>
                                <EuiFlexItem>
                                    <EuiFormRow label={_.find(data, ['name', 'last_name']).label}
                                                error={[_.find(errorMessages,
                                                    ['error_type',
                                                        _.find(data, ['name', 'last_name']).error_type
                                                    ]).error_message]}
                                                isInvalid={_.find(data, ['name', 'last_name']).error}>
                                        <EuiFieldText name={_.find(data, ['name', 'last_name']).name}
                                                      onChange={(e) => handleChange(e)}
                                                      onBlur={(e) => handleBlur(e)}/>
                                    </EuiFormRow>
                                </EuiFlexItem>
                                <EuiFlexItem>
                                    <EuiFormRow label={_.find(data, ['name', 'lsu_id']).label}
                                                error={[_.find(errorMessages,
                                                    ['error_type',
                                                        _.find(data, ['name', 'lsu_id']).error_type
                                                    ]).error_message]}
                                                isInvalid={_.find(data, ['name', 'lsu_id']).error}
                                    >
                                        <EuiFieldText name={_.find(data, ['name', 'lsu_id']).name}
                                                      onChange={(e) => handleChange(e)}
                                                      onBlur={(e) => handleBlur(e)}/>
                                    </EuiFormRow>
                                </EuiFlexItem>
                                <EuiFlexItem>
                                    <EuiFormRow label="Department/College">
                                        <EuiSelect name="department"
                                                   id={'department'}
                                                   options={departmentOptions}
                                                   value={_.find(data, ['name', 'department']).value}
                                                   onChange={(e) => handleChange(e)}
                                                   onBlur={(e) => handleBlur(e)}/>
                                    </EuiFormRow>
                                </EuiFlexItem>

                            </EuiFlexGroup>
                            <EuiFlexGroup style={{maxWidth: 1000}}>
                                <EuiFlexItem grow={false} style={{width: 250}}>
                                    <EuiFormRow label={_.find(data, ['name', 'email']).label}
                                                error={[_.find(errorMessages,
                                                    ['error_type',
                                                        _.find(data, ['name', 'email']).error_type
                                                    ]).error_message]}
                                                isInvalid={_.find(data, ['name', 'email']).error}
                                    >
                                        <EuiFieldText name={_.find(data, ['name', 'email']).name}
                                                      onChange={(e) => handleChange(e)}
                                                      onBlur={(e) => handleBlur(e)}/>
                                    </EuiFormRow>
                                </EuiFlexItem>
                                <EuiFlexItem grow={false} style={{width: 200}}>
                                    <EuiFormRow label={_.find(data, ['name', 'phone_number']).label}
                                                error={[_.find(errorMessages,
                                                    ['error_type',
                                                        _.find(data, ['name', 'phone_number']).error_type
                                                    ]).error_message]}
                                                isInvalid={_.find(data, ['name', 'phone_number']).error}
                                    >
                                        <EuiFieldText name={_.find(data, ['name', 'phone_number']).name}
                                                      onChange={(e) => handleChange(e)}
                                                      onBlur={(e) => handleBlur(e)}/>
                                    </EuiFormRow>
                                </EuiFlexItem>
                            </EuiFlexGroup>
                            <EuiSpacer/>
                            <EuiTitle size={'s'}>
                                <h3>General Information</h3>
                            </EuiTitle>
                            <EuiFlexGroup style={{maxWidth: 1000}}>
                                <EuiFlexItem grow={false} style={{width: 150}}>
                                    <EuiFormRow label={'Priority'}>
                                        <EuiSelect name="priority"
                                                   id={'priority'}
                                                   options={priorityOptions}
                                                   value={_.find(data, ['name', 'priority']).value}
                                                   onChange={(e) => handleChange(e)}
                                                   onBlur={(e) => handleBlur(e)}
                                        />
                                    </EuiFormRow>
                                </EuiFlexItem>
                            </EuiFlexGroup>
                            <EuiFlexGroup style={{maxWidth: 1000}}>
                                <EuiFlexItem>
                                    <EuiFormRow label={_.find(data, ['name', 'manufacturer']).label}
                                                error={[_.find(errorMessages,
                                                    ['error_type',
                                                        _.find(data, ['name', 'manufacturer']).error_type
                                                    ]).error_message]}
                                                isInvalid={_.find(data, ['name', 'manufacturer']).error}
                                    >
                                        <EuiFieldText name={_.find(data, ['name', 'manufacturer']).name}
                                                      onChange={(e) => handleChange(e)}
                                                      onBlur={(e) => handleBlur(e)}/>
                                    </EuiFormRow>
                                </EuiFlexItem>
                                <EuiFlexItem>
                                    <EuiFormRow label={_.find(data, ['name', 'model']).label}
                                                error={[_.find(errorMessages,
                                                    ['error_type',
                                                        _.find(data, ['name', 'model']).error_type
                                                    ]).error_message]}
                                                isInvalid={_.find(data, ['name', 'model']).error}
                                    >
                                        <EuiFieldText name={_.find(data, ['name', 'model']).name}
                                                      onChange={(e) => handleChange(e)}
                                                      onBlur={(e) => handleBlur(e)}/>
                                    </EuiFormRow>
                                </EuiFlexItem>
                                <EuiFlexItem>
                                    <EuiFormRow label={_.find(data, ['name', 'operating_system']).label}
                                                error={[_.find(errorMessages,
                                                    ['error_type',
                                                        _.find(data, ['name', 'operating_system']).error_type
                                                    ]).error_message]}
                                                isInvalid={_.find(data, ['name', 'operating_system']).error}
                                    >
                                        <EuiFieldText name={_.find(data, ['name', 'operating_system']).name}
                                                      onChange={(e) => handleChange(e)}
                                                      onBlur={(e) => handleBlur(e)}/>
                                    </EuiFormRow>
                                </EuiFlexItem>
                                <EuiFlexItem>
                                    <EuiFormRow label={_.find(data, ['name', 'operating_system_version']).label}
                                                error={[_.find(errorMessages,
                                                    ['error_type',
                                                        _.find(data, ['name', 'operating_system_version']).error_type
                                                    ]).error_message]}
                                                isInvalid={_.find(data, ['name', 'operating_system_version']).error}
                                    >
                                        <EuiFieldText name={_.find(data, ['name', 'operating_system_version']).name}
                                                      onChange={(e) => handleChange(e)}
                                                      onBlur={(e) => handleBlur(e)}/>
                                    </EuiFormRow>
                                </EuiFlexItem>
                            </EuiFlexGroup>
                            <EuiSpacer/>
                            <EuiTitle size={'s'}>
                                <h3>Issue Information</h3>
                            </EuiTitle>
                            <EuiFlexGrid>
                                <EuiFlexItem>
                                    <EuiFormRow label={'Problem Category'}>
                                        <EuiSelect name="problem_category"
                                                   id={'problem_category'}
                                                   options={problemCategoryOptions}
                                                   value={_.find(data, ['name', 'problem_category']).value}
                                                   onChange={(e) => handleChange(e)}
                                                   onBlur={(e) => handleBlur(e)}/>
                                    </EuiFormRow>
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
                        <div style={{maxWidth: 1000}}>
                            Debug:
                            <EuiSpacer/>
                            <EuiCode language="json" isCopyable={true} color={'dark'} paddingSize={'m'}
                                     whiteSpace={'pre'} style={{maxWidth: 1000}}>
                                {JSON.stringify(data, null, 4)}
                            </EuiCode>
                        </div>
                    </EuiPageContentBody>
                </EuiPageContent>
            </EuiPageBody>
        </EuiPage>
    </>);
};