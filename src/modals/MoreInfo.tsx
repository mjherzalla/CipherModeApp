import * as React from "react";
import Textarea from "@mui/joy/Textarea";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface Request {
  id: string;
  name: string;
  inputs: string[];
  results: string;
  submitted: string;
  requestor: { name: string; Pic: string };
}
interface Iporps {
  selectedRequests: Request;
  originalrequests: any[];
}

export default function BasicModal(props: Iporps) {
  const [open, setOpen] = React.useState(false);
  const [originalrequest, setOriginalrequest] = React.useState(
    props.originalrequests
  );

  const [massage, setMassage] = React.useState("");

  React.useEffect(() => {
    setOriginalrequest(props.originalrequests);
  }, [props.originalrequests]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMessage = () => {
    const newRequestArry = [...props.originalrequests];

    const { UpdateRequestRequest } = require("../data/backend_pb.js");
    const { BackendClient } = require("../data/backend_grpc_web_pb.js");
    var client = new BackendClient(
      "http://mock.ciphermode.com:50051",
      null,
      null
    );

    const update = new Promise((resolve, reject) => {
      resolve(newRequestArry);
    });

    update.then((x) => {
      const req = new UpdateRequestRequest(
        props.selectedRequests.id,
        originalrequest,
        x
      );
      console.log(originalrequest);
      console.log(x);
      client.updateRequest(req, {}, (err: any, res: any) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(res);
      });
    });
  };

  return (
    <div>
      <Button
        style={{ color: "black" }}
        variant="text"
        startIcon={<InfoOutlinedIcon />}
        onClick={handleClickOpen}
      >
        MORE INFO NEEDED
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ minWidth: 450 }}> Message requestor </DialogTitle>
        <DialogContent>
          <Textarea
            color="primary"
            placeholder="What additonal information is needed in order to process this request?"
            minRows={10}
            value={massage}
            onChange={(x) => {
              setMassage(x.target.value);
            }}
          />
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleMessage}>
            Send message
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
