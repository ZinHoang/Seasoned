import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import Favorite from '@mui/icons-material/Favorite'
import { pink } from '@mui/material/colors'
import { OpenInNew } from '@mui/icons-material'
import { Box, List, ListItem, Typography, Button } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSeedling, faBook } from '@fortawesome/free-solid-svg-icons'
import { postFavouriteProduct } from '../apis/produce'

import { fetchRecipes } from '../actions'

export default function Recipe() {
  const { id, ingredient } = useParams()
  const loading = useSelector((state) => state.loading)
  const dispatch = useDispatch()
  const recipes = useSelector((state) => state.recipes)
  const user = useSelector((state) => state.loggedInUser)
  const recipe = recipes[id]
  const [checked, setChecked] = useState(false)

  const { label, image, ingredients, healthLabels, url } = recipe
    ? recipe.recipe
    : {}

  const dietary = healthLabels?.filter((word) => {
    return word === 'Vegan' || word === 'Vegetarian' || word === 'Gluten-Free'
  })

  useEffect(() => dispatch(fetchRecipes(ingredient)), [])

  const handleFavourite = async (e) => {
    const favourite = { label: label, url: url }
    setChecked(e.target.checked)
    await postFavouriteProduct(favourite, user.auth0_id)
  }

  return (
    <div>
      {loading && (
        <img
          width={'100%'}
          src="https://cdn.dribbble.com/users/393062/screenshots/14492170/media/67f661f7f825b62980571026e1280675.gif"
          alt="loading gif"
        />
      )}
      {label && (
        <>
          <Box
            sx={{
              margin: '0px auto',
              width: {
                xs: '90%', // theme.breakpoints.up('xs')
                sm: 200, // theme.breakpoints.up('sm')
                md: 300, // theme.breakpoints.up('md')
                lg: 400, // theme.breakpoints.up('lg')
                xl: 500, // theme.breakpoints.up('xl')
              },
            }}
          >
            <Typography
              sx={{
                textAlign: 'center',
                marginBottom: '30px',
              }}
              variant="h4"
            >
              {label}
            </Typography>
            <img width={'100%'} src={image} alt={label} />

            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={handleFavourite}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    sx={{
                      color: pink[800],
                      '&.Mui-checked': {
                        color: pink[600],
                      },
                    }}
                  />
                }
                label="Add to Favourite"
              />
            </FormGroup>
          </Box>
        </>
      )}
      <Box
        sx={{
          margin: '0px auto',
          width: {
            xs: '90%', // theme.breakpoints.up('xs')
            sm: 200, // theme.breakpoints.up('sm')
            md: 300, // theme.breakpoints.up('md')
            lg: 400, // theme.breakpoints.up('lg')
            xl: 500, // theme.breakpoints.up('xl')
          },
        }}
      >
        <Typography>
          <strong>{dietary?.map((e) => e + ' ')} </strong>
        </Typography>
        <div>
          {ingredients && (
            <>
              <Typography paddingTop={'20px'} variant="h4">
                Ingredients{' '}
                <FontAwesomeIcon color="#3F6C51" icon={faSeedling} />
              </Typography>
              <List>
                {ingredients.map((ingredient, idx) => (
                  <ListItem key={idx}>{ingredient.text}</ListItem>
                ))}
              </List>

              <Typography paddingTop={'20px'} variant="h4">
                Instructions <FontAwesomeIcon color="#BF572B" icon={faBook} />
              </Typography>
              <Box>
                <Button
                  variant="body1"
                  startIcon={<OpenInNew />}
                  target="_blank"
                  href={url}
                  rel="noreferrer"
                  color="#3F6C51"
                  aria-label="Open recipe in new tab"
                >
                  Recipe here!
                </Button>
              </Box>
            </>
          )}
        </div>
      </Box>
    </div>
  )
}
