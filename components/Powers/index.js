// Simulated Power Flags
const Powers = {
    None: 0,
    Gun: 1 << 0,
    Nova: 1 << 1,
    Drill: 1 << 2,
    Kilver: 1 << 3,
    AddressDisruptor1: 1 << 4,
    HighJump: 1 << 5,
    Labcoat: 1 << 6,
    Drone: 1 << 7,
    AddressDisruptor2: 1 << 8,
    Grapple: 1 << 9,
    Trenchcoat: 1 << 10,
    AddressBombs: 1 << 11,
    DroneTeleport: 1 << 12,
    ExtendedDroneLaunch: 1 << 13,
    SudranKey: 1 << 14,
    RedCoat: 1 << 15,
    Password: 1 << 16,
    LongKilver: 1 << 17,
    FatBeam: 1 << 18,
    TeleReset: 1 << 19,

    // Helper functions
    hasPower(powers, power) {
        return (powers & power) === power;
    },

    addPower(powers, power) {
        return powers | power;
    },

    removePower(powers, power) {
        return powers & ~power;
    }
};

export default Powers;