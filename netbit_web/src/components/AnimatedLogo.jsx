const ChevronLogo = ({ className = '' }) => (
    <svg className={`w-100 h-100 ${className}`} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          {`.triangle { transform-origin: center; }`}
        </style>
      </defs>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <polygon points="50,10 90,70 10,70" fill="#b3d4fc"/>
  <polygon points="50,30 75,70 25,70" fill="#3b82f6"/>
  <text x="50" y="95" font-family="Arial, sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#ffffff">NETBIT</text>
</svg>
      <text className="fill-gray-900 dark:fill-white" x="50" y="60" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="bold" textAnchor="middle">NETBIT</text>
    </svg>
  );

export default ChevronLogo;