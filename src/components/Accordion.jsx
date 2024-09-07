/* eslint-disable react/prop-types */
import {
	Accordion,
	AccordionHeader,
	AccordionBody,
	Select,
	Option,
} from "@material-tailwind/react"
import { useContext, useState } from "react"
import { CelebrityContext } from "../context/CelebrityContext"
import Actions from "./Actions"

function Icon({ id, open }) {
	return (
		<>
			{id === open ? (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="size-6"
				>
					<path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
				</svg>
			) : (
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
						d="M12 4.5v15m7.5-7.5h-15"
					/>
				</svg>
			)}
		</>
	)
}

export function AccordionCustomIcon({ item }) {
	const { open, handleOpen, editIndex, handleSaveBtn, handleError } =
		useContext(CelebrityContext)

	const [itemData, setItemData] = useState({
		...item,
	})

	const handleItemChange = (name, val) => {
		// enable save button on change
		handleSaveBtn()
		if (val !== "") {
			if (name == "country" && /\d/.test(val)) {
				//checks if it contains number
				handleError("Numbers not allowed in Country field!")
				setTimeout(() => handleError(""), 1000)
			}
			setItemData((prev) => ({ ...prev, [name]: val }))
		}
	}
	let arrow = (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 20 20"
			fill="currentColor"
			className="size-5"
		>
			<path
				fillRule="evenodd"
				d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
				clipRule="evenodd"
			/>
		</svg>
	)

	return (
		<>
			<Accordion
				open={open === item.id}
				icon={<Icon id={item.id} open={open} />}
				key={item.id}
				className="flex flex-col w-[90%] lg:w-[60%] rounded-lg px-6 mb-4 mx-auto border border-blue-gray-100"
			>
				<AccordionHeader
					onClick={() => handleOpen(item.id)}
					className={`border-b-0 `}
				>
					<div className="flex items-center gap-6">
						<img src={item.picture} alt="" className="rounded-full" />

						<span className="text-lg">
							{item.first} {item.last}
						</span>
					</div>
				</AccordionHeader>
				<AccordionBody>
					<div className="details grid grid-cols-3 gap-2 items-center">
						<div className="flex flex-col gap-1">
							<label htmlFor="" className="text-gray-500 text-sm px-2">
								Age
							</label>
							<input
								className={`outline-gray-400 py-1 px-2 border-[1px]
                                    bg-transparent text-black
                                    ${
																			editIndex == item.id
																				? " border-gray-400 "
																				: "border-transparent "
																		} 
                                rounded-lg`}
								type={editIndex == item.id ? "date" : "text"}
								name="dob"
								value={
									editIndex == item.id
										? itemData.dob
											? itemData.dob
											: item.dob
										: `${
												new Date().getFullYear() -
												new Date(item.dob).getFullYear()
										  } years`
								}
								onChange={(e) =>
									handleItemChange(e.target.name, e.target.value)
								}
								disabled={editIndex == item.id ? false : true}
							/>
						</div>
						<div className="flex flex-col gap-1">
							<label htmlFor="" className="text-gray-500 text-sm px-2">
								Gender
							</label>

							<div className="">
								<Select
									size="md"
									containerProps={{
										"className": `min-w-full h-auto min-h-5 ${
											editIndex == item.id ? "" : "bg-white"
										}`,
									}}
									labelProps={{ "className": "hidden" }}
									variant="outlined"
									name="gender"
									className={`border-t-blue-gray-200 focus:border-gray-400 focus-visible:border-gray-400 px-4 py-3.5 disabled:bg-white disabled:appearance-none`}
									value={
										itemData.gender && editIndex == item.id
											? itemData.gender
											: item.gender
									}
									arrow={editIndex == item.id ? arrow : ""}
									onChange={(val) => handleItemChange("gender", val)}
									disabled={editIndex == item.id ? false : true}
								>
									<Option value="male">Male</Option>
									<Option value="female">Female</Option>
									<Option value="transgender">Transgender</Option>
									<Option value="rather not say">Rather not say</Option>
									<Option value="other">Other</Option>
								</Select>
							</div>
						</div>
						<div className="flex flex-col gap-1">
							<label htmlFor="" className="text-gray-500 text-sm px-2">
								Country
							</label>
							<input
								className={`outline-gray-400  bg-transparent border-[1px] text-black ${
									editIndex == item.id
										? "px-2 py-1 border-gray-400 "
										: "border-transparent"
								} rounded-lg`}
								type="text"
								name="country"
								onChange={(e) =>
									handleItemChange(e.target.name, e.target.value)
								}
								title="Numbers are not allowed."
								value={
									itemData.country && editIndex == item.id
										? itemData.country
										: item.country
								}
								disabled={editIndex == item.id ? false : true}
							/>
						</div>
					</div>
					<div className="body flex flex-col gap-4 mt-4">
						<div className="desc flex flex-col gap-2">
							<label htmlFor="" className="text-gray-500 text-sm">
								Description
							</label>
							<textarea
								disabled={editIndex == item.id ? false : true}
								name="description"
								rows={Math.min(4, 10)}
								style={{
									resize: "none",
									height: "auto",
									// overflow: "hidden",
									// minHeight: "50px", // Minimum height
									// width: "100%",
								}}
								value={
									itemData.description && editIndex == item.id
										? itemData.description
										: item.description
								}
								onChange={(e) =>
									handleItemChange(e.target.name, e.target.value)
								}
								className={`outline-gray-400  bg-transparent border-[1px] ${
									editIndex == item.id
										? "px-2 py-1 border-gray-400 "
										: "border-transparent"
								} rounded-lg`}
							/>
						</div>
						<Actions
							id={item.id}
							item={item}
							editedData={itemData}
							setEditedData={setItemData}
						/>
					</div>
				</AccordionBody>
			</Accordion>
		</>
	)
}
