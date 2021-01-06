import { set_thin_client, set_raspberry_tci, set_raspberry_tic, set_modems, set_thin_grid, set_tci_grid, set_tic_grid, set_modem_grid } from './action';

const chartData = {
    thinClient: [],
    raspberryTci: [],
    raspberryTic: [],
    modems: [],
    modemGrid: [],
    thinGrid: [],
    tciGrid: [],
    ticGrid: [],
};

export const chartHandle = (state = chartData, action) => {
    switch (action.type) {

        case set_thin_client:
            return { ...state, thinClient: action.payload }

        case set_raspberry_tci:
            return { ...state, raspberryTci: action.payload }

        case set_raspberry_tic:
            return { ...state, raspberryTic: action.payload }

        case set_modems:
            return { ...state, modems: action.payload }

        case set_thin_grid:
            return { ...state, thinGrid: action.payload }

        case set_tci_grid:
            return { ...state, tciGrid: action.payload }

        case set_tic_grid:
            return { ...state, ticGrid: action.payload }

        case set_modem_grid:
            return { ...state, modemGrid: action.payload }

        default:
            return state
    }
};
