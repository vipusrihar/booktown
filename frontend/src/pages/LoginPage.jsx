import Modal from "@mui/material/Modal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { loginUser } from "../state/authentication/Action";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
    navigate('/');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password, navigate));
  };


  return (
    <Modal
      open={open} sx={{
        backgroundImage: 'url("https://images2.alphacoders.com/261/26102.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        marginTop: 0
      }}>
      <div className="absolute top-1/2 left-1/2 w-[400px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-center w-full">Login</h2>
          <CloseIcon
            onClick={handleClose}
            className="cursor-pointer text-gray-500 hover:text-gray-700"
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />

          <Button
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: '#4CAF50',
              '&:hover': {
                backgroundColor: '#388E3C',
              }
            }}
          >
            Login
          </Button>
        </form>

        {/* Signup Link */}
        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </Modal>
  );
}

export default LoginPage