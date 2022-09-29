import React from 'react'

const FilterByObject = (filterByObject:Object, filteringArrayState:Array) => {
        let array = filteringArrayState
        for (const key in filterByObject) {
            array = array.filter(el => el[key].toLowerCase().includes(filterByObject[key].toLowerCase()))
        }
    return array

}
export default FilterByObject