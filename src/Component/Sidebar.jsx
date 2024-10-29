import React, { useState } from "react";

const Sidebar = ({ pins, onPinClick, onPinDelete, onPinEdit }) => {
  const [editingPin, setEditingPin] = useState(null);
  const [editedRemark, setEditedRemark] = useState("");

  const handleEditClick = (index, remark) => {
    setEditingPin(index);
    setEditedRemark(remark);
  };

  const handleSaveEdit = (index) => {
    onPinEdit(index, editedRemark);
    setEditingPin(null);
    setEditedRemark("");
  };

 
  const extractCityAndStreet = (address) => {
      const parts = address.split(",");
      
    const street = parts[0] ? parts[0].trim() : ""; 
    const street1= parts[1] ? parts[1].trim() : ""; 
      const place = parts[2] ? parts[2].trim() : "";
      const city = parts[5] ? parts[5].trim() : "";
      const part9 = parts[9] ? parts[9].trim() : "";
    return `${street}, ${street1} ,${place} ,${city} ${part9}`; 
  };

  return (
    <div className="w-1/ h-screen overflow-y-auto relative no-scrollbar">
      <div className="flex  text-2xl font-extrabold flex items-center justify-center py-4">
        <div className="flex items-center">
          <span className="">
            MARKED LOCATIONS
          </span>
          
        </div>
      </div>
      <ul className="flex flex-col gap-2 p-2">
        {pins.map((pin, index) => (
          <li key={index} className="relative ">
            <div className="border-black border-2 p-1">
              <p
                className="mt-4 ml-3 cursor-pointer "
                onClick={() => onPinClick(index)}
              >
                <b className="">Remark:</b>{" "}
                <span className="">{pin.remark}</span>
              </p>
              <p
                className="ml-3  mr-3 cursor-pointer text-sm"
                onClick={() => onPinClick(index)}
              >
                <b className="">Address:</b>{" "}
                <span className="text-xs">{extractCityAndStreet(pin.address)}</span>
              </p>
              <div className="flex py-2 gap-2 px-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditClick(index, pin.remark);
                  }}
                  className=" text-sm font-bold px-3 py-2 leading-none text-white bg-black p-2 border border-gray-800 rounded-lg focus:outline-none focus:shadow-outline "
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPinDelete(index);
                  }}
                  className=" text-sm font-bold px-3 py-2 leading-none text-white bg-black border border-gray-800 rounded-lg focus:outline-none focus:shadow-outline "
                >
                  Delete
                </button>
              </div>
            </div>
            {editingPin === index && (
              <div className="absolute top-0 left-0 w-full bg-slate-400 shadow-lg rounded-lg p-4 z-10">
                <input
                  value={editedRemark}
                  onChange={(e) => setEditedRemark(e.target.value)}
                  className="bg-white w-full px-1 py-1 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex justify-end space-x-2 mr-6">
                  <button
                    onClick={() => handleSaveEdit(index)}
                    className="mr-3 px-2 py-1 text-white bg-orange-600 rounded-md hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingPin(null)}
                    className="mr-3 px-3 py-1 text-gray-700 bg-orange-500 rounded-md hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
