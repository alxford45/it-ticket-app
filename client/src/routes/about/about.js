import React from "react";

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
  EuiText,
} from "@elastic/eui";
import { NavBar } from "../../components/navbar/navbar";

export const AboutRoute = (props) => (
  <>
    <NavBar location={props.location} />
    <EuiPage>
      <EuiPageBody component="div">
        <EuiPageHeader>
          <EuiPageHeaderSection>
            <EuiTitle size="l">
              <h1>About This Project</h1>
            </EuiTitle>
          </EuiPageHeaderSection>
        </EuiPageHeader>
        <EuiPageContent>
          <EuiPageContentHeader>
            <EuiPageContentHeaderSection>
              <EuiTitle>
                <h2>
                  LSU CSC 4102 (Introduction to Database Systems) - Fall 2020
                </h2>
              </EuiTitle>
            </EuiPageContentHeaderSection>
          </EuiPageContentHeader>
          <EuiPageContentBody>
            <EuiText size={"s"}>
              <div>
                <dt>This project demo was created by:</dt>
                <ul>
                  <li>Christian Dalton</li>
                  <li>Omar Badar</li>
                  <li>Jacob Cosgrove</li>
                  <li>Alexander Ford</li>
                  <li>Joseph Giambrone</li>
                  <li>Reed Ladnier</li>
                  <li>Timothy Lee</li>
                  <li>Ryan Supple</li>
                  <li>Omer Tariq</li>
                </ul>

                <dt>UI Package:</dt>
                <ul>
                  <li>
                    <a href="https://elastic.github.io/eui/#/">ElasticUI:</a>{" "}
                    <span>
                      We take <strong>no</strong> credit for this.
                    </span>
                  </li>
                </ul>
              </div>
            </EuiText>
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  </>
);
