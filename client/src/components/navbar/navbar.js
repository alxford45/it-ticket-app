import { EuiBadge, EuiIcon, EuiAvatar } from "@elastic/eui";
import React from "react";

import {
  EuiHeader,
  EuiHeaderLogo,
  EuiHeaderLinks,
  EuiHeaderLink,
  EuiHeaderSectionItemButton,
} from "@elastic/eui";
import routes from "../../utils/constants/routes.json";
import { useHistory } from "react-router-dom";

const TechName = ({ technician, setTechnician }, props) => {
  return (
    <EuiHeaderLink
      onClick={(e) => {
        setTechnician(false);
      }}
    >
      {technician[0].value}
    </EuiHeaderLink>
  );
};

export const NavBar = (props) => {
  const history = useHistory();

  return (
    <EuiHeader
      theme="dark"
      sections={[
        {
          borders: "right",
          items: [
            <EuiHeaderLinks>
              <EuiHeaderLink
                onClick={(e) => {
                  history.push(routes.LOGIN);
                }}
              >
                IT Support Demo
              </EuiHeaderLink>
              ,
            </EuiHeaderLinks>,
            <EuiHeaderLinks>
              <EuiHeaderLink
                isActive={props.location.pathname === routes.USER}
                onClick={(e) => {
                  history.push(routes.USER);
                }}
              >
                Student View
              </EuiHeaderLink>
              <EuiHeaderLink
                isActive={props.location.pathname === routes.ADMIN}
                onClick={(e) => {
                  history.push(routes.ADMIN);
                }}
              >
                Admin View
              </EuiHeaderLink>
              <EuiHeaderLink
                isActive={props.location.pathname === routes.ABOUT}
                onClick={(e) => {
                  history.push(routes.ABOUT);
                }}
              >
                Project Details
              </EuiHeaderLink>
            </EuiHeaderLinks>,
          ],
        },
        {
          borders: "right",
          items: [
            props.technician === undefined ||
            props.technician === false ? null : (
              <TechName
                technician={props.technician}
                setTechnician={props.setTechnician}
              />
            ),
          ],
        },
      ]}
    />
  );
};
