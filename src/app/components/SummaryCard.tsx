import { Card, CardContent } from './ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from './ui/utils';

interface SummaryCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
  iconColor?: string;
  iconBgColor?: string;
}

export function SummaryCard({ 
  title, 
  value, 
  icon: Icon, 
  trend,
  iconColor = 'text-blue-600',
  iconBgColor = 'bg-blue-100'
}: SummaryCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm text-gray-600">{title}</p>
            <p className="text-2xl font-bold mt-2">{value}</p>
            {trend && (
              <p className={cn(
                "text-sm mt-2",
                trend.positive ? "text-green-600" : "text-red-600"
              )}>
                {trend.positive ? '+' : ''}{trend.value}
              </p>
            )}
          </div>
          <div className={cn("p-3 rounded-lg", iconBgColor)}>
            <Icon className={cn("h-6 w-6", iconColor)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
