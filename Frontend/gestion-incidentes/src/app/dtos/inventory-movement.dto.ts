export interface ItemMovementDetailDto {
  resourceId: number;
  quantity: number;
}

export type TypeMovement = 'ENTRADA' | 'SALIDA';

export interface InventoryMovementDto {
  movementDetail: ItemMovementDetailDto[];
  typeMovement: TypeMovement;
  userId: number;
  reportId: number | null;
  reason: string;
}
