export const set_thin_client = 'set_thin_client';
export const set_raspberry_tci = 'set_raspberry_tci';
export const set_raspberry_tic = 'set_raspberry_tic';
export const set_modems = 'set_modems';
export const set_thin_grid = 'set_thin_grid'
export const set_tci_grid = 'set_tci_grid'
export const set_tic_grid = 'set_tic_grid'
export const set_modem_grid = 'set_modem_grid'

export const setThinClientData = (data) => ({
  type: set_thin_client, payload: data
});

export const setRaspberryTciData = (data) => ({
  type: set_raspberry_tci, payload: data
});
export const setRaspberryTicData = (data) => ({
  type: set_raspberry_tic, payload: data
});
export const setModemsData = (data) => ({
  type: set_modems, payload: data
});
export const setThinGrid = (data) => ({
  type: set_thin_grid, payload: data
})
export const setTciGrid = (data) => ({
  type: set_tci_grid, payload: data
})
export const setTicGrid = (data) => ({
  type: set_tic_grid, payload: data
})
export const setModemGrid = (data) => ({
  type: set_modem_grid, payload: data
})

