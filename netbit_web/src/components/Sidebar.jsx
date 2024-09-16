import React from 'react';

// const MenuItem = ({ imageSrc, title }) => (
//     <div className="h-10 w-10 mb-4 flex items-center justify-center bg-gray-800 rounded-full hover:bg-gray-700 cursor-pointer">
//       <img
//         src={imageSrc}
//         alt={title}
//         title={title}
//         className="h-full w-full translate-x-9 object-cover object-center rounded-full"
//       />
//       <span className="text-base text-center translate-y-10 -translate-x-5 font-medium text-dark dark:text-white">{title}</span>
//     </div>
//   );

const MenuItem = ({ imageSrc, title }) => (
    <div className="h-14 w-14 mb-4 flex items-center justify-center bg-gray-800 rounded-full hover:bg-gray-700 cursor-pointer">
      <img
        src={imageSrc}
        alt={title}
        className="h-full w-full object-cover object-center rounded-full"
      />
    </div>
  );

const ServerList = () => {
  const menuItems = [
    { imageSrc: 'https://cdn.tailgrids.com/2.2/assets/core-components/images/avatar/image-05.jpg'},
    { imageSrc: 'https://cdn.tailgrids.com/2.2/assets/core-components/images/avatar/image-05.jpg'},
    { imageSrc: 'https://cdn.tailgrids.com/2.2/assets/core-components/images/avatar/image-05.jpg'},
    { imageSrc: 'https://cdn.tailgrids.com/2.2/assets/core-components/images/avatar/image-05.jpg'},
  ];

  return (
    <div className="w-20 flex z-50 flex-col bg-gray-900 text-white shadow-lg">
      {/* Logo */}
      <div className="h-10 flex items-center justify-center">Сервера</div>

      {/* Menu Items */}
      <div className="flex flex-col items-center mt-2 mb-4">
        {menuItems.map((menuItem, index) => (
          <MenuItem key={index} {...menuItem} />
        ))}
      </div>
    </div>
  );
};

export default ServerList;