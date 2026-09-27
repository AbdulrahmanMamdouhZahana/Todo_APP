import { useState } from "react";
import useAuthGetData from "../components/hooks/useAuthGetData";
import Button from "../components/UI/Button";
import EditModal from "./UI/EditModal";
import Input from "../components/UI/Input";
import Textarea from "../components/UI/Textarea";
import type { ITodo, IErrors } from "./interfaces";
import { axiosInstance } from "../components/config";
import toast from "react-hot-toast";
import ErrorMessage from "../components/UI/ErrorMessage";
import DeleteModal from "./UI/DeleteModal";
import { validateTodo } from "./validation";
import TodoSkeleton from "./UI/TodoSkeleton";
import AddModal from "./UI/AddModal";
import { Plus, Edit3, Trash2, ClipboardList } from "lucide-react";

const getUserData = () => {
    try {
        const userDateString = localStorage.getItem("userDate");
        return userDateString ? JSON.parse(userDateString) : null;
    } catch {
        return null;
    }
};

const TodoList = () => {
    const userData = getUserData();

    // states
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);
    const [queryUpdate, setQueryUpdate] = useState(1);
    const [isloadingAdd, setisloadingAdd] = useState(false);
    const [error, setError] = useState<IErrors>();
    const [DeleteTodo, setDeleteTodo] = useState<ITodo>({
        title: "",
        description: "",
        documentId: "",
    });

    const [editTodo, setEditTodo] = useState<ITodo>({
        title: "",
        description: "",
        documentId: "",
    });

    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isupdate, setIsUpdate] = useState(false);

    const [newTodo, setNewTodo] = useState({
        title: "",
        description: "",
        user: {
            connect: [""],
        },
    });

    // Hook
    const { isLoading, data } = useAuthGetData({
        queryKey: ["todoList", `${queryUpdate}`],
        url: "/users/me?populate=todos&status=published",
        config: {
            headers: {
                Authorization: `Bearer ${userData?.jwt}`,
            },
        },
    });

    const OnAddSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validationErrors = validateTodo(newTodo.title, newTodo.description);
        setError(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        try {
            setisloadingAdd(true);

            const { status } = await axiosInstance.post(
                `/todos`,
                {
                    data: {
                        title: newTodo.title,
                        description: newTodo.description,
                        user: {
                            connect: [userData?.user?.documentId],
                        },
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${userData?.jwt}`,
                    },
                }
            );

            if (status === 201) {
                toast.success("Todo created successfully", {
                    duration: 2000,
                });

                setIsOpenAdd(false);
                setNewTodo({
                    title: "",
                    description: "",
                    user: {
                        connect: [""],
                    },
                });

                setError({});
                setQueryUpdate((prev) => prev + 1);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setisloadingAdd(false);
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validationErrors = validateTodo(editTodo.title, editTodo.description);
        setError(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        try {
            setIsUpdate(true);

            const { status } = await axiosInstance.put(
                `/todos/${editTodo.documentId}`,
                {
                    data: {
                        title: editTodo.title,
                        description: editTodo.description,
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${userData?.jwt}`,
                    },
                }
            );

            if (status === 200) {
                toast.success("Todo updated successfully");

                setEditTodo({
                    title: "",
                    description: "",
                    documentId: "",
                });

                setError({});
                setIsOpen(false);
                setQueryUpdate((prev) => prev + 1);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setIsUpdate(false);
        }
    };

    const openEditModal = (todo: ITodo) => {
        setEditTodo({
            title: todo.title,
            description: todo.description,
            documentId: todo.documentId,
        });
        setIsOpen(true);
    };

    const closeEditModal = () => {
        setIsOpen(false);
        setEditTodo({
            title: "",
            description: "",
            documentId: "",
        });
        setError({});
    };

    const openAddModal = () => {
        setIsOpenAdd(true);
    };

    const closeAddModal = () => {
        setIsOpenAdd(false);
        setError({});
    };

    const setOpenDeleteModal = (todo: ITodo) => {
        setDeleteTodo({
            title: todo.title,
            description: todo.description,
            documentId: todo.documentId,
        });
        setIsOpenDelete(true);
    };

    const closeDeleteModal = () => {
        setIsOpenDelete(false);
    };

    // Handlers
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditTodo({ ...editTodo, [name]: value });
    };

    const AddTodoChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewTodo({
            ...newTodo,
            [name]: value,
        });
    };

    const onRemove = async (todo: ITodo) => {
        try {
            setIsLoadingDelete(true);
            const { status } = await axiosInstance.delete(`/todos/${todo.documentId}`, {
                headers: {
                    Authorization: `Bearer ${userData?.jwt}`,
                },
            });

            if (status === 204) {
                toast.success("Todo deleted successfully", {
                    icon: "🗑️",
                    duration: 2000,
                });
                setIsLoadingDelete(false);
                closeDeleteModal();
                setDeleteTodo({
                    title: "",
                    description: "",
                    documentId: "",
                });
                setQueryUpdate((prev) => prev + 1);
            } else {
                toast.error("Error while deleting. Try again", {
                    icon: "❌",
                    duration: 1500,
                });
            }
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoadingDelete(false);
        }
    };

    const todosList: (ITodo & { id?: number })[] = data?.data?.todos || [];

    return (
        <div className="py-6">
            {/* Page Header / Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 mb-8 border-b border-slate-200/80">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                            My Tasks
                        </h1>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                            {todosList.length} {todosList.length === 1 ? "task" : "tasks"}
                        </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">
                        Stay focused and organized with your personal todo list
                    </p>
                </div>

                <div>
                    <Button
                        onClick={openAddModal}
                        type="button"
                        className="w-full sm:w-auto inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all cursor-pointer"
                    >
                        <Plus className="w-4 h-4 stroke-[2.5]" />
                        <span>Add New Todo</span>
                    </Button>
                </div>
            </div>

            {/* Todo List Content */}
            {isLoading ? (
                <div className="space-y-3">
                    {Array.from({ length: 5 }, (_, index) => (
                        <TodoSkeleton key={`todo-skeleton-${index}`} />
                    ))}
                </div>
            ) : todosList.length > 0 ? (
                <div className="space-y-3">
                    {todosList.map((todo) => (
                        <div
                            key={todo.documentId}
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
                                    onClick={() => openEditModal(todo)}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 transition-colors cursor-pointer"
                                >
                                    <Edit3 className="w-3.5 h-3.5" />
                                    <span>Edit</span>
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => setOpenDeleteModal(todo)}
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
                /* Empty state */
                <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-200 shadow-xs max-w-lg mx-auto my-8">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center mx-auto mb-4">
                        <ClipboardList className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">No tasks yet</h3>
                    <p className="text-sm text-slate-500 mt-1.5 max-w-sm mx-auto">
                        Your workspace is clear! Click the button below to add your first todo item.
                    </p>
                    <div className="mt-6">
                        <Button
                            onClick={openAddModal}
                            type="button"
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-all cursor-pointer"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Create Your First Todo</span>
                        </Button>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            <EditModal title="Edit Task" isOpen={isOpen} setIsClose={closeEditModal}>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                            Task Title
                        </label>
                        <Input
                            name="title"
                            placeholder="Enter task title"
                            type="text"
                            value={editTodo.title}
                            onChange={onChangeHandler}
                        />
                        <ErrorMessage message={error?.title} />
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                            Description
                        </label>
                        <Textarea
                            name="description"
                            placeholder="Enter task description"
                            value={editTodo.description}
                            onChange={onChangeHandler}
                        />
                        <ErrorMessage message={error?.description} />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                        <Button
                            type="button"
                            onClick={closeEditModal}
                            className="px-4 py-2.5 text-sm font-medium rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                            Cancel
                        </Button>
                        <Button
                            isLoading={isupdate}
                            type="submit"
                            className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors cursor-pointer"
                        >
                            Save Changes
                        </Button>
                    </div>
                </form>
            </EditModal>

            {/* Delete Modal */}
            <DeleteModal
                isOpen={isOpenDelete}
                setIsClose={closeDeleteModal}
                title="Delete Todo"
                description={`Are you sure you want to delete "${DeleteTodo.title || 'this task'}"? This action cannot be undone.`}
            >
                <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
                    <Button
                        type="button"
                        onClick={closeDeleteModal}
                        className="px-4 py-2.5 text-sm font-medium rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        onClick={() => onRemove(DeleteTodo)}
                        isLoading={isLoadingDelete}
                        className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-rose-600 hover:bg-rose-700 text-white shadow-xs transition-colors cursor-pointer"
                    >
                        Yes, Delete
                    </Button>
                </div>
            </DeleteModal>

            {/* Add Modal */}
            <AddModal isOpen={isOpenAdd} setIsClose={closeAddModal} title="Create New Task">
                <form onSubmit={OnAddSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                            Task Title
                        </label>
                        <Input
                            type="text"
                            name="title"
                            placeholder="Enter task title (5-20 characters)"
                            value={newTodo.title}
                            onChange={AddTodoChangeHandler}
                        />
                        <ErrorMessage message={error?.title} />
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                            Description
                        </label>
                        <Textarea
                            name="description"
                            placeholder="Enter task description (20-100 characters)"
                            value={newTodo.description}
                            onChange={AddTodoChangeHandler}
                        />
                        <ErrorMessage message={error?.description} />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                        <Button
                            type="button"
                            onClick={closeAddModal}
                            className="px-4 py-2.5 text-sm font-medium rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            isLoading={isloadingAdd}
                            className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors cursor-pointer"
                        >
                            Create Task
                        </Button>
                    </div>
                </form>
            </AddModal>
        </div>
    );
};

export default TodoList;







