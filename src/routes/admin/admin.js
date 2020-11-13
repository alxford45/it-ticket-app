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
    EuiFlexGroup, EuiPanel, EuiFlexItem,
    EuiStat,EuiIcon,
} from '@elastic/eui';
import {NavBar} from "../../components/navbar/navbar";
// import {Table} from "../../components/table/openTickets";

export const AdminRoute = (props) => {
    const [isLoadingStat, setStatLoading] = useState(false);


    return (<>
        <NavBar location={props.location}/>
        <EuiPage>
            <EuiPageBody component="div">
                <EuiPageHeader>
                    <EuiPageHeaderSection>
                        <EuiTitle size="l">
                            <h1>Manage Tickets</h1>
                        </EuiTitle>
                    </EuiPageHeaderSection>
                </EuiPageHeader>
                <EuiPageContent>
                    <EuiPageContentHeader>
                        <EuiPageContentHeaderSection>
                            {/*<EuiTitle>*/}
                            {/*    <h2>Open Tickets</h2>*/}
                            {/*</EuiTitle>*/}
                        </EuiPageContentHeaderSection>
                    </EuiPageContentHeader>
                    <EuiPageContentBody>
                        <div>
                            <EuiFlexGroup>
                                <EuiFlexItem>
                                    <EuiPanel>
                                        <EuiStat
                                            title="50"
                                            description="Open Tickets"
                                            textAlign="center"
                                            titleColor={'danger'}
                                            isLoading={isLoadingStat}>
                                            <EuiIcon type="node" color={'danger'} />
                                        </EuiStat>
                                    </EuiPanel>
                                </EuiFlexItem>
                                <EuiFlexItem>
                                    <EuiPanel>
                                        <EuiStat
                                            title="2,000"
                                            description="Closed Tickets"
                                            titleColor="secondary"
                                            textAlign="center"
                                            isLoading={isLoadingStat}>
                                            <EuiIcon type="check" color="secondary" />
                                        </EuiStat>
                                    </EuiPanel>
                                </EuiFlexItem>
                            </EuiFlexGroup>
                        </div>
                        {/*<div>*/}
                            {/*TODO: once we have a tickets table*/}
                            {/*<Table/>*/}
                        {/*</div>*/}
                    </EuiPageContentBody>
                </EuiPageContent>
            </EuiPageBody>
        </EuiPage>
    </>);
};