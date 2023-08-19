import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { login } from "@/services/auth-service";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  return (
    <Card
      variant="outlined"
      sx={{
        padding: 3,
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Login
        </Typography>
        <Box display="flex" flexDirection="column" margin={5}>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            sx={{ my: 1 }}
            value={user.email}
            onChange={(e) => {
              e.preventDefault();
              setUser((prev) => ({
                ...prev,
                email: e.target.value,
              }));
            }}
          />
          <TextField
            id="password"
            label="Senha"
            variant="outlined"
            sx={{ my: 1 }}
            value={user.password}
            type="password"
            onChange={(e) => {
              e.preventDefault();
              setUser((prev) => ({
                ...prev,
                password: e.target.value,
              }));
            }}
          />
        </Box>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          size="large"
          variant="contained"
          disabled={!user.email || !user.password}
          onClick={() => {
            login(user.email, user.password)
              .then((r) => {
                router.push("/");
              })
              .catch((e) => {
                console.log(e);
              });
          }}
        >
          Login
        </Button>
      </CardActions>
    </Card>
  );
}
