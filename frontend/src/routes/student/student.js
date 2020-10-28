import React from 'react';

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
} from '@elastic/eui';

export const StudentRoute = () => (
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
                <EuiPageContentBody>Content body</EuiPageContentBody>
            </EuiPageContent>
        </EuiPageBody>
    </EuiPage>
);