export default function RoomOptions({ stay, selectedRoom, setSelectedRoom }) {
  if (!stay?.rooms?.length) return null;

  return (
    <section className="mb-16">
      <h3 className="text-xl text-[#1F2937] mb-6" style={{ fontFamily: 'Playfair Display,serif' }}>Choose Your Sanctuary</h3>
      <div className="flex flex-col gap-6">
        {stay.rooms.map((room) => {
          const isSelected = selectedRoom?.id === room.id;
          return (
            <div 
              key={room.id} 
              className={`flex flex-col sm:flex-row gap-6 p-4 rounded-3xl bg-white shadow-sm border transition-all group ${isSelected ? 'border-[#6F93C4] ring-2 ring-[#6F93C4]/20' : 'border-gray-100 hover:shadow-lg'}`}
            >
              <div className="sm:w-1/3 h-48 rounded-2xl overflow-hidden relative">
                <img src={room.image} alt={room.type} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="sm:w-2/3 flex flex-col py-2 pr-4 relative">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-medium text-[#1F2937]" style={{ fontFamily: 'Playfair Display,serif' }}>{room.type}</h4>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-900">₹{room.price}</div>
                    <div className="text-xs font-light text-gray-500">per night</div>
                  </div>
                </div>
                <p className="text-sm font-light text-gray-600 mb-4 flex-1">
                  Enjoy the ultimate comfort and luxury. Perfect for your escape to {stay.location.split(',')[0]}.
                </p>
                
                <div className="flex flex-wrap gap-4 text-xs text-gray-500 font-light mb-4">
                  {room.features.map(f => (
                    <span key={f} className="flex items-center gap-1">✨ {f}</span>
                  ))}
                </div>

                <button 
                  onClick={() => {
                    setSelectedRoom(room);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`self-start px-6 py-2 rounded-lg text-sm font-medium transition-colors ${isSelected ? 'bg-[#6F93C4] text-white' : 'border border-[#6F93C4] text-[#6F93C4] hover:bg-[#6F93C4] hover:text-white'}`}
                >
                  {isSelected ? 'Selected' : 'Select Room'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
