import {createEntityAdapter, createSlice} from '@reduxjs/toolkit'

const topBarAdapter = createEntityAdapter();
const initialState = topBarAdapter.getInitialState({
    activeSection: "pizza"
})

const topBarSlice = createSlice({
    name: "topBar",
    initialState,
    reducers: {
        setAllSections: (state, action) =>  {

            topBarAdapter.setAll(state, action.payload)
        },
        setActiveSection: (state, action) => {
            state.activeSection = action.payload
        },
    }
})

const {reducer, actions} = topBarSlice
export const {
    setActiveSection,
    setAllSections
} = actions

export const {selectAll} = topBarAdapter.getSelectors(state => state.topBarReducer)


export const activeSection = state => state.activeSection.value
export default reducer