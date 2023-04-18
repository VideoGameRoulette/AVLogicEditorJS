export const ErrorPage = () => {
    return (
        <>
            <main className="relative w-full h-[100vh] isolate min-h-full">
                <img
                    src="https://images.unsplash.com/photo-1545972154-9bb223aac798?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3050&q=80&exp=8&con=-15&sat=-75"
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
