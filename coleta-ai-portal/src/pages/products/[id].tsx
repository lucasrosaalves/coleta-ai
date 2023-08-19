import { City } from "@/entities/city";
import { Product } from "@/entities/product";
import { ProductCategory } from "@/entities/product-category";
import { getCities } from "@/services/city-service";
import { getProductCategories } from "@/services/product-category-service";
import { getProduct } from "@/services/product-service";
import { useSearchParams, useRouter } from "next/navigation";

import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useIsAuthenticated } from "@/hooks/useIsAuthenticated";

type State = {
  product?: Product;
  cities: City[];
  productCategories: ProductCategory[];
};

export default function ProductDetails() {
  const isAuthenticated = useIsAuthenticated();
  const router = useRouter();
  const redirectToLogin = () => {
    if (typeof window !== "undefined") {
      router.push("/login");
    }
  };
  if (!isAuthenticated) {
    redirectToLogin();
  }
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [{ product, cities, productCategories }, setState] = useState<State>({
    cities: [],
    productCategories: [],
    product: undefined,
  });

  useEffect(() => {
    if (!id) {
      return;
    }
    Promise.all([
      getProduct(Number(id)),
      getCities(),
      getProductCategories(),
    ]).then(([product, cities, productCategories]) => {
      setState({
        product,
        cities,
        productCategories,
      });
    });
  }, [id]);

  if (!product) {
    return <></>;
  }

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

          <Typography component="div">
            Responsável:
            {product.userName}
          </Typography>
          <Typography component="div">
            Telefone:
            {product.usePhone}
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
