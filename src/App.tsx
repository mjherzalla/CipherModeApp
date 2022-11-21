import * as React from "react";
import "./App.css";
import Appbar from "./Appbar";
import RequestsTable from "./RequestsTable";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Sidenav from "./SideNav";

interface Request {
  id: string;
  name: string;
  inputs: string[];
  results: string;
  submitted: string;
  requestor: { name: string; Pic: string };
  comment?: string;
  status?: string;
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
  const [requests, setRequests] = React.useState<Request[]>([]);
  const [originalrequests, setOriginalrequestsRequests] = React.useState<any[]>(
    []
  );
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
    listIDs.map((RequestId: number) => {
      client.getRequest(
        new GetRequestRequest(RequestId.toString()),
        {},
        (err: any, res: any) => {
          if (err) {
            //console.log(err);
            return;
          }

          setOriginalrequestsRequests((originalrequests) => [
            ...originalrequests,
            res.array,
          ]);

          GetRequestorInfo(res.array[0][3]).then((x: any) => {
            streamLineRequestData({ name: x.name, Pic: x.Pic });
          });

          const streamLineRequestData = (x: { name: string; Pic: string }) => {
            const getStatus = (x: number) => {
              switch (x) {
                case 0:
                  return "PENDING";
                case 1:
                  return "APPROVED";
                case 2:
                  return "REJECTED";
              }
            };

            const newRequestsobject = {
              id: RequestId.toString(),
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
              comment: res.array[0][5] || "",
              status: getStatus(res.array[0][6]),
            };

            setRequests((requests) => [...requests, newRequestsobject]);
          };
        }
      );
    });
  }, [listIDs]);

  const GetRequestorInfo = (id: string) => {
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
            style={{
              backgroundColor: "black",
              height: "100vh",
            }}
          >
            <Sidenav />
          </Grid>
          <Grid xs={6} md={10}>
            <Appbar />
            <RequestsTable
              Requests={requests}
              OriginalRequests={originalrequests}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default App;
