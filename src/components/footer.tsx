import { Card, CardContent } from '@/components/ui/card';

export default function Footer() {
  return (
    <footer>
      <Card>
        <CardContent className="container p-6">
          <p className="text-sm text-muted-foreground">
            © 2024 Copyright <span className="font-bold">FSW Barber</span>
          </p>
        </CardContent>
      </Card>
    </footer>
  );
}
