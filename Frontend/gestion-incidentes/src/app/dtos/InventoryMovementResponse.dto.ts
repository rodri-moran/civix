import { ResourceDto } from "./ResourceDto";

export type TypeMovement = 'ENTRADA' | 'SALIDA';

export interface InventoryMovementResponseDto {
    resource: ResourceDto,
    typeMovement: TypeMovement,
    quantity: number,
    date: string,
    userName: string,
    reportTitle: string,
    reason: string
}