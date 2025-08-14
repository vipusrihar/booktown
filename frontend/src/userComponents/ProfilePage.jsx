import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Paper, Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById } from '../state/user/Action';
import EditIcon from '@mui/icons-material/Edit';
import EditUser from './EditUserModal';



const ProfileField = ({ label, value }) => (
  <Box sx={{ textAlign: 'left', mb: 2, display: 'flex', justifyContent: 'space-between' }}>
    <Typography variant="subtitle1" fontWeight="bold">
      {label}:
    </Typography>
    <Typography variant="body1">{value || "Not available"}</Typography>
  </Box>
);

const ProfilePage = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const auth = JSON.parse(localStorage.getItem("auth"));
  const userId = auth?.user?.id;

  const user = useSelector((store) => store.users.selectedUser);

  useEffect(() => {
    if (userId) {
      dispatch(getUserById(userId));
    }
  }, [dispatch, userId]);

  const handleEditProfile = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Paper
        elevation={6}
        sx={{
          maxWidth: 400,
          margin: '50px auto',
          padding: 2,
          textAlign: 'center'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' , background :'yellow'}}>
          <Typography variant="h6" gutterBottom >
            Profile
          </Typography>

          <Button
            onClick={handleEditProfile}
          >
            <EditIcon />
          </Button>
        </Box>


        <ProfileField label="Name" value={user?.name} />
        <ProfileField label="Email" value={user?.email} />
        <ProfileField label="Phone" value={user?.phoneNo} />


        <Box sx={{ textAlign: 'left', mb: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Address:
          </Typography>
          {user?.address ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
              <Typography variant="body2">
                {user.address.street},
              </Typography>
              <Typography variant="body2">
                {user.address.city},
              </Typography>
              <Typography>
                {user.address.state},
              </Typography>
              <Typography variant="body2">
                {user.address.country} - {user.address.zipCode}
              </Typography>
            </Box>
          ) : (
            <Typography variant="body2">No address available</Typography>
          )}
        </Box>


      </Paper>

      <Modal open={open} onClose={handleClose}>
        <Box>
          <EditUser handleClose={handleClose} />
        </Box>
      </Modal>
    </Box>
  );
};



export default ProfilePage;
