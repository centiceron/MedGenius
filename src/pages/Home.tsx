import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  const handleJoin = () => {
    navigate(`/room/${input || "123"}`);
  };

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='flex flex-col items-center gap-4'>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type='text'
          placeholder='Enter Room ID'
          className='px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <Button
          onClick={handleJoin}
          variant='default'
          size='lg'
          className='flex items-center gap-2'
        >
          JOIN NOW
        </Button>
      </div>
    </div>
  );
};

export default Home;
