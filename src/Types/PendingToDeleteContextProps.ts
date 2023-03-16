import { Product } from './Product';

export interface PendingToDeleteContextProps {
  pendingToDelete: Product[];
  addPendingToDelete: (product: Product) => void;
  removePendingToDelete: (product: Product) => void;
  clearPendingToDelete: () => void;
}