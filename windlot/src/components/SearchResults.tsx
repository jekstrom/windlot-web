import React from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { Button, Grid, Typography, TextField } from '@material-ui/core';
import SearchFilter from './SearchFilter'
import SearchItem from './SearchItem'

const styles = (theme: Theme) => 
    createStyles({
        root: {
            '& > *': {
            margin: theme.spacing(0),
            },
        }, 
        body: {
            '& > *': {
            margin: theme.spacing(1)
            },
        }, 
        button:{
            margin: theme.spacing(1)
        },
        searchHeader: {
            textAlign: "center",
            border: 1,
            width: "100%",
            borderStyle: "solid"
        },
        filterHeader: {
            borderBottom: "solid",
            borderBottomWidth: "1px",
            width: "92%",
            textTransform: "uppercase",
        },
        searchFilters: {
            textAlign: "left",
            width: "25%",
            height: "100%",
            margin: theme.spacing(1),
            borderRight: "solid",
            borderRightWidth: "1px"
        },
        searchResults: {
            textAlign: "left",
            width: "65%",
            height: "100%",
            margin: theme.spacing(1),
        },
        title: {},
        listingImage: {
            width: "100%",
        },
        listingButton: {
            justifyItems: "right",
            alignContent: "right",
            textAlign: "right"
        },
    });

interface Filter {
    Name: string,
    Count: number
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

interface SearchResultsProps extends WithStyles<typeof styles> {
    Filters: Array<FilterCategory>
}

interface IState {
    CheckedFilters: Array<Filter>,
    Items: Array<Item>,
    QueryText: string
}
  
class SearchResults extends React.Component<SearchResultsProps, IState> {
  constructor(props: SearchResultsProps) {
      super(props);
      this.state = {
          CheckedFilters: [],
          QueryText: "",
          Items: []
      }
  }

  componentDidMount() {
      try {
        // fetch search results from elasticsearch
        console.log("search");
        this._getSearchResults();
      } catch (error) {
          console.log(error);
      }
  }

    _getSearchResults = async () => {
        console.log("Getting search results...")
        let self = this;
        try {
           let response = await fetch(
                // TODO: Get url automatically (configuration??)
                'https://0mxjsyzjjj.execute-api.us-west-2.amazonaws.com/dev/search',
                {
                    mode: 'cors',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        queryText: self.state.QueryText,
                        filters: JSON.stringify(self.state.CheckedFilters)
                    })
                }
            );
            let json = await response.json();
            console.log(json);

            let searchItems: Array<Item> = json.items?.map((h: any) => self._createItemFromSearchResults(h))

            this.setState({Items: searchItems})

            return json;
        } catch (error) {
            console.log(error);
        }
    }

    _createItemFromSearchResults = (searchHit: any) => {
        return {
            "Name": searchHit._source.name,
            "Price": searchHit._source.price,
            "Id": searchHit._id,
            "ImageUrl": ""
        }
    }

    _isFilterChecked = (filter: Filter) => {
        return this.state.CheckedFilters.some((cf) => cf.Name == filter.Name)
    }

    _checkFilter = (filter: Filter) => {
        if (!this._isFilterChecked(filter)) {
            this.setState({CheckedFilters: this.state.CheckedFilters.concat(filter)});
        } else {
            this.setState({CheckedFilters: this.state.CheckedFilters.filter((cf) => cf.Name !== filter.Name)});
        }
    }

  render() {
    const { classes } = this.props;
    const self = this;
    return (
        <Grid className={classes.root} container spacing={1}>
            {/* TODO: Convert to stateless components */}
            <Grid container className={classes.searchHeader} spacing={1}>
                <Grid item xs={3} md={3}>
                    <TextField 
                        id="search"
                        placeholder="Search"
                        onChange={(queryText) => self.setState({QueryText: queryText.currentTarget.value})}
                    />
                </Grid>
                <Grid item xs={3} md={3}>
                    <Button 
                        variant="contained"
                        color="primary"
                        onClick={() => self._getSearchResults()}>
                            Search
                    </Button>
                </Grid>
            </Grid>
            
            <Grid container className={classes.searchFilters} spacing={1}>
                {
                    this.props.Filters?.map(function(filterCategory, i) {
                        return <Grid container xs={12} md={12}>
                            <Typography className={classes.filterHeader}>
                                {filterCategory.Name}
                            </Typography>
                            {
                                filterCategory.Filters.map(function(filter, y) {
                                    return <SearchFilter 
                                        Filter={filter} 
                                        Checked={self._isFilterChecked(filter)} 
                                        OnChecked={(f) => self._checkFilter(filter)} 
                                    />
                                })
                            }
                        </Grid>
                    })
                }
            </Grid>
            
            <Grid container className={classes.searchResults} spacing={1}>
                {
                    this.state.Items?.map(function(item, i) {
                        return <SearchItem Item={item} />
                    })
                }
            </Grid> 

            {/* Text box/filter checkbox thing */}
            {/* list view of property listings */}
                {/* hero picture, price, (title?) location, reservation window, game type? */}
            {/* click on any listing -> details page */}
            
        </Grid>
        );
    }
}

export default withStyles(styles)(SearchResults);
