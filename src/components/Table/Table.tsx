import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import type { GridCellParams } from '@mui/x-data-grid';

import { getCountryCodes } from '../../services/api';
import type { PlayerData, CountryCodes } from '../../types/data';
import { invert } from '../../utils/data';

import styles from './Table.module.scss';

export interface Props {
  playerData: PlayerData[];
  countryFilter?: boolean;
}

const Table: React.FC<Props> = ({ playerData, countryFilter }) => {
  const [data, setData] = useState(playerData);
  const [countryCodes, setCountryCodes] = useState<CountryCodes>({});
  const [filtered, setFiltered] = useState(false);

  const columns = [
    {
      field: 'country',
      headerName: 'Country',
      flex: 0.83,
      sortable: false,
      hideSortIcons: true,
      renderCell: ({ row: { country } }: GridCellParams) => (
        <img
          alt={country}
          src={`https://flagcdn.com/16x12/${countryCodes[country] ?? 'cz'}.png`}
        />
      ),
    },
    {
      field: 'race',
      headerName: 'Race',
      flex: 1,
      sortable: false,
      hideSortIcons: true,
    },
    { field: 'nickname', headerName: 'Nickname', flex: 1 },
    { field: 'total', headerName: 'Total', flex: 0.83 },
    { field: 'won', headerName: 'Won', flex: 0.83 },
    { field: 'lost', headerName: 'Lost', flex: 0.83 },
    { field: 'winrate', headerName: 'Winrate', flex: 0.83 },
  ];

  useEffect(() => {
    fetchCountryCodes();
  }, []);

  useEffect(() => {
    setData(playerData);
  }, [playerData]);

  const fetchCountryCodes = async () => {
    const codes = await getCountryCodes();
    setCountryCodes(invert(codes));
  };

  const filterByCountry = ({ row: { country } }: GridCellParams) => {
    if (filtered) {
      setData(playerData);
    } else {
      setData(playerData.filter((row) => row.country === country));
    }
    setFiltered((filtered) => !filtered);
  };

  return (
    <div className={styles.container}>
      <DataGrid
        rows={data}
        columns={columns}
        sx={{
          '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus, &.MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within':
            {
              outline: 'none',
            },
        }}
        sortingOrder={['desc', 'asc', null]}
        onCellClick={countryFilter ? filterByCountry : undefined}
        autoHeight
        disableColumnMenu
        disableColumnSelector
        disableSelectionOnClick
        hideFooterSelectedRowCount
      />
    </div>
  );
};

export default Table;
