import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Plus, Trash2, Pencil } from "lucide-react";
import { deleteExperience } from "@/app/actions/experiences";
import { ViewToggle } from "@/components/admin/view-toggle";
import { SortableExperiences } from "@/components/admin/sortable-experiences";

const FALLBACK_EXPERIENCES = [
  { id: "1", title: "Student Coordinator", organization: "NSS (National Service Scheme)", type: "leadership" },
  { id: "2", title: "Bachelor of Engineering - BE, Computer Engineering", organization: "Jagadambha College of Engineering and Technology", type: "education" },
  { id: "3", title: "Engineering Science", organization: "Matsyodari Shikshan Sanstha's Ankushrao Tope College", type: "education" },
  { id: "4", title: "Junior High/Intermediate/Middle School Education and Teaching", organization: "Oxford English High School", type: "education" },
];

export default async function AdminExperiencesPage(props: { searchParams: Promise<{ view?: string }> }) {
  const { view = "list" } = await props.searchParams;
  const isGrid = view === "grid";
  let experiences = FALLBACK_EXPERIENCES;
  
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("experiences").select("*").order("start_date", { ascending: false });
    if (data && data.length > 0) experiences = data;
  } catch {
    // use fallbacks
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter">EXPERIENCES</h1>
        <div className="flex items-center gap-4">
          <ViewToggle />
          <Button variant="primary" asChild>
            <Link href="/admin/experiences/new"><Plus className="mr-2 w-4 h-4" /> NEW EXPERIENCE</Link>
          </Button>
        </div>
      </div>
      {!experiences || experiences.length === 0 ? (
        <div className="border-2 border-border p-12 text-center">
          <p className="text-lg text-muted-foreground mb-6">NO EXPERIENCES YET.</p>
          <Button variant="primary" asChild><Link href="/admin/experiences/new">ADD YOUR FIRST EXPERIENCE</Link></Button>
        </div>
      ) : (
        <SortableExperiences initialExperiences={experiences} isGrid={isGrid} />
      )}
    </div>
  );
}
