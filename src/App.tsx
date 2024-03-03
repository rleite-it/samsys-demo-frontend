import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Loading from "./pages/loading/loading";

// Import React components using lazy loading
const Home = React.lazy(() => import("./pages/home"));
const EditClient = React.lazy(() => import("./pages/client/editClient"));

function App() {
	return (
		<>
			<BrowserRouter>
				{/* Wrap Routes with Suspense */}
				<Suspense fallback={<Loading />}>
					<Routes>
						<Route path={"/"} element={<Home />} />

						<Route path="/client/edit/:id" element={<EditClient />} />
					</Routes>
				</Suspense>
			</BrowserRouter>
		</>
	);
}

export default App;
