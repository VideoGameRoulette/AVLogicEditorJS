export const MainContainer = ({ children }) => {
    return (
        <div className="absolute w-full h-full grid grid-rows-[4rem_1fr]">
            {children}
        </div>
    )
}

export const SecondaryContainer = ({ children }) => {
    return (
        <div className="xl:grid xl:grid-cols-[20%_80%] w-full h-full overflow-hidden">
            {children}
        </div>
    )
}