import { createClient } from "@/lib/supabase/server";
import { SubmitButton } from "@/components/ui/submit-button";
import { Input, Textarea } from "@/components/ui/input";
import { updateProfile } from "@/app/actions/profile";

export default async function AdminProfilePage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let profile: any = null;

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      profile = data;
    }
  } catch {
    // Supabase not configured — render empty form
  }

  return (
    <div>
      <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-12">PROFILE</h1>
      <div className="border-2 border-border p-6 md:p-8 max-w-2xl bg-background">
        <form action={updateProfile} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">FULL NAME</label>
              <Input name="full_name" defaultValue={profile?.full_name || ""} placeholder="YOUR NAME" className="text-lg" />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">TITLE</label>
              <Input name="title" defaultValue={profile?.title || ""} placeholder="FULL-STACK DEVELOPER" className="text-lg" />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">HERO TAGLINE</label>
            <Input name="hero_tagline" defaultValue={profile?.hero_tagline || ""} placeholder="CRAFTING DIGITAL EXPERIENCES" className="text-lg" />
            <p className="text-[10px] text-muted-foreground mt-2 font-mono">Use 3 words (e.g., CRAFTING DIGITAL EXPERIENCES). The middle word will be highlighted in accent color.</p>
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">BIO</label>
            <Textarea name="bio" defaultValue={profile?.bio || ""} placeholder="Tell visitors about yourself..." />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">EMAIL</label>
              <Input name="email" defaultValue={profile?.email || ""} placeholder="HELLO@YOURSITE.COM" className="text-lg" />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">GITHUB URL</label>
              <Input name="github_url" defaultValue={profile?.github_url || ""} placeholder="HTTPS://GITHUB.COM/..." className="text-lg" />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">LINKEDIN URL</label>
            <Input name="linkedin_url" defaultValue={profile?.linkedin_url || ""} placeholder="HTTPS://LINKEDIN.COM/IN/..." className="text-lg" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">RESUME</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground block mb-2">UPLOAD PDF</label>
                <Input type="file" name="resume_file" accept=".pdf" className="text-sm cursor-pointer file:mr-4 file:py-1 file:px-4 file:border-0 file:bg-accent file:text-accent-foreground file:font-bold file:uppercase file:cursor-pointer" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-2">OR ENTER URL</label>
                <Input name="resume_url" defaultValue={profile?.resume_url || ""} placeholder="HTTPS://... OR /RESUME.PDF" className="text-lg" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4 uppercase tracking-widest font-bold">Uploading a new PDF will automatically update the URL.</p>
          </div>
          <div className="border-2 border-border p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest">AVAILABLE FOR WORK</p>
              <p className="text-xs text-muted-foreground mt-1">Controls the availability badge shown in the hero section of your portfolio.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="is_available"
                defaultChecked={profile?.is_available !== false}
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-muted border-2 border-border peer-checked:bg-accent peer-checked:border-accent transition-colors duration-200 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-background after:border after:border-border after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-6" />
            </label>
          </div>
          <SubmitButton variant="primary" size="lg">SAVE PROFILE</SubmitButton>
        </form>
      </div>
    </div>
  );
}
