import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { User } from "../../../types/User";

const validateSchema = yup.object().shape({
  email: yup.string().required("Email é um campo obrigatório").email(),
  password: yup.string().required("Senha é um campo obrigatório"),
});

const Login = () => {
  const theme = createTheme();

  const { signin, signout } = useContext(AuthContext);

  const router = useRouter();

  const { index } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validateSchema) });

  const onSubmit = async (data: User) => {
    if (data.email && data.password) {
      try {
        const isLogged = await signin(data.email, data.password);
        if (isLogged) {
          router.push("/");
          toast.success("Login realizado com sucesso!");
        } else {
          toast.error("senha ou email não conferem");
        }
      } catch {
        toast.error("senha ou email não conferem");
      }
    }
  };
 

  /* console.log("index " + index);
  useEffect(() => {
    const handleLogout = async () => {
      const lognout = await signout();
      return lognout;
    };
    if (index === "Logout") {
      handleLogout();
      router.push("/");
    }
<<<<<<< HEAD:frontend/src/pages/Login/index.tsx
  },[]);
=======
  }); */
>>>>>>> next-fontend:frontend/src/@core/components/Login/index.tsx

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Entrar
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              {...register("email")}
              error={!!errors.email?.message}
              helperText={errors.email?.message?.toString() || " "}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              {...register("password")}
              error={!!errors.password?.message}
              helperText={errors.password?.message?.toString() || " "}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Esqueceu a senha?
                </Link>
              </Grid>
              <Grid item>
                <Link href="./Register" variant="body2">
                  {"Não tem conta? cadastre-se"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default Login;