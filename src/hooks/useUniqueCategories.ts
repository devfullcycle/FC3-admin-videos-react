import { useEffect, useRef, useState } from "react";
import { Category } from "../types/Category";
import { Video } from "../types/Videos";
import { useGetAllCategoriesQuery } from "../features/videos/VideoSlice";

type UseUniqueCategoriesHook = (
  videoState: Video,
  setVideoState: React.Dispatch<React.SetStateAction<Video>>
) => [
  uniqueCategories: Category[],
  setUniqueCategories: React.Dispatch<React.SetStateAction<Category[]>>
];

export const useUniqueCategories: UseUniqueCategoriesHook = (
  videoState,
  setVideoState
) => {
  const { data: allCategories } = useGetAllCategoriesQuery();
  const [uniqueCategories, setUniqueCategories] = useState<Category[]>([]);
  const categoriesToKeepRef = useRef<Category[] | undefined>(undefined);
  const { genres, categories } = videoState;

  const uniqueById = (
    category: Category | undefined,
    index: number,
    self: (Category | undefined)[]
  ): boolean => index === self.findIndex((c) => c?.id === category?.id);

  useEffect(() => {
    const categoriesById = new Map(allCategories?.data.map(i => [i.id, i]));
    
    const uniqueCategories = (genres || [])
      .flatMap(({ categories }) => categories || [])
      .filter(uniqueById)
      .map(it => categoriesById.get(it.id)) as Category[];

    setUniqueCategories(uniqueCategories);
  }, [genres]);

  useEffect(() => {
    categoriesToKeepRef.current = categories?.filter((category) =>
      uniqueCategories.find((c) => c?.id === category.id)
    );
  }, [uniqueCategories, categories]);

  useEffect(() => {
    setVideoState((state: Video) => ({
      ...state,
      categories: categoriesToKeepRef.current,
    }));
  }, [uniqueCategories, setVideoState]);

  return [uniqueCategories, setUniqueCategories];
};
