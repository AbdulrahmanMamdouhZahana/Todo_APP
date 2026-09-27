import { axiosInstance } from "./config";
import useAuthGetData from "./hooks/useAuthGetData";
import Button from "./UI/Button";
import { faker } from "@faker-js/faker";
import Pagination from "./UI/SetPagination";
import { useState } from "react";
import TodoSkeleton from "./UI/TodoSkeleton";
import { Sparkles, ArrowUpDown, Layers, Edit3, Trash2, ListTodo } from "lucide-react";
import toast from "react-hot-toast";

const getUserData = () => {
    try {
        const userDateString = localStorage.getItem("userDate");
        return userDateString ? JSON.parse(userDateString) : null;
    } catch {
        return null;
    }
};

const AllTodos = () => {
    const userData = getUserData();

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [pageSort, setPageSort] = useState("ASC");
    const [isGenerating, setIsGenerating] = useState(false);

    const { isLoading, isFetching, data } = useAuthGetData({
        queryKey: ["todoList", `${page}`, `${pageSize}`, `${pageSort}`],
        url: `/todos/?pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=createdAt:${pageSort}`,
        config: {
            headers: {
                Authorization: `Bearer ${userData?.jwt}`,
            },
        },
    });

    const nextButtonHandler = () => {
        setPage((prev) => prev + 1);
    };

    const prevButtonHandler = () => {
        setPage((prev) => Math.max(1, prev - 1));
    };

    const generatTodos = async () => {
        setIsGenerating(true);
        toast.loading("Generating demo todos...", { id: "gen-todos" });

        try {
            for (let i = 0; i < 10; i++) {
                await axiosInstance.post(
                    `/todos`,
                    {
                        data: {
                            title: faker.lorem.sentence({ min: 3, max: 8 }),
                            description: faker.lorem.paragraph(),
                        },
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${userData?.jwt}`,
                        },
                    }
                );
            }
            toast.success("Demo todos generated successfully!", { id: "gen-todos" });
        } catch (error) {
            console.error(error);
            toast.error("Failed to generate demo todos", { id: "gen-todos" });
        } finally {
            setIsGenerating(false);
        }
    };

    const UpdatePageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPageSize(+e.target.value);
        setPage(1);
    };

    const UpdatePageSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPageSort(e.target.value);
    };

    const allTodosList = data?.data?.data || [];
    const paginationMeta = data?.data?.meta?.pagination;

    return (
        <div className="py-6">
            {/* Header & Generate Action */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 mb-6 border-b border-slate-200/80">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                            All Todos Directory
                        </h1>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-violet-50 text-violet-700 border border-violet-200/60">
                            {paginationMeta?.total || allTodosList.length} Total
                        </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">
                        Explore, paginate, and sort across all public and saved tasks
                    </p>
                </div>

                <div>
                    <Button
                        type="button"
                        isLoading={isGenerating}
                        onClick={generatTodos}
                        className="w-full sm:w-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold text-sm shadow-md shadow-violet-500/20 hover:shadow-violet-500/30 transition-all cursor-pointer"
                    >
                        <Sparkles className="w-4 h-4" />
                        <span>Generate Demo Todos</span>
                    </Button>
                </div>
            </div>

            {/* Filter / Sort Control Toolbar */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs mb-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-4">
                    {/* Page Size Select */}
                    <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-slate-400" />
                        <label className="text-xs font-semibold text-slate-600">Per page:</label>
                        <select
                            name="pageSize"
                            onChange={UpdatePageSize}
                            value={pageSize}
                            className="text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer"
                        >
                            <option value="10">10 items</option>
                            <option value="40">40 items</option>
                            <option value="50">50 items</option>
                            <option value="100">100 items</option>
                        </select>
                    </div>

                    {/* Page Sort Select */}
                    <div className="flex items-center gap-2">
                        <ArrowUpDown className="w-4 h-4 text-slate-400" />
                        <label className="text-xs font-semibold text-slate-600">Sort by:</label>
                        <select
                            name="pageSort"
                            onChange={UpdatePageSort}
                            value={pageSort}
                            className="text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer"
                        >
                            <option value="DESC">Newest First</option>
                            <option value="ASC">Oldest First</option>
                        </select>
                    </div>
                </div>

                {isFetching && (
                    <span className="text-xs text-indigo-600 font-medium animate-pulse flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                        Updating data...
                    </span>
                )}
            </div>

            {/* Todo Cards List */}
            {isLoading ? (
                <div className="space-y-3">
                    {Array.from({ length: 5 }, (_, index) => (
                        <TodoSkeleton key={`all-todos-skeleton-${index}`} />
                    ))}
                </div>
            ) : allTodosList.length > 0 ? (
                <div className="space-y-3">
                    {allTodosList.map((todo: any) => (
                        <div
                            key={todo.documentId || todo.id}
                            className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                        >
                            {/* Left Info */}
                            <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                                <div className="shrink-0 w-8 h-8 rounded-lg bg-slate-100 text-slate-600 font-mono text-xs font-bold flex items-center justify-center border border-slate-200/50">
                                    {todo.id ? `#${todo.id}` : "•"}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3 className="text-base font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug break-words">
                                        {todo.title}
                                    </h3>
                                    <p className="text-sm text-slate-600 mt-1 leading-relaxed break-words">
                                        {todo.description}
                                    </p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                                <Button
                                    type="button"
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 transition-colors cursor-pointer"
                                >
                                    <Edit3 className="w-3.5 h-3.5" />
                                    <span>Edit</span>
                                </Button>
                                <Button
                                    type="button"
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-100 transition-colors cursor-pointer"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    <span>Delete</span>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-200 shadow-xs max-w-lg mx-auto my-8">
                    <div className="w-16 h-16 rounded-2xl bg-violet-50 text-violet-500 flex items-center justify-center mx-auto mb-4">
                        <ListTodo className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">No todos in directory</h3>
                    <p className="text-sm text-slate-500 mt-1.5 max-w-sm mx-auto">
                        No todos match the current pagination and filter settings.
                    </p>
                </div>
            )}

            {/* Pagination Controls */}
            <Pagination
                isLoading={isLoading || isFetching}
                page={page}
                total={paginationMeta?.total}
                pagecount={paginationMeta?.pageCount}
                prevButtonHandler={prevButtonHandler}
                nextButtonHandler={nextButtonHandler}
            />
        </div>
    );
};

export default AllTodos;