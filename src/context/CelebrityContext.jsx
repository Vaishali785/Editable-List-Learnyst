/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react"
import data from "../constants/celebrities.json"
const initialState = {
	data: data,
	open: 0,
	editIndex: null,
	enableSave: false,
	error: "",
	deleteItem: "",
	handleOpen: () => {},
	handleSearch: () => {},
	handleEdit: () => {},
	handleSave: () => {},
	handleSaveBtn: () => {},
	handleError: () => {},
	handleDeleteModal: () => {},
	handleDelete: () => {},
}

export const CelebrityContext = createContext(initialState)

const celebReducer = (state, action) => {
	if (action.type == "HANDLE_INDEX_CHANGE") {
		let newIndex = state.open == action.id ? 0 : action.id
		return {
			...state,
			open: newIndex,
			editIndex: null,
			enableSave: false,
		}
	}
	if (action.type == "HANDLE_SEARCH") {
		if (action.name != "") {
			let filteredItems = data.filter((item) => {
				let enteredName = action.name.toLowerCase()
				let itemName = item.first.toLowerCase()

				return itemName.includes(enteredName)
			})
			return {
				...state,
				data: filteredItems,
				open: state.open,
			}
		} else {
			return initialState
		}
	}

	if (action.type == "HANDLE_EDITING") {
		let edit
		if (action.index) {
			let item = state.data.filter((item) => item.id == action.index)[0]
			let birthDate = new Date(item.dob).getFullYear()
			let currentYear = new Date().getFullYear()
			const age = currentYear - birthDate
			edit = age > 18 ? action.index : null
		} else {
			edit = null
		}
		return {
			...state,
			editIndex: edit,
		}
	}
	if (action.type == "HANDLE_SAVE") {
		let index = state.data.findIndex((item) => item.id == action.id)
		state.data[index] = action.editedData
			? action.editedData
			: state.data[index]
		return { ...state, editIndex: null }
	}
	if (action.type == "HANDLE_ENABLE_SAVE") {
		return {
			...state,
			enableSave: true,
		}
	}
	if (action.type == "HANDLE_ERROR") {
		return {
			...state,
			error: action.error,
		}
	}
	if (action.type == "HANDLE_DELETE_MODAL") {
		if (action.id !== "") {
			return {
				...state,
				deleteItem: action.id,
			}
		} else {
			return {
				...state,
				deleteItem: "",
			}
		}
	}
	if (action.type == "HANDLE_DELETE") {
		let newData = state.data.filter((item) => item.id !== action.id)
		return {
			...state,
			data: newData,
			deleteItem: "",
		}
	}
	return initialState
}

const CelebrityContextProvider = (props) => {
	const [celeb, dispatchCelebAction] = useReducer(celebReducer, initialState)
	const handleOpen = (id) => {
		dispatchCelebAction({
			type: "HANDLE_INDEX_CHANGE",
			id: id,
		})
	}
	const handleSearch = (name) => {
		dispatchCelebAction({
			type: "HANDLE_SEARCH",
			name: name,
		})
	}
	const handleEdit = (index) => {
		dispatchCelebAction({
			type: "HANDLE_EDITING",
			index: index,
		})
	}
	const handleSave = (id, editedData) => {
		dispatchCelebAction({
			type: "HANDLE_SAVE",
			id: id,
			editedData: editedData,
		})
	}
	const handleSaveBtn = () => {
		dispatchCelebAction({
			type: "HANDLE_ENABLE_SAVE",
		})
	}
	const handleError = (error) => {
		dispatchCelebAction({
			type: "HANDLE_ERROR",
			error: error,
		})
	}
	const handleDeleteModal = (id) => {
		dispatchCelebAction({
			type: "HANDLE_DELETE_MODAL",
			id: id,
		})
	}
	const handleDelete = (id) => {
		dispatchCelebAction({
			type: "HANDLE_DELETE",
			id: id,
		})
	}
	const celebContextValue = {
		data: celeb.data,
		open: celeb.open,
		editIndex: celeb.editIndex,
		enableSave: celeb.enableSave,
		error: celeb.error,
		deleteItem: celeb.deleteItem,
		handleOpen: handleOpen,
		handleSearch: handleSearch,
		handleEdit: handleEdit,
		handleSave: handleSave,
		handleSaveBtn: handleSaveBtn,
		handleError: handleError,
		handleDeleteModal: handleDeleteModal,
		handleDelete: handleDelete,
	}
	return (
		<CelebrityContext.Provider value={celebContextValue}>
			{props.children}
		</CelebrityContext.Provider>
	)
}

export default CelebrityContextProvider
