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


export const UserRoute = (props) => {
    const [data, setData] = useState({});
    const [priority, setPriority] = useState(priorityOptions[1].value);
    const [problemCategory, setProblemCategory] = useState(problemCategoryOptions[0].value);
    const [department, setDepartment] = useState(departmentOptions[0].value)


    const onPriorityChange = (e) => {
        setPriority(e.target.value)
        handleChange(e);
    }

    const onProblemCategoryChange = (e) => {
        setProblemCategory(e.target.value)
        handleChange(e);
    }

    const onDepartmentChange = (e) => {
        setDepartment(e.target.value)
        handleChange(e);
    }

    const handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        const newData = {...data}
        newData[name] = value;

        setData(
            {...newData}
        );
    }

    const handleSubmit = (e) => {
        console.log(data);
        addToast({
            title: "Ticket Submitted!",
            color: "success"
        });
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
                                    <EuiFormRow label="First name">
                                        <EuiFieldText name={'first_name'} onChange={(e) => handleChange(e)}/>
                                    </EuiFormRow>
                                </EuiFlexItem>
                                <EuiFlexItem>
                                    <EuiFormRow label="Last name">
                                        <EuiFieldText name={'last_name'}
                                                      onChange={(e) => handleChange(e)}/>
                                    </EuiFormRow>
                                </EuiFlexItem>
                                <EuiFlexItem>
                                    <EuiFormRow label="LSU ID">
                                        <EuiFieldText name={'lsu_id'}
                                                      onChange={(e) => handleChange(e)}/>
                                    </EuiFormRow>
                                </EuiFlexItem>
                                <EuiFlexItem>
                                    <EuiFormRow label="Department/College">
                                        <EuiSelect name="department"
                                                   id={'department'}
                                                   options={departmentOptions}
                                                   value={department}
                                                   onChange={(e) => onDepartmentChange(e)}
                                                   onChange={(e) => handleChange(e)}/>
                                    </EuiFormRow>
                                </EuiFlexItem>

                            </EuiFlexGroup>
                            <EuiFlexGroup style={{maxWidth: 1000}}>
                                <EuiFlexItem grow={false} style={{width: 250}}>
                                    <EuiFormRow label="Email Address">
                                        <EuiFieldText name={'email_address'}
                                                      onChange={(e) => handleChange(e)}/>
                                    </EuiFormRow>
                                </EuiFlexItem>
                                <EuiFlexItem grow={false} style={{width: 200}}>
                                    <EuiFormRow label="Phone Number">
                                        <EuiFieldText name={'phone_number'}
                                                      onChange={(e) => handleChange(e)}/>
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
                                                   value={priority}
                                                   onChange={(e) => onPriorityChange(e)}
                                                   onChange={(e) => handleChange(e)}/>
                                    </EuiFormRow>
                                </EuiFlexItem>
                            </EuiFlexGroup>
                            <EuiFlexGroup style={{maxWidth: 1000}}>
                                <EuiFlexItem>
                                    <EuiFormRow label={'Manufacturer'}>
                                        <EuiFieldText name={'manufacturer'}
                                                      onChange={(e) => handleChange(e)}/>
                                    </EuiFormRow>
                                </EuiFlexItem>
                                <EuiFlexItem>
                                    <EuiFormRow label={'Model'}>
                                        <EuiFieldText name={'model'}
                                                      onChange={(e) => handleChange(e)}/>
                                    </EuiFormRow>
                                </EuiFlexItem>
                                <EuiFlexItem>
                                    <EuiFormRow label={'Operating System'}>
                                        <EuiFieldText name={'operating_system'}
                                                      onChange={(e) => handleChange(e)}/>
                                    </EuiFormRow>
                                </EuiFlexItem>
                                <EuiFlexItem>
                                    <EuiFormRow label={'Operating System Version'}>
                                        <EuiFieldText name={'operating_system_version'}
                                                      onChange={(e) => handleChange(e)}/>
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
                                                   value={problemCategory}
                                                   onChange={(e) => onProblemCategoryChange(e)}
                                                   onChange={(e) => handleChange(e)}/>
                                    </EuiFormRow>
                                </EuiFlexItem>
                            </EuiFlexGrid>
                            <EuiFlexGroup style={{maxWidth: 1000}}>
                                <EuiFlexItem>
                                    <EuiFormRow label={'Description'}>
                                        <EuiTextArea
                                            fullWidth={true}
                                            placeholder="Computer crashes when..."
                                        />
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
                    </EuiPageContentBody>
                </EuiPageContent>
            </EuiPageBody>
        </EuiPage>
    </>);
};