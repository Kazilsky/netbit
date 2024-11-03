import { FC, useEffect, useState } from "react";
import {
	IoCloseOutline,
	IoContractOutline,
	IoExpandOutline,
	IoRemove,
} from "react-icons/io5";
import Logo from "../../assets/amethyst.png";

const { getCurrentWindow, app } = window.require("@electron/remote");

export const Titlebar: FC = () => {
	const currentWindow = getCurrentWindow();
	const [maximized, setMaximized] = useState(currentWindow.isMaximized());

	useEffect(() => {
		const icon = document.getElementById("icon") as HTMLElement;
		icon.ondragstart = () => false;
	});

	const onMinimize = () => currentWindow.minimize();
	const onMaximize = () => {
		setMaximized(!currentWindow.isMaximized());
		currentWindow.isMaximized()
			? currentWindow.unmaximize()
			: currentWindow.maximize();
	};
	const onQuit = () => app.quit();

	return (
		<div className="title-bar sticky top-0 blur-100 select-none opacity-100">
			<div className="menu-button-container">
				<img
					id="icon"
					src={Logo}
					className="menu-icon select-none"
					alt="Logo"
				/>
			</div>
			<div className="app-name-container select-none">
				<p>NetBit</p>
			</div>
			<div className="window-controls-container">
				<button
					title="Minimize"
					className="minimize-button focus:outline-none hover:bg-gray-700"
					onClick={onMinimize}
				>
					<IoRemove />
				</button>
				<button
					title="Maximize"
					className="min-max-button focus:outline-none hover:bg-gray-700"
					onClick={onMaximize}
				>
					{maximized ? <IoContractOutline /> : <IoExpandOutline />}
				</button>
				<button
					title="Close"
					className="close-button focus:outline-none hover:bg-gray-700"
					onClick={onQuit}
				>
					<IoCloseOutline />
				</button>
			</div>
		</div>
	);
};