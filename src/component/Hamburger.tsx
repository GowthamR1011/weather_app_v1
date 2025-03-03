import {useState} from 'react';
import Hamburger from 'hamburger-react';
export interface IHamburgerMenuProps {
}

export function HamburgerMenu (props: IHamburgerMenuProps) {
  const [isOpen,setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <Hamburger size={24} toggled={isOpen} toggle={setIsOpen}/>
      {isOpen && <div className='grid grid-cols-1 p-6'>
        <button className='absolute'>Theme</button>
        <button className='absolute'>Metric</button>
        </div>}
    </div>
  );
}
