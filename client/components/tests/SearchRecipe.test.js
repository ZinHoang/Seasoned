/**
 * @jest-environment jsdom
 */
import React from 'react'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

import SearchRecipe from '../SearchRecipe'
import store from '../../store'

describe('<SearchRecipe />', () => {
  it('display 3 buttons (Search, Filter and Season dropdown) on the screen', () => {
    // ACT
    render(
      <Router>
        <Provider store={store}>
          <SearchRecipe />
        </Provider>
      </Router>
    )
    // ASSERT
    const checkboxes = screen.getAllByRole('button')
    expect(checkboxes).toHaveLength(3)
  })
})
