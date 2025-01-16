
import { useState } from 'react';

import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import logomark from "../assets/logomark.png";
import night from "../assets/night.png";
import day from "../assets/day.png";
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../redux/slices/taskSlice';
import { toggleDarkMode } from '../redux/slices/themeSlice';

const Navbar = () => {

    // const [toggle, setToggle] = useState(false);

    const dark = useSelector((state) => state.theme.darkMode);
    const dispatch = useDispatch();

    return (
        <div className={`${!dark ? "bg-[#FBFDFC]" : "bg-[#242424]"} py-3 px-12  flex flex-row justify-between`}>

            <div className='flex flex-row items-center space-x-2'>

                <div onClick={() => dispatch(toggleSidebar())} className='cursor-pointer'>
                    <MenuOutlinedIcon fontSize='medium' />
                </div>
                <div className='flex items-center justify-between'>
                    <img src={logomark} alt="" />
                    <p className='text-[#3F9142] text-[24px]'>DoIt</p>
                </div>

            </div>

            <div className='flex items-center justify-center gap-x-6'>

                <SearchOutlinedIcon />
                <GridViewOutlinedIcon />

                <div className='cursor-pointer'>

                    {
                        dark == false ?
                            <img src={night} width={24} height={24} alt="" loading='lazy' onClick={() => dispatch(toggleDarkMode())} /> : <img src={day} alt="" width={24} height={24} loading='lazy' onClick={() => dispatch(toggleDarkMode())} />
                    }
                </div>



            </div>

        </div>
    )
};

export default Navbar;