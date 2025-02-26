import Link from "next/link";

const Header = () => {
    return (
        <header className='bg-amber-400 shadow-sm'>
            <nav className='container mx-auto px-4 py-5 flex justify-around'>
                <Link className='text-xl text-white font-bold' href={'/'}>Гид по заведениям</Link>
                <div className='flex gap-3 *:font-bold'>
                    <Link className='text-gray-100 px-4 py-2 rounded-2xl hover:bg-amber-500 hover:text-gray-300 hover:shadow-xl focus:outline-2 focus:outline-offset-2 focus:outline-amber-50' href="/users">Users</Link>
                    <Link className='text-gray-100 px-4 py-2 rounded-2xl hover:bg-amber-500 hover:text-gray-300 hover:shadow-xl focus:outline-2 focus:outline-offset-2 focus:outline-amber-50' href="/places">Posts</Link>
                    <Link className='text-gray-100 px-4 py-2 rounded-2xl hover:bg-amber-500 hover:text-gray-300 hover:shadow-xl focus:outline-2 focus:outline-offset-2 focus:outline-amber-50' href="/categories">Categories</Link>
                </div>
            </nav>
        </header>
    )
}

export default Header;