import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, AlertTriangle, X, Search, Filter } from 'lucide-react';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const [roomData, setRoomData] = useState({ roomNumber: '', roomType: 'Single', price: '' });

  // --- NEW: Filter State ---
  const [filters, setFilters] = useState({
    roomNumber: '',
    roomType: 'All',
    maxPrice: '',
    status: 'All'
  });

  const ownerSession = JSON.parse(localStorage.getItem('ownerSession'));
  const hotelId = ownerSession?.id;

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    const res = await fetch(`/api/owner/rooms/${hotelId}`);
    const data = await res.json();
    if (res.ok) setRooms(data);
  };

  // --- NEW: Filter Logic ---
  const filteredRooms = rooms.filter(room => {
    const matchNumber = room.roomNumber.toLowerCase().includes(filters.roomNumber.toLowerCase());
    const matchType = filters.roomType === 'All' || room.roomType === filters.roomType;
    const matchStatus = filters.status === 'All' || (room.status || 'Available') === filters.status;
    const matchPrice = filters.maxPrice === '' || Number(room.price) <= Number(filters.maxPrice);

    return matchNumber && matchType && matchStatus && matchPrice;
  });

  const openAddModal = () => {
    setIsEditing(false);
    setRoomData({ roomNumber: '', roomType: 'Single', price: '' });
    setShowModal(true);
  };

  const openEditModal = (room) => {
    setIsEditing(true);
    setCurrentRoomId(room.id);
    setRoomData({ roomNumber: room.roomNumber, roomType: room.roomType, price: room.price });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isEditing 
      ? `/api/owner/rooms/update/${currentRoomId}` 
      : '/api/owner/rooms/add';
    
    const res = await fetch(url, {
      method: isEditing ? 'PUT' : 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...roomData, hotelId })
    });

    if (res.ok) {
      setShowModal(false);
      fetchRooms();
    }
  };

  const initiateDelete = (room) => {
    setRoomToDelete(room);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!roomToDelete) return;
    try {
      const res = await fetch(`/api/owner/rooms/delete/${roomToDelete.id}`, { method: 'DELETE' });
      if (res.ok) {
        setRooms(rooms.filter(room => room.id !== roomToDelete.id));
        setShowDeleteModal(false);
        setRoomToDelete(null);
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-700 border-green-200';
      case 'Occupied': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Maintenance': return 'bg-red-100 text-red-700 border-red-200';
      case 'Cleaning': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="p-8 bg-[#faf9f6] min-h-screen font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 font-serif">Rooms</h1>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-[#bf9b30] text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:brightness-110 transition-all shadow-lg"
        >
          <Plus size={18} /> Add New Room
        </button>
      </div>

      {/* --- NEW: Filter Bar Section --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text"
            placeholder="Search Room #..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-black/5 rounded-xl outline-none focus:ring-2 focus:ring-[#bf9b30]/20 transition-all text-sm"
            value={filters.roomNumber}
            onChange={(e) => setFilters({...filters, roomNumber: e.target.value})}
          />
        </div>

        <select 
          className="px-4 py-2.5 bg-white border border-black/5 rounded-xl outline-none focus:ring-2 focus:ring-[#bf9b30]/20 text-sm"
          value={filters.roomType}
          onChange={(e) => setFilters({...filters, roomType: e.target.value})}
        >
          <option value="All">All Types</option>
          <option value="Single">Single</option>
          <option value="Double">Double</option>
          <option value="Suite">Suite</option>
          <option value="Deluxe">Deluxe</option>
        </select>

        <select 
          className="px-4 py-2.5 bg-white border border-black/5 rounded-xl outline-none focus:ring-2 focus:ring-[#bf9b30]/20 text-sm"
          value={filters.status}
          onChange={(e) => setFilters({...filters, status: e.target.value})}
        >
          <option value="All">All Statuses</option>
          <option value="Available">Available</option>
          <option value="Occupied">Occupied</option>
          <option value="Cleaning">Cleaning</option>
          <option value="Maintenance">Maintenance</option>
        </select>

        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">MAX ₱</span>
          <input 
            type="number"
            placeholder="Price"
            className="w-full pl-16 pr-4 py-2.5 bg-white border border-black/5 rounded-xl outline-none focus:ring-2 focus:ring-[#bf9b30]/20 text-sm"
            value={filters.maxPrice}
            onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
          />
        </div>
      </div>

      {/* Table - Changed rooms.map to filteredRooms.map */}
      <div className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-black/5">
            <tr>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">Room #</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">Type</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">Price / Night</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">Status</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {filteredRooms.length > 0 ? (
              filteredRooms.map((room) => (
                <tr key={room.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-800">{room.roomNumber}</td>
                  <td className="px-6 py-4 text-slate-600">{room.roomType}</td>
                  <td className="px-6 py-4 font-serif text-[#bf9b30] font-bold">
                    ₱{Number(room.price).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter border ${getStatusStyles(room.status)}`}>
                      {room.status || 'Available'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3 text-slate-400">
                      <button onClick={() => openEditModal(room)} className="hover:text-blue-500 transition-colors">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => initiateDelete(room)} className="hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center text-slate-400 italic">
                  No rooms found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ADD/EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl border border-black/5">
            <h2 className="text-xl font-bold text-slate-800 mb-6 font-serif">
              {isEditing ? 'Edit Room Details' : 'Register New Room'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Room Number</label>
                <input 
                  type="text" value={roomData.roomNumber} required
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#bf9b30] outline-none transition-all"
                  onChange={e => setRoomData({...roomData, roomNumber: e.target.value})}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Room Type</label>
                <select 
                  value={roomData.roomType}
                  className="w-full p-3 rounded-xl border border-slate-200 outline-none transition-all bg-white"
                  onChange={e => setRoomData({...roomData, roomType: e.target.value})}
                >
                  <option value="Single">Single</option>
                  <option value="Double">Double</option>
                  <option value="Suite">Suite</option>
                  <option value="Deluxe">Deluxe</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Price / Night (PHP)</label>
                <input 
                  type="number" value={roomData.price} required
                  className="w-full p-3 rounded-xl border border-slate-200 outline-none transition-all"
                  onChange={e => setRoomData({...roomData, price: e.target.value})}
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-xl">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-[#bf9b30] text-white rounded-xl font-bold shadow-lg">
                  {isEditing ? 'Update Details' : 'Save Room'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODERN DELETE CONFIRMATION MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-[60] p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-sm shadow-2xl border border-red-50 relative overflow-hidden">
            {/* Decorative background circle */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-50 rounded-full" />
            
            <div className="relative">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 mb-6 shadow-inner">
                <AlertTriangle size={32} />
              </div>
              
              <h2 className="text-2xl font-bold text-slate-800 mb-2 font-serif">Remove Room?</h2>
              <p className="text-slate-500 leading-relaxed mb-8">
                You are about to delete <span className="font-bold text-slate-700 underline decoration-red-200 underline-offset-4">Room {roomToDelete?.roomNumber}</span>. 
                This action is permanent and cannot be undone.
              </p>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={confirmDelete}
                  className="w-full py-4 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-bold shadow-lg shadow-red-200 transition-all active:scale-[0.98]"
                >
                  Confirm Deletion
                </button>
                <button 
                  onClick={() => setShowDeleteModal(false)}
                  className="w-full py-4 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-2xl font-bold transition-all"
                >
                  Nevermind, keep it
                </button>
              </div>
            </div>

            <button 
              onClick={() => setShowDeleteModal(false)}
              className="absolute top-6 right-6 text-slate-300 hover:text-slate-500 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rooms;