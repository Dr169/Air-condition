import { useState } from "react";

import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { gql, useMutation } from "@apollo/client";

const deleteUser = gql`
  mutation deleteUser($userId: ID!) {
    deleteUser(userId: $userId) {
      success
    }
  }
`;

export const AlertDialog = (id) => {
  const [open, setOpen] = useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleCloseNo = () => {
    setOpen(false);
  };
  const handleCloseYes = () => {
    setOpen(false);
    const { data } = delUser({
      variables: { userId: parseInt(id.id) },
    });
    console.log(data);
  };

  const [delUser] = useMutation(deleteUser);

  return (
    <>
      <DeleteIcon
        onClick={handleDialogOpen}
        sx={{
          position: "absolute",
          right: "0px",
          marginRight: "10px",
          color: "#999",
          transition: "0.3s",
          ":hover": {
            color: "#555",
            scale: "1.1",
          },
        }}
      />
      <Dialog
        open={open}
        onClose={handleCloseNo}
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>آیا از حذف کردن کاربر اطمینان دارید؟</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseNo}>خیر</Button>
          <Button onClick={handleCloseYes} color="error">
            بله
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
