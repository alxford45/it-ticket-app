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
    EuiFormRow,
    EuiDescribedFormGroup,
    EuiFlexGrid,
    EuiLink, EuiSpacer,
    EuiFieldText, EuiSelect, EuiFilePicker, EuiRange, EuiCode,

} from '@elastic/eui';
import {NavBar} from "../../components/navbar/navbar";

const priorityOptions = [
    {value: 'low', text: 'Low'},
    {value: 'medium', text: 'Medium'},
    {value: 'high', text: 'High'}
]


export const StudentRoute = (props) => {
    const [priority, setPriority] = useState(priorityOptions[1].value);
    const onPriorityChange = (e) => {
        setPriority(e.target.value)
    }
    return (<>
        <NavBar location={props.location}/>
        <EuiPage>
            <EuiPageBody component="div">
                <EuiPageHeader>
                    <EuiPageHeaderSection>
                        <EuiTitle size="l">
                            <h1>Student Support</h1>
                        </EuiTitle>
                    </EuiPageHeaderSection>
                </EuiPageHeader>
                <EuiPageContent>
                    <EuiPageContentHeader>
                        <EuiPageContentHeaderSection>
                            <EuiTitle>
                                <h2>Submit Ticket</h2>
                            </EuiTitle>
                        </EuiPageContentHeaderSection>
                    </EuiPageContentHeader>
                    <EuiPageContentBody>
                        <EuiForm>

                            <EuiTitle size={'s'}>
                                <h3>Student Information</h3>
                            </EuiTitle>
                            <EuiFlexGrid>
                                <EuiFlexItem>
                                    <EuiFormRow label="First name">
                                        <EuiFieldText name={'first_name'}/>
                                    </EuiFormRow>
                                </EuiFlexItem>
                                <EuiFlexItem>
                                    <EuiFormRow label="Last name">
                                        <EuiFieldText name={'last_name'}/>
                                    </EuiFormRow>
                                </EuiFlexItem>
                                <EuiFlexItem>
                                    <EuiFormRow label="LSU ID">
                                        <EuiFieldText name={'lsu_id'}/>
                                    </EuiFormRow>
                                </EuiFlexItem>

                            </EuiFlexGrid>
                            <EuiFlexGrid>
                                <EuiFlexItem>
                                    <EuiFormRow label="Email Address">
                                        <EuiFieldText name={'email_address'}/>
                                    </EuiFormRow>
                                </EuiFlexItem>
                                <EuiFlexItem>
                                    <EuiFormRow label="Phone Number">
                                        <EuiFieldText name={'phone_number'}/>
                                    </EuiFormRow>
                                </EuiFlexItem>
                            </EuiFlexGrid>
                            <EuiSpacer/>
                            <EuiTitle size={'s'}>
                                <h3>General Information</h3>
                            </EuiTitle>
                            <EuiFormRow label="Priority">
                                <EuiSelect name="priority"
                                           id={'priority'}
                                           options={priorityOptions}
                                           value={priority}
                                           onChange={(e) => onPriorityChange(e)}/>
                            </EuiFormRow>

                            {/*<EuiDescribedFormGroup*/}
                            {/*    title={<h3>Multiple fields</h3>}*/}
                            {/*    description="Here are three form rows. The first form row does not have a title.">*/}
                            {/*    <><EuiFormRow*/}
                            {/*        hasEmptyLabelSpace*/}
                            {/*        helpText={<span>This is a help text</span>}>*/}
                            {/*        <EuiSelect*/}
                            {/*            hasNoInitialSelection*/}
                            {/*            options={[*/}
                            {/*                { value: 'option_one', text: 'Option one' },*/}
                            {/*                { value: 'option_two', text: 'Option two' },*/}
                            {/*                { value: 'option_three', text: 'Option three' },*/}
                            {/*            ]}*/}
                            {/*            aria-label="An example of a form element without a visible label"*/}
                            {/*        />*/}
                            {/*    </EuiFormRow>*/}

                            {/*    <EuiFormRow label="Range">*/}
                            {/*        <EuiRange min={0} max={100} name="range" id="range" />*/}
                            {/*    </EuiFormRow></>*/}
                            {/*</EuiDescribedFormGroup>*/}

                            {/*<EuiDescribedFormGroup*/}
                            {/*    title={<h2>Full width</h2>}*/}
                            {/*    titleSize="xxxs"*/}
                            {/*    description={*/}
                            {/*        <Fragment>*/}
                            {/*            By default, <strong>EuiDescribedFormGroup</strong> will be double*/}
                            {/*            the default width of form elements. However, you can pass{' '}*/}
                            {/*            <EuiCode>fullWidth</EuiCode> prop to this, the individual field and*/}
                            {/*            row components to expand to their container.*/}
                            {/*        </Fragment>*/}
                            {/*    }*/}
                            {/*    fullWidth>*/}
                            {/*<EuiFormRow*/}
                            {/*    label="Use a switch instead of a single checkbox"*/}
                            {/*    hasChildLabel={false}*/}
                            {/*    fullWidth>*/}
                            {/*</EuiFormRow>*/}

                            {/*<EuiFormRow fullWidth>*/}
                            {/*    <EuiFieldText*/}
                            {/*        name="second"*/}
                            {/*        fullWidth*/}
                            {/*        aria-label="An example of EuiTextField with fullWidth"*/}
                            {/*    />*/}
                            {/*</EuiFormRow>*/}
                            {/*</EuiDescribedFormGroup>*/}
                        </EuiForm>


                    </EuiPageContentBody>
                </EuiPageContent>
            </EuiPageBody>
        </EuiPage>
    </>);
};