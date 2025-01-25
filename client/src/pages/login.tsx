import { Button, Stack, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Import toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast notifications
import { login } from "../features/LoginLogout";
import axiosInstance from "../helpers/requestor";
import { IUserInput } from "../models/user.model";

const StyledForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  padding: theme.spacing(3),
  backgroundColor: "#333", // Dark background
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  width: "100%",
  maxWidth: 400,
  margin: "auto",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    color: "#fff",
    backgroundColor: "#444",
    borderRadius: theme.shape.borderRadius,
  },
  "& .MuiInputLabel-root": {
    color: "#aaa",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#fff",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#555",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#777",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#aaa",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: "uppercase",
  fontWeight: "bold",
  color: "#fff",
  backgroundColor: theme.palette.primary.main,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserInput>();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = async (data: IUserInput) => {
    try {
      console.log(`${import.meta.env.VITE_API_URL}`);
      const { data: userData } = await axiosInstance.post(
        `${import.meta.env.VITE_API_URL}/user/login`,
        data
      );
      Cookies.set("accesstoken", userData.data.token, {
        expires: 30,
      });

      toast("Login Successfull", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTimeout(() => {
        navigate(userData?.data?.user?.role === "admin" ? "/admin" : "/");
      }, 2500);
      dispatch(
        login({
          email: userData?.data?.user.email,
          role: userData?.data?.user.role,
        })
      );
    } catch (error: any) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ backgroundColor: "#121212", color: "#fff", minHeight: "100dvh" }}
    >
      <Stack
        alignSelf={"center"}
        gap={"2rem"}
        alignItems={"center"}
        minWidth={{ sm: "30rem", xs: "auto" }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          LOGIN
        </Typography>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <StyledTextField
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format",
              },
            })}
            type="email"
            label="Email"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <StyledTextField
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
            type="password"
            label="Password"
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <StyledButton type="submit" fullWidth>
            Login
          </StyledButton>
        </StyledForm>
      </Stack>

      <ToastContainer position="bottom-right" autoClose={5000} />
    </Stack>
  );
};

export default Login;
