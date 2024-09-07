/* eslint-disable react/prop-types */
import { useContext } from "react"

import { AccordionCustomIcon } from "./components/Accordion"
import Search from "./components/Search"
import { CelebrityContext } from "./context/CelebrityContext"
import Modal from "./components/Modal"

function App() {
	const { data, handleSearch, deleteItem } = useContext(CelebrityContext)

	return (
		<>
			<Search handleSearch={handleSearch} />
			{data?.map((item) => (
				<AccordionCustomIcon item={item} key={item.id} />
			))}
			{deleteItem !== "" && <Modal />}
		</>
	)
}

export default App
