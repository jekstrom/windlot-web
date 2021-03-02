import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Typography, Card, CardActions, CardContent, CardMedia, FormControlLabel, TextField, Checkbox, Hidden } from '@material-ui/core';
import listing1 from './pics/land.jpg'
import SearchResults from '../components/SearchResults'

interface Filter {
  Name: string,
  Count: number,
}

interface FilterCategory {
  Filters: Array<Filter>,
  Name: string
}

interface Item {
  Name: string,
  Price: number,
  Id: string,
  ImageUrl: string
}

interface SearchResultsProps {
  Filters: Array<FilterCategory>,
  Items: Array<Item>
}


interface IProps {
  routerProps: any
}

interface IState {
  filters: Array<FilterCategory>,
  items: Array<Item>
}

class Home extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      filters: [
        {
          "Name": "Game Type",
          "Filters": [
            {
              "Name": "Deer",
              "Count": 2,
            },
            {
              "Name": "Grouse",
              "Count": 3,
            },
            {
              "Name": "Duck",
              "Count": 44,
            },
            {
              "Name": "Bear",
              "Count": 5,
            },
          ]
        },
        {
          "Name": "Amenities",
          "Filters": [
            {
              "Name": "Privy",
              "Count": 24,
            },
            {
              "Name": "Parking",
              "Count": 23,
            },
            {
              "Name": "Tree stand",
              "Count": 414,
            },
            {
              "Name": "Blind",
              "Count": 56,
            },
          ]
        }
      ],
      items: [
        {
          "Name": "Listing 1",
          "Price": 123.23,
          "ImageUrl": listing1,
          "Id": "3940-2394-345"
        },
        {
          "Name": "Listing 2",
          "Price": 23.23,
          "ImageUrl": listing1,
          "Id": "3950-2394-345"
        },
        {
          "Name": "Listing 3",
          "Price": 1243.23,
          "ImageUrl": listing1,
          "Id": "3970-2394-345"
        },
      ]
    }
  }

  render() {
    return (
      <SearchResults Filters={this.state.filters} routerProps={this.props.routerProps} />
    )
  }
}

export default Home;
