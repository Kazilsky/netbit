import { useState, useEffect, useRef } from 'react';
import DropdownFileInput from './AttachmentFileInput'; 

// Handler hook for when Outside click dropdown close
let useClickOutside = (handler) => {
    let domNode = useRef();
  
    useEffect(() => {
      let maybeHandler = (event) => {
        if (!domNode.current.contains(event.target)) {
          handler();
        }
      };
  
      document.addEventListener("mousedown", maybeHandler);
  
      return () => {
        document.removeEventListener("mousedown", maybeHandler);
      };
    });
  
    return domNode;
  };

const DropdownButton = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
  
    let domNode = useClickOutside(() => {
      setDropdownOpen(false);
    });
  
    return (
      <>
        {/* <!-- ====== Dropdowns Section Start --> */}
        <section className=" dark:bg-dark">
          <div className="container">
            <div className="flex flex-wrap">
              {/* one */}
              <div ref={domNode} className="">
                <div className="py-8 text-center">
                  <div className="relative inline-block text-left">
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="flex items-center rounded-[5px] bg-dark dark:bg-dark-2 text-base font-medium text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                    </button>
                    <div
                      className={`shadow-1 dark:shadow-box-dark absolute left-0 z-40 mt-2 w-full rounded-md bg-dark dark:bg-dark-2 py-[10px] transition-all ${
                        dropdownOpen
                          ? 'bottom-full opacity-100 visible'
                          : 'bottom-[110%] invisible opacity-0'
                      }`}
                      style={{ bottom: '100%' }} // Смените top на bottom
                    >
                      <DropdownFileInput label='Загрузка файла' />
                    </div>
                  </div>
                </div>
              </div>
              {/* End */}
            </div>
          </div>
        </section>
        {/* <!-- ====== Dropdowns Section End -->    */}
      </>
    )
  };

export default DropdownButton;