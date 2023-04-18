export const ErrorPage = () => {
    return (
        <>
            <main className="relative w-full h-[100vh] isolate min-h-full">
                <img
                    src="https://cdn.weasyl.com/~zummeng/submissions/1866803/7a389874774d5b90adb63ba31255634362542a645097f6e3aec6a700308213a5/zummeng-axiom-verge-4k-wallpaper.png"
                    alt=""
                    className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
                />
                <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
                    <p className="text-base font-semibold leading-8 text-white">404</p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">Websocket not found!</h1>
                    <p className="mt-4 text-base text-white/70 sm:mt-6">Sorry, we couldn’t find the game please start a game session.</p>
                </div>
            </main>
        </>
    )
}
