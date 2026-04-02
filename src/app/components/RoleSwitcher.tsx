import { useFinance, UserRole } from '../context/FinanceContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Shield, Eye } from 'lucide-react';

export function RoleSwitcher() {
  const { role, setRole } = useFinance();

  return (
    <div className="flex items-center gap-2">
      <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
        <SelectTrigger className="w-[140px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="viewer">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span>Viewer</span>
            </div>
          </SelectItem>
          <SelectItem value="admin">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Admin</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
