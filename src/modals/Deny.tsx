
import * as React from 'react';
import Textarea from '@mui/joy/Textarea';
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
interface Requests {
    name: string;
    inputs: string[];
    results: string;
    submitted: string;
    requestor: { name: string; Pic: string };
}
interface Iporps {
    selectedRequests: Requests
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
                startIcon={<DoDisturbOnOutlinedIcon />}
                onClick={handleClickOpen}
            >
                DENY REQUEST
            </Button>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle style={{ minWidth: 500 }}> DENY REQUEST</DialogTitle>
                <DialogContent>

                    <Textarea color="primary" placeholder="Deny request reasons... " minRows={10} />
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined">Cancel</Button>
                    <Button variant="contained">Submit</Button>


                </DialogActions>
            </Dialog>
        </div>
    );
}

