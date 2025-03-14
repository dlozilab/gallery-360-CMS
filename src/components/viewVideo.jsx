import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import { FaRegCirclePlay } from "react-icons/fa6";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'black',
  border: '2px solid #000',
  boxShadow: 24,
};

export default function ViewVideo({videoUrl}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <p style={{
            color: "#682a17",
            cursor: "pointer",
            textDecoration: "underline",
          }} onClick={handleOpen}><FaRegCirclePlay /> Play</p>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <video width="100%" controls>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support HTML video.
        </video>
        </Box>
      </Modal>
    </div>
  );
}
