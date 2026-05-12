import { create } from "zustand";
import { persist } from "zustand/middleware";
import zustandStorage from "./storage";
import { SavedRoute } from "@/types/route";

type BookmarksStore = {
  bookmarks: SavedRoute[];
  addBookmark: (route: SavedRoute) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (from: string, to: string) => boolean;
};

export const useBookmarksStore = create<BookmarksStore>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      addBookmark: (route) =>
        set((state) => ({
          bookmarks: [...state.bookmarks, route],
        })),
      removeBookmark: (id) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter((b) => b.id !== id),
        })),
      isBookmarked: (from, to) =>
        get().bookmarks.some((b) => b.from === from && b.to === to),
    }),
    {
      name: "bookmarks",
      storage: zustandStorage,
    },
  ),
);
