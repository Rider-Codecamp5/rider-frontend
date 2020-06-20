import React, { useState } from 'react'
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';

import { Select } from 'antd';

const { Option } = Select;

function PlaceSearch(props) {

  const { place, setPlace } = props;

  const { 
    ready, 
    value, 
    suggestions: { status, data },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete({
    requestOptions: {
      location: {
        lat: () => 13.7563,
        lng: () => 100.5018
      },
      radius: 200 * 1000
    }
  })

  function onSearch(val) {
    console.log('search:', val);
    setValue(val)
  }

  return (
    <Select
      showSearch
      style={{ width: '30%' }}
      placeholder={place}
      notFoundContent={null}
      // value={value}
      onSelect={(address) => console.log(address)}
      onSearch={onSearch}
      disabled={!ready}
      onChange={(target) => setPlace(target)}
    >
      {status === 'OK' && data.map(({id, description}) => {
        return(
          <Option key={id} value={description}>{description}</Option>
        )
      })}
    </Select>
  )
}

export default PlaceSearch;