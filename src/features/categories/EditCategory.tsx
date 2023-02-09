import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Category,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from "./categorySlice";
import { CategoryFrom } from "./components/CategoryFrom";

export const CategoryEdit = () => {
  const id = useParams().id as string;
  const { data: category, isFetching } = useGetCategoryQuery({ id });
  const [isdisabled, setIsdisabled] = useState(false);
  const [updateCategory, status] = useUpdateCategoryMutation();
  const [categoryState, setCategoryState] = useState<Category>({
    id: "",
    name: "",
    is_active: false,
    created_at: "",
    updated_at: "",
    deleted_at: "",
    description: "",
  });

  const { enqueueSnackbar } = useSnackbar();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await updateCategory(categoryState);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategoryState({ ...categoryState, [name]: value });
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCategoryState({ ...categoryState, [name]: checked });
  };

  useEffect(() => {
    if (category) {
      setCategoryState(category.data);
    }
  }, [category]);

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("Category updated successfully", { variant: "success" });
      setIsdisabled(false);
    }
    if (status.error) {
      enqueueSnackbar("Category not updated", { variant: "error" });
    }
  }, [enqueueSnackbar, status.error, status.isSuccess]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Category</Typography>
          </Box>
        </Box>
        <CategoryFrom
          isLoading={false}
          category={categoryState}
          isdisabled={isFetching || isdisabled}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleToggle={handleToggle}
        />
      </Paper>
    </Box>
  );
};
