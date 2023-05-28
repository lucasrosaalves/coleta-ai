import { Product } from "@/entities/product";
import { getProduct } from "@/services/product-service";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";

export const getServerSideProps: GetServerSideProps<{
  product: Product;
}> = async (context: GetServerSidePropsContext) => {
  const { id } = context.query;
  const product = await getProduct(Number(id));
  return { props: { product } };
};

export default function ProductDetails({
  product,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Card
      variant="outlined"
      sx={{
        padding: 3,
        display: "flex",
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
