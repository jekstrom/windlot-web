import React from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { Grid, FormControlLabel, Checkbox } from '@material-ui/core';

const styles = (theme: Theme) => 
    createStyles({
        
    });

interface Filter {
    Name: string,
    Count: number,
}

interface SearchFilterProps {
    Filter: Filter,
    Checked: boolean,
    OnChecked: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void | undefined
}
  
function SearchFilter(props: WithStyles<typeof styles> & SearchFilterProps) {
  const { classes, ...other } = props;

  return (
    <Grid item xs={12} md={12}>
        <FormControlLabel
            control={
                <Checkbox
                    checked={props.Checked}
                    onChange={props.OnChecked}
                    name={props.Filter.Name}
                    color="primary"
                />
            }
            label={`${props.Filter.Name} (${props.Filter.Count})`}
        />
    </Grid>
  );
}

export default withStyles(styles)(SearchFilter);
