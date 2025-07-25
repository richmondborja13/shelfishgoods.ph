/**
 * BlogSection Component
 *
 * Front-end Guidelines:
 * - Displays blog posts, featured articles, and insights.
 * - Uses Lucide icons, Next.js Link, and UI dialogs/hover cards for details.
 * - UI/UX: Engaging, expandable, and highlights featured content.
 *
 * Back-end Follow-through:
 * - If blog posts are dynamic, fetch from API or CMS.
 * - Ensure endpoints provide post content, author info, and categories as needed.
 */
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Calendar, Clock, User, ArrowRight, Eye } from 'lucide-react';

// mock contents on card on the blog section
const blogPosts = [
  {
    id: 1,
    title: '10 Essential Inventory Management Tips for Small Businesses',
    excerpt: 'Learn the fundamental strategies that can transform your inventory management and boost your bottom line.',
    author: 'Sarah Johnson',
    date: 'March 15, 2024',
    readTime: '5 min read',
    category: 'Inventory Management',
    featured: true,
    content: 'Small businesses often struggle with inventory management, but with the right strategies, you can optimize your operations and reduce costs. This comprehensive guide covers everything from demand forecasting to supplier relationships.',
  },
  {
    id: 2,
    title: 'The Future of Vendor Management: AI and Automation',
    excerpt: 'Discover how artificial intelligence is revolutionizing vendor management and what it means for your business.',
    author: 'Michael Chen',
    date: 'March 10, 2024',
    readTime: '7 min read',
    category: 'Technology',
    featured: false,
    content: 'Artificial intelligence is transforming how businesses manage their vendor relationships. From automated order processing to predictive analytics, AI is making vendor management more efficient than ever.',
  },
  {
    id: 3,
    title: 'Building Strong Supplier Relationships: A Complete Guide',
    excerpt: 'Master the art of supplier relationship management to ensure reliable partnerships and better pricing.',
    author: 'Emily Rodriguez',
    date: 'March 5, 2024',
    readTime: '6 min read',
    category: 'Relationships',
    featured: false,
    content: 'Strong supplier relationships are the backbone of any successful business. Learn how to build trust, negotiate effectively, and create mutually beneficial partnerships.',
  },
];

export default function BlogSection() {
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <section className="min-h-screen flex flex-col justify-center py-20 bg-gray-50" id="blog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Latest Insights</h2>
          <p className="mt-4 text-xl text-gray-500">Stay updated with industry trends and best practices</p>
        </div>

        {featuredPost && (
          <div className="mt-16">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    Featured
                  </span>
                  <span className="text-sm text-gray-500">{featuredPost.category}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{featuredPost.title}</h3>
                <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{featuredPost.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="inline-flex items-center space-x-2">
                        <Eye className="w-4 h-4" />
                        <span>Read More</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{featuredPost.title}</DialogTitle>
                        <DialogDescription>
                          By {featuredPost.author} • {featuredPost.date} • {featuredPost.readTime}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {featuredPost.category}
                          </span>
                        </div>
                        <div className="prose prose-sm max-w-none">
                          <p className="text-gray-600 leading-relaxed">
                            {featuredPost.content}
                          </p>
                          <p className="text-gray-600 leading-relaxed mt-4">
                            Small businesses often struggle with inventory management, but with the right strategies, you can optimize your operations and reduce costs. This comprehensive guide covers everything from demand forecasting to supplier relationships.
                          </p>
                          <p className="text-gray-600 leading-relaxed mt-4">
                            The key to successful inventory management lies in understanding your demand patterns, maintaining good relationships with suppliers, and leveraging technology to automate routine tasks. By implementing these strategies, you can significantly improve your operational efficiency and profitability.
                          </p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {regularPosts.map((post) => (
            <HoverCard key={post.id}>
              <HoverCardTrigger asChild>
                <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg">
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="text-sm text-gray-500">{post.category}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{post.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{post.date}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="font-semibold">{post.title}</h4>
                  <p className="text-sm text-gray-600">{post.excerpt}</p>
                  <div className="pt-2">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{post.author}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                      {post.content}
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild>
            <Link href="#" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              View All Posts
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
} 