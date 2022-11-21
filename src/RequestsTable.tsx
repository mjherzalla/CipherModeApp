import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, Button, Checkbox, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import ApproveModal from './modals/Approve'
import DeleteModal from './modals/Delete'
import DenyModal from './modals/Deny'
import MoreinfoModal from './modals/MoreInfo'


interface Request {
  name: string;
  inputs: string[];
  results: string;
  submitted: string;
  requestor: { name: string; Pic: string };
}
interface RequestsArry {
  Requests: Request[];
}
export default function RequestsTable(props: RequestsArry) {
  const [selectedRequests, setSelectedRequest] = React.useState<Request>();
  const [indexChecked, setIndexChecked] = React.useState(-1)

  const setSelection = (Request: Request, Index: number) => {
    if (Index == indexChecked) {
      setIndexChecked(-1)

    }

  }

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
        style={{ width: "100%", display: "flex", flexDirection: "row-reverse" }}
      >
        {selectedRequests && <>
          <DeleteModal selectedRequests={selectedRequests} />
          <DenyModal selectedRequests={selectedRequests} />
          <MoreinfoModal selectedRequests={selectedRequests} />
          <ApproveModal selectedRequests={selectedRequests} /></>
        }

      </div>
      <TableContainer component={Paper}>
        <Table size="small" sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>
            <TableRow>
              <TableCell>
                <IndeterminateCheckBoxOutlinedIcon style={{ marginLeft: 10 }} />
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>NAME</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>INPUTS</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>RESULTS</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>REQUESTOR</TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                }}
              >
                SUBMITTED
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.Requests.map((row, index) => (
              <TableRow
                key={row.name + index.toString()}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Checkbox onChange={() => setSelectedRequest(row)} />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  {row.inputs.map((x: any, index) => {
                    return (
                      <>
                        <span key={x}>{x}</span>
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
                      alt="Remy Sharp"
                      src={row.requestor.Pic}
                      style={{ marginRight: 5 }}
                    />
                    {row.requestor.name}
                  </div>
                </TableCell>
                <TableCell>{row.submitted}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
