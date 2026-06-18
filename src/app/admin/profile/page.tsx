import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/ui/submit-button";
import { Input, Textarea } from "@/components/ui/input";
import { updateProfile } from "@/app/actions/profile";

export default async function AdminProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user?.id).single();

  return (
    <div>
      <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-12">PROFILE</h1>
      <div className="border-2 border-border p-6 md:p-8 max-w-2xl">
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
            <Input name="hero_tagline" defaultValue={profile?.hero_tagline || ""} placeholder="CRAFTING DIGITAL EXPERIENCES..." className="text-lg" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">BIO</label>
            <Textarea name="bio" defaultValue={profile?.bio || ""} placeholder="Tell visitors about yourself..." />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">EMAIL</label>
              <Input name="email" defaultValue={profile?.email || ""} placeholder="HELLO@AAKASHYADAV.COM" className="text-lg" />
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
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">RESUME URL</label>
            <Input name="resume_url" defaultValue={profile?.resume_url || ""} placeholder="HTTPS://... OR /RESUME.PDF" className="text-lg" />
            <p className="text-xs text-muted-foreground mt-2 uppercase tracking-widest font-bold">Link to your Google Drive PDF or place a &quot;resume.pdf&quot; in your public folder and enter &quot;/resume.pdf&quot;.</p>
          </div>
          <SubmitButton variant="primary" size="lg">SAVE PROFILE</SubmitButton>
        </form>
      </div>
    </div>
  );
}
