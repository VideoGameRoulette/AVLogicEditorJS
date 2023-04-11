import Link from 'next/link';

const HeaderButton = ({ title, url, active }) => {
    if (active)
        return (
            <div className="bg-gray-700 text-sky-400 p-2 px-4 cursor-not-allowed">{title}</div>
        )
    return (
        <Link href={url} passHref legacyBehavior>
            <a className="bg-gray-900 hover:bg-gray-700 hover:text-sky-400 p-2 px-4">{title}</a>
        </Link>
    );
}

export default HeaderButton;