import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

function Chattest() {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    console.log("输入的内容是:", inputValue);
    // 在这里处理输入的数据
    setOpen(false);
  };

  return (
    <div className="App">
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        打开对话框
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">输入对话框</DialogTitle>
        <DialogContent>
          <DialogContentText>
            请输入一些内容
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="文本输入"
            type="text"
            fullWidth
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            取消
          </Button>
          <Button onClick={handleSubmit} color="primary">
            确认
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Chattest;
