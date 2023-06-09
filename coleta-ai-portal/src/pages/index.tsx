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
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Product } from "@/entities/product";
import { getProducts } from "@/services/product-service";

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

export const getServerSideProps: GetServerSideProps<{
  productCategories: ProductCategory[];
  products: Product[];
}> = async (context: GetServerSidePropsContext) => {
  const { productCategoryId } = context.query;
  const productCategories = await getProductCategories();
  const products = productCategoryId
    ? await getProducts(Number(productCategoryId))
    : [];
  return { props: { productCategories, products } };
};

export default function Home({
  productCategories,
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { productCategoryId } = router.query;

  useEffect(() => {
    if (!productCategoryId && productCategories.length > 0) {
      router.push(`/?productCategoryId=${productCategories[0].id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productCategoryId, productCategories]);

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
