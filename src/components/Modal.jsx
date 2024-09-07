import { useContext, useEffect, useState } from "react"
import { CelebrityContext } from "../context/CelebrityContext"

const Modal = () => {
	const { data, deleteItem, handleDelete, handleDeleteModal } =
		useContext(CelebrityContext)
	const [name, setName] = useState()
	useEffect(() => {
		let item = data.filter((item) => item.id == deleteItem)[0]
		let userName = item.first + " " + item.last
		setName(userName)
	}, [deleteItem])

	return (
		<div className="fixed  bg-black/70 w-full h-full top-0 left-0">
			{/* <div /> */}
			<div className="absolute top-1/2 left-1/2 bg-white p-6 w-1/3 border border-gray-400 rounded-lg -translate-x-1/2 -translate-y-1/2">
				<div className="flex justify-between items-center">
					<p>Are you sure you want to delete user - {name}?</p>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="size-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6 18 18 6M6 6l12 12"
						/>
					</svg>
				</div>
				<div className="flex gap-2 justify-end mt-10">
					<button
						className="px-6 py-2 border-2 rounded-lg text-sm border-gray-300"
						onClick={() => handleDeleteModal("")}
					>
						Cancel
					</button>
					<button
						className="px-6 py-2 border-2 bg-red-500 text-white border-red-500 rounded-lg text-sm"
						onClick={() => handleDelete(deleteItem)}
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	)
}

export default Modal
