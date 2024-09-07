/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"

const Search = ({ handleSearch }) => {
	const [searchVal, setSearchVal] = useState("")
	useEffect(() => {
		const time = setTimeout(() => handleSearch(searchVal), 300)
		return () => {
			clearTimeout(time)
		}
	}, [searchVal])
	return (
		<div className="flex border-[1px] gap-2 px-2 py-1 items-center border-gray-500 w-[90%] lg:w-[60%]  rounded-lg mx-auto my-4">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				className="size-5 text-gray-400"
			>
				<path
					fillRule="evenodd"
					d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
					clipRule="evenodd"
				/>
			</svg>

			<input
				type="text"
				name="search"
				onChange={(e) => setSearchVal(e.target.value)}
				placeholder="Search user"
				className="w-full focus-visible:outline-none focus-visible:border-none"
			/>
		</div>
	)
}

export default Search
