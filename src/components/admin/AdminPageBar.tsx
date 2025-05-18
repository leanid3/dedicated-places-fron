import Link from "next/link";

const AdminPageBar = ({ setting }: { setting: { id: number, name: string, href: string, isActive: boolean }[] }) => {
    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    {setting.map((item: { id: number, name: string, href: string, isActive: boolean }) => (
                        <Link href={item.href} key={item.id} className={item.isActive ? "text-amber-500" : ""}   >{item.name}</Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default AdminPageBar;