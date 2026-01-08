import { ResourceUsedItemDto } from "./ResourceUsedItemDto.dto";

export interface ResourcesUsedDto {
  items: ResourceUsedItemDto[];
  userId: number;
  reportId: number;
  reason: string;
}