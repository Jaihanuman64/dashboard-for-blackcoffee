import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  likelihood,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "components/Header";
import { useGetBlackcoffeeQuery } from "state/api";

const Product = ({
  _id,
  end_year,
  sector,
  region,
  relevance,
  likelihood,
  pestle,
  country,
  topic,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {pestle || "..."}
        </Typography>
        <Typography variant="h5" component="div">
        Sector: {sector}
        </Typography>
        {/* <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ${Number(relevance).toFixed(2)}
        </Typography> */}
        
        

        <Typography variant="body2">{region || "World"}</Typography>
        <Typography variant="body2">Likelihood: {likelihood}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>End Year: {end_year}</Typography>
          <Typography>Country: {country}</Typography>
          <Typography>
            Topic: {topic}
          </Typography>
        
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Products = () => {
  const { data, isLoading } = useGetBlackcoffeeQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="List of Data" subtitle="See the data at glance." />
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data.map(
            ({
              _id,
              end_year,
              sector,
              region,
              relevance,
              likelihood,
              pestle,
              country,
              topic,
            }) => (
              <Product
                key={_id}
                end_year={end_year}
                sector={sector}
                region={region}
                relevance={relevance}
                likelihood={likelihood}
                pestle={pestle}
                country={country}
                topic={topic}
              />
            )
          )}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Products;
