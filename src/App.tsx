import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";

import { CreateCastMember } from "./features/cast/CreateCastMembers";
import { EditCastMember } from "./features/cast/EditCastMember";
import { ListCastmembers } from "./features/cast/ListCastmembers";

import { CategoryCreate } from "./features/categories/CreateCategory";
import { CategoryEdit } from "./features/categories/EditCategory";
import { CategoryList } from "./features/categories/ListCaegory";

import { GenreCreate } from "./features/genre/GenreCreate";
import { GenreEdit } from "./features/genre/GenreEdit";
import { GenreList } from "./features/genre/GenreList";
import { UploadList } from "./features/uploads/UploadList";

import { VideosCreate } from "./features/videos/VideosCreate";
import { VideosEdit } from "./features/videos/VideosEdit";
import { VideosList } from "./features/videos/VideosList";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Login from "./components/Login";

function App() {
  return (
    <div data-testid="app">
      <Layout>
        <UploadList />
        <Routes>
          <Route path="/" element={<CategoryList />} />

          {/* Login */}
          <Route path="/login" element={<Login />} />

          {/* Category */}
          <Route
            path="/categories"
            element={
              <ProtectedRoute>
                <CategoryList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories/create"
            element={
              <ProtectedRoute>
                <CategoryCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories/edit/:id"
            element={
              <ProtectedRoute>
                <CategoryEdit />
              </ProtectedRoute>
            }
          />

          {/* Cast members */}
          <Route
            path="/cast-members"
            element={
              <ProtectedRoute>
                <ListCastmembers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cast-members/create"
            element={
              <ProtectedRoute>
                <CreateCastMember />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cast-members/edit/:id"
            element={
              <ProtectedRoute>
                <EditCastMember />
              </ProtectedRoute>
            }
          />

          {/* Genre */}
          <Route
            path="/genres"
            element={
              <ProtectedRoute>
                <GenreList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/genres/create"
            element={
              <ProtectedRoute>
                <GenreCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/genres/edit/:id"
            element={
              <ProtectedRoute>
                <GenreEdit />
              </ProtectedRoute>
            }
          />

          {/* Videos */}
          <Route
            path="/videos"
            element={
              <ProtectedRoute>
                <VideosList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/videos/create"
            element={
              <ProtectedRoute>
                <VideosCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/videos/edit/:id"
            element={
              <ProtectedRoute>
                <VideosEdit />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={
              <Box sx={{ color: "white" }}>
                <Typography variant="h1">404</Typography>
                <Typography variant="h2">Page not found</Typography>
              </Box>
            }
          />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
