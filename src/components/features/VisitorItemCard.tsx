import { ExternalLink } from 'lucide-react';
import type { VisitorItem } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface VisitorItemCardProps {
  item: VisitorItem;
}

export function VisitorItemCard({ item }: VisitorItemCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden border-[color:var(--token-border)]/30 bg-[color:var(--token-input-fill)] transition-colors hover:border-[color:var(--token-border)]/50">
      {item.image && (
        <div className="aspect-video w-full overflow-hidden bg-[color:var(--token-surface-dark)]">
          <img
            src={item.image}
            alt={item.title || item.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      )}
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="line-clamp-2 text-lg text-secondary">
            {item.title || item.name}
          </CardTitle>
          <Badge variant={item.is_active ? 'success' : 'muted'}>
            {item.is_active ? 'Active' : 'Inactive'}
          </Badge>
        </div>
        {item.category && (
          <Badge variant="outline" className="w-fit">
            {item.category}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="flex-1">
        {item.description && (
          <p className="line-clamp-3 font-almarai text-sm text-muted-foreground">
            {item.description}
          </p>
        )}
        {item.tags && item.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {item.tags.map((tag) => (
              <Badge key={tag} variant="muted" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      {item.link && (
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full" asChild>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${item.title || item.name}`}
            >
              View details
              <ExternalLink className="h-3 w-3" />
            </a>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
