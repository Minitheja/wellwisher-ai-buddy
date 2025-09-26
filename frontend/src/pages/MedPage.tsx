import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";


const MedPage = () => {
  const meditationVideos = [
    "https://www.youtube.com/embed/inpok4MKVLM",
    "https://www.youtube.com/embed/z6X5oEIg6Ak",
    "https://www.youtube.com/embed/6p_yaNFSYao",
  ];

  return (
    <div className="min-h-screen bg-background px-4 sm:px-6 lg:px-8 py-6">
      {/* Top-right Books button */}
      <div className="flex justify-end mb-4">
        <Button asChild variant="outline">
          <Link to="/books">📚 Books</Link>
        </Button>
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Meditation Videos</CardTitle>
          <p className="text-muted-foreground">
            Relax and refresh with these YouTube meditation sessions.
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {meditationVideos.map((url, idx) => (
          <Card key={idx} className="overflow-hidden">
            <CardContent className="p-0">
              <iframe
                width="100%"
                height="250"
                src={url}
                title={`Meditation Video ${idx + 1}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Back button */}
      <div className="mt-6">
        <Button asChild>
          <Link to="/">⬅ Back to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default MedPage;
