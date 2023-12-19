import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Box, Grid, Container, Typography } from '@mui/material'
import ProductCard from './ProductCard'
import AppPagination from './AppPagination'

export default function SeasonalProduct() {
  const seasonalProducts = useSelector((state) => state.seasonalProduct)
  const [products, setProducts] = useState([])

  return (
    <div>
      {seasonalProducts?.length > 0 && (
        <Box display="flex" justifyContent={'center'} sx={{ p: 4 }}>
          <Typography variant="h5">Seasonal Products</Typography>
        </Box>
      )}

      <Container>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          justifyContent={'center'}
          sx={{ m: '20px 4px 10px 4px' }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {products?.map((product) => (
            <Grid
              item
              xs={2}
              sm={4}
              md={2}
              display="flex"
              flexDirection={'column'}
              alignItems="center"
              key={product.display_name}
            >
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
        {seasonalProducts?.length > 0 && (
          <AppPagination setProducts={(product) => setProducts(product)} />
        )}
      </Container>
    </div>
  )
}
