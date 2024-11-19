import React, { useEffect, useState } from 'react';
import ListItem from './ListItem';
import Loader from './Loader';

function MainFile() {
  const [Item, setItem] = useState("");
  const [Loading, setLoading] = useState(false);
  const [ShowItem, setShowItem] = useState([]);

  useEffect(() => {
    // Fetch the initial data when the component mounts
    handleShowitem();

    // Set up interval to refresh data every 5 seconds
    const interval = setInterval(() => {
      handleShowitem();
    }, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleAdditem = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:3000/users', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: Item }),
      });

      const res = await response.json();
      if (response.status === 201) {
        handleShowitem(); // Refresh the list after adding the new item
        setItem(""); // Clear the input field
      }
    } catch (err) {
      console.error('Error adding item:', err);
    }
  };

  const handleShowitem = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:3000/Show', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,

        },
      });

      const res = await response.json();
      if (res && res.users) {
        // Check if the fetched data is different from the current state
        if (JSON.stringify(res.users) !== JSON.stringify(ShowItem)) {
          setShowItem(res.users); // Update state only if data has changed
        }
      } else {
        setShowItem([]); // Handle case when no users are returned
      }
    } catch (err) {
      console.error('Error fetching items:', err);
    } finally {
      setLoading(false); // Ensure loader is hidden regardless of success or failure
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,

        },
      });

      const res = await response.json();
      if (response.status === 200) {
        handleShowitem(); // Refresh the list after deleting the item
      }
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  return (
    <div>
      <div className='flex justify-center items-center w-full'>
        <div className='bg-slate-500 w-[100%] md:w-[50%] h-[100%] flex flex-col justify-center items-center'>
          <h1 className='text-xl md:text-3xl font-bold text-gray-100 mb-9 px-5'>
            Aryan Bandooni - Reachify Full Stack Assignment
          </h1>

          <div className='mx-auto'>
            <input
              type="text"
              value={Item}
              onChange={(e) => setItem(e.target.value)}
              className='bg-gray-300 rounded-3xl px-4 py-2'
            />
            <button
              onClick={handleAdditem}
              className='border-2 border-black rounded-2xl px-4 py-2 bg-green-200 text-xl font-bold'
            >
              Add
            </button>
          </div>

          {Loading && <Loader />}

          <div>
            {ShowItem && ShowItem.length > 0 ? (
              ShowItem.map((item, i) => (
                <div key={i}>
                  <ListItem item={item} handleDelete={handleDelete} />
                </div>
              ))
            ) : (
              <p>No items available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainFile;
