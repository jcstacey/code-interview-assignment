import React, { useEffect, useState } from 'react';
import './App.scss';
import { OrderRow } from './OrderRow';
import orderData from './orders.json';
import logo from "./wordmark-blue.png"
import Multiselect from 'multiselect-react-dropdown';

function App() {
  const [orderedList, setOrderedList] = useState([]) // orders sorted by date
  const [uniqueKeys, setUniqueKeys] = useState([]) // list of unique keys

  const filterableKeys = ["type", "size", "status", "condition"];

  // Sort orders by creation date
  useEffect( () => {
    setOrderedList(getOrdersSortedByDate());
  }, [])

// Get Filter Values
  useEffect(()=>{
// Array to store the grouped objects
const groupedObjects = [];

// Loop over the array of JSON objects
orderData.orders.forEach(obj => {
  filterableKeys.forEach(key => {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      const groupObj = {
        group: key,
        key: value
      };

      groupedObjects.push(groupObj);
    }
  });
});

const uniqueGroupedObjects = Array.from(new Set(groupedObjects.map(JSON.stringify)), JSON.parse);
setUniqueKeys(uniqueGroupedObjects);
  },[])

  function onChange(filterKeys) {
    // Create a map of all groupings with filtered values
    const filterMap = {};
    let filterMatch = true;
    filterKeys.forEach(key =>{
      if(filterMap[key.group])
        filterMap[key.group].push(key.key)
      else
        filterMap[key.group] = [key.key]
    })
    // Using the map filter the results based off the filter
    if(filterKeys.length > 0) {
      const sortedArray = getOrdersSortedByDate();
      setOrderedList(sortedArray.filter(order => {
        filterMatch = true
        filterableKeys.forEach(filterableKey => {
          if(filterMap[filterableKey] && filterMatch)
            filterMatch = filterMap[filterableKey].some(value => value === order[filterableKey])
        })
        return filterMatch
      }))
    }
    // If there is no filter, return original data
    else{
    setOrderedList(getOrdersSortedByDate());
    }
  }

  function getOrdersSortedByDate() {
    return orderData.orders.sort((a,b) => {
      return new Date(a.created).getTime() - 
          new Date(b.created).getTime()
  }).reverse()
  }

  return (
    <div className="App">
      <div className="App__header">
        <img src={logo} alt="logo"/>
        <h1> Orders</h1>
      </div>
      <div className="App__filter">
        <label>Filter: </label>
        <Multiselect 
        options={uniqueKeys}
          displayValue="key"
          groupBy='group'
          showCheckbox
          onSelect={onChange}
          onRemove={onChange}
        />
      </div>
      
      <div className="App__orders">
        {orderedList.map((val, key) => {
                    return (
                       <OrderRow order={val} />
                    )
                })}
      
      </div>
    </div>
  );
}

export default App;


