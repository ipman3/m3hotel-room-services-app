import { Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { contactLinks } from "@/config/contact";

export default function ContactUsComponent() {
  return (
    <div className="flex flex-col">
      <main className="flex-grow overflow-y-auto">
        <div>
          {contactLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                to={link.url}
                key={link.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Card className="p-4 rounded-xl customShadowSm border-none bg-muted-background mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Icon className="w-6 h-6 text-base-secondary" />
                      <span className="font-semibold">{link.label}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
