import React from 'react';

import {
    EuiCard,
    EuiIcon,
    EuiFlexGroup,
    EuiFlexItem,
    EuiPage,
    EuiTitle,
    EuiHorizontalRule,
    EuiPageBody,
    EuiPageContent,
    EuiPageContentBody,
    EuiPageContentHeader,
    EuiPageContentHeaderSection,
    EuiPageHeader,
    EuiPageHeaderSection,

} from '@elastic/eui';
import { useHistory } from "react-router-dom";
import routes from "../../utils/constants/routes.json"

const UserSelect = () => {
    const history = useHistory();
    return (
        <EuiFlexItem key={1}>
            <EuiCard
                icon={<EuiIcon size={"xxl"} type={"user"} color={"#461D7C"}/>}
                title={"Student Login"}
                onClick={(e) => history.push(routes.STUDENT)}

            />
        </EuiFlexItem>
    )
}

const AdminSelect = () => {
    const history = useHistory();

    return (
        <EuiFlexItem key={2}>
            <EuiCard
                icon={<EuiIcon size={"xxl"} type={"wrench"} color={"#461D7C"}/>}
                title={"Admin Login"}
                onClick={(e) => history.push(routes.ADMIN)}
            />
        </EuiFlexItem>
    )
}


export const LoginSelect = () => {
    return (
        <EuiPage>
            <EuiPageBody component="div">
                <EuiPageHeader>
                    <EuiPageHeaderSection>
                        <EuiTitle size={"l"}>
                            <h1>LSU IT Support</h1>
                        </EuiTitle>
                    </EuiPageHeaderSection>
                </EuiPageHeader>
                    <EuiPageContentBody>
                        <EuiFlexGroup gutterSize="l">
                            <>
                                <UserSelect/>
                                <AdminSelect/>
                            </>
                        </EuiFlexGroup>
                    </EuiPageContentBody>
            </EuiPageBody>
        </EuiPage>
    )
}