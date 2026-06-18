import { createClient } from "@/lib/supabase/server";
import { MediaUploader } from "@/components/admin/media-uploader";
import { MediaGrid } from "@/components/admin/media-grid";

export default async function AdminMediaPage() {
  let mediaFiles: any[] = [];
  
  try {
    const supabase = await createClient();
    
    // We upload to the root of portfolio-images, or specifically 'uploads/' in the action
    // In actions/media.ts we used `uploads/${timestamp}-${safeName}`
    const { data: files } = await supabase.storage.from("portfolio-images").list("uploads", {
      limit: 100,
      sortBy: { column: "created_at", order: "desc" },
    });

    if (files) {
      mediaFiles = files.filter(f => f.name !== ".emptyFolderPlaceholder").map(f => {
        const { data: { publicUrl } } = supabase.storage.from("portfolio-images").getPublicUrl(`uploads/${f.name}`);
        return {
          name: f.name,
          url: publicUrl,
          created_at: f.created_at,
          metadata: f.metadata,
        };
      });
    }
  } catch (error) {
    console.error("Failed to load media", error);
  }

  return (
    <div>
      <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-12">MEDIA LIBRARY</h1>
      
      <div className="mb-12">
        <MediaUploader />
      </div>

      <div>
        <h2 className="text-xl font-bold uppercase tracking-widest mb-6">UPLOADED FILES</h2>
        <MediaGrid initialFiles={mediaFiles} />
      </div>
    </div>
  );
}
