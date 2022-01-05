import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { api } from "../services/apiClient";
import { withSSRAuth } from "../utils/withSSRAuth";
import { setupAPIClient } from "../services/api";
import { Can } from "../components/Can";
// import { useCan } from "../hooks/useCan";

export default function Dashboard() {
  const { user, signOut, isAuthenticated } = useContext(AuthContext);

  // const userCanSeeMetrics = useCan({
  //   // permissions: ["metrics.list"],
  //   roles: ["administrator", "editor"],
  // });

  useEffect(() => {
    api
      .get("/me")
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1>Dashboard: {user?.email}</h1>

      <button onClick={signOut}>Sign Out</button>

      {/*{userCanSeeMetrics && <div>Métricas</div>}*/}
      <Can permissions={["metrics.list"]}>
        <div>Métricas Can</div>
      </Can>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get("/me");

  // console.log(response);
  return {
    props: {},
  };
});
