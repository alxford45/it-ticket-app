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
import {NavBar} from "../../components/navbar/navbar";

const UserSelect = () => {
    const history = useHistory();
    return (
        <EuiFlexItem key={1}>
            <EuiCard
                icon={<EuiIcon size={"xxl"} type={"user"} color={"#461D7C"}/>}
                title={"Student View"}
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
                title={"Admin View"}
                onClick={(e) => history.push(routes.ADMIN)}
            />
        </EuiFlexItem>
    )
}

const AboutSelect = () => {
    const history = useHistory();

    return (
        <EuiFlexItem key={3}>
            <EuiCard
                icon={<EuiIcon size={"xxl"} type={"help"} color={"#461D7C"}/>}
                title={"About This Project"}
                onClick={(e) => history.push(routes.ABOUT)}
            />
        </EuiFlexItem>
    )
}

export const LoginSelect = (props) => {
    return (
        <>
            <NavBar location={props.location}/>
        <EuiPage>
            <EuiPageBody component="div">
                <EuiPageHeader>
                    <EuiPageHeaderSection>
                        <EuiTitle size={"l"}>
                            <h1>LSU IT Support Demo</h1>
                        </EuiTitle>
                    </EuiPageHeaderSection>
                </EuiPageHeader>
                    <EuiPageContentBody>
                        <EuiFlexGroup gutterSize="l">
                            <>
                                <UserSelect/>
                                <AdminSelect/>
                                <AboutSelect/>
                            </>
                        </EuiFlexGroup>
                    </EuiPageContentBody>
            </EuiPageBody>
        </EuiPage>
            </>
    )
}