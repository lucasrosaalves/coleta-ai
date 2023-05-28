import { City } from "@/entities/city";
import { ProductCategory } from "@/entities/product-category";
import { CreateProductRequest } from "@/requests/create-product-request";
import { getCities } from "@/services/city-service";
import { getProductCategories } from "@/services/product-category-service";
import { createProduct } from "@/services/product-service";
import { getBase64 } from "@/utils/file-utils";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

export const getServerSideProps: GetServerSideProps<{
  productCategories: ProductCategory[];
  cities: City[];
}> = async () => {
  const productCategories = await getProductCategories();
  const cities = await getCities();
  return { props: { productCategories, cities } };
};

export default function CreateProduct({
  productCategories,
  cities,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [state, setState] = useState<CreateProductRequest>({
    name: "",
    description: "",
    selectedCategoryId: 0,
    selectedCityId: 0,
    quantity: 0,
    picture: "",
  });
  const router = useRouter();

  const handleFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.length === 1 ? e.target.files[0] : undefined;

    if (!file) {
      setState((prev) => ({
        ...prev,
        picture: "",
      }));
      return;
    }

    getBase64(file, (fileResult: string | undefined) => {
      setState((prev) => ({
        ...prev,
        picture: fileResult ?? "",
      }));
    });
  };

  const stateIsValid = () => {
    return (
      state.name.length > 0 &&
      state.description.length > 0 &&
      state.selectedCategoryId > 0 &&
      state.selectedCityId > 0 &&
      state.quantity > 0 &&
      state.picture.length > 0
    );
  };

  const save = () => {
    if (!stateIsValid()) {
      return;
    }

    createProduct(state)
      .then(() => {
        router.push("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Card
      variant="outlined"
      sx={{
        padding: 3,
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Informações do Produto
        </Typography>
        <Box display="flex" flexDirection="column" margin={5}>
          <TextField
            id="name"
            label="Nome"
            variant="outlined"
            sx={{ my: 1 }}
            value={state.name}
            onChange={(e) => {
              e.preventDefault();
              setState((prev) => ({
                ...prev,
                name: e.target.value,
              }));
            }}
          />
          <TextField
            id="description"
            label="Descrição"
            variant="outlined"
            sx={{ my: 1 }}
            value={state.description}
            onChange={(e) => {
              e.preventDefault();
              setState((prev) => ({
                ...prev,
                description: e.target.value,
              }));
            }}
          />
          <FormControl sx={{ my: 1 }}>
            <InputLabel id="category">Categoria</InputLabel>
            <Select
              labelId="category"
              id="category"
              value={state.selectedCategoryId}
              onChange={(e) => {
                e.preventDefault();
                setState((prev) => ({
                  ...prev,
                  selectedCategoryId: Number(e.target.value),
                }));
              }}
              fullWidth
              input={<OutlinedInput label="Categoria" />}
            >
              <MenuItem value={0}>
                <em>None</em>
              </MenuItem>

              {productCategories?.map(({ id, name }) => {
                return (
                  <MenuItem key={id} value={id}>
                    {name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl sx={{ my: 1 }}>
            <InputLabel id="city">Cidade</InputLabel>
            <Select
              labelId="city"
              id="city"
              value={state.selectedCityId}
              onChange={(e) => {
                e.preventDefault();
                setState((prev) => ({
                  ...prev,
                  selectedCityId: Number(e.target.value),
                }));
              }}
              fullWidth
              input={<OutlinedInput label="Cidade" />}
            >
              <MenuItem value={0}>
                <em>None</em>
              </MenuItem>

              {cities?.map(({ id, name }) => {
                return (
                  <MenuItem key={id} value={id}>
                    {name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <TextField
            id="quantity"
            label="Quantidade"
            variant="outlined"
            sx={{ my: 1 }}
            value={state.quantity}
            type="number"
            onChange={(e) => {
              e.preventDefault();
              setState((prev) => ({
                ...prev,
                quantity: Number(e.target.value),
              }));
            }}
          />
          <Button variant="contained" component="label">
            Adicionar Fotos
            <input
              type="file"
              hidden
              multiple={false}
              onChange={handleFilesChange}
              accept=".png,.jpg,.jpeg"
            />
          </Button>
        </Box>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          size="large"
          variant="contained"
          disabled={!stateIsValid()}
          onClick={save}
        >
          Salvar
        </Button>
      </CardActions>
    </Card>
  );
}
