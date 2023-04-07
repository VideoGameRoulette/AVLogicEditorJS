import { MenuButton } from '../Button';
import { MenuIcon } from '../Icons';

const Header = ({ title, version }) => {
    return (
        <header className="w-full h-full bg-gray-800 text-white flex justify-between items-center gap-4 py-4 px-6">
            <div className="h-full flex justify-start items-center gap-8">
                <div className="text-lg font-bold">{title}</div>
                <div className="bg-gray-600 text-gray-200 rounded-md px-3 py-1 font-semibold">v {version}</div>
            </div>
            <MenuButton className="block xl:hidden">
                <MenuIcon className="w-8 h-8 " />
            </MenuButton>
        </header>
    );
}

export default Header;