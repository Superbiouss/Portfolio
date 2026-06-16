import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Check } from "lucide-react";
import { markMessageRead, deleteMessage } from "@/app/actions/contact";

export default async function AdminMessagesPage() {
  const supabase = await createClient();
  const { data: messages } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter">MESSAGES</h1>
        <Badge variant="accent">{messages?.filter((m) => !m.read).length || 0} UNREAD</Badge>
      </div>
      {!messages || messages.length === 0 ? (
        <div className="border-2 border-border p-12 text-center">
          <p className="text-lg text-muted-foreground">NO MESSAGES YET.</p>
        </div>
      ) : (
        <div className="space-y-0">
          {messages.map((m) => (
            <div key={m.id} className={`border-2 border-border border-t-0 first:border-t-2 p-4 md:p-6 hover:border-accent transition-colors duration-300 ${!m.read ? "border-l-accent border-l-4" : ""}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-lg font-bold uppercase tracking-tighter">{m.name}</span>
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{m.email}</span>
                    {!m.read && <Badge variant="accent">NEW</Badge>}
                  </div>
                  {m.subject && <h3 className="text-sm font-bold uppercase tracking-tight text-foreground mb-1">{m.subject}</h3>}
                  <p className="text-muted-foreground">{m.message}</p>
                  <span className="text-xs text-muted-foreground mt-2 block">{new Date(m.created_at).toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  {!m.read && (
                    <form action={async () => { "use server"; await markMessageRead(m.id); }}>
                      <Button variant="ghost" size="icon" type="submit" title="Mark as read"><Check className="w-4 h-4 text-accent" /></Button>
                    </form>
                  )}
                  <form action={async () => { "use server"; await deleteMessage(m.id); }}>
                    <Button variant="ghost" size="icon" type="submit" title="Delete"><Trash2 className="w-4 h-4 text-muted-foreground hover:text-accent" /></Button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
