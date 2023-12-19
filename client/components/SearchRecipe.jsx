import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRecipes, fetchSeason } from '../actions'

import Recipes from './Recipes'
import SeasonalProduct from './SeasonalProduct'

import { FilterAlt, FilterAltOff } from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search'
import {
  Box,
  TextField,
  IconButton,
  InputAdornment,
  FormGroup,
  FormControlLabel,
  Checkbox,
  MenuItem,
  FormControl,
  ToggleButton,
} from '@mui/material'

export default function SearchRecipe() {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.loading)
  const [ingredient, setIngredient] = useState('')
  const [season, setSeason] = useState('')
  const [toggleFilters, setToggleFilters] = useState(false)
  const [dietaryForm, setDietaryForm] = useState({
    vegan: false,
    vegetarian: false,
    'gluten-free': false,
  })
  const [mealType, setMealType] = useState({
    breakfast: false,
    teatime: false,
    lunch: false,
    dinner: false,
    snack: false,
  })

  const handleSearch = (e) => {
    e.preventDefault()

    let dietary = ''
    for (const key in dietaryForm) {
      if (dietaryForm[key]) {
        dietary += `&health=${key}`
        dietaryForm[key] = false
      }
    }

    let meal = ''
    for (const key in mealType) {
      if (mealType[key]) {
        meal += `&mealType=${key}`
        mealType[key] = false
      }
    }

    dispatch(fetchRecipes(ingredient + dietary + meal))
    e.target.reset()
  }

  const handleSeason = (e) => {
    setSeason(e.target.value)
    dispatch(fetchSeason(e.target.value))
  }

  return (
    <Box>
      <Box marginBottom="30px">
        <form onSubmit={handleSearch}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              flexDirection: 'row',
              justifyContent: 'center',
              width: '95%',
              margin: '0 auto',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <FormControl
                sx={{
                  m: 0.5,
                  width: '12ch',
                }}
              >
                <TextField
                  select
                  id="season-label"
                  label="Season"
                  size="small"
                  value={season}
                  onChange={handleSeason}
                >
                  <MenuItem value="summer">Summer</MenuItem>
                  <MenuItem value="autumn">Autumn</MenuItem>
                  <MenuItem value="winter">Winter</MenuItem>
                  <MenuItem value="spring">Spring</MenuItem>
                </TextField>
              </FormControl>
            </Box>
            <TextField
              justifycontent="flex-end"
              onChange={(e) => {
                setIngredient(e.target.value)
              }}
              label="Search"
              variant="outlined"
              color="primary"
              placeholder="Find a recipe"
              size="small"
              sx={{ m: 0.5, width: '25ch' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      type="submit"
                      aria-label="search"
                      sx={{ p: '' }}
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <ToggleButton
              sx={{
                alignSelf: 'center',
                m: 0.5,
              }}
              size="small"
              value="filters"
              name="filters"
              aria-label="search filters"
              selected={toggleFilters}
              onChange={() => setToggleFilters(!toggleFilters)}
            >
              {toggleFilters ? <FilterAltOff /> : <FilterAlt />}
            </ToggleButton>
          </Box>
        </form>

        {/* Show/Hide these FormGroups when a Toggle is toggled */}
        {toggleFilters && (
          <>
            <FormGroup
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                fontSize: '0.8em',
                padding: '10px',
              }}
              size="small"
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={dietaryForm.vegan}
                    name="Vegan"
                    onChange={() =>
                      setDietaryForm({
                        ...dietaryForm,
                        vegan: !dietaryForm.vegan,
                      })
                    }
                  />
                }
                label="Vegan"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={dietaryForm.vegetarian}
                    name="Vegetarian"
                    onChange={() =>
                      setDietaryForm({
                        ...dietaryForm,
                        vegetarian: !dietaryForm.vegetarian,
                      })
                    }
                  />
                }
                label="Vegetarian"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={dietaryForm['gluten-free']}
                    name="Gluten-Free"
                    onChange={() =>
                      setDietaryForm({
                        ...dietaryForm,
                        'gluten-free': !dietaryForm['gluten-free'],
                      })
                    }
                  />
                }
                label="Gluten-Free"
              />
            </FormGroup>
            <FormGroup
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                fontSize: '0.8em',
                padding: '10px',
              }}
              size="small"
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={mealType.breakfast}
                    name="Breakfast"
                    onChange={() =>
                      setMealType({
                        ...mealType,
                        breakfast: !mealType.breakfast,
                      })
                    }
                  />
                }
                label="Breakfast"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={mealType.lunch}
                    name="Lunch"
                    onChange={() =>
                      setMealType({
                        ...mealType,
                        lunch: !mealType.lunch,
                      })
                    }
                  />
                }
                label="Lunch"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={mealType.teatime}
                    name="Teatime"
                    onChange={() =>
                      setMealType({
                        ...mealType,
                        teatime: !mealType.teatime,
                      })
                    }
                  />
                }
                label="Teatime"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={mealType.dinner}
                    name="Dinner"
                    onChange={() =>
                      setMealType({
                        ...mealType,
                        dinner: !mealType.dinner,
                      })
                    }
                  />
                }
                label="Dinner"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={mealType.snack}
                    name="Snack"
                    onChange={() =>
                      setMealType({
                        ...mealType,
                        snack: !mealType.snack,
                      })
                    }
                  />
                }
                label="Snack"
              />
            </FormGroup>
          </>
        )}
        {loading && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <img
              style={{ width: '50%', height: 'auto' }}
              src="https://cdn.dribbble.com/users/393062/screenshots/14492170/media/67f661f7f825b62980571026e1280675.gif"
              alt="Loading animation"
            />
          </div>
        )}
      </Box>
      <Recipes />
      <SeasonalProduct />
    </Box>
  )
}
