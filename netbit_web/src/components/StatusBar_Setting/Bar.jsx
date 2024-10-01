import React, { useContext } from 'react';
import { ThemeContext } from '../../main';

export default function Bar({ src, status = 'online' }) {
    const { theme } = useContext(ThemeContext);

    const getStatusColor = () => {
        switch (status) {
            case 'do_not_disturb': return 'bg-red-500';
            case 'busy': return 'bg-yellow-500';
            case 'online': return 'bg-green-500';
            case 'away': return 'bg-gray-500';
            default: return 'bg-gray-500';
        }
    };

    const getStatusIcon = () => {
        switch (status) {
            case 'do_not_disturb':
                return (
                    <div className={`w-3.5 rounded-md h-1 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`} />
                );
            case 'away':
                return (
                    <>
                        {theme === "dark" ? (
                            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                <circle r="25%" cx="50%" cy="50%" fill="#2B2D33" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                <circle r="25%" cx="50%" cy="50%" fill="white" />
                            </svg>
                        )}
                    </>
                );
            case 'busy':
                return (
                    <>
                        {theme === "dark" ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1f2937" className="w-3.5 h-3.5">
                                <path d="M21.752 15.002A9.72 9.72 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-3.5 h-3.5">
                                <path d="M21.752 15.002A9.72 9.72 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                            </svg>
                        )}
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="relative inline-block">
            <img
                src={src}
                alt="avatar"
                className="w-24 h-24 rounded-full"
            />
            <span className={`absolute bottom-0 right-0 w-6 h-6 ${getStatusColor()} rounded-full border-2 ${theme === 'dark' ? 'border-gray-800' : 'border-white'} flex items-center justify-center`}>
                {getStatusIcon()}
            </span>
        </div>
    );
}
