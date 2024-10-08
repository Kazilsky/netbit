import { FC } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { IndexPage } from "./pages";
import { PopupPage } from "./pages/popup";

export const Router = () => {
	return (
		<HashRouter>
			<Routes>
				<Route path="/">
					<Route index element={<IndexPage />} />
				</Route>
			</Routes>
		</HashRouter>
	);
};
