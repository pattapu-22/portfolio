import React from 'react';

const hobbies = [
  {
    name: "Photography",
    images: ["/assets/images/1.png", "/assets/images/2.png"]
  },
  {
    name: "Travelling",
    images: ["/assets/images/3.jpg", "/assets/images/4.jpg"]
  },
  // add more hobbies and images if needed
];

export default function Gallery() {
  return (
    <section className="min-h-screen px-6 pt-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-12 text-center">My Hobbies</h1>
        
        {hobbies.map((hobby, index) => (
          <div key={index} className="mb-12">
            <h2 className="text-3xl font-semibold mb-4">{hobby.name}</h2>
            <div className="flex overflow-x-auto space-x-4">
              {hobby.images.map((src, idx) => (
                <img 
                  key={idx}
                  src={src}
                  alt={`${hobby.name} ${idx+1}`}
                  className="w-64 h-64 object-cover rounded-lg shadow"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
