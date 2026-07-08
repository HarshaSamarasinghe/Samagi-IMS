import { useState, useEffect, useCallback } from "react";
import api from "../services/api";
import Modal from "../components/Modal";

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        role: "user",
        phone_number: "",
        address: "",
        nic: "",
    });
    const [formErrors, setFormErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [deleteError, setDeleteError] = useState("");

    const fetchUsers = useCallback(async (page = 1) => {
        setLoading(true);
        try {
            const response = await api.get(`/users?page=${page}`);
            setUsers(response.data.data);
            setPagination({
                currentPage: response.data.current_page,
                lastPage: response.data.last_page,
                total: response.data.total,
            });
        } catch {
            // handled by interceptor
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers(currentPage);
    }, [currentPage, fetchUsers]);

    const openCreate = () => {
        setEditing(null);
        setFormData({
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            role: "user",
            phone_number: "",
            address: "",
            nic: "",
        });
        setFormErrors({});
        setModalOpen(true);
    };

    const openEdit = (user) => {
        setEditing(user);
        setFormData({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: "",
            role: user.role,
            phone_number: user.phone_number || "",
            address: user.address || "",
            nic: user.nic || "",
        });
        setFormErrors({});
        setModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setFormErrors({});
        try {
            const data = { ...formData };
            if (editing && !data.password) {
                delete data.password;
            }
            if (editing) {
                await api.put(`/users/${editing.id}`, data);
            } else {
                await api.post("/users", data);
            }
            setModalOpen(false);
            fetchUsers(currentPage);
        } catch (error) {
            if (error.response?.status === 422) {
                setFormErrors(error.response.data.errors || {});
            }
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        setDeleteError("");
        try {
            await api.delete(`/users/${id}`);
            setDeleteConfirm(null);
            fetchUsers(currentPage);
        } catch (error) {
            if (error.response?.status === 400) {
                setDeleteError(error.response.data.message || "Cannot delete this user.");
            }
        }
    };

    const getRoleBadgeClass = (role) => {
        switch (role) {
            case "admin": return "px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-100";
            case "user": return "px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100";
            default: return "px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-50 text-gray-600 border border-gray-100";
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Users</h1>
                    <p className="text-gray-400 text-sm mt-1">Manage system users</p>
                </div>
                <button 
                    className="bg-black text-white hover:bg-gray-800 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2" 
                    onClick={openCreate}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    New User
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
            ) : users.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col items-center">
                    <svg className="text-gray-300 mb-3" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                    </svg>
                    <h3 className="text-lg font-bold text-gray-900">No users found</h3>
                    <p className="text-gray-400 text-sm mt-1">Create a new user to get started</p>
                    <button className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-lg text-sm font-semibold transition-colors mt-4" onClick={openCreate}>Create User</button>
                </div>
            ) : (
                <>
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-left text-sm text-gray-500">
                                <thead className="bg-gray-50 text-gray-700 font-medium uppercase text-xs tracking-wider border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold">Name</th>
                                        <th className="px-6 py-4 font-semibold">Email</th>
                                        <th className="px-6 py-4 font-semibold">Role</th>
                                        <th className="px-6 py-4 font-semibold">Phone</th>
                                        <th className="px-6 py-4 font-semibold">NIC</th>
                                        <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {users.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="bg-gray-100 text-gray-700 rounded-full flex items-center justify-center font-bold w-8 h-8 mr-3 text-xs">
                                                        {user.first_name?.[0]}{user.last_name?.[0]}
                                                    </div>
                                                    <span className="font-medium text-gray-900">{user.first_name} {user.last_name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500">{user.email}</td>
                                            <td className="px-6 py-4">
                                                <span className={getRoleBadgeClass(user.role)}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500">{user.phone_number || "—"}</td>
                                            <td className="px-6 py-4 text-gray-500">{user.nic || "—"}</td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
                                                        onClick={() => openEdit(user)}
                                                        title="Edit"
                                                    >
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        className="p-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
                                                        onClick={() => { setDeleteConfirm(user.id); setDeleteError(""); }}
                                                        title="Delete"
                                                    >
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <polyline points="3 6 5 6 21 6" />
                                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {pagination.lastPage > 1 && (
                        <div className="flex justify-between items-center mt-6">
                            <span className="text-gray-400 text-xs">
                                Page {pagination.currentPage} of {pagination.lastPage}
                            </span>
                            <div className="inline-flex rounded-lg border border-gray-200 bg-white overflow-hidden shadow-sm">
                                <button
                                    className="px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 border-r border-gray-200 transition-colors disabled:opacity-50 disabled:pointer-events-none"
                                    disabled={pagination.currentPage === 1}
                                    onClick={() => setCurrentPage(pagination.currentPage - 1)}
                                >
                                    Previous
                                </button>
                                <button
                                    className="px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:pointer-events-none"
                                    disabled={pagination.currentPage === pagination.lastPage}
                                    onClick={() => setCurrentPage(pagination.currentPage + 1)}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* Create/Edit Modal */}
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={editing ? "Edit User" : "Create User"}
            >
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="user-first-name" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                            <input
                                id="user-first-name"
                                type="text"
                                value={formData.first_name}
                                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                                placeholder="John"
                                required
                                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-colors ${formErrors.first_name ? "border-red-400" : "border-gray-300"}`}
                            />
                            {formErrors.first_name && <div className="text-red-500 text-xs mt-1">{formErrors.first_name[0]}</div>}
                        </div>
                        <div>
                            <label htmlFor="user-last-name" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                            <input
                                id="user-last-name"
                                type="text"
                                value={formData.last_name}
                                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                                placeholder="Doe"
                                required
                                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-colors ${formErrors.last_name ? "border-red-400" : "border-gray-300"}`}
                            />
                            {formErrors.last_name && <div className="text-red-500 text-xs mt-1">{formErrors.last_name[0]}</div>}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="user-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            id="user-email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="john@example.com"
                            required
                            className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-colors ${formErrors.email ? "border-red-400" : "border-gray-300"}`}
                        />
                        {formErrors.email && <div className="text-red-500 text-xs mt-1">{formErrors.email[0]}</div>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="user-password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password {editing && <span className="text-gray-400 text-xs normal-case ms-1">(leave blank to keep current)</span>}
                        </label>
                        <input
                            id="user-password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="••••••••"
                            {...(!editing && { required: true })}
                            minLength={8}
                            className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-colors ${formErrors.password ? "border-red-400" : "border-gray-300"}`}
                        />
                        {formErrors.password && <div className="text-red-500 text-xs mt-1">{formErrors.password[0]}</div>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="user-role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                            <select
                                id="user-role"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white transition-colors"
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="user-phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input
                                id="user-phone"
                                type="text"
                                value={formData.phone_number}
                                onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                                placeholder="+94 77 123 4567"
                                required
                                minLength={10}
                                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-colors ${formErrors.phone_number ? "border-red-400" : "border-gray-300"}`}
                            />
                            {formErrors.phone_number && <div className="text-red-500 text-xs mt-1">{formErrors.phone_number[0]}</div>}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="user-nic" className="block text-sm font-medium text-gray-700 mb-1">NIC</label>
                        <input
                            id="user-nic"
                            type="text"
                            value={formData.nic}
                            onChange={(e) => setFormData({ ...formData, nic: e.target.value })}
                            placeholder="National ID"
                            required
                            className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-colors ${formErrors.nic ? "border-red-400" : "border-gray-300"}`}
                        />
                        {formErrors.nic && <div className="text-red-500 text-xs mt-1">{formErrors.nic[0]}</div>}
                    </div>

                    <div className="mb-6">
                        <label htmlFor="user-address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <textarea
                            id="user-address"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            placeholder="123 Main Street, City"
                            rows={2}
                            className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-colors ${formErrors.address ? "border-red-400" : "border-gray-300"}`}
                        />
                        {formErrors.address && <div className="text-red-500 text-xs mt-1">{formErrors.address[0]}</div>}
                    </div>

                    <div className="flex justify-end gap-2">
                        <button type="button" className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors" onClick={() => setModalOpen(false)}>
                            Cancel
                        </button>
                        <button type="submit" className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-60 flex items-center justify-center gap-2" disabled={submitting}>
                            {submitting ? (
                                <>
                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                    </svg>
                                    Saving...
                                </>
                            ) : (
                                editing ? "Update" : "Create"
                            )}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={deleteConfirm !== null}
                onClose={() => setDeleteConfirm(null)}
                title="Delete User"
            >
                <p className="text-gray-900 mb-6 text-sm">Are you sure you want to delete this user? This action cannot be undone.</p>
                {deleteError && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm">{deleteError}</div>}
                <div className="flex justify-end gap-2">
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors" onClick={() => setDeleteConfirm(null)}>
                        Cancel
                    </button>
                    <button className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-semibold transition-colors" onClick={() => handleDelete(deleteConfirm)}>
                        Delete
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default UsersPage;
