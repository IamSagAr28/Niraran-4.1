import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function BlogSection() {
  const blogs = [
    {
      title: "Diwali Gift Hampers",
      date: "October 4, 2025",
      excerpt: "Looking for the perfect Diwali gift that not only spreads joy but also supports a great cause? Look no further than Nivaran Upcyclers...",
      link: "https://www.nivaranupcyclers.in/blogs/news/diwali-gift-hampers",
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=1000" // Placeholder for Diwali
    },
    {
      title: "Handmade products exhibition",
      date: "September 14, 2024",
      excerpt: "Nivaran Upcyclers is thrilled to announce its upcoming exhibition on September 15, 2024, at the prestigious Rangoli...",
      link: "https://www.nivaranupcyclers.in/blogs/news/handmade-products-exhibition",
      image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&q=80&w=1000" // Placeholder for Exhibition
    },
    {
      title: "AWARD CEREMONY",
      date: "August 16, 2024",
      excerpt: "We are pleased to share the exciting news that our director, Dr. Latika Mathur, was recently honored at a ceremony...",
      link: "https://www.nivaranupcyclers.in/blogs/news/award-ceremony",
      image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80&w=1000" // Placeholder for Award
    },
    {
      title: "SLOGAN WRITING CONTEST",
      date: "August 16, 2024",
      excerpt: "A slogan writing contest was recently organized at DAV PG Degree College, Kanpur as part of a waste management drive...",
      link: "https://www.nivaranupcyclers.in/blogs/news/slogan-writing-contest",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=1000" // Placeholder for Writing
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl mb-3 text-[#344e41]">From The Blogs</h2>
          <p className="text-[#3a5a40]">Latest updates and stories from our community</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogs.map((blog, index) => (
            <div key={index} className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full border border-[#dad7cd]/30 overflow-hidden">
              <div className="aspect-video overflow-hidden bg-[#dad7cd]/20">
                <ImageWithFallback
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-sm text-[#588157] mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{blog.date}</span>
                </div>
                
                <h3 className="text-xl text-[#344e41] mb-3 font-medium line-clamp-2 group-hover:text-[#588157] transition-colors">
                  {blog.title}
                </h3>
                
                <p className="text-[#3a5a40] text-sm mb-4 line-clamp-3 flex-grow">
                  {blog.excerpt}
                </p>
                
                <a 
                  href={blog.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#588157] font-medium hover:text-[#3a5a40] transition-colors mt-auto"
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
