import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../state/authentication/Action";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role,setRole] = useState("ROLE_USER"); 
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
    navigate('/');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      console.log("Password Not match", password, confirmPassword);
      alert("Password Not match", password, confirmPassword);
      return;
    }
    const userData = {
      name,
      email,
      password,
      role,
      confirmPassword,
    };
    dispatch(registerUser(userData, navigate));

  };

  return (
    <Modal open={open} sx={{
      backgroundImage: 'url("https://images2.alphacoders.com/261/26102.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      marginTop:0
    }}>
      <div className="absolute top-1/2 left-1/2 w-[400px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold text-center w-full">Sign Up</h1>
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
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
          />
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
          <TextField
            label="ConfirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            Sign Up
          </Button>
        </form>


        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </Modal>
  );
}

export default SignupPage;
