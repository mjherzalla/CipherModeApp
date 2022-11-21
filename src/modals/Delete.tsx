import * as React from "react";
import Textarea from "@mui/joy/Textarea";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogContentText } from "@mui/material";

interface Requests {
  name: string;
  inputs: string[];
  results: string;
  submitted: string;
  requestor: { name: string; Pic: string };
}
interface Iporps {
  selectedRequests: Requests;
}

export default function BasicModal(props: Iporps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        style={{ color: "black" }}
        variant="text"
        startIcon={<DeleteOutlinedIcon />}
        onClick={handleClickOpen}
      >
        DELETE REQUEST
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ minWidth: 500 }}> DENY REQUEST</DialogTitle>

        <DialogContent>
          <DialogContentText style={{ fontWeight: "bold", margin: 5 }}>
            Are you sure you want to delete this selected request? this action
            cant be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined">Cancel</Button>
          <Button variant="contained" color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
