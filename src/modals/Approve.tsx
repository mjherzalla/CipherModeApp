import * as React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogContentText } from "@mui/material";

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
interface Iporps {
  selectedRequests: Request;
}

export default function BasicModal(props: Iporps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleApprove = () => {
    const { UpdateRequestRequest } = require("../data/backend_pb.js");

    const { BackendClient } = require("../data/backend_grpc_web_pb.js");

    var client = new BackendClient(
      "http://mock.ciphermode.com:50051",
      null,
      null
    );

    const req = new UpdateRequestRequest(props.selectedRequests.id, {
      status: "APPROVED",
    });
    client.updateRequest(req, {}, (err: any, res: any) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(res);
    });
  };

  return (
    <div>
      <Button
        style={{ color: "black" }}
        variant="text"
        startIcon={<CheckCircleIcon />}
        onClick={handleClickOpen}
      >
        APPROVE REQUEST
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ minWidth: 500 }}> APPROVE REQUEST</DialogTitle>

        <DialogContent>
          <DialogContentText style={{ margin: 5 }}>
            You are about to approve the following request:
          </DialogContentText>
          <DialogContentText
            style={{
              margin: 5,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="approveinfoDiv">
              <div>
                <span>REQUESTOR</span>
                <br />
                {props.selectedRequests.requestor.name}
              </div>
              <div>
                <span>NODE</span>
                <br />
                Mango
              </div>
              <div>
                <span>INPUT</span>
                <br />
                {props.selectedRequests.inputs.map((x: string) => {
                  return (
                    <div key={x}>
                      {x}
                      <br />
                    </div>
                  );
                })}
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="success" onClick={handleApprove}>
            Approve
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
