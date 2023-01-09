import { Chip, IconButton, Tooltip, Typography } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridRenderCellParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { Results } from "../../../types/Videos";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import { Genre } from "../../../types/Genres";
import { Category } from "../../../types/Category";

type Props = {
  data: Results | undefined;
  perPage: number;
  isFetching: boolean;
  rowsPerPage?: number[];
  handleOnPageChange: (page: number) => void;
  handleFilterChange: (filterModel: GridFilterModel) => void;
  handleOnPageSizeChange: (perPage: number) => void;
  handleDelete: (id: string) => void;
};

export function VideosTable({
  data,
  perPage,
  isFetching,
  rowsPerPage,
  handleOnPageChange,
  handleFilterChange,
  handleOnPageSizeChange,
  handleDelete,
}: Props) {
  const componentProps = {
    toolbar: {
      showQuickFilter: true,
      quickFilterProps: { debounceMs: 500 },
    },
  };

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      renderCell: renderNameCell,
    },
    {
      field: "genres",
      headerName: "Genres",
      flex: 1,
      renderCell: renderGenresCell,
    },
    {
      field: "categories",
      headerName: "Categories",
      flex: 1,
      renderCell: renderCategoriesCell,
    },
    {
      field: "id",
      headerName: "Actions",
      type: "string",
      flex: 1,
      renderCell: renderActionsCell,
    },
  ];

  function mapDataToGridRows(data: Results) {
    const { data: videos } = data;
    return videos.map((video) => ({
      id: video.id,
      title: video.title,
      genres: video.genres,
      categories: video.categories,
    }));
  }

  function renderGenresCell(params: GridRenderCellParams) {
    const genres = params.value as Genre[];
    const twoFirstGenres = genres.slice(0, 2);
    const remainingGenres = genres.length - twoFirstGenres.length;

    return (
      <Box style={{ overflowX: "scroll" }}>
        {twoFirstGenres.map((genre, index) => (
          <Chip
            key={index}
            sx={{
              fontSize: "0.6rem",
              marginRight: 1,
            }}
            label={genre.name}
          />
        ))}

        {remainingGenres > 0 && (
          <Tooltip title={genres.map((genre) => genre.name).join(", ")}>
            <Chip
              sx={{
                fontSize: "0.6rem",
                marginRight: 1,
              }}
              label={`+${remainingGenres}`}
            />
          </Tooltip>
        )}
      </Box>
    );
  }

  function renderCategoriesCell(params: GridRenderCellParams) {
    const categories = params.value as Category[];
    const twoFirstCategories = categories.slice(0, 2);
    const remainingCategories = categories.length - twoFirstCategories.length;

    return (
      <Box style={{ overflowX: "scroll" }}>
        {twoFirstCategories.map((category, index) => (
          <Chip
            key={index}
            sx={{
              fontSize: "0.6rem",
              marginRight: 1,
            }}
            label={category.name}
          />
        ))}
        {remainingCategories > 0 && (
          <Tooltip
            title={categories.map((category) => category.name).join(", ")}
          >
            <Chip
              sx={{
                fontSize: "0.6rem",
                marginRight: 1,
              }}
              label={`+${remainingCategories}`}
            />
          </Tooltip>
        )}
      </Box>
    );
  }

  function renderActionsCell(params: GridRenderCellParams) {
    return (
      <IconButton
        color="secondary"
        onClick={() => handleDelete(params.value)}
        aria-label="delete"
        data-testid="delete-button"
      >
        <DeleteIcon />
      </IconButton>
    );
  }

  function renderNameCell(rowData: GridRenderCellParams) {
    return (
      <Link
        style={{ textDecoration: "none" }}
        to={`/videos/edit/${rowData.id}`}
      >
        <Typography color="primary">{rowData.value}</Typography>
      </Link>
    );
  }

  const rows = data ? mapDataToGridRows(data) : [];
  const rowCount = data?.meta.total || 0;

  return (
    <Box sx={{ display: "flex", height: 600 }}>
      <DataGrid
        rows={rows}
        pagination={true}
        columns={columns}
        pageSize={perPage}
        filterMode="server"
        rowCount={rowCount}
        loading={isFetching}
        paginationMode="server"
        checkboxSelection={false}
        disableColumnFilter={true}
        disableColumnSelector={true}
        disableDensitySelector={true}
        rowsPerPageOptions={rowsPerPage}
        componentsProps={componentProps}
        onPageChange={handleOnPageChange}
        components={{ Toolbar: GridToolbar }}
        onFilterModelChange={handleFilterChange}
        onPageSizeChange={handleOnPageSizeChange}
      />
    </Box>
  );
}
