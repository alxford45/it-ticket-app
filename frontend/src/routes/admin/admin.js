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

export const AdminRoute = () => (
    <EuiPage>
        <EuiPageBody component="div">
            <EuiPageHeader>
                <EuiPageHeaderSection>
                    <EuiTitle size="l">
                        <h1>Admin</h1>
                    </EuiTitle>
                </EuiPageHeaderSection>
            </EuiPageHeader>
            <EuiPageContent>
                <EuiPageContentHeader>
                    <EuiPageContentHeaderSection>
                        <EuiTitle>
                            <h2>Open Tickets</h2>
                        </EuiTitle>
                    </EuiPageContentHeaderSection>
                </EuiPageContentHeader>
                <EuiPageContentBody>Content body</EuiPageContentBody>
            </EuiPageContent>
        </EuiPageBody>
    </EuiPage>
);