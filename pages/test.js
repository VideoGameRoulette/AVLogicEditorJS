import Sidebar from 'components/Sidebar';

export default function Test() {
    return (
        <div className="w-full h-full flex">
            <Sidebar>
                <div className="flex-1 text-white flex justify-center items-center">Side Bar Panel</div>
            </Sidebar>
            <main className="flex-1 bg-black text-white flex justify-center items-center">
                Main Content
            </main>
        </div>
    )
}
