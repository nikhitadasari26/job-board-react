import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useJobStore = create(
    persist(
        (set) => ({
            bookmarks: [],
            toggleBookmark: (jobId) =>
                set((state) => {
                    const isBookmarked = state.bookmarks.includes(jobId);
                    const newBookmarks = isBookmarked
                        ? state.bookmarks.filter((id) => id !== jobId)
                        : [...state.bookmarks, jobId];

                    // Sync to strictly required localStorage key for automatic verification
                    localStorage.setItem('bookmarkedJobs', JSON.stringify(newBookmarks));

                    return {
                        bookmarks: newBookmarks,
                    };
                }),

            // Filter State
            filters: {
                search: '',
                jobType: [],
                experienceLevel: [],
                skills: [],
                salaryRange: [0, 300000],
            },
            setUnfilteredJobs: (jobs) => set({ jobs }),
            setFilter: (key, value) =>
                set((state) => ({
                    filters: { ...state.filters, [key]: value },
                })),
            clearFilters: () =>
                set((state) => ({
                    filters: {
                        search: '',
                        jobType: [],
                        experienceLevel: [],
                        skills: [],
                        salaryRange: [0, 300000],
                    },
                })),

            // View Mode for Job List (grid | list)
            viewMode: 'grid',
            setViewMode: (mode) => set({ viewMode: mode }),
        }),
        {
            name: 'job-board-storage',
            partialize: (state) => ({ bookmarks: state.bookmarks }),
            onRehydrateStorage: () => (state) => {
                // Sync initial state from custom key for requirements
                const stored = localStorage.getItem('bookmarkedJobs');
                if (stored) {
                    try {
                        state.bookmarks = JSON.parse(stored);
                    } catch (e) {
                        console.error(e);
                    }
                }
            }
        }
    )
);
