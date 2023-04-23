import { useMsal } from "@azure/msal-react";
import React, { useEffect, useState } from "react";
import { loginRequest } from "./authConfig";
import { callMsGraph } from "./graph";
/**
 * Renders information about the user obtained from MS Graph
 * @param props
 */
export const ProfileData = (props) => {
  return (
    <div id="profile-div">
      <p>
        <strong>Primer nombre: </strong> {props.graphData.givenName}
      </p>
      <p>
        <strong>Apellido: </strong> {props.graphData.surname}
      </p>
      <p>
        <strong>Correo: </strong> {props.graphData.userPrincipalName}
      </p>
    </div>
  );
};

/**
 * Renders information about the signed-in user or a button to retrieve data about the user
 */
const ProfileContent = () => {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    RequestProfileData();
    // eslint-disable-next-line
  }, []);

  function RequestProfileData() {
    // Silently acquires an access token which is then attached to a request for MS Graph data
    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      })
      .then((response) => {
        callMsGraph(response.accessToken).then((response) =>
          setGraphData(response)
        );
      });
  }

  return (
    <div>
      <h5 className="card-title">Bienvenido(a) {accounts[0]?.name}</h5>
      <br />
      {graphData && <ProfileData graphData={graphData} />}
    </div>
  );
};
export default ProfileContent;
