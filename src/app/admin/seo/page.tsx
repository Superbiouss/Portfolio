import { getSiteSettings, updateSiteSettings } from "@/app/actions/settings";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";

export default async function AdminSeoPage() {
  const settings = await getSiteSettings();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-12">SEO MANAGER</h1>

      <form action={updateSiteSettings} className="space-y-8 bg-background border-2 border-border p-8">
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Site Title</label>
          <Input 
            name="site_title" 
            defaultValue={settings.site_title} 
            placeholder="Aakash Yadav - Full-Stack Developer" 
            required 
            className="text-lg"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Site Description</label>
          <Textarea 
            name="site_description" 
            defaultValue={settings.site_description} 
            placeholder="A brief description of your portfolio for search engines..." 
            required 
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">SEO Keywords</label>
          <Input 
            name="seo_keywords" 
            defaultValue={settings.seo_keywords} 
            placeholder="React, Next.js, Developer, Portfolio..." 
          />
          <p className="text-xs text-muted-foreground mt-1">Comma separated list of keywords.</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Default OpenGraph Image URL</label>
          <Input 
            name="default_og_image" 
            defaultValue={settings.default_og_image || ""} 
            placeholder="https://..." 
          />
          <p className="text-xs text-muted-foreground mt-1">Paste a URL from your Media Library. This image shows when your site is shared on social media.</p>
        </div>

        <Button type="submit" variant="primary" className="w-full">
          SAVE SEO SETTINGS
        </Button>
      </form>
    </div>
  );
}
