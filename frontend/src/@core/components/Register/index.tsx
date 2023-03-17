import { useContext } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { User } from "../../../types/User";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "@mui/material/Link";

const theme = createTheme();

const validateSchema = yup.object().shape({
  name: yup.string().required("Nome é um campo obrigatório"),
  email: yup.string().required("Email é um campo obrigatório").email(),
  password: yup.string().required("Senha é um campo obrigatório"),
  passwordConfirm: yup.string().required("Confirmação de senha é obrigatório"),
});

const Register = () => {
  const auth = useContext(AuthContext);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validateSchema) });

  const onSubmit = async (data: User) => {
    const { name, email, password, passwordConfirm } = data;

    if (email && password && name && passwordConfirm) {
      if (password !== passwordConfirm) {
        toast.error("Senhas não conferem");
      } else {
        const register = await auth.register(name, email, password);
        if (register) {
          router.push("/");
          toast.success("Usuário criado com sucesso!");
        } else {
          toast.error("Não foi possível criar usuário");
        }
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CssBaseline />
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrar
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              {...register("name")}
              error={!!errors.name?.message}
              helperText={errors.name?.message?.toString() || ""}
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nome"
              name="name"
              autoFocus
            />
            <TextField
              {...register("email")}
              error={!!errors.email?.message}
              helperText={errors.email?.message?.toString() || ""}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Endereço de email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              {...register("password")}
              error={!!errors.password?.message}
              helperText={errors.password?.message?.toString() || ""}
              margin="normal"
              required
              fullWidth
              id="password"
              label="Senha"
              type="password"
              name="password"
              autoComplete="current-password"
            />
            <TextField
              {...register("passwordConfirm")}
              error={!!errors.passwordConfirm?.message}
              helperText={errors.passwordConfirm?.message?.toString() || ""}
              margin="normal"
              required
              fullWidth
              id="passwordConfirm"
              label="Confirme a senha"
              type="password"
              name="passwordConfirm"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrar
            </Button>
            <Grid container>
              <Grid item xs>
              <Link href="./Login" variant="body2">
                  {"Conecte-se"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default Register;