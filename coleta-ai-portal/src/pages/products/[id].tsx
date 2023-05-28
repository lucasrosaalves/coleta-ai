import { City } from "@/entities/city";
import { Product } from "@/entities/product";
import { ProductCategory } from "@/entities/product-category";
import { getCities } from "@/services/city-service";
import { getProductCategories } from "@/services/product-category-service";
import { getProduct } from "@/services/product-service";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";

export const getServerSideProps: GetServerSideProps<{
  product: Product;
  cities: City[];
  productCategories: ProductCategory[];
}> = async (context: GetServerSidePropsContext) => {
  const { id } = context.query;
  const product = await getProduct(Number(id));
  const cities = await getCities();
  const productCategories = await getProductCategories();

  return { props: { product, cities, productCategories } };
};

export default function ProductDetails({
  product,
  cities,
  productCategories,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Card
      variant="outlined"
      sx={{
        padding: 3,
        display: "flex",
        maxWidth: 800,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", minWidth: 350 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {product.description}
          </Typography>
          <Typography component="div">
            Quantidade: {product.quantity}
          </Typography>
          <Typography component="div">
            Categoria:
            {
              productCategories.find((p) => p.id === product.productCategoryId)
                ?.name
            }
          </Typography>
          <Typography component="div">
            Cidade:
            {cities.find((p) => p.id === product.cityId)?.name}
          </Typography>

          <Button variant="contained" component="label">
            Coletar
          </Button>
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 350 }}
        image={product.pictures[0]}
      />
    </Card>
  );
}
