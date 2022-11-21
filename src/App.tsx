import * as React from "react";
import "./App.css";
import Appbar from "./Appbar";
import RequestsTable from "./RequestsTable";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Sidenav from "./SideNav";

interface Requests {
  name: string;
  inputs: string[];
  results: string;
  submitted: string;
  requestor: { name: string; Pic: string };
}

const {
  ListRequestsRequest,
  ListRequestsResponse,
  GetRequestRequest,
  GetUserInfoRequest,
} = require("./data/backend_pb.js");

const { BackendClient } = require("./data/backend_grpc_web_pb.js");

var client = new BackendClient("http://mock.ciphermode.com:50051", null, null);

function App() {
  const [listIDs, setListIDs] = React.useState([]);
  const [requests, setRequests] = React.useState<Requests[]>([]);
  React.useEffect(() => {
    const req = new ListRequestsRequest();
    client.listRequests(req, {}, (err: any, res: any) => {
      if (err) {
        console.log(err);
        return;
      }
      setListIDs(res.getIdList());
    });
  }, []);

  React.useEffect(() => {
    listIDs.map((x: number) => {
      client.getRequest(
        new GetRequestRequest(x.toString()),
        {},
        (err: any, res: any) => {
          if (err) {
            //console.log(err);
            return;
          }

          GetRequestorInfos(res.array[0][3]).then((x: any) => {
            streamLineRequestData({ name: x.name, Pic: x.Pic });
          });

          const streamLineRequestData = (x: { name: string; Pic: string }) => {
            const newRequestsobject = {
              name: res.array[0][0],
              inputs: res.array[0][1],
              results: res.array[0][2],

              requestor: {
                // @ts-ignore
                name: x.name,
                // @ts-ignore
                Pic: x.Pic,
              },
              submitted: res.array[0][4],
            };

            setRequests((requests) => [...requests, newRequestsobject]);
          };
        }
      );
    });
  }, [listIDs]);

  const GetRequestorInfos = (id: string) => {
    let promise = new Promise((resolve, reject) => {
      client.getUserInfo(
        new GetUserInfoRequest(id),
        {},
        (err: any, res: any) => {
          if (err) {
            console.log(err);
            return;
          }

          resolve({
            name: res.array[0],
            Pic: res.array[1],
          });
        }
      );
    });
    return promise;
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid
            xs={6}
            md={2}
            style={{ backgroundColor: "black", height: "100vh" }}
          >
            <Sidenav />
          </Grid>
          <Grid xs={6} md={10}>
            <Appbar />

            <RequestsTable Requests={requests} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default App;
