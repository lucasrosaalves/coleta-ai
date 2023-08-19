import Link from "next/link";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid, Tab, Tabs } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ProductCategory } from "@/entities/product-category";
import { getProductCategories } from "@/services/product-category-service";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Product } from "@/entities/product";
import { getProducts } from "@/services/product-service";
import { useIsAuthenticated } from "@/hooks/useIsAuthenticated";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card>
      <CardMedia
        sx={{ height: 200 }}
        image={product.pictures ? product.pictures[0] : ""}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <Link href={`/products/${product.id}`}>Detalhes</Link>
        </Button>
      </CardActions>
    </Card>
  );
};

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isAuthenticated = useIsAuthenticated();

  const redirectToLogin = () => {
    if (typeof window !== "undefined") {
      router.push("/login");
    }
  };

  if (!isAuthenticated) {
    redirectToLogin();
  }

  const productCategoryId = searchParams.get("productCategoryId");
  const [productCategories, setProductCategories] = useState<ProductCategory[]>(
    []
  );
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProductCategories().then((resp) => {
      setProductCategories(resp);
      if (resp.length == 0) {
        return;
      }
      getProducts(resp[0].id).then(setProducts);
    });
  }, []);

  useEffect(() => {
    if (!productCategoryId) {
      return;
    }
    getProducts(Number(productCategoryId)).then(setProducts);
  }, [productCategoryId]);

  const handleChange = (_: React.SyntheticEvent, value: number) => {
    router.push(`/?productCategoryId=${value}`);
  };

  const defaultProductCategoryId =
    productCategories.length > 0 ? productCategories[0].id : undefined;

  const calculateTabValue = (): number | undefined => {
    if (!productCategoryId) {
      return defaultProductCategoryId;
    }

    return typeof productCategoryId === "string"
      ? Number(productCategoryId)
      : undefined;
  };

  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Tabs
          value={calculateTabValue()}
          onChange={handleChange}
          aria-label="icon label tabs example"
        >
          {productCategories.map((productCategory) => {
            return (
              <Tab
                icon={<FavoriteIcon />}
                label={productCategory.name}
                key={productCategory.id}
                value={productCategory.id}
              />
            );
          })}
        </Tabs>
      </Grid>

      {products.map((product, idx) => {
        return (
          <Grid item xs={4} key={`product-${idx}`}>
            <ProductCard product={product} />
          </Grid>
        );
      })}
    </Grid>
  );
}
