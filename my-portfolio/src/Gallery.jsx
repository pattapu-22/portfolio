import React, { useState, useEffect } from "react";

const portfolioSections = [
  {
    title: "Hobbies",
    items: [
      {
        name: "Photography",
        images: [
          "/assets/gallery/photography/1.jpg",
          "/assets/gallery/photography/2.jpg",
          "/assets/gallery/photography/3.jpg",
          "/assets/gallery/photography/4.jpg",
          "/assets/gallery/photography/5.jpg",
        ],
      },
      {
        name: "Cooking",
        images: [
          "/assets/gallery/cooking/1.jpg",
          "/assets/gallery/cooking/2.jpg",
          "/assets/gallery/cooking/3.jpg",
          "/assets/gallery/cooking/4.jpg",
          "/assets/gallery/cooking/5.jpg",
        ],
      },
      {
        name: "Drawing",
        images: [
          "/assets/gallery/drawing/1.jpg",
          "/assets/gallery/drawing/2.jpg",
          "/assets/gallery/drawing/3.jpg",
          "/assets/gallery/drawing/4.jpg",
          "/assets/gallery/drawing/5.jpg",
        ],
      },
    ],
  },
  {
    title: "Achievements",
    items: [
      {
        name: "Hackathon Winner",
        images: ["/assets/gallery/photography/1.jpg"],
      },
      {
        name: "Best Photographer",
        images: ["/assets/gallery/photography/3.jpg"],
      },
    ],
  },
  {
    title: "Extra-Curricular Activities",
    items: [
      {
        name: "Public Speaking",
        images: ["/assets/gallery/photography/4.jpg"],
      },
      {
        name: "Volunteering",
        images: ["/assets/gallery/photography/2.jpg"],
      },
    ],
  },
];

function HobbyCard({ item }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === item.images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [item.images.length]);

  return (
    <div className="bg-white rounded-lg shadow p-3 min-w-[200px] flex-shrink-0">
      <h3 className="text-xl font-medium mb-2 text-center">{item.name}</h3>
      <div className="flex justify-center">
        <img
          src={item.images[currentIndex]}
          alt={`${item.name} ${currentIndex + 1}`}
          className="w-28 h-28 object-cover rounded shadow"
        />
      </div>
    </div>
  );
}

export default function Gallery() {
  return (
    <section className="min-h-screen px-4 pt-16 bg-gray-100">
      <div className="max-w-5xl mx-auto space-y-10">
        <h1 className="text-4xl font-bold text-center">My Gallery</h1>

        {portfolioSections.map((section, secIdx) => (
          <div
            key={secIdx}
            className="bg-gray-200 rounded-xl p-4 space-y-4 shadow"
          >
            <h2 className="text-3xl font-semibold">{section.title}</h2>

            {section.title === "Hobbies" ? (
              <div className="flex overflow-x-auto space-x-4 pb-2">
                {section.items.map((item, itemIdx) => (
                  <HobbyCard key={itemIdx} item={item} />
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
                {section.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="bg-white rounded-lg shadow p-3"
                  >
                    <h3 className="text-xl font-medium mb-2 text-center">
                      {item.name}
                    </h3>
                    <div className="flex overflow-x-auto space-x-2">
                      {item.images.map((src, imgIdx) => (
                        <img
                          key={imgIdx}
                          src={src}
                          alt={`${item.name} ${imgIdx + 1}`}
                          className="w-24 h-24 object-cover rounded shadow"
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
