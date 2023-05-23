import { ProductCategory } from "@/entities/product-category";
import { getProductCategories } from "@/services/product-category-service";
import {
  Card,
  CardContent,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState } from "react";

export const getServerSideProps: GetServerSideProps<{
  productCategories: ProductCategory[];
}> = async () => {
  const productCategories = await getProductCategories();
  return { props: { productCategories } };
};

export default function CreateProduct({
  productCategories,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
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
        <Grid
          container
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item xs={12}>
            <TextField id="name" label="Nome" variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField id="description" label="Descrição" variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <Select
              labelId="category"
              id="category"
              value={selectedCategoryId}
              onChange={(e) => {
                setSelectedCategoryId(Number(e.target.value));
              }}
              fullWidth
              label="Category"
            >
              <MenuItem value={0}>
                <em>None</em>
              </MenuItem>

              {productCategories?.map((productCategory) => {
                return (
                  <MenuItem key={productCategory.id} value={productCategory.id}>
                    {productCategory.name}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <TextField id="frequency" label="Frequência" variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField id="quantity" label="Quantidade" variant="outlined" />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
