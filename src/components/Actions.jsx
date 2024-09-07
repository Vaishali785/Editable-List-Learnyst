/* eslint-disable react/prop-types */
import { useContext } from "react"
import { CelebrityContext } from "../context/CelebrityContext"

const Actions = ({ id, item, editedData, setEditedData }) => {
	const {
		handleEdit,
		editIndex,
		handleSave,
		enableSave,
		error,
		handleDeleteModal,
	} = useContext(CelebrityContext)

	return (
		<div className="btns flex gap-4 justify-end">
			{editIndex == id ? (
				<>
					{error && <p>{error}</p>}
					<button
						className="cancel p-2 hover:bg-gray-200 hover:rounded-full hover:cursor-pointer border-[1px] border-transparent hover:border-red-400"
						onClick={() => {
							setEditedData({
								...item,
							})
							handleEdit(null)
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							className="size-6 text-red-400"
						>
							<path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
						</svg>
					</button>
					<button
						className="save p-2 hover:bg-gray-200 hover:rounded-full hover:cursor-pointer  border-[1px] border-transparent hover:border-green-400 disabled:opacity-70 disabled:hover:cursor-default disabled:bg-transparent disabled:border-transparent"
						onClick={() => {
							setEditedData({ ...editedData })
							handleSave(id, editedData)
						}}
						disabled={!enableSave}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="size-6 text-green-400"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="m4.5 12.75 6 6 9-13.5"
							/>
						</svg>
					</button>
				</>
			) : (
				<>
					<button
						className="delete p-2 hover:bg-gray-200 hover:rounded-full hover:cursor-pointer  border-[1px] border-transparent hover:border-red-400"
						onClick={() => handleDeleteModal(id)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="size-6 text-red-500"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
							/>
						</svg>
					</button>
					<button
						className="edit p-2 hover:bg-gray-200 hover:rounded-full hover:cursor-pointer  border-[1px] border-transparent hover:border-blue-500 disabled:opacity-70 disabled:cursor-default disabled:bg-transparent disabled:border-transparent"
						onClick={() => handleEdit(id)}
						disabled={
							new Date().getFullYear() -
								new Date(editedData.dob).getFullYear() <=
							18
						}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="size-6 text-blue-500"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
							/>
						</svg>
					</button>
				</>
			)}
		</div>
	)
}

export default Actions
