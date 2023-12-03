import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Collapse, Checkbox, FormControlLabel, Button } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

function FilterSidebar(props) {
  const [open, setOpen] = useState({});
  const [filters, setFilters] = useState({});
  const filterData = {
    "Gender": [],
    "Age": [],
    "Matching Radius": []
  };

  const handleClick = (category) => {
    setOpen({ ...open, [category]: !open[category] });
  };

  const handleToggle = (filter) => {
    setFilters({ ...filters, [filter]: !filters[filter] });
  };

  const handleApply = () => {
    console.log('Filters:', filters);

    const appliedFilters = {
        Gender: [],
        Age: [],
        MatchingRadius: []
      };
  
      Object.keys(filters).forEach(filter => {
        if (filters[filter]) {
          if (categories.Gender.includes(filter)) {
            appliedFilters.Gender.push(filter);
          } else if (categories.Age.includes(filter)) {
            appliedFilters.Age.push(filter);
          } else if (categories['Matching Radius'].includes(filter)) {
            appliedFilters.MatchingRadius.push(filter);
          }
        }
      });
      
      console.log('Applied Filters:', appliedFilters);
      props.setAppliedFilters(appliedFilters);

  };

  const categories = {
    // Add categories and filters as needed
    Gender: ['male', 'female', 'non-binary'],
    Age: ['<18', '18 ~ 25', '26 ~ 30', '30 ~ 40', '40 ~ 50', '50+'],
    'Matching Radius': ['< 1km', '< 3 km', '< 5 km', '< 10km']
  };

  return (
    <Drawer variant="permanent" anchor="left">
      <List>
        {Object.keys(categories).map((category) => (
          <React.Fragment key={category}>
            <ListItem button onClick={() => handleClick(category)} style={{backgroundColor: "#2375E0"}}>
              <ListItemText primary={category} style={{color: "white"}} />
              {open[category] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open[category]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {categories[category].map((filter) => (
                  <ListItem key={filter} button>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={filters[filter] || false}
                          onChange={() => handleToggle(filter)}
                          name={filter}
                        />
                      }
                      label={filter}
                    />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
      <Button
        variant="contained"
        color="primary"
        onClick={handleApply}
        style={{ width: "200px", margin: '10px' }}
      >
        Apply
      </Button>
    </Drawer>
  );
}

export default FilterSidebar;
