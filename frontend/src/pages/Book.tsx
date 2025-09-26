import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const sampleBooks = [
  {
    title: "Mindfulness for Beginners",
    author: "Jon Kabat-Zinn",
    link: "https://www.gutenberg.org/ebooks/author/123", // placeholder
    description: "A gentle introduction to mindfulness and present-moment awareness.",
  },
  {
    title: "The Happiness Advantage",
    author: "Shawn Achor",
    link: "https://archive.org",
    description: "Research-backed strategies to cultivate positivity and resilience.",
  },
  {
    title: "Atomic Habits (Summary)",
    author: "James Clear",
    link: "https://jamesclear.com/atomic-habits",
    description: "Practical methods to build good habits and break bad ones.",
  },
  {
    title: "Meditations (Public Domain)",
    author: "Marcus Aurelius",
    link: "https://www.gutenberg.org/ebooks/2680",
    description: "Stoic reflections for strength and clarity.",
  },
];

const Books = () => {
  return (
    <div className="min-h-screen bg-background px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex justify-between items-center mb-6">
        <CardTitle className="text-2xl font-bold">Books for Students</CardTitle>
        <Button asChild variant="outline">
          <Link to="/med">⬅ Back to Meditation</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleBooks.map((book, idx) => (
          <Card key={idx}>
            <CardHeader>
              <CardTitle className="text-xl">{book.title}</CardTitle>
              <p className="text-sm text-muted-foreground">by {book.author}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{book.description}</p>
              <Button asChild>
                <a href={book.link} target="_blank" rel="noreferrer noopener">Read</a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Books;


