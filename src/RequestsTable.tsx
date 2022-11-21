import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, Checkbox, Typography } from "@mui/material";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import ApproveModal from "./modals/Approve";
import DeleteModal from "./modals/Delete";
import DenyModal from "./modals/Deny";
import MoreinfoModal from "./modals/MoreInfo";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";
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
interface Iprops {
  Requests: Request[];
  OriginalRequests: any[];
}
export default function RequestsTable(props: Iprops) {
  const [selectedRequests, setSelectedRequest] = React.useState<Request>();

  const [indexChecked, setIndexChecked] = React.useState(-1);
  const [sort, setSort] = React.useState("byName");
  const setSelection = (Request: Request, Index: number) => {
    if (Index === indexChecked) {
      setIndexChecked(-1);
    } else {
      setIndexChecked(Index);
      setSelectedRequest(Request);
    }
  };

  return (
    <div style={{ margin: 20 }}>
      <Typography
        variant="h3"
        component="div"
        style={{ marginTop: 20, marginBottom: 20 }}
      >
        Pending requests
      </Typography>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row-reverse",
          height: 36,
        }}
      >
        {indexChecked !== -1 && selectedRequests && (
          <>
            <DeleteModal selectedRequests={selectedRequests} />
            <DenyModal selectedRequests={selectedRequests} />
            <MoreinfoModal
              selectedRequests={selectedRequests}
              originalrequests={props.OriginalRequests.find(
                (x) => x[0][0] === selectedRequests.name
              )}
            />
            <ApproveModal selectedRequests={selectedRequests} />
          </>
        )}
      </div>
      <TableContainer component={Paper}>
        <Table size="small" sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>
            <TableRow className="tableHeader">
              <TableCell>
                <IndeterminateCheckBoxOutlinedIcon style={{ marginLeft: 10 }} />
              </TableCell>
              <TableCell onClick={() => setSort("byName")}>NAME</TableCell>
              <TableCell onClick={() => setSort("byInput")}>INPUTS</TableCell>
              <TableCell onClick={() => setSort("byResult")}>RESULTS</TableCell>
              <TableCell onClick={() => setSort("byReqestor")}>
                REQUESTOR
              </TableCell>
              <TableCell onClick={() => setSort("bySubmitted")}>
                ↓ SUBMITTED
              </TableCell>
              <TableCell onClick={() => setSort("byStatus")}>STATUS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.Requests.sort((a, b) => {
              if (sort === "bySubmitted") {
                return parseFloat(a.submitted) - parseFloat(b.submitted);
              } else {
                return parseFloat(b.submitted) - parseFloat(a.submitted);
              }
            }).map((row, index) => (
              <TableRow
                key={row.name + index.toString()}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Checkbox
                    onChange={() => setSelection(row, index)}
                    checked={indexChecked === index}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  {row.inputs.map((x: any, index) => {
                    return (
                      <>
                        <span key={x + index}>{x}</span>
                        <br />
                      </>
                    );
                  })}
                </TableCell>
                <TableCell>{row.results}</TableCell>
                <TableCell>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      alignContent: "center",
                    }}
                  >
                    <Avatar
                      alt={row.requestor.name}
                      src={"row.requestor.Pic"}
                      style={{ marginRight: 5 }}
                    />

                    {row.requestor.name}
                  </div>
                </TableCell>
                <TableCell>{FormatDate(row.submitted)}</TableCell>
                <TableCell>
                  {row.status && (
                    <Tooltip title={row.comment}>
                      <Chip
                        label={row.status}
                        size="small"
                        variant="outlined"
                        color={
                          row.status === "APPROVED" ? "success" : "default"
                        }
                      />
                    </Tooltip>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

const FormatDate = (x: string) => {
  const date = new Date(x);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var month = date.getUTCMonth() + 1;
  var day = date.getUTCDate();

  var newformat = hours >= 12 ? "PM" : "AM";
  // Find current hour in AM-PM Format
  hours = hours % 12;
  // To display "0" as "12"
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? 0 + minutes : minutes;

  var strTime =
    hours + ":" + minutes + " " + newformat + " " + month + "/" + day;

  return strTime;
};
